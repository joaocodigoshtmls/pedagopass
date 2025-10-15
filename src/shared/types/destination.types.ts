/**
 * Tipos compartilhados para Destinos
 * Catálogo de viagens educacionais
 */

import { PublicUser } from './user.types';

// Professor responsável
export interface Professor {
  nome: string;
  especialidade: string;
  bio: string;
  foto?: string;
}

// Item do itinerário
export interface ItinerarioItem {
  dia: number;
  titulo: string;
  atividades: string[];
}

// Destino completo
export interface Destination {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  preco: number;
  dataInicio: string | Date;
  dataFim: string | Date;
  vagas: number;
  categoria: string;
  localizacao: string;
  duracao?: string;
  destaques: string[];
  inclui: string[];
  itinerario?: ItinerarioItem[];
  professor: Professor;
  avaliacoes?: DestinationReview[];
  mediaAvaliacao?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// Avaliação de destino
export interface DestinationReview {
  id: string;
  destinationId: string;
  userId: string;
  user?: PublicUser;
  rating: number; // 1-5 estrelas
  comment: string;
  helpfulCount: number; // quantos acharam útil
  createdAt: Date | string;
  updatedAt?: Date | string;
}

// DTO para criar avaliação
export interface CreateReviewDTO {
  destinationId: string;
  rating: number;
  comment: string;
}

// DTO para sugerir correção no destino (formulário de professores)
export interface SuggestDestinationDTO {
  destinationId?: string; // se for correção
  type: 'correction' | 'new';
  name: string;
  email: string;
  school?: string;
  titulo: string;
  descricao: string;
  localizacao: string;
  preco?: number;
  sugestao: string;
}

// Resposta ao listar destinos
export interface DestinationsResponse {
  success: boolean;
  data: Destination[];
  total: number;
  message?: string;
}

// Resposta ao buscar um destino
export interface DestinationResponse {
  success: boolean;
  data: Destination;
  message?: string;
}

// Filtros para buscar destinos
export interface DestinationFilters {
  categoria?: string;
  precoMax?: number;
  precoMin?: number;
  search?: string;
  localizacao?: string;
  dataInicio?: string;
  vagas?: number;
}
