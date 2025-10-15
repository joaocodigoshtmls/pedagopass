import { Router } from 'express';
import HelloController from '../controllers/HelloController';
import UserController from '../controllers/UserController';
import DestinoController from '../controllers/DestinoController';
import { PostController } from '../controllers/PostController';
import { PointsController } from '../controllers/PointsController';
import SuggestionsController from '../controllers/SuggestionsController';

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

// Rotas de usuários
router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);
router.put('/users/profile', UserController.updateProfile);

// Rotas de destinos
router.get('/destinos', DestinoController.index);
router.get('/destinos/:id', DestinoController.show);

// Instanciar controllers
const postController = new PostController();
const pointsController = new PointsController();

// Rotas de posts
router.get('/posts', (req, res) => postController.getAllPosts(req, res));
router.get('/posts/:id', (req, res) => postController.getPostById(req, res));
router.post('/posts', (req, res) => postController.createPost(req, res));
router.post('/posts/:id/like', (req, res) => postController.toggleLikePost(req, res));
router.get('/posts/user/:userId', (req, res) => postController.getPostsByUser(req, res));

// Rotas de pontos
router.get('/users/:userId/points', (req, res) => pointsController.getUserPoints(req, res));
router.get('/users/me/points', (req, res) => pointsController.getMyPoints(req, res));
router.post('/points/award', (req, res) => pointsController.awardPoints(req, res));

// Rotas de sugestões (formulário de professores)
router.post('/suggestions', (req, res) => SuggestionsController.create(req, res));
router.get('/suggestions', (req, res) => SuggestionsController.list(req, res));

export default router;
