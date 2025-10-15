// Serviço para interagir com a API de Pontos
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface UserPoints {
  userId: string;
  totalPoints: number;
  level: 'Bronze' | 'Silver' | 'Gold';
  nextLevelPoints: number;
  activities: PointActivity[];
}

export interface PointActivity {
  id: string;
  type: 'post' | 'like' | 'comment' | 'community_join' | 'travel_complete';
  description: string;
  points: number;
  createdAt: string;
}

// Interface para resposta da API
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Buscar pontos do usuário
export async function getUserPoints(userId: string): Promise<UserPoints> {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/users/${userId}/points`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<UserPoints> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao buscar pontos do usuário');
    }
  } catch (error) {
    console.error('Erro ao buscar pontos:', error);
    throw error;
  }
}

// Buscar pontos do usuário logado
export async function getMyPoints(): Promise<UserPoints> {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/users/me/points`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<UserPoints> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao buscar meus pontos');
    }
  } catch (error) {
    console.error('Erro ao buscar meus pontos:', error);
    throw error;
  }
}

// Dar pontos para uma ação específica
export async function awardPoints(
  userId: string, 
  type: PointActivity['type'], 
  description: string, 
  points: number
): Promise<UserPoints> {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/points/award`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({
        userId,
        type,
        description,
        points
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<UserPoints> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao dar pontos');
    }
  } catch (error) {
    console.error('Erro ao dar pontos:', error);
    throw error;
  }
}

// Função utilitária para calcular nível baseado em pontos
export function calculateLevel(points: number): 'Bronze' | 'Silver' | 'Gold' {
  if (points >= 1000) return 'Gold';
  if (points >= 500) return 'Silver';
  return 'Bronze';
}

// Função utilitária para calcular pontos necessários para próximo nível
export function calculateNextLevelPoints(points: number): number {
  if (points < 500) return 500 - points;
  if (points < 1000) return 1000 - points;
  return 0; // Já está no nível máximo
}

// Função utilitária para obter cor do nível
export function getLevelColor(level: 'Bronze' | 'Silver' | 'Gold'): string {
  switch (level) {
    case 'Bronze': return 'text-orange-600';
    case 'Silver': return 'text-gray-500';
    case 'Gold': return 'text-yellow-500';
    default: return 'text-gray-400';
  }
}

// Função utilitária para obter cor de fundo do nível
export function getLevelBgColor(level: 'Bronze' | 'Silver' | 'Gold'): string {
  switch (level) {
    case 'Bronze': return 'bg-orange-100';
    case 'Silver': return 'bg-gray-100';
    case 'Gold': return 'bg-yellow-100';
    default: return 'bg-gray-50';
  }
}
