# PedagoPass - Plataforma de Viagens Educacionais

Uma plataforma completa para professores explorarem viagens educacionais, com frontend Next.js e backend Node.js/Express.

## 🚀 Tecnologias

### Frontend
- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de CSS utilitário
- **React Hooks** - useState, useEffect para gerenciamento de estado

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **CORS** - Política de origem cruzada
- **dotenv** - Variáveis de ambiente

## 📁 Estrutura do Projeto

```
TCC_PedagoPass/
├── src/
│   ├── components/          # Componentes React reutilizáveis
│   │   ├── Layout.tsx      # Layout principal com Navbar/Footer
│   │   ├── Navbar.tsx      # Barra de navegação
│   │   └── Footer.tsx      # Rodapé
│   ├── pages/              # Páginas do Next.js
│   │   ├── index.tsx       # Página inicial
│   │   ├── destinos/       # Páginas de destinos
│   │   │   ├── index.tsx   # Lista de destinos
│   │   │   └── [id].tsx    # Detalhes do destino
│   │   ├── sobre.tsx       # Página sobre
│   │   └── _app.tsx        # App wrapper
│   ├── services/           # Serviços de API
│   │   └── destinoService.ts # Chamadas para API de destinos
│   ├── types/              # Definições TypeScript
│   │   └── destino.ts      # Interface Destino
│   ├── styles/             # Estilos globais
│   │   └── globals.css     # CSS global + Tailwind
│   └── backend/            # Backend Node.js/Express
│       ├── server.ts       # Servidor principal
│       ├── app.ts          # Configuração Express
│       ├── controllers/    # Controladores de rotas
│       ├── routes/         # Definições de rotas
│       ├── services/       # Serviços de negócio
│       ├── models/         # Modelos de dados
│       └── data/           # Dados mockados (JSON)
└── BACKEND-SETUP.md        # Documentação do backend
```

## 🎯 Funcionalidades

### Frontend
- ✅ **Página Inicial**: Hero section, cards de destaque, depoimentos
- ✅ **Lista de Destinos**: Cards com informações, filtros, busca
- ✅ **Detalhes do Destino**: Informações completas, professor, itinerário
- ✅ **Página Sobre**: Informações sobre a plataforma
- ✅ **Navegação**: Navbar responsiva com links para todas as páginas
- ✅ **Layout Responsivo**: Totalmente adaptado para mobile/desktop

### Backend API
- ✅ **GET /api/destinos**: Lista todos os destinos
- ✅ **GET /api/destinos/:id**: Detalhes de um destino específico
- ✅ **Filtros**: Busca por categoria, preço máximo, termo de busca
- ✅ **CORS**: Configurado para desenvolvimento
- ✅ **Logs**: Sistema de logging detalhado
- ✅ **Health Check**: Rota para verificar status

### Integração Frontend + Backend
- ✅ **Serviço de API**: Camada abstrata para comunicação
- ✅ **Fallback**: Dados mock em caso de erro na API
- ✅ **Loading States**: Estados de carregamento em todas as páginas
- ✅ **Error Handling**: Tratamento de erros robusto
- ✅ **TypeScript**: Tipagem consistente em todo o projeto

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd TCC_PedagoPass

# Instalar dependências
npm install
```

### Execução - Projeto Completo (Recomendado)
```bash
# Rodar frontend + backend simultaneamente
npm run dev:full
```
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

### Execução - Separada
```bash
# Terminal 1 - Frontend apenas
npm run dev

# Terminal 2 - Backend apenas  
npm run backend
```

### Build do Backend
```bash
# Compilar TypeScript do backend
npm run build:backend

# Executar backend compilado
npm run start:backend
```

## 🧪 Testes de Integração

Acesse a página de testes em: http://localhost:3000/teste-integracao

Esta página permite testar:
- Carregamento da lista de destinos
- Carregamento de detalhes de destinos específicos
- Verificação da comunicação frontend-backend

## 📡 API Endpoints

### Base URL: `http://localhost:3001/api`

#### Destinos
```bash
# Listar todos os destinos
GET /destinos

# Buscar destinos (opcional)
GET /destinos?search=paris&categoria=cultural&precoMax=5000

# Detalhes de um destino
GET /destinos/1
```

#### Exemplo de Resposta
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "titulo": "Paris - Cidade da Luz",
      "descricao": "Explore os museus, arquitetura e história francesa...",
      "preco": 4500,
      "imagem": "https://...",
      "categoria": "Cultural",
      "dataInicio": "2025-03-15",
      "dataFim": "2025-03-22",
      "vagas": 20,
      "localizacao": "Paris, França",
      "professor": {
        "nome": "Dr. Ana Silva",
        "especialidade": "História da Arte",
        "bio": "Professora doutora..."
      }
    }
  ],
  "total": 1,
  "message": "Destinos carregados com sucesso"
}
```

## 🎨 Design e UX

- **Design System**: Baseado em Tailwind CSS
- **Cores**: Esquema azul profissional com toques de verde
- **Tipografia**: Font system nativa otimizada
- **Responsividade**: Mobile-first approach
- **Acessibilidade**: Estrutura semântica e contraste adequado

## 📝 Scripts NPM

```json
{
  "dev": "next dev",                    // Frontend desenvolvimento
  "backend": "npm run dev:backend",     // Backend desenvolvimento  
  "dev:full": "concurrently ...",      // Frontend + Backend
  "dev:backend": "ts-node ...",        // Backend TypeScript
  "build:backend": "tsc ...",          // Compilar backend
  "start:backend": "node ...",         // Executar backend compilado
  "build": "next build",               // Build frontend
  "start": "next start"                // Executar frontend produção
}
```

## 🔧 Configuração

### Variáveis de Ambiente

Criar arquivo `.env.local` no root:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### TypeScript

O projeto usa configurações separadas:
- `tsconfig.json` - Frontend (Next.js)
- `tsconfig.backend.json` - Backend (Node.js)

## 📚 Estrutura de Dados

### Interface Destino
```typescript
interface Destino {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  dataInicio: string;
  dataFim: string;
  vagas: number;
  localizacao: string;
  duracao: string;
  destaques: string[];
  inclui: string[];
  professor: {
    nome: string;
    especialidade: string;
    bio: string;
    foto: string;
  };
  itinerario: Array<{
    dia: number;
    titulo: string;
    atividades: string[];
  }>;
}
```

## 🚀 Próximos Passos

- [ ] Sistema de autenticação de usuários
- [ ] Reserva de viagens
- [ ] Painel administrativo
- [ ] Sistema de pagamentos
- [ ] Avaliações e comentários
- [ ] Notificações por email
- [ ] Deploy em produção

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido como TCC (Trabalho de Conclusão de Curso) focado em:
- Arquitetura fullstack moderna
- Boas práticas de desenvolvimento
- UX/UI profissional
- API RESTful bem documentada
- Código limpo e manutenível

---

**Desenvolvido com ❤️ para professores que querem transformar suas viagens em experiências educacionais únicas!**
