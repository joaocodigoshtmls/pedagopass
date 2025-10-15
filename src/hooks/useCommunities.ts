import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import * as communitiesApi from '../services/api/communitiesApi';
import {
  Community,
  CreateCommunityDTO,
  UpdateCommunityDTO,
  CommunityMember,
  MemberRole,
} from '../shared/types/community.types';

// Query Keys
export const communityKeys = {
  all: ['communities'] as const,
  lists: () => [...communityKeys.all, 'list'] as const,
  list: (filters?: any) => [...communityKeys.lists(), filters] as const,
  details: () => [...communityKeys.all, 'detail'] as const,
  detail: (id: string) => [...communityKeys.details(), id] as const,
  members: (id: string) => [...communityKeys.detail(id), 'members'] as const,
  userCommunities: (userId: string) => [...communityKeys.all, 'user', userId] as const,
};

// ========================================
// Queries
// ========================================

/**
 * Hook para buscar todas as comunidades
 */
export const useCommunities = (params?: {
  topic?: string;
  search?: string;
  onlyPublic?: boolean;
}): UseQueryResult<Community[], Error> => {
  return useQuery({
    queryKey: communityKeys.list(params),
    queryFn: () => communitiesApi.getCommunities(params),
  });
};

/**
 * Hook para buscar uma comunidade por ID
 */
export const useCommunity = (id: string): UseQueryResult<Community, Error> => {
  return useQuery({
    queryKey: communityKeys.detail(id),
    queryFn: () => communitiesApi.getCommunityById(id),
    enabled: !!id,
  });
};

/**
 * Hook para buscar membros de uma comunidade
 */
export const useCommunityMembers = (communityId: string): UseQueryResult<CommunityMember[], Error> => {
  return useQuery({
    queryKey: communityKeys.members(communityId),
    queryFn: () => communitiesApi.getCommunityMembers(communityId),
    enabled: !!communityId,
  });
};

/**
 * Hook para buscar comunidades de um usuário
 */
export const useUserCommunities = (userId: string): UseQueryResult<Community[], Error> => {
  return useQuery({
    queryKey: communityKeys.userCommunities(userId),
    queryFn: () => communitiesApi.getUserCommunities(userId),
    enabled: !!userId,
  });
};

// ========================================
// Mutations
// ========================================

/**
 * Hook para criar uma nova comunidade
 */
export const useCreateCommunity = (): UseMutationResult<
  Community,
  Error,
  CreateCommunityDTO
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communitiesApi.createCommunity,
    onSuccess: (newCommunity) => {
      // Invalidar lista de comunidades
      queryClient.invalidateQueries({ queryKey: communityKeys.lists() });
      
      // Adicionar aos dados de cache
      queryClient.setQueryData(communityKeys.detail(newCommunity.id), newCommunity);
    },
  });
};

/**
 * Hook para atualizar uma comunidade
 */
export const useUpdateCommunity = (): UseMutationResult<
  Community,
  Error,
  { id: string; updates: UpdateCommunityDTO }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }) => communitiesApi.updateCommunity(id, updates),
    onSuccess: (updatedCommunity) => {
      // Atualizar comunidade no cache
      queryClient.setQueryData(communityKeys.detail(updatedCommunity.id), updatedCommunity);
      
      // Invalidar lista de comunidades
      queryClient.invalidateQueries({ queryKey: communityKeys.lists() });
    },
  });
};

/**
 * Hook para deletar uma comunidade
 */
export const useDeleteCommunity = (): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communitiesApi.deleteCommunity,
    onSuccess: (_, communityId) => {
      // Remover comunidade do cache
      queryClient.removeQueries({ queryKey: communityKeys.detail(communityId) });
      
      // Invalidar lista de comunidades
      queryClient.invalidateQueries({ queryKey: communityKeys.lists() });
    },
  });
};

/**
 * Hook para entrar em uma comunidade
 */
export const useJoinCommunity = (): UseMutationResult<CommunityMember, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communitiesApi.joinCommunity,
    onMutate: async (communityId) => {
      // Cancelar queries em andamento
      await queryClient.cancelQueries({ queryKey: communityKeys.detail(communityId) });

      // Snapshot do estado anterior
      const previousCommunity = queryClient.getQueryData<Community>(
        communityKeys.detail(communityId)
      );

      // Atualizar otimisticamente
      if (previousCommunity) {
        queryClient.setQueryData<Community>(communityKeys.detail(communityId), {
          ...previousCommunity,
          membersCount: previousCommunity.membersCount + 1,
        });
      }

      return { previousCommunity };
    },
    onError: (err, communityId, context) => {
      // Reverter em caso de erro
      if (context?.previousCommunity) {
        queryClient.setQueryData(
          communityKeys.detail(communityId),
          context.previousCommunity
        );
      }
    },
    onSettled: (_, __, communityId) => {
      // Refetch para garantir dados corretos
      queryClient.invalidateQueries({ queryKey: communityKeys.detail(communityId) });
      queryClient.invalidateQueries({ queryKey: communityKeys.members(communityId) });
    },
  });
};

/**
 * Hook para sair de uma comunidade
 */
export const useLeaveCommunity = (): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communitiesApi.leaveCommunity,
    onMutate: async (communityId) => {
      await queryClient.cancelQueries({ queryKey: communityKeys.detail(communityId) });

      const previousCommunity = queryClient.getQueryData<Community>(
        communityKeys.detail(communityId)
      );

      if (previousCommunity) {
        queryClient.setQueryData<Community>(communityKeys.detail(communityId), {
          ...previousCommunity,
          membersCount: Math.max(0, previousCommunity.membersCount - 1),
        });
      }

      return { previousCommunity };
    },
    onError: (err, communityId, context) => {
      if (context?.previousCommunity) {
        queryClient.setQueryData(
          communityKeys.detail(communityId),
          context.previousCommunity
        );
      }
    },
    onSettled: (_, __, communityId) => {
      queryClient.invalidateQueries({ queryKey: communityKeys.detail(communityId) });
      queryClient.invalidateQueries({ queryKey: communityKeys.members(communityId) });
    },
  });
};

/**
 * Hook para atualizar role de um membro
 */
export const useUpdateMemberRole = (): UseMutationResult<
  void,
  Error,
  { communityId: string; userId: string; role: MemberRole }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ communityId, userId, role }) =>
      communitiesApi.updateMemberRole(communityId, userId, role),
    onSuccess: (_, { communityId }) => {
      // Invalidar lista de membros
      queryClient.invalidateQueries({ queryKey: communityKeys.members(communityId) });
    },
  });
};
