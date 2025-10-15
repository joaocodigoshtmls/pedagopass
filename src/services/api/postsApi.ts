/**
 * Serviço de API para Posts
 */
import { httpClient } from '../../lib/httpClient';
import {
  Post,
  PostsResponse,
  CreatePostDTO,
  UpdatePostDTO,
  PostFilters,
  Comment,
  ApiResponse,
} from '../../shared/types';

export const postsApi = {
  // Listar posts com filtros
  getPosts: async (filters?: PostFilters): Promise<PostsResponse> => {
    const params = new URLSearchParams();
    
    if (filters?.communityId) params.append('communityId', filters.communityId);
    if (filters?.destinationId) params.append('destinationId', filters.destinationId);
    if (filters?.authorId) params.append('authorId', filters.authorId);
    if (filters?.tag) params.append('tag', filters.tag);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const { data } = await httpClient.get<PostsResponse>(`/posts?${params.toString()}`);
    return data;
  },

  // Buscar post por ID
  getPostById: async (id: string): Promise<Post> => {
    const { data } = await httpClient.get<{ success: boolean; post: Post }>(`/posts/${id}`);
    return data.post;
  },

  // Criar novo post
  createPost: async (postData: CreatePostDTO, files?: File[]): Promise<Post> => {
    const formData = new FormData();
    formData.append('content', postData.content);
    
    if (postData.communityId) {
      formData.append('communityId', postData.communityId);
    }
    if (postData.destinationId) {
      formData.append('destinationId', postData.destinationId);
    }
    if (postData.tags && postData.tags.length > 0) {
      formData.append('tags', JSON.stringify(postData.tags));
    }
    
    // Adicionar arquivos
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('media', file);
      });
    }

    const { data } = await httpClient.post<{ success: boolean; post: Post; message: string }>(
      '/posts',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data.post;
  },

  // Atualizar post
  updatePost: async (id: string, updates: UpdatePostDTO): Promise<Post> => {
    const { data } = await httpClient.put<{ success: boolean; post: Post }>(
      `/posts/${id}`,
      updates
    );
    return data.post;
  },

  // Deletar post
  deletePost: async (id: string): Promise<void> => {
    await httpClient.delete(`/posts/${id}`);
  },

  // Curtir/descurtir post
  toggleLike: async (postId: string): Promise<{ liked: boolean; likesCount: number }> => {
    const { data } = await httpClient.post<{ success: boolean; liked: boolean; likesCount: number }>(
      `/posts/${postId}/like`
    );
    return { liked: data.liked, likesCount: data.likesCount };
  },

  // Adicionar comentário
  addComment: async (postId: string, content: string): Promise<Comment> => {
    const { data } = await httpClient.post<{ success: boolean; comment: Comment }>(
      `/posts/${postId}/comments`,
      { content }
    );
    return data.comment;
  },

  // Listar comentários
  getComments: async (postId: string): Promise<Comment[]> => {
    const { data } = await httpClient.get<{ success: boolean; comments: Comment[]; total: number }>(
      `/posts/${postId}/comments`
    );
    return data.comments;
  },

  // Deletar comentário
  deleteComment: async (commentId: string): Promise<void> => {
    await httpClient.delete(`/comments/${commentId}`);
  },
};
