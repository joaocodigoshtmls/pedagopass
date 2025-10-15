/**
 * Tipos compartilhados para Sistema de Recompensas
 * Resgates e ofertas
 */

import { PublicUser } from './user.types';

// Categoria de recompensa
export enum RewardCategory {
  VIAGEM = 'Viagem',
  CURSO = 'Curso',
  LIVRO = 'Livro',
  MATERIAL = 'Material Didático',
  EVENTO = 'Evento',
  DESCONTO = 'Desconto',
  BRINDE = 'Brinde',
  OUTROS = 'Outros',
}

// Recompensa disponível
export interface Reward {
  id: string;
  title: string;
  description: string;
  category: RewardCategory;
  imageUrl?: string;
  partner?: string; // nome do parceiro/empresa
  costPoints: number; // custo em pontos
  stock: number; // estoque disponível (-1 para ilimitado)
  terms?: string; // termos e condições
  isActive: boolean;
  expiresAt?: Date | string; // data de expiração da oferta
  createdAt: Date | string;
  updatedAt?: Date | string;
}

// DTO para criar recompensa (admin)
export interface CreateRewardDTO {
  title: string;
  description: string;
  category: RewardCategory;
  imageUrl?: string;
  partner?: string;
  costPoints: number;
  stock: number;
  terms?: string;
  expiresAt?: Date | string;
}

// DTO para atualizar recompensa
export interface UpdateRewardDTO {
  title?: string;
  description?: string;
  imageUrl?: string;
  costPoints?: number;
  stock?: number;
  terms?: string;
  isActive?: boolean;
  expiresAt?: Date | string;
}

// Status de resgate
export enum RedemptionStatus {
  REQUESTED = 'requested', // solicitado
  APPROVED = 'approved', // aprovado
  DENIED = 'denied', // negado
  EXPIRED = 'expired', // expirado
}

// Resgate de recompensa
export interface Redemption {
  id: string;
  userId: string;
  user?: PublicUser;
  rewardId: string;
  reward?: Reward;
  status: RedemptionStatus;
  code?: string; // código de resgate gerado
  pointsSpent: number;
  notes?: string; // notas do admin
  requestedAt: Date | string;
  processedAt?: Date | string;
  expiresAt?: Date | string;
}

// DTO para solicitar resgate
export interface RequestRedemptionDTO {
  rewardId: string;
}

// Resposta ao listar recompensas
export interface RewardsResponse {
  success: boolean;
  rewards: Reward[];
  total: number;
  userPoints?: number; // pontos disponíveis do usuário
}

// Resposta ao solicitar resgate
export interface RedemptionResponse {
  success: boolean;
  message: string;
  redemption: Redemption;
  remainingPoints: number;
}

// Resposta ao listar resgates do usuário
export interface MyRedemptionsResponse {
  success: boolean;
  redemptions: Redemption[];
  total: number;
}

// DTO para processar resgate (admin)
export interface ProcessRedemptionDTO {
  redemptionId: string;
  status: RedemptionStatus.APPROVED | RedemptionStatus.DENIED;
  code?: string; // código de resgate (se aprovado)
  notes?: string;
}
