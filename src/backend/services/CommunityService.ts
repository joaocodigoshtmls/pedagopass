import { v4 as uuidv4 } from 'uuid';
import {
  Community,
  CreateCommunityDTO,
  CommunityMember,
  MemberRole,
  CommunityTopic,
} from '../../shared/types';

class CommunityService {
  private communities: Community[] = [];
  private members: { [communityId: string]: CommunityMember[] } = {};

  constructor() {
    this.initializeMockCommunities();
  }

  private initializeMockCommunities(): void {
    const community1: Community = {
      id: 'comm-1',
      name: 'Professores de História',
      slug: 'professores-de-historia',
      description: 'Comunidade para professores de História compartilharem experiências e recursos.',
      coverImage: '/images/history-cover.jpg',
      topic: CommunityTopic.DISCIPLINAS,
      isPrivate: false,
      creatorId: 'user-1',
      membersCount: 234,
      postsCount: 89,
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const community2: Community = {
      id: 'comm-2',
      name: 'Intercâmbio Cultural',
      slug: 'intercambio-cultural',
      description: 'Explorando o mundo através de viagens educacionais e intercâmbio.',
      coverImage: '/images/geography-cover.jpg',
      topic: CommunityTopic.INTERCAMBIO,
      isPrivate: false,
      creatorId: 'user-2',
      membersCount: 156,
      postsCount: 67,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    };

    this.communities = [community1, community2];

    // Membros mockados
    this.members['comm-1'] = [
      {
        userId: 'user-1',
        communityId: 'comm-1',
        role: MemberRole.CREATOR,
        joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    this.members['comm-2'] = [
      {
        userId: 'user-2',
        communityId: 'comm-2',
        role: MemberRole.CREATOR,
        joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
  }

  async createCommunity(creatorId: string, data: CreateCommunityDTO): Promise<Community> {
    const communityId = uuidv4();

    const community: Community = {
      id: communityId,
      name: data.name,
      slug: data.slug,
      description: data.description,
      topic: data.topic,
      isPrivate: data.isPrivate || false,
      rules: data.rules,
      creatorId,
      membersCount: 1,
      postsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.communities.unshift(community);

    // Adicionar criador como admin
    this.members[communityId] = [
      {
        userId: creatorId,
        communityId,
        role: MemberRole.CREATOR,
        joinedAt: new Date().toISOString(),
      },
    ];

    return community;
  }

  async getCommunities(filters?: {
    topic?: CommunityTopic;
    search?: string;
    onlyPublic?: boolean;
  }): Promise<Community[]> {
    let filteredCommunities = [...this.communities];

    if (filters?.topic) {
      filteredCommunities = filteredCommunities.filter(
        (c) => c.topic === filters.topic
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredCommunities = filteredCommunities.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.onlyPublic) {
      filteredCommunities = filteredCommunities.filter((c) => !c.isPrivate);
    }

    return filteredCommunities;
  }

  async getCommunityById(id: string): Promise<Community | null> {
    const community = this.communities.find((c) => c.id === id);
    return community || null;
  }

  async updateCommunity(
    id: string,
    updates: Partial<CreateCommunityDTO>
  ): Promise<Community | null> {
    const community = this.communities.find((c) => c.id === id);

    if (!community) {
      return null;
    }

    Object.assign(community, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    return community;
  }

  async deleteCommunity(id: string): Promise<boolean> {
    const index = this.communities.findIndex((c) => c.id === id);

    if (index === -1) {
      return false;
    }

    this.communities.splice(index, 1);
    delete this.members[id];

    return true;
  }

  // Gerenciamento de membros

  async joinCommunity(communityId: string, userId: string): Promise<boolean> {
    const community = await this.getCommunityById(communityId);

    if (!community) {
      return false;
    }

    if (!this.members[communityId]) {
      this.members[communityId] = [];
    }

    // Verificar se já é membro
    const isMember = this.members[communityId].some((m) => m.userId === userId);
    if (isMember) {
      return false;
    }

    const member: CommunityMember = {
      userId,
      communityId,
      role: MemberRole.MEMBER,
      joinedAt: new Date().toISOString(),
    };

    this.members[communityId].push(member);
    community.membersCount++;

    return true;
  }

  async leaveCommunity(communityId: string, userId: string): Promise<boolean> {
    const community = await this.getCommunityById(communityId);

    if (!community || !this.members[communityId]) {
      return false;
    }

    const memberIndex = this.members[communityId].findIndex(
      (m) => m.userId === userId
    );

    if (memberIndex === -1) {
      return false;
    }

    // Não permitir que o criador saia
    const member = this.members[communityId][memberIndex];
    if (member.role === MemberRole.CREATOR && community.creatorId === userId) {
      return false;
    }

    this.members[communityId].splice(memberIndex, 1);
    community.membersCount = Math.max(0, community.membersCount - 1);

    return true;
  }

  async getMembers(communityId: string): Promise<CommunityMember[]> {
    return this.members[communityId] || [];
  }

  async isMember(communityId: string, userId: string): Promise<boolean> {
    if (!this.members[communityId]) {
      return false;
    }

    return this.members[communityId].some((m) => m.userId === userId);
  }

  async getMemberRole(
    communityId: string,
    userId: string
  ): Promise<MemberRole | null> {
    if (!this.members[communityId]) {
      return null;
    }

    const member = this.members[communityId].find((m) => m.userId === userId);
    return member ? member.role : null;
  }

  async updateMemberRole(
    communityId: string,
    userId: string,
    newRole: MemberRole
  ): Promise<boolean> {
    if (!this.members[communityId]) {
      return false;
    }

    const member = this.members[communityId].find((m) => m.userId === userId);

    if (!member) {
      return false;
    }

    member.role = newRole;
    return true;
  }

  async getUserCommunities(userId: string): Promise<Community[]> {
    const userCommunityIds = Object.entries(this.members)
      .filter(([_, members]) => members.some((m) => m.userId === userId))
      .map(([communityId]) => communityId);

    return this.communities.filter((c) => userCommunityIds.includes(c.id));
  }
}

export default new CommunityService();
