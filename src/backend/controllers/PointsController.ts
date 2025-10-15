import { Request, Response } from 'express';
import { PointsService } from '../services/PointsService';

export class PointsController {
  private pointsService: PointsService;

  constructor() {
    this.pointsService = new PointsService();
  }

  // GET /api/users/:userId/points - Buscar pontos de um usuário específico
  async getUserPoints(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      console.log(`🏆 Buscando pontos do usuário: ${userId}`);
      
      const userPoints = await this.pointsService.getUserPoints(userId);
      
      res.status(200).json({
        success: true,
        data: userPoints,
        message: 'Pontos do usuário carregados com sucesso'
      });
    } catch (error) {
      console.error('❌ Erro ao buscar pontos do usuário:', error);
      res.status(500).json({
        success: false,
        data: null,
        message: 'Erro interno do servidor ao buscar pontos'
      });
    }
  }

  // GET /api/users/me/points - Buscar pontos do usuário logado
  async getMyPoints(req: Request, res: Response): Promise<void> {
    try {
      console.log('🏆 Buscando meus pontos...');
      
      const userPoints = await this.pointsService.getMyPoints();
      
      res.status(200).json({
        success: true,
        data: userPoints,
        message: 'Seus pontos carregados com sucesso'
      });
    } catch (error) {
      console.error('❌ Erro ao buscar meus pontos:', error);
      res.status(500).json({
        success: false,
        data: null,
        message: 'Erro interno do servidor ao buscar pontos'
      });
    }
  }

  // POST /api/points/award - Dar pontos para um usuário
  async awardPoints(req: Request, res: Response): Promise<void> {
    try {
      const { userId, type, description, points } = req.body;
      
      // Validações básicas
      if (!userId || !type || !description || !points) {
        res.status(400).json({
          success: false,
          data: null,
          message: 'UserId, type, description e points são obrigatórios'
        });
        return;
      }

      if (points <= 0) {
        res.status(400).json({
          success: false,
          data: null,
          message: 'Points deve ser um número positivo'
        });
        return;
      }

      console.log(`🎯 Dando ${points} pontos para ${userId}: ${description}`);
      
      const updatedPoints = await this.pointsService.awardPoints(userId, type, description, points);
      
      res.status(200).json({
        success: true,
        data: updatedPoints,
        message: `${points} pontos adicionados com sucesso`
      });
    } catch (error) {
      console.error('❌ Erro ao dar pontos:', error);
      res.status(500).json({
        success: false,
        data: null,
        message: 'Erro interno do servidor ao dar pontos'
      });
    }
  }
}
