import { Request, Response } from 'express';
import PostService from '../services/PostService';
import { PointsService } from '../services/PointsService';
import {
  CreatePostDTO,
  UpdatePostDTO,
  PostFilters,
  PostsResponse,
} from '../../shared/types';

class PostController {
  public getPosts = async (req: Request, res: Response): Promise<Response> => {
    try {
      const filters: PostFilters = {
        communityId: req.query.communityId as string,
        destinationId: req.query.destinationId as string,
        authorId: req.query.authorId as string,
        tag: req.query.tag as string,
        search: req.query.search as string,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
        sortBy: (req.query.sortBy as 'recent' | 'popular') || 'recent',
      };

      const result = await PostService.getPosts(filters);

      const response: PostsResponse = {
        success: true,
        posts: result.posts,
        total: result.total,
        hasMore: result.hasMore,
        nextOffset: result.hasMore ? (filters.offset || 0) + (filters.limit || 20) : undefined,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      return res.status(500).json({
        success: false,
        posts: [],
        total: 0,
        hasMore: false,
      });
    }
  };

  public getPostById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const post = await PostService.getPostById(id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post não encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        post,
      });
    } catch (error) {
      console.error('Erro ao buscar post:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar post',
      });
    }
  };

  public createPost = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
      }

      const authorId = req.user.userId;
      const files = req.files as Express.Multer.File[] | undefined;

      const createDTO: CreatePostDTO = {
        content: req.body.content,
        communityId: req.body.communityId,
        destinationId: req.body.destinationId,
        tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags ? JSON.parse(req.body.tags) : []),
      };

      if (!createDTO.content || createDTO.content.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Conteúdo do post não pode estar vazio',
        });
      }

      const post = await PostService.createPost(authorId, createDTO, files);

      // Adicionar pontos será implementado quando o PointsService estiver completo
      // const pointsService = new PointsService();
      // await pointsService.addPoints(authorId, 'POST_CREATE');

      return res.status(201).json({
        success: true,
        post,
        message: 'Post criado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao criar post:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar post',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  };

  public updatePost = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
      }

      const { id } = req.params;
      const updateDTO: UpdatePostDTO = {
        content: req.body.content,
        tags: req.body.tags,
      };

      const post = await PostService.updatePost(id, req.user.userId, updateDTO);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post não encontrado ou você não tem permissão para editá-lo',
        });
      }

      return res.status(200).json({
        success: true,
        post,
        message: 'Post atualizado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar post',
      });
    }
  };

  public deletePost = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
      }

      const { id } = req.params;
      const success = await PostService.deletePost(id, req.user.userId);

      if (!success) {
        return res.status(404).json({
          success: false,
          message: 'Post não encontrado ou você não tem permissão para deletá-lo',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Post deletado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao deletar post',
      });
    }
  };

  public toggleLike = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
      }

      const { id } = req.params;
      const { liked, likesCount } = await PostService.toggleLike(id, req.user.userId);

      // Adicionar pontos será implementado quando o PointsService estiver completo
      // if (liked) {
      //   const pointsService = new PointsService();
      //   await pointsService.addPoints(req.user.userId, 'POST_LIKE');
      // }

      return res.status(200).json({
        success: true,
        liked,
        likesCount,
        message: liked ? 'Post curtido' : 'Curtida removida',
      });
    } catch (error) {
      console.error('Erro ao curtir post:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao processar curtida',
      });
    }
  };

  public addComment = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
      }

      const { id } = req.params;
      const { content, parentCommentId } = req.body;

      if (!content || content.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Conteúdo do comentário não pode estar vazio',
        });
      }

      const comment = await PostService.addComment(id, req.user.userId, content, parentCommentId);

      if (!comment) {
        return res.status(404).json({
          success: false,
          message: 'Post não encontrado',
        });
      }

      // Adicionar pontos será implementado quando o PointsService estiver completo
      // const pointsService = new PointsService();
      // await pointsService.addPoints(req.user.userId, 'COMMENT_CREATE');

      return res.status(201).json({
        success: true,
        comment,
        message: 'Comentário adicionado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao adicionar comentário',
      });
    }
  };

  public getComments = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const comments = await PostService.getComments(id);

      return res.status(200).json({
        success: true,
        comments,
        total: comments.length,
      });
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
      return res.status(500).json({
        success: false,
        comments: [],
        total: 0,
      });
    }
  };

  public deleteComment = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
      }

      const { id } = req.params;
      const success = await PostService.deleteComment(id, req.user.userId);

      if (!success) {
        return res.status(404).json({
          success: false,
          message: 'Comentário não encontrado ou você não tem permissão para deletá-lo',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Comentário deletado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao deletar comentário',
      });
    }
  };
}

export default new PostController();
