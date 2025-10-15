/**
 * Tipos compartilhados para Sistema de Moderação
 * Denúncias e ações administrativas
 */

import { PublicUser } from './user.types';

// Tipo de conteúdo denunciado
export enum ReportRefType {
  POST = 'post',
  COMMENT = 'comment',
  USER = 'user',
  COMMUNITY = 'community',
}

// Razões para denúncia
export enum ReportReason {
  SPAM = 'Spam ou Conteúdo Irrelevante',
  HARASSMENT = 'Assédio ou Bullying',
  HATE_SPEECH = 'Discurso de Ódio',
  VIOLENCE = 'Violência ou Conteúdo Gráfico',
  MISINFORMATION = 'Desinformação',
  INAPPROPRIATE = 'Conteúdo Inapropriado',
  COPYRIGHT = 'Violação de Direitos Autorais',
  IMPERSONATION = 'Personificação',
  OUTROS = 'Outros',
}

// Status da denúncia
export enum ReportStatus {
  PENDING = 'pending', // pendente de análise
  REVIEWING = 'reviewing', // em análise
  RESOLVED = 'resolved', // resolvida (ação tomada)
  DISMISSED = 'dismissed', // descartada (sem ação)
}

// Ação tomada pela moderação
export enum ModerationAction {
  NO_ACTION = 'no_action',
  WARNING = 'warning', // aviso
  CONTENT_REMOVED = 'content_removed', // conteúdo removido
  USER_SUSPENDED = 'user_suspended', // usuário suspenso
  USER_BANNED = 'user_banned', // usuário banido
  POINTS_DEDUCTED = 'points_deducted', // pontos deduzidos
}

// Denúncia/Report
export interface Report {
  id: string;
  refType: ReportRefType;
  refId: string; // ID do conteúdo denunciado
  reporterId: string;
  reporter?: PublicUser;
  reportedUserId?: string; // usuário dono do conteúdo denunciado
  reportedUser?: PublicUser;
  reason: ReportReason;
  description?: string; // descrição adicional
  status: ReportStatus;
  reviewedBy?: string; // ID do admin que analisou
  reviewer?: PublicUser;
  action?: ModerationAction;
  actionNotes?: string; // notas do moderador
  createdAt: Date | string;
  reviewedAt?: Date | string;
}

// DTO para criar denúncia
export interface CreateReportDTO {
  refType: ReportRefType;
  refId: string;
  reason: ReportReason;
  description?: string;
}

// DTO para processar denúncia (admin)
export interface ProcessReportDTO {
  reportId: string;
  status: ReportStatus.RESOLVED | ReportStatus.DISMISSED;
  action: ModerationAction;
  actionNotes?: string;
}

// Resposta ao listar denúncias (admin)
export interface ReportsResponse {
  success: boolean;
  reports: Report[];
  total: number;
  pending: number;
  reviewing: number;
}

// Filtros para buscar denúncias (admin)
export interface ReportFilters {
  status?: ReportStatus;
  refType?: ReportRefType;
  reason?: ReportReason;
  reporterId?: string;
  reportedUserId?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}

// Notificação de moderação para usuário
export interface ModerationNotification {
  id: string;
  userId: string;
  type: 'warning' | 'suspension' | 'content_removed';
  message: string;
  reportId?: string;
  read: boolean;
  createdAt: Date | string;
}
