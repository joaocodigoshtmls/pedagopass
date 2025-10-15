import { Router } from 'express';
import HelloController from '../controllers/HelloController';
import UserController from '../controllers/UserController';
import DestinoController from '../controllers/DestinoController';
import PostController from '../controllers/PostController';
import { PointsController } from '../controllers/PointsController';
import SuggestionsController from '../controllers/SuggestionsController';
import AuthController from '../controllers/AuthController';
import { CommunityController } from '../controllers/CommunityController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { uploadPostMedia, handleUploadError } from '../middlewares/uploadMiddleware';

const router = Router();

// CORS middleware para desenvolvimento
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Rota de teste
router.get('/hello', HelloController.hello);

// ========================================
// Rotas de Autenticação (públicas)
// ========================================
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);
router.get('/auth/validate', AuthController.validateToken);

// Rotas de autenticação protegidas
router.get('/auth/me', authMiddleware, AuthController.getMe);

// ========================================
// Rotas de usuários (legado - manter por compatibilidade)
// ========================================
router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);
router.put('/users/profile', UserController.updateProfile);

// Rotas de destinos
router.get('/destinos', DestinoController.index);
router.get('/destinos/:id', DestinoController.show);

// Instanciar controllers
const pointsController = new PointsController();
const communityController = new CommunityController();

// Rotas de posts
router.get('/posts', PostController.getPosts);
router.get('/posts/:id', PostController.getPostById);
router.post('/posts', authMiddleware, uploadPostMedia, handleUploadError, PostController.createPost);
router.put('/posts/:id', authMiddleware, PostController.updatePost);
router.delete('/posts/:id', authMiddleware, PostController.deletePost);
router.post('/posts/:id/like', authMiddleware, PostController.toggleLike);
router.post('/posts/:id/comments', authMiddleware, PostController.addComment);
router.get('/posts/:id/comments', PostController.getComments);
router.delete('/comments/:id', authMiddleware, PostController.deleteComment);

// Rotas de pontos
router.get('/users/:userId/points', (req, res) => pointsController.getUserPoints(req, res));
router.get('/users/me/points', (req, res) => pointsController.getMyPoints(req, res));
router.post('/points/award', (req, res) => pointsController.awardPoints(req, res));

// Rotas de sugestões (formulário de professores)
router.post('/suggestions', (req, res) => SuggestionsController.create(req, res));
router.get('/suggestions', (req, res) => SuggestionsController.list(req, res));

// ========================================
// Rotas de Comunidades
// ========================================
// Rotas públicas
router.get('/communities', (req, res) => communityController.getCommunities(req, res));
router.get('/communities/user/:userId', (req, res) => communityController.getUserCommunities(req, res));
router.get('/communities/:id', (req, res) => communityController.getCommunityById(req, res));
router.get('/communities/:id/members', (req, res) => communityController.getMembers(req, res));

// Rotas protegidas (requer autenticação)
router.post('/communities', authMiddleware, (req, res) => communityController.createCommunity(req, res));
router.put('/communities/:id', authMiddleware, (req, res) => communityController.updateCommunity(req, res));
router.delete('/communities/:id', authMiddleware, (req, res) => communityController.deleteCommunity(req, res));
router.post('/communities/:id/join', authMiddleware, (req, res) => communityController.joinCommunity(req, res));
router.post('/communities/:id/leave', authMiddleware, (req, res) => communityController.leaveCommunity(req, res));
router.put('/communities/:id/members/:userId/role', authMiddleware, (req, res) => communityController.updateMemberRole(req, res));

export default router;
