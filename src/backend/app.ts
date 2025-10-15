import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

// Carregar variáveis de ambiente
dotenv.config({ path: './src/backend/.env' });

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  private middlewares(): void {
    // Middleware para parsing de JSON
    this.express.use(express.json({ limit: '10mb' }));
    this.express.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Configurações de CORS
    const corsOptions = {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
      optionsSuccessStatus: 200
    };
    this.express.use(cors(corsOptions));

    // Middleware de logging básico
    this.express.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }

  private routes(): void {
    // Rota de health check na raiz
    this.express.get('/', (req, res) => {
      res.json({
        message: 'PedagoPass API',
        status: 'running',
        version: '1.0.0'
      });
    });

    // Rotas da API
    this.express.use('/api', routes);
  }

  private errorHandler(): void {
    // Middleware de tratamento de erros
    this.express.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Error:', err.message);
      console.error('Stack:', err.stack);
      
      res.status(500).json({
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
      });
    });

    // Middleware para rotas não encontradas
    this.express.use((req, res) => {
      res.status(404).json({
        message: 'Rota não encontrada',
        path: req.originalUrl
      });
    });
  }
}

export default new App().express;
