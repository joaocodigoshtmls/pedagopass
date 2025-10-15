/**
 * Tipos compartilhados para User
 * Usado tanto no frontend quanto no backend
 */

// User completo (nunca expor passwordHash)
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  school?: string;
  subject?: string;
  segment?: string;
  city?: string;
  state?: string;
  bio?: string;
  verified: boolean;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

// User público (para exibição em posts, comentários, etc)
export interface PublicUser {
  id: string;
  name: string;
  avatarUrl?: string;
  school?: string;
  subject?: string;
  segment?: string;
  verified: boolean;
}

// DTO para registro
export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  school?: string;
  subject?: string;
  segment?: string;
  city?: string;
  state?: string;
}

// DTO para login
export interface LoginDTO {
  email: string;
  password: string;
}

// DTO para atualizar perfil
export interface UpdateProfileDTO {
  name?: string;
  avatarUrl?: string;
  school?: string;
  subject?: string;
  segment?: string;
  city?: string;
  state?: string;
  bio?: string;
}

// Resposta de autenticação
export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
}

// Payload do JWT
export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// Segmentos educacionais disponíveis
export enum EducationSegment {
  EDUCACAO_INFANTIL = 'Educação Infantil',
  ENSINO_FUNDAMENTAL_I = 'Ensino Fundamental I',
  ENSINO_FUNDAMENTAL_II = 'Ensino Fundamental II',
  ENSINO_MEDIO = 'Ensino Médio',
  EJA = 'Educação de Jovens e Adultos',
  ENSINO_SUPERIOR = 'Ensino Superior',
  EDUCACAO_ESPECIAL = 'Educação Especial',
}

// Estados brasileiros
export enum BrazilianState {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
}
