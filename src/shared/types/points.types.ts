/**
 * Tipos compartilhados para Sistema de Pontos
 * Gamificação e recompensas
 */

import { PublicUser } from './user.types';

// Razões para ganhar/perder pontos
export enum PointsReason {
  POST_CREATED = 'post_created', // +10
  COMMENT_CREATED = 'comment_created', // +3
  POST_WITH_DESTINATION = 'post_with_destination', // +5
  DESTINATION_REVIEWED = 'destination_reviewed', // +8
  POST_REACHED_10_LIKES = 'post_reached_10_likes', // +5
  REPORT_CONFIRMED = 'report_confirmed', // -20
  COMMUNITY_JOINED = 'community_joined', // +2
  PROFILE_COMPLETED = 'profile_completed', // +15
  DAILY_LOGIN = 'daily_login', // +1
  MANUAL_AWARD = 'manual_award', // valor variável
}

// Valores de pontos para cada ação
export const POINTS_VALUES: Record<PointsReason, number> = {
  [PointsReason.POST_CREATED]: 10,
  [PointsReason.COMMENT_CREATED]: 3,
  [PointsReason.POST_WITH_DESTINATION]: 5,
  [PointsReason.DESTINATION_REVIEWED]: 8,
  [PointsReason.POST_REACHED_10_LIKES]: 5,
  [PointsReason.REPORT_CONFIRMED]: -20,
  [PointsReason.COMMUNITY_JOINED]: 2,
  [PointsReason.PROFILE_COMPLETED]: 15,
  [PointsReason.DAILY_LOGIN]: 1,
  [PointsReason.MANUAL_AWARD]: 0, // definido manualmente
};

// Tipo de referência (o que gerou os pontos)
export enum PointsRefType {
  POST = 'post',
  COMMENT = 'comment',
  DESTINATION = 'destination',
  REPORT = 'report',
  COMMUNITY = 'community',
  USER = 'user',
  MANUAL = 'manual',
}

// Entrada no ledger de pontos
export interface PointsLedger {
  id: string;
  userId: string;
  delta: number; // quantidade de pontos (+10, -20, etc)
  reason: PointsReason;
  refType: PointsRefType;
  refId: string; // ID da entidade relacionada
  description?: string; // descrição adicional
  createdAt: Date | string;
}

// Saldo de pontos do usuário
export interface UserPoints {
  userId: string;
  user?: PublicUser;
  totalPoints: number;
  currentWeekPoints: number;
  currentMonthPoints: number;
  allTimePoints: number;
  lastUpdated: Date | string;
}

// DTO para premiar pontos (admin/sistema)
export interface AwardPointsDTO {
  userId: string;
  delta: number;
  reason: PointsReason;
  refType: PointsRefType;
  refId: string;
  description?: string;
}

// Ranking de usuários
export interface LeaderboardEntry {
  rank: number;
  user: PublicUser;
  points: number;
  badge?: string; // badge especial (ex: "🥇 1º Lugar")
}

// Resposta do ranking
export interface LeaderboardResponse {
  success: boolean;
  period: 'weekly' | 'monthly' | 'alltime';
  leaderboard: LeaderboardEntry[];
  myRank?: number;
  myPoints?: number;
}

// Histórico de pontos do usuário
export interface PointsHistoryResponse {
  success: boolean;
  history: PointsLedger[];
  total: number;
  currentPoints: number;
}
