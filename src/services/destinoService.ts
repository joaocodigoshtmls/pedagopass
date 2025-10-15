import { Destino } from '@/types/destino';
import fallbackDestinosJson from '@/backend/data/destinos.json';

// Normaliza a URL base considerando ambientes diferentes (dev, prod, deploys externos).
const resolveApiBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (envUrl && envUrl.startsWith('http')) {
    return envUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    return `${window.location.origin.replace(/\/$/, '')}/api`;
  }

  return 'http://localhost:3001/api';
};

const API_URL = resolveApiBaseUrl();

// Mantemos uma lista de fallback alinhada com os dados do backend.
const FALLBACK_DESTINOS: Destino[] = (fallbackDestinosJson as Destino[]).map((destino) => ({
  ...destino,
  professor: destino.professor || {
    nome: 'Equipe PedagoPass',
    especialidade: 'Curadoria educacional',
    bio: 'Informações indisponíveis no momento.'
  }
}));

// Interface para resposta da API
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  total?: number;
}

export async function getAllDestinos(): Promise<Destino[]> {
  try {
    const response = await fetch(`${API_URL}/destinos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Destino[]> = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao buscar destinos');
    }
  } catch (error) {
    console.warn('Não foi possível acessar a API de destinos, usando dados locais.', error);

    return FALLBACK_DESTINOS;
  }
}

export async function getDestinoById(id: string): Promise<Destino> {
  try {
    const response = await fetch(`${API_URL}/destinos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Destino> = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Destino não encontrado');
    }
  } catch (error) {
    console.warn(`Não foi possível acessar a API para o destino ${id}, usando dados locais.`, error);

    const fallback = FALLBACK_DESTINOS.find(destino => destino.id === id);

    if (fallback) {
      return fallback;
    }

    throw error;
  }
}

export async function searchDestinos(query: string): Promise<Destino[]> {
  try {
    const response = await fetch(`${API_URL}/destinos?search=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Destino[]> = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao buscar destinos');
    }
  } catch (error) {
    console.warn('Não foi possível acessar a API para pesquisa de destinos, usando dados locais.', error);

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return FALLBACK_DESTINOS;
    }

    return FALLBACK_DESTINOS.filter((destino) =>
      destino.titulo.toLowerCase().includes(normalizedQuery) ||
      destino.descricao.toLowerCase().includes(normalizedQuery) ||
      destino.localizacao.toLowerCase().includes(normalizedQuery)
    );
  }
}
