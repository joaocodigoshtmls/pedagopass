import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { RegisterDTO, LoginDTO } from '../models/User';

class AuthController {
  /**
   * POST /api/auth/register
   * Registra um novo usuário e retorna token em cookie HttpOnly
   */
  public register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data: RegisterDTO = req.body;

      // Registrar usuário
      const { user, token } = await AuthService.register(data);

      // Setar cookie HttpOnly com o token
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true em produção (HTTPS)
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias em milissegundos
      });

      return res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso',
        user,
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Erro ao registrar usuário';
      
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
  };

  /**
   * POST /api/auth/login
   * Faz login e retorna token em cookie HttpOnly
   */
  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data: LoginDTO = req.body;

      // Fazer login
      const { user, token } = await AuthService.login(data);

      // Setar cookie HttpOnly com o token
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      });

      return res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        user,
      });
    } catch (error) {
      console.error('Erro no login:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login';
      
      return res.status(401).json({
        success: false,
        message: errorMessage,
      });
    }
  };

  /**
   * POST /api/auth/logout
   * Remove o cookie de autenticação
   */
  public logout = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Limpar cookie
      res.clearCookie('auth_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso',
      });
    } catch (error) {
      console.error('Erro no logout:', error);
      
      return res.status(500).json({
        success: false,
        message: 'Erro ao fazer logout',
      });
    }
  };

  /**
   * GET /api/auth/me
   * Retorna dados do usuário autenticado (requer authMiddleware)
   */
  public getMe = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado',
        });
      }

      // Buscar dados completos do usuário
      const user = AuthService.getUserById(req.user.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar dados do usuário',
      });
    }
  };

  /**
   * GET /api/auth/validate
   * Valida se o token do cookie é válido
   */
  public validateToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = req.cookies?.auth_token;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token não fornecido',
        });
      }

      const payload = AuthService.validateToken(token);

      if (!payload) {
        return res.status(401).json({
          success: false,
          message: 'Token inválido ou expirado',
        });
      }

      // Buscar usuário
      const user = AuthService.getUserById(payload.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Token válido',
        user,
      });
    } catch (error) {
      console.error('Erro ao validar token:', error);
      
      return res.status(500).json({
        success: false,
        message: 'Erro ao validar token',
      });
    }
  };
}

export default new AuthController();
