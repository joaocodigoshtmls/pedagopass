import app from './app';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: './src/backend/.env' });

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log('🚀 ================================');
  console.log(`🚀 Backend PedagoPass iniciado!`);
  console.log(`🚀 Porta: ${port}`);
  console.log(`🚀 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🚀 URL: http://localhost:${port}`);
  console.log(`🚀 Health Check: http://localhost:${port}/api/hello`);
  console.log('🚀 ================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

export default server;
