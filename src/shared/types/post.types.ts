/**
 * Tipos compartilhados para Posts
 * Sistema de publicações da rede social
 */

import { PublicUser } from './user.types';

// Tipo de mídia
export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

// Mídia anexada ao post
export interface Media {
  id: string;
  postId: string;
  url: string;
  type: MediaType;
  width?: number;
  height?: number;
  duration?: number; // duração em segundos (para vídeos)
  thumbnail?: string; // thumbnail para vídeos
  createdAt: Date | string;
}

// Post completo
export interface Post {
  id: string;
  authorId: string;
  author?: PublicUser; // dados do autor (populate)
  communityId?: string;
  community?: Community; // dados da comunidade (populate)
  destinationId?: string;
  destination?: Destination; // dados do destino (populate)
  content: string;
  media: Media[];
  tags: string[]; // tags para busca e categorização
  likesCount: number;
  commentsCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// DTO para criar post
export interface CreatePostDTO {
  content: string;
  communityId?: string;
  destinationId?: string;
  tags?: string[];
  // media será enviado separadamente via multipart/form-data
}

// DTO para atualizar post
export interface UpdatePostDTO {
  content?: string;
  tags?: string[];
}

// Reação (curtida) no post
export interface Reaction {
  postId: string;
  userId: string;
  user?: PublicUser;
  type: 'like'; // pode expandir para outros tipos (love, wow, etc)
  createdAt: Date | string;
}

// Comentário no post
export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author?: PublicUser;
  content: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

// DTO para criar comentário
export interface CreateCommentDTO {
  postId: string;
  content: string;
}

// Filtros para buscar posts
export interface PostFilters {
  communityId?: string;
  destinationId?: string;
  authorId?: string;
  tag?: string;
  search?: string; // busca no conteúdo
  limit?: number;
  offset?: number;
  sortBy?: 'recent' | 'popular'; // recente ou popular (por curtidas)
}

// Resposta paginada de posts
export interface PostsResponse {
  success: boolean;
  posts: Post[];
  total: number;
  hasMore: boolean;
  nextOffset?: number;
}

// Tipos temporários (serão definidos em seus próprios arquivos)
interface Community {
  id: string;
  name: string;
  slug: string;
  topic: string;
}

interface Destination {
  id: string;
  titulo: string;
  localizacao: string;
}
