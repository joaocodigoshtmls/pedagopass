/**
 * Tipos utilitários e comuns
 * Usados em toda a aplicação
 */

// Resposta padrão da API
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>; // erros de validação
}

// Resposta paginada genérica
export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  nextOffset?: number;
}

// Filtros de paginação padrão
export interface PaginationParams {
  limit?: number;
  offset?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Filtros de data
export interface DateRange {
  from?: Date | string;
  to?: Date | string;
}

// Status genérico
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

// Notificação in-app
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string; // URL para navegar ao clicar
  data?: Record<string, any>; // dados adicionais
  read: boolean;
  createdAt: Date | string;
}

// Tipos de notificação
export enum NotificationType {
  POST_LIKE = 'post_like',
  POST_COMMENT = 'post_comment',
  COMMENT_REPLY = 'comment_reply',
  COMMUNITY_INVITE = 'community_invite',
  POINTS_AWARDED = 'points_awarded',
  REDEMPTION_APPROVED = 'redemption_approved',
  REDEMPTION_DENIED = 'redemption_denied',
  MODERATION_WARNING = 'moderation_warning',
  NEW_FOLLOWER = 'new_follower',
  SYSTEM = 'system',
}

// DTO para marcar notificação como lida
export interface MarkNotificationReadDTO {
  notificationId: string;
}

// Resposta de notificações
export interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
  unreadCount: number;
  total: number;
}

// Erro de validação
export interface ValidationError {
  field: string;
  message: string;
}

// Upload de arquivo
export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  url: string; // URL final do arquivo
}

// Configurações de upload
export interface UploadConfig {
  maxSize: number; // em bytes
  allowedTypes: string[]; // mimetypes permitidos
  maxFiles: number;
}

// Constantes de upload
export const UPLOAD_LIMITS = {
  IMAGE: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    maxFiles: 5,
  },
  VIDEO: {
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ['video/mp4', 'video/quicktime', 'video/webm'],
    maxFiles: 1,
  },
  AVATAR: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    maxFiles: 1,
  },
};
