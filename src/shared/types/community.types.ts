/**
 * Tipos compartilhados para Communities
 * Sistema de comunidades temáticas
 */

import { PublicUser } from './user.types';

// Tópicos/categorias das comunidades
export enum CommunityTopic {
  PEDAGOGIA = 'Pedagogia',
  TECNOLOGIA = 'Tecnologia Educacional',
  INCLUSAO = 'Inclusão e Diversidade',
  GESTAO = 'Gestão Escolar',
  METODOLOGIAS = 'Metodologias Ativas',
  AVALIACAO = 'Avaliação',
  FORMACAO = 'Formação Continuada',
  DISCIPLINAS = 'Disciplinas Específicas',
  INTERCAMBIO = 'Intercâmbio Cultural',
  PROJETOS = 'Projetos Educacionais',
  OUTROS = 'Outros',
}

// Comunidade completa
export interface Community {
  id: string;
  name: string;
  slug: string; // URL amigável (ex: 'pedagogia-ativa')
  description: string;
  topic: CommunityTopic;
  rules?: string; // regras da comunidade
  coverImage?: string;
  iconImage?: string;
  creatorId: string;
  creator?: PublicUser;
  membersCount: number;
  postsCount: number;
  isPrivate: boolean; // comunidade privada requer aprovação
  createdAt: Date | string;
  updatedAt?: Date | string;
}

// DTO para criar comunidade
export interface CreateCommunityDTO {
  name: string;
  slug: string;
  description: string;
  topic: CommunityTopic;
  rules?: string;
  isPrivate?: boolean;
}

// DTO para atualizar comunidade
export interface UpdateCommunityDTO {
  name?: string;
  description?: string;
  rules?: string;
  coverImage?: string;
  iconImage?: string;
  isPrivate?: boolean;
}

// Membership (pertencimento a uma comunidade)
export interface CommunityMember {
  communityId: string;
  userId: string;
  user?: PublicUser;
  role: MemberRole;
  joinedAt: Date | string;
}

// Papéis dentro da comunidade
export enum MemberRole {
  CREATOR = 'creator', // criador da comunidade
  MODERATOR = 'moderator', // moderador
  MEMBER = 'member', // membro comum
}

// Resposta ao listar comunidades
export interface CommunitiesResponse {
  success: boolean;
  communities: Community[];
  total: number;
}

// Resposta ao buscar detalhes de uma comunidade
export interface CommunityDetailsResponse {
  success: boolean;
  community: Community;
  isMember: boolean;
  memberRole?: MemberRole;
}

// Filtros para buscar comunidades
export interface CommunityFilters {
  topic?: CommunityTopic;
  search?: string;
  isPrivate?: boolean;
  limit?: number;
  offset?: number;
}
