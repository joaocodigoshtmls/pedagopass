import { Request, Response } from 'express';
import { PostService } from '../services/PostService';
import { PointsService } from '../services/PointsService';

export class PostController {
  private postService: PostService;
  private pointsService: PointsService;

  constructor() {
    this.postService = new PostService();
    this.pointsService = new PointsService();
  }

  // GET /api/posts - Listar todos os posts
  async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      console.log('📋 Buscando todos os posts...');
      const posts = await this.postService.getAllPosts();
      
      res.status(200).json({
        success: true,
        data: posts,
        message: 'Posts carregados com sucesso',
        total: posts.length
      });
    } catch (error) {
      console.error('❌ Erro ao buscar posts:', error);
      res.status(500).json({
        success: false,
        data: null,
        message: 'Erro interno do servidor ao buscar posts'
      });
    }
  }

  // GET /api/posts/:id - Buscar post por ID
  async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      console.log(`📋 Buscando post por ID: ${id}`);
      
      const post = await this.postService.getPostById(id);
      
      if (!post) {
        res.status(404).json({
          success: false,
          data: null,
          message: 'Post não encontrado'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: post,
        message: 'Post encontrado com sucesso'
      });
    } catch (error) {
      console.error('❌ Erro ao buscar post por ID:', error);
      res.status(500).json({
        success: false,
        data: null,
        message: 'Erro interno do servidor ao buscar post'
      });
    }
  }

  // POST /api/posts - Criar novo post
  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, location, images } = req.body;
      
      // Validações básicas
      if (!title || !content || !location) {
        res.status(400).json({
          success: false,
          data: null,
          message: 'Título, conteúdo e localização são obrigatórios'
        });
        return;
      }

      console.log('📝 Criando novo post:', { title, location });
      
      // Para agora, vamos usar um userId mockado
      // Em produção, isso viria do token JWT
      const userId = 'user-1';
      
      const postData = {
        title,
        content,
        location,
        images: images || [],
        userId
      };

      const newPost = await this.postService.createPost(postData);
      
      // Dar pontos para o usuário por criar um post
      await this.pointsService.awardPoints(userId, 'post', `Post: ${title}`, 5);
      
      res.status(201).json({
        success: true,
        data: newPost,
        message: 'Post criado com sucesso'
      });
    } catch (error) {
      console.error('❌ Erro ao criar post:', error);
      res.status(500).json({
        success: false,
        data: null,
        message: 'Erro interno do servidor ao criar post'
      });
    }
  }

  // POST /api/posts/:id/like - Curtir/descurtir post
  async toggleLikePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      // Para agora, vamos usar um userId mockado
      // Em produção, isso viria do token JWT
      const userId = 'user-1';
      
      console.log(`👍 Toggling like no post ${id} pelo usuário ${userId}`);
      
      const result = await this.postService.toggleLikePost(id, userId);
      
      // Dar pontos se curtiu (não descurtiu)
      if (result.liked) {
        await this.pointsService.awardPoints(userId, 'like', 'Curtida em post', 1);
      }
      
      res.status(200).json({
        success: true,
        data: result,
        message: result.liked ? 'Post curtido com sucesso' : 'Curtida removida com sucesso'
      });
    } catch (error) {
      console.error('❌ Erro ao curtir post:', error);
      res.status(500).json({
        success: false,
        data: null,
        message: 'Erro interno do servidor ao curtir post'
      });
    }
  }

  // GET /api/posts/user/:userId - Buscar posts por usuário
  async getPostsByUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      console.log(`📋 Buscando posts do usuário: ${userId}`);
      
      const posts = await this.postService.getPostsByUser(userId);
      
      res.status(200).json({
        success: true,
        data: posts,
        message: 'Posts do usuário carregados com sucesso',
        total: posts.length
      });
    } catch (error) {
      console.error('❌ Erro ao buscar posts do usuário:', error);
      res.status(500).json({
        success: false,
        data: null,
        message: 'Erro interno do servidor ao buscar posts do usuário'
      });
    }
  }
}
