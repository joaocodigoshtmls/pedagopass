# PedagoPass Backend

Backend da aplicação PedagoPass desenvolvido em Node.js + TypeScript + Express.

## 🚀 Como Iniciar o Backend

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação das Dependências
```bash
npm install
```

### Iniciar o Servidor de Desenvolvimento
```bash
# Opção 1: Script completo
npm run dev:backend

# Opção 2: Script abreviado
npm run backend
```

### Compilar para Produção
```bash
# Compilar TypeScript para JavaScript
npm run build:backend

# Iniciar servidor de produção
npm run start:backend
```

## 📁 Estrutura do Backend

```
src/backend/
├── app.ts              # Configuração principal do Express
├── server.ts           # Inicialização do servidor
├── controllers/        # Controladores das rotas
│   ├── HelloController.ts
│   ├── UserController.ts
│   └── DestinoController.ts
├── models/             # Modelos de dados
│   ├── User.ts
│   └── Destino.ts
├── routes/             # Definição das rotas
│   └── index.ts
├── services/           # Lógica de negócio
│   ├── UserService.ts
│   └── DestinoService.ts
└── .env.example        # Exemplo de variáveis de ambiente
```

## 🛠️ Rotas Disponíveis

### Health Check
- `GET /` - Status da API
- `GET /api/hello` - Teste de funcionamento

### Destinos
- `GET /api/destinos` - Listar todos os destinos
- `GET /api/destinos/:id` - Buscar destino por ID

### Usuários (Em desenvolvimento)
- `POST /api/users/register` - Registrar usuário
- `POST /api/users/login` - Login de usuário

## 🔧 Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp src/backend/.env.example src/backend/.env
```

2. Configure as variáveis de ambiente conforme necessário:
```env
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## 🌐 URLs Importantes

- **Servidor Local**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/hello
- **API Destinos**: http://localhost:3001/api/destinos

## 📝 Desenvolvimento

### Executar Backend e Frontend Simultaneamente

Em terminais separados:

**Terminal 1 - Frontend (Next.js):**
```bash
npm run dev
```

**Terminal 2 - Backend (Express):**
```bash
npm run backend
```

### Scripts Disponíveis

- `npm run dev:backend` - Inicia o servidor em modo desenvolvimento
- `npm run backend` - Alias para dev:backend
- `npm run build:backend` - Compila TypeScript para JavaScript
- `npm run start:backend` - Inicia servidor compilado (produção)

## 🔍 Logs

O backend inclui logging automático das requisições:
```
2025-01-XX 10:30:00.000Z - GET /api/hello
2025-01-XX 10:30:15.000Z - GET /api/destinos
```

## 🛡️ Funcionalidades

- ✅ Servidor Express configurado
- ✅ TypeScript com configuração dedicada
- ✅ CORS configurado para o frontend
- ✅ Middleware de logging
- ✅ Tratamento de erros
- ✅ Health check endpoint
- ✅ Graceful shutdown
- ⏳ Autenticação JWT (futuro)
- ⏳ Banco de dados (futuro)
- ⏳ Validação de dados (futuro)
