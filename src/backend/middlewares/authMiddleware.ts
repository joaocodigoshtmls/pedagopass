import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import { JWTPayload } from '../models/User';

// Estender o tipo Request do Express para incluir o usuário autenticado
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

/**
 * Middleware de autenticação
 * Verifica se existe um token JWT válido no cookie
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Buscar token do cookie
    const token = req.cookies?.auth_token;

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Autenticação necessária. Token não fornecido.',
      });
      return;
    }

    // Validar token
    const payload = AuthService.validateToken(token);

    if (!payload) {
      res.status(401).json({
        success: false,
        message: 'Token inválido ou expirado',
      });
      return;
    }

    // Adicionar dados do usuário na requisição
    req.user = payload;

    // Continuar para a próxima função
    next();
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao validar autenticação',
    });
  }
};

/**
 * Middleware opcional de autenticação
 * Se houver token válido, adiciona o usuário no request
 * Se não houver ou for inválido, continua sem erro
 */
export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies?.auth_token;

    if (token) {
      const payload = AuthService.validateToken(token);
      if (payload) {
        req.user = payload;
      }
    }

    next();
  } catch (error) {
    // Ignora erros e continua
    next();
  }
};
