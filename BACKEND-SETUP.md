# 🚀 Como Iniciar o Backend do PedagoPass

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm instalado
- Dependências do projeto instaladas (`npm install`)

## 🎯 Opções para Executar o Backend

### Opção 1: Apenas Backend
```bash
npm run backend
```
- Inicia apenas o servidor backend na porta 3001
- Útil para desenvolvimento focado no backend
- Permite debugs específicos da API

### Opção 2: Frontend + Backend Simultaneamente
```bash
npm run dev:full
```
- Inicia tanto o frontend (porta 3000) quanto o backend (porta 3001)
- Útil para desenvolvimento full-stack
- Logs coloridos separados por serviço

### Opção 3: Separados em Terminais
**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run backend
```

## 🌐 URLs de Teste

Após iniciar o backend, você pode testar:

- **API Status**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/hello
- **Destinos API**: http://localhost:3001/api/destinos

## 📝 Exemplo de Resposta da API

**GET http://localhost:3001/api/hello**
```json
{
  "message": "Backend do PedagoPass funcionando!",
  "status": "success",
  "timestamp": "2025-09-10T18:42:47.233Z",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/hello",
    "destinos": "/api/destinos",
    "users": "/api/users"
  }
}
```

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run backend` | Inicia apenas o backend |
| `npm run dev:backend` | Alias para backend |
| `npm run dev:full` | Frontend + Backend juntos |
| `npm run build:backend` | Compila TypeScript |
| `npm run start:backend` | Inicia versão compilada |

## 🐛 Troubleshooting

### Porta em Uso
Se a porta 3001 estiver em uso:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F

# Ou altere a porta no arquivo .env
PORT=3002
```

### Logs do Backend
O backend inclui logs automáticos:
```
🚀 Backend PedagoPass iniciado!
🚀 Porta: 3001
2025-09-10T18:42:47.233Z - GET /api/hello
```

## 📂 Estrutura de Arquivos Backend

```
src/backend/
├── app.ts                 # App Express principal
├── server.ts              # Servidor HTTP
├── controllers/           # Lógica dos endpoints
├── routes/                # Definição das rotas
├── models/                # Modelos de dados
├── services/              # Lógica de negócio
├── .env.example           # Exemplo de configuração
└── README.md              # Documentação detalhada
```

## ✅ Verificação Rápida

1. **Instalar dependências**: `npm install`
2. **Iniciar backend**: `npm run backend`
3. **Testar API**: Abrir http://localhost:3001/api/hello
4. **Sucesso**: Deve retornar JSON com "Backend do PedagoPass funcionando!"

## 🎉 Próximos Passos

- ✅ Backend básico funcionando
- ⏳ Integração com banco de dados
- ⏳ Autenticação JWT
- ⏳ Validação de dados
- ⏳ Testes automatizados
