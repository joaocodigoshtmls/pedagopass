import { v4 as uuidv4 } from 'uuid';

export interface UserPoints {
  userId: string;
  totalPoints: number;
  level: 'Bronze' | 'Silver' | 'Gold';
  nextLevelPoints: number;
  activities: PointActivity[];
}

export interface PointActivity {
  id: string;
  type: 'post' | 'like' | 'comment' | 'community_join' | 'travel_complete';
  description: string;
  points: number;
  createdAt: string;
}

export class PointsService {
  // Simular banco de dados de pontos dos usuários
  private userPointsData: { [userId: string]: UserPoints } = {
    'user-1': {
      userId: 'user-1',
      totalPoints: 1250,
      level: 'Gold',
      nextLevelPoints: 0, // Já está no nível máximo
      activities: [
        {
          id: '1',
          type: 'post',
          description: 'Post sobre viagem para Paris',
          points: 5,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          type: 'community_join',
          description: 'Ingressou na comunidade "Professores de História"',
          points: 15,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          type: 'like',
          description: 'Curtiu post sobre Roma',
          points: 1,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '4',
          type: 'travel_complete',
          description: 'Completou viagem para Londres',
          points: 50,
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  };

  async getUserPoints(userId: string): Promise<UserPoints> {
    if (!this.userPointsData[userId]) {
      // Criar perfil inicial para usuário novo
      this.userPointsData[userId] = {
        userId,
        totalPoints: 0,
        level: 'Bronze',
        nextLevelPoints: 500,
        activities: []
      };
    }

    return this.userPointsData[userId];
  }

  async awardPoints(
    userId: string, 
    type: PointActivity['type'], 
    description: string, 
    points: number
  ): Promise<UserPoints> {
    let userPoints = await this.getUserPoints(userId);

    // Criar nova atividade
    const newActivity: PointActivity = {
      id: uuidv4(),
      type,
      description,
      points,
      createdAt: new Date().toISOString()
    };

    // Atualizar pontos totais
    userPoints.totalPoints += points;
    
    // Recalcular nível
    userPoints.level = this.calculateLevel(userPoints.totalPoints);
    userPoints.nextLevelPoints = this.calculateNextLevelPoints(userPoints.totalPoints);
    
    // Adicionar atividade (manter apenas as últimas 50)
    userPoints.activities.unshift(newActivity);
    if (userPoints.activities.length > 50) {
      userPoints.activities = userPoints.activities.slice(0, 50);
    }

    // Salvar alterações
    this.userPointsData[userId] = userPoints;
    
    console.log(`🎆 Usuário ${userId} ganhou ${points} pontos: ${description}`);
    
    return userPoints;
  }

  private calculateLevel(points: number): 'Bronze' | 'Silver' | 'Gold' {
    if (points >= 1000) return 'Gold';
    if (points >= 500) return 'Silver';
    return 'Bronze';
  }

  private calculateNextLevelPoints(points: number): number {
    if (points < 500) return 500 - points; // Para Silver
    if (points < 1000) return 1000 - points; // Para Gold
    return 0; // Já está no nível máximo
  }

  // Método para buscar pontos do usuário logado (simulado)
  async getMyPoints(): Promise<UserPoints> {
    // Por agora, retornar dados do user-1
    // Em produção, isso viria do token JWT
    return this.getUserPoints('user-1');
  }
}