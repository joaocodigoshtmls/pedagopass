import { Request, Response } from 'express';
import communityService from '../services/CommunityService';
import { CreateCommunityDTO, UpdateCommunityDTO, MemberRole } from '../../shared/types/community.types';

export class CommunityController {
  /**
   * GET /api/communities
   * Buscar todas as comunidades (com filtros opcionais)
   */
  async getCommunities(req: Request, res: Response): Promise<void> {
    try {
      const { topic, search, onlyPublic } = req.query;

      const filters: any = {};
      if (topic) filters.topic = topic as string;
      if (search) filters.search = search as string;
      if (onlyPublic === 'true') filters.onlyPublic = true;

      const communities = await communityService.getCommunities(filters);

      res.status(200).json({
        success: true,
        data: communities,
        count: communities.length,
      });
    } catch (error) {
      console.error('Erro ao buscar comunidades:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar comunidades',
      });
    }
  }

  /**
   * GET /api/communities/:id
   * Buscar comunidade por ID
   */
  async getCommunityById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const community = await communityService.getCommunityById(id);

      if (!community) {
        res.status(404).json({
          success: false,
          message: 'Comunidade não encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: community,
      });
    } catch (error) {
      console.error('Erro ao buscar comunidade:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar comunidade',
      });
    }
  }

  /**
   * POST /api/communities
   * Criar nova comunidade
   */
  async createCommunity(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
        return;
      }

      const communityData: CreateCommunityDTO = req.body;

      // Validação básica
      if (!communityData.name || !communityData.slug || !communityData.description || !communityData.topic) {
        res.status(400).json({
          success: false,
          message: 'Campos obrigatórios: name, slug, description, topic',
        });
        return;
      }

      const community = await communityService.createCommunity(userId, communityData);

      res.status(201).json({
        success: true,
        data: community,
        message: 'Comunidade criada com sucesso',
      });
    } catch (error) {
      console.error('Erro ao criar comunidade:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar comunidade',
      });
    }
  }

  /**
   * PUT /api/communities/:id
   * Atualizar comunidade (apenas criador ou moderadores)
   */
  async updateCommunity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
        return;
      }

      // Verificar se usuário tem permissão
      const memberRole = await communityService.getMemberRole(id, userId);
      if (memberRole !== MemberRole.CREATOR && memberRole !== MemberRole.MODERATOR) {
        res.status(403).json({
          success: false,
          message: 'Sem permissão para editar esta comunidade',
        });
        return;
      }

      const updates: UpdateCommunityDTO = req.body;
      const updated = await communityService.updateCommunity(id, updates);

      if (!updated) {
        res.status(404).json({
          success: false,
          message: 'Comunidade não encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: updated,
        message: 'Comunidade atualizada com sucesso',
      });
    } catch (error) {
      console.error('Erro ao atualizar comunidade:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar comunidade',
      });
    }
  }

  /**
   * DELETE /api/communities/:id
   * Deletar comunidade (apenas criador)
   */
  async deleteCommunity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
        return;
      }

      const community = await communityService.getCommunityById(id);
      if (!community) {
        res.status(404).json({
          success: false,
          message: 'Comunidade não encontrada',
        });
        return;
      }

      // Apenas criador pode deletar
      if (community.creatorId !== userId) {
        res.status(403).json({
          success: false,
          message: 'Apenas o criador pode deletar a comunidade',
        });
        return;
      }

      const deleted = await communityService.deleteCommunity(id);

      res.status(200).json({
        success: true,
        message: 'Comunidade deletada com sucesso',
      });
    } catch (error) {
      console.error('Erro ao deletar comunidade:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar comunidade',
      });
    }
  }

  /**
   * POST /api/communities/:id/join
   * Entrar em uma comunidade
   */
  async joinCommunity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
        return;
      }

      const community = await communityService.getCommunityById(id);
      if (!community) {
        res.status(404).json({
          success: false,
          message: 'Comunidade não encontrada',
        });
        return;
      }

      // Verificar se já é membro
      const isMember = await communityService.isMember(id, userId);
      if (isMember) {
        res.status(400).json({
          success: false,
          message: 'Você já é membro desta comunidade',
        });
        return;
      }

      const member = await communityService.joinCommunity(id, userId);

      res.status(200).json({
        success: true,
        data: member,
        message: 'Você entrou na comunidade',
      });
    } catch (error) {
      console.error('Erro ao entrar na comunidade:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao entrar na comunidade',
      });
    }
  }

  /**
   * POST /api/communities/:id/leave
   * Sair de uma comunidade
   */
  async leaveCommunity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
        return;
      }

      const success = await communityService.leaveCommunity(id, userId);

      if (!success) {
        res.status(400).json({
          success: false,
          message: 'Não foi possível sair da comunidade (criador não pode sair)',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Você saiu da comunidade',
      });
    } catch (error) {
      console.error('Erro ao sair da comunidade:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao sair da comunidade',
      });
    }
  }

  /**
   * GET /api/communities/:id/members
   * Listar membros da comunidade
   */
  async getMembers(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const community = await communityService.getCommunityById(id);
      if (!community) {
        res.status(404).json({
          success: false,
          message: 'Comunidade não encontrada',
        });
        return;
      }

      const members = await communityService.getMembers(id);

      res.status(200).json({
        success: true,
        data: members,
        count: members.length,
      });
    } catch (error) {
      console.error('Erro ao listar membros:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao listar membros',
      });
    }
  }

  /**
   * GET /api/communities/user/:userId
   * Listar comunidades de um usuário
   */
  async getUserCommunities(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      const communities = await communityService.getUserCommunities(userId);

      res.status(200).json({
        success: true,
        data: communities,
        count: communities.length,
      });
    } catch (error) {
      console.error('Erro ao listar comunidades do usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao listar comunidades do usuário',
      });
    }
  }

  /**
   * PUT /api/communities/:id/members/:userId/role
   * Atualizar role de um membro (apenas criador e moderadores)
   */
  async updateMemberRole(req: Request, res: Response): Promise<void> {
    try {
      const { id, userId: targetUserId } = req.params;
      const { role } = req.body;
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
        return;
      }

      // Verificar permissão do usuário atual
      const currentUserRole = await communityService.getMemberRole(id, userId);
      if (currentUserRole !== MemberRole.CREATOR && currentUserRole !== MemberRole.MODERATOR) {
        res.status(403).json({
          success: false,
          message: 'Sem permissão para alterar roles',
        });
        return;
      }

      // Validar role
      if (!Object.values(MemberRole).includes(role)) {
        res.status(400).json({
          success: false,
          message: 'Role inválido',
        });
        return;
      }

      const success = await communityService.updateMemberRole(id, targetUserId, role);

      if (!success) {
        res.status(400).json({
          success: false,
          message: 'Não foi possível atualizar role',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Role atualizado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao atualizar role:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar role',
      });
    }
  }
}
