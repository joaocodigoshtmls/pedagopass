export interface Professor {
  nome: string;
  especialidade: string;
  bio: string;
  foto?: string;
}

export interface ItinerarioItem {
  dia: number;
  titulo: string;
  atividades: string[];
}

export interface Destino {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  preco: number;
  dataInicio: string;
  dataFim: string;
  vagas: number;
  categoria: string;
  localizacao: string;
  destaques: string[];
  inclui: string[];
  duracao?: string;
  itinerario?: ItinerarioItem[];
  professor: Professor;
}
