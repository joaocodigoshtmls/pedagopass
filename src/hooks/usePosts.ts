/**
 * Hooks React Query para Posts
 */
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { postsApi } from '../services/api/postsApi';
import {
  Post,
  CreatePostDTO,
  UpdatePostDTO,
  PostFilters,
} from '../shared/types';

// Query Keys
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters?: PostFilters) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
  comments: (postId: string) => [...postKeys.all, 'comments', postId] as const,
};

// Hook para listar posts
export function usePosts(filters?: PostFilters) {
  return useQuery({
    queryKey: postKeys.list(filters),
    queryFn: () => postsApi.getPosts(filters),
  });
}

// Hook para scroll infinito
export function useInfinitePosts(filters?: Omit<PostFilters, 'offset'>) {
  return useInfiniteQuery({
    queryKey: [...postKeys.lists(), 'infinite', filters],
    queryFn: ({ pageParam = 0 }) =>
      postsApi.getPosts({ ...filters, offset: pageParam, limit: filters?.limit || 20 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return lastPage.nextOffset;
      }
      return undefined;
    },
    initialPageParam: 0,
  });
}

// Hook para buscar post por ID
export function usePost(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postsApi.getPostById(id),
    enabled: !!id,
  });
}

// Hook para criar post
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postData, files }: { postData: CreatePostDTO; files?: File[] }) =>
      postsApi.createPost(postData, files),
    onSuccess: () => {
      // Invalidar todas as listas de posts
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

// Hook para atualizar post
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdatePostDTO }) =>
      postsApi.updatePost(id, updates),
    onSuccess: (updatedPost: Post) => {
      // Atualizar cache do post específico
      queryClient.setQueryData(postKeys.detail(updatedPost.id), updatedPost);
      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

// Hook para deletar post
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postsApi.deletePost(id),
    onSuccess: (_, id) => {
      // Remover do cache
      queryClient.removeQueries({ queryKey: postKeys.detail(id) });
      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

// Hook para curtir/descurtir post
export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postsApi.toggleLike(postId),
    onMutate: async (postId) => {
      // Cancelar queries em andamento
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });

      // Snapshot do valor anterior
      const previousPost = queryClient.getQueryData<Post>(postKeys.detail(postId));

      // Atualização otimista
      if (previousPost) {
        queryClient.setQueryData<Post>(postKeys.detail(postId), (old: Post | undefined) => {
          if (!old) return old;
          return {
            ...old,
            likesCount: old.likesCount + 1, // Será ajustado pelo servidor
          };
        });
      }

      return { previousPost };
    },
    onError: (err, postId, context) => {
      // Reverter em caso de erro
      if (context?.previousPost) {
        queryClient.setQueryData(postKeys.detail(postId), context.previousPost);
      }
    },
    onSuccess: (result: { liked: boolean; likesCount: number }, postId) => {
      // Atualizar com dados reais do servidor
      queryClient.setQueryData<Post>(postKeys.detail(postId), (old: Post | undefined) => {
        if (!old) return old;
        return {
          ...old,
          likesCount: result.likesCount,
        };
      });
      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

// Hook para listar comentários
export function useComments(postId: string) {
  return useQuery({
    queryKey: postKeys.comments(postId),
    queryFn: () => postsApi.getComments(postId),
    enabled: !!postId,
  });
}

// Hook para adicionar comentário
export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      postsApi.addComment(postId, content),
    onSuccess: (_, { postId }) => {
      // Invalidar comentários do post
      queryClient.invalidateQueries({ queryKey: postKeys.comments(postId) });
      // Atualizar contador de comentários
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

// Hook para deletar comentário
export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, postId }: { commentId: string; postId: string }) =>
      postsApi.deleteComment(commentId),
    onSuccess: (_, { postId }) => {
      // Invalidar comentários do post
      queryClient.invalidateQueries({ queryKey: postKeys.comments(postId) });
      // Atualizar contador de comentários
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}
