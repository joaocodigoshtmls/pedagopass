import { httpClient } from '../../lib/httpClient';
import {
  Community,
  CreateCommunityDTO,
  UpdateCommunityDTO,
  CommunityMember,
  MemberRole,
} from '../../shared/types/community.types';

interface GetCommunitiesParams {
  topic?: string;
  search?: string;
  onlyPublic?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

// Buscar todas as comunidades
export const getCommunities = async (params?: GetCommunitiesParams): Promise<Community[]> => {
  const { data } = await httpClient.get<ApiResponse<Community[]>>('/communities', { params });
  return data.data;
};

// Buscar comunidade por ID
export const getCommunityById = async (id: string): Promise<Community> => {
  const { data } = await httpClient.get<ApiResponse<Community>>(`/communities/${id}`);
  return data.data;
};

// Criar nova comunidade
export const createCommunity = async (communityData: CreateCommunityDTO): Promise<Community> => {
  const { data } = await httpClient.post<ApiResponse<Community>>('/communities', communityData);
  return data.data;
};

// Atualizar comunidade
export const updateCommunity = async (id: string, updates: UpdateCommunityDTO): Promise<Community> => {
  const { data } = await httpClient.put<ApiResponse<Community>>(`/communities/${id}`, updates);
  return data.data;
};

// Deletar comunidade
export const deleteCommunity = async (id: string): Promise<void> => {
  await httpClient.delete(`/communities/${id}`);
};

// Entrar em uma comunidade
export const joinCommunity = async (communityId: string): Promise<CommunityMember> => {
  const { data } = await httpClient.post<ApiResponse<CommunityMember>>(`/communities/${communityId}/join`);
  return data.data;
};

// Sair de uma comunidade
export const leaveCommunity = async (communityId: string): Promise<void> => {
  await httpClient.post(`/communities/${communityId}/leave`);
};

// Listar membros da comunidade
export const getCommunityMembers = async (communityId: string): Promise<CommunityMember[]> => {
  const { data } = await httpClient.get<ApiResponse<CommunityMember[]>>(`/communities/${communityId}/members`);
  return data.data;
};

// Listar comunidades de um usuário
export const getUserCommunities = async (userId: string): Promise<Community[]> => {
  const { data } = await httpClient.get<ApiResponse<Community[]>>(`/communities/user/${userId}`);
  return data.data;
};

// Atualizar role de um membro
export const updateMemberRole = async (
  communityId: string,
  userId: string,
  role: MemberRole
): Promise<void> => {
  await httpClient.put(`/communities/${communityId}/members/${userId}/role`, { role });
};
