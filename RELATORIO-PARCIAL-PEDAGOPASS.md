# RELATÓRIO PARCIAL - PEDAGOPASS
**Rede Social de Compartilhamento de Experiências de Viagem para Professores**

---

**Turma:** 3C  
**Bimestre:** 3º Bimestre  
**Integrantes| **Ana Luiza Baracat** | • **Frontend React/Next.js**<br>• Interface de usuário e experiência (UI/UX)<br>• Componentes React e estilização<br>• Design responsivo com Tailwind CSS<br>• Interatividade e validações<br>• Usabilidade e acessibilidade | 🔄 Em desenvolvimento |** Stefany Silva e Ana Luiza Baracat  
**Data:** 24 de setembro de 2025  

---

## 1. RESUMO DO PROJETO

### 1.1 Objetivo
O **PedagoPass** é um aplicativo de compartilhamento de experiências de viagem desenvolvido especificamente para professores. A plataforma funciona como uma **rede social educacional** onde educadores podem recomendar destinos, compartilhar experiências através de posts com fotos/vídeos, participar de comunidades temáticas e acumular pontos que podem ser trocados por benefícios em viagens. O objetivo principal é simplificar a vida dos professores na busca por destinos adequados, conectando-os a uma comunidade que compartilha recomendações e oferece benefícios exclusivos.

### 1.2 Público-alvo
- **Professores** de ensino fundamental, médio e superior
- **Coordenadores pedagógicos** e gestores educacionais
- **Instituições de ensino** interessadas em programas de capacitação
- **Profissionais da educação** em busca de desenvolvimento continuado

### 1.3 Problema Resolvido
O projeto resolve a **ausência de uma plataforma específica** para professores planejarem e compartilharem experiências de viagem. Atualmente, educadores enfrentam dificuldades para:
- **Encontrar destinos adequados** ao perfil e necessidades de educadores
- **Planejar viagens** de forma simples e eficiente  
- **Conectar-se com outros professores** para trocar experiências reais de viagem
- **Acessar benefícios exclusivos** e descontos em viagens
- **Compartilhar recomendações** baseadas em experiências pessoais
- **Participar de uma comunidade** dedicada especificamente a educadores viajantes

---

## 2. TECNOLOGIAS UTILIZADAS

### 2.1 Frontend
| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Next.js** | 15.5.2 | Framework React moderno com SSR, roteamento automático e otimizações de performance |
| **React** | 18.2.0 | Biblioteca para interfaces de usuário reativas e componentizadas |
| **TypeScript** | 5.2.2 | Tipagem estática para maior segurança e produtividade no desenvolvimento |
| **Tailwind CSS** | 3.4.0 | Framework CSS utilitário para design responsivo e consistente |

### 2.2 Backend
| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Node.js** | 20.x | Runtime JavaScript para servidor com excelente performance |
| **Express.js** | 5.1.0 | Framework web minimalista e flexível para APIs REST |
| **MySQL** | 8.0+ | Banco de dados relacional robusto para dados estruturados |
| **TypeScript** | 5.2.2 | Tipagem estática no backend para consistência com o frontend |
| **CORS** | 2.8.5 | Middleware para permitir requisições cross-origin |

### 2.3 Ferramentas de Desenvolvimento
- **ts-node**: Execução direta de arquivos TypeScript
- **dotenv**: Gerenciamento de variáveis de ambiente
- **Concurrently**: Execução simultânea de frontend e backend
- **ESLint**: Linting e padronização de código

### 2.4 Justificativas das Escolhas Tecnológicas

**Next.js**: Escolhido por oferecer SSR (Server-Side Rendering), roteamento baseado em arquivos, otimizações automáticas e excelente experiência do desenvolvedor.

**TypeScript**: Implementado em todo o stack para garantir tipagem forte, reduzir bugs em produção e melhorar a manutenibilidade do código.

**Tailwind CSS**: Selecionado para acelerar o desenvolvimento da interface, garantir consistência visual e facilitar a responsividade.

**MySQL**: Selecionado como banco de dados relacional por sua robustez, performance e facilidade de integração com Node.js, ideal para armazenar dados estruturados de destinos, usuários e reservas.

**Express.js**: Escolhido por sua simplicidade, flexibilidade e vasta comunidade, ideal para APIs REST escaláveis.

---

## 3. REQUISITOS DO SISTEMA

### 3.1 Requisitos Funcionais
1. ✅ **Cadastro de usuário e autenticação** (implementado)
2. 🔄 **Explorar destinos recomendados** por outros professores  
3. 🔄 **Fazer recomendações de destinos** através de posts
4. 🔄 **Acumular pontos** ao fazer recomendações e planejar viagens
5. 🔄 **Trocar pontos** por descontos em passagens, hospedagem e alimentação
6. 🔄 **Ferramentas de planejamento** de viagem
7. 🔄 **Participar de comunidades** de professores para compartilhar experiências
8. 🔄 **Feed de posts** com fotos/vídeos de experiências de viagem
9. 🔄 **Sistema de comunidades temáticas** para interação

### 3.2 Requisitos Não Funcionais
- **Desempenho**: Aplicativo deve carregar rapidamente informações sobre destinos e benefícios
- **Segurança**: Proteção dos dados pessoais dos usuários, incluindo informações de viagem e preferências
- **Usabilidade**: Interface intuitiva e fácil de usar, adequada para usuários com diferentes níveis de habilidade tecnológica
- **Privacidade**: Garantir que informações pessoais dos professores não sejam compartilhadas sem consentimento
- **Compatibilidade**: Disponível em múltiplas plataformas (web responsivo, preparado para PWA)
- **Escalabilidade**: Arquitetura preparada para crescimento da base de usuários

---

## 4. DESCRIÇÃO DAS FUNCIONALIDADES

### 4.1 Funcionalidades Implementadas ✅

#### 3.1.1 Estrutura Base da Aplicação
- **Arquitetura fullstack** preparada para funcionalidades do MVP
- **Sistema de navegação** entre as 5 páginas principais planejadas
- **Layout responsivo** adaptado para todos os dispositivos
- **Integração frontend/backend** funcionando corretamente

#### 3.1.2 Sistema de Autenticação 
- **Cadastro de usuários** com validação de campos
- **Login seguro** com sessões de usuário
- **Página de Perfil** base para futuras funcionalidades
- **Hook personalizado** `useAuth` para gerenciamento de estado

#### 3.1.3 Base de Dados para Destinos/Roteiros
- **Estrutura de dados** preparada para recomendações de destinos
- **API REST** com endpoints para CRUD de destinos
- **Modelo de dados** compatível com sistema de recomendações
- **6 destinos mockados** como base para desenvolvimento

#### 3.1.4 Preparação para MVP - Feed e Comunidades
- **Estrutura de páginas** criada para implementação do Feed
- **Sistema de rotas** preparado para as 5 páginas principais:
  - Feed (compartilhamento de posts)
  - Comunidades (grupos temáticos) 
  - Roteiros (recomendações de destinos)
  - Sobre Nós (informações da plataforma)
  - Perfil (área do usuário)

#### 3.1.5 Backend API REST
- **Servidor Express** estruturado com middlewares
- **Endpoints funcionais**:
  - `GET /api/destinos` - Lista todos os destinos
  - `GET /api/destinos/:id` - Detalhes de um destino
  - `GET /api/hello` - Health check
  - `POST /api/users/login` - Autenticação
  - `POST /api/users/register` - Cadastro
  - `GET /api/users/profile` - Perfil do usuário
- **Sistema de logging** para requisições
- **Configuração CORS** para integração frontend/backend
- **Tratamento de erros** estruturado

#### 3.1.6 Integração Frontend/Backend
- **Serviços de API** (`destinoService.ts`, `userService.ts`)
- **Comunicação assíncrona** com tratamento de erros
- **Loading states** e feedback visual para o usuário

### 4.2 Funcionalidades Planejadas para Implementação 🚧

#### 3.2.1 MVP - Funcionalidades Principais
- **Feed de Posts**: Compartilhamento de experiências com fotos/vídeos
- **Sistema de Comunidades**: Grupos temáticos para interação entre professores
- **Recomendações de Roteiros**: Sistema para professores recomendarem destinos
- **Sistema de Pontos**: Acúmulo de pontos por atividades na plataforma
- **Troca de Benefícios**: Conversão de pontos em descontos para viagens

#### 4.2.2 MVP - Navegação Principal (5 Páginas)
- 🔄 **Feed**: Timeline de posts com experiências de viagem (fotos/vídeos)
- 🔄 **Comunidades**: Grupos temáticos para interação entre professores
- 🔄 **Roteiros**: Recomendações e planejamento de destinos
- 🔄 **Sobre Nós**: Informações da plataforma e objetivos
- ✅ **Perfil**: Área do usuário (base implementada)

#### 4.2.3 Sistema de Gamificação
- 🔄 **Pontos por Ações**: Acúmulo ao fazer posts, recomendações e interações
- 🔄 **Sistema de Troca**: Conversão de pontos em benefícios reais
- 🔄 **Parcerias**: Integração com empresas de viagem para descontos
1. ✅ **Cadastro e autenticação** (implementado)
2. 🔄 **Explorar destinos recomendados** por outros professores  
3. 🔄 **Fazer recomendações** de destinos
4. 🔄 **Sistema de pontos** ao fazer recomendações e planejar viagens
5. 🔄 **Troca de pontos** por descontos em viagens
6. 🔄 **Ferramentas de planejamento** de viagem
7. 🔄 **Comunidade de professores** para compartilhar experiências

---

## 5. DIVISÃO DE TAREFAS

### 5.1 Distribuição de Responsabilidades

| Integrante | Responsabilidades Principais | Status |
|------------|------------------------------|---------|
| **Stefany Silva** | • **Backend completo** (Node.js/Express)<br>• **Banco de Dados** (MySQL - implementação futura)<br>• API REST com endpoints funcionais<br>• Estrutura de dados e models<br>• Integração frontend/backend<br>• Documentação técnica | ✅ Em andamento |
| **Ana Luiza Baracat** | • **Frontend** (HTML/CSS/JavaScript)<br>• Interface de usuário e experiência<br>• Design responsivo e estilização<br>• Interatividade e validações<br>• Componentes visuais<br>• Usabilidade e acessibilidade | � Em desenvolvimento |

### 5.2 Contribuições Específicas por Integrante

#### **Stefany Silva - Backend & Banco de Dados**
- **Backend Node.js**: API REST completa com Express.js
- **Estrutura de Dados**: Models e interfaces TypeScript
- **Endpoints**: 6 endpoints funcionais (/api/destinos, /api/users, etc.)
- **Banco de Dados**: Preparação para integração MySQL
- **Servidor**: Configuração completa com middlewares e CORS
- **Documentação**: README.md e especificações técnicas

#### **Ana Luiza Baracat - Frontend React/Next.js**
- **Componentes React**: Desenvolvimento de componentes reutilizáveis
- **Estilização Tailwind**: Design system responsivo e consistente
- **Páginas Next.js**: Estruturação das 5 páginas principais do MVP
- **Interface do Feed**: Componentes para posts com fotos/vídeos
- **UI de Comunidades**: Interfaces para grupos temáticos
- **Experiência do Usuário**: Navegação fluida e design intuitivo

---

## 6. APRENDIZADOS / DIFICULDADES

### 6.1 Principais Aprendizados
- **Integração Fullstack**: Experiência valiosa na conexão entre frontend Next.js e backend Express
- **TypeScript Avançado**: Implementação de tipagem forte em todo o projeto
- **Arquitetura Limpa**: Organização de código com separação clara de responsabilidades
- **Desenvolvimento Moderno**: Uso de hooks customizados e Context API para gerenciamento de estado

### 6.2 Desafios Superados
- **Hidratação SSR**: Resolução de problemas de hidratação com formatação de datas e preços
- **Configuração TypeScript**: Setup correto para projetos separados (frontend/backend)
- **CORS e Integração**: Configuração adequada para comunicação entre servidores locais
- **Estrutura de Dados**: Modelagem eficiente para destinos educacionais

### 6.3 Soluções Implementadas
- **Formatação Consistente**: Funções dedicadas para formatação de preços e datas
- **Tratamento de Erros**: Sistema robusto de error handling em toda a aplicação
- **Performance**: Otimizações do Next.js para carregamento rápido
- **Responsividade**: Design mobile-first com Tailwind CSS

---

## 7. PLANEJAMENTO PARA DEPLOY NA VERCEL

### 7.1 Estratégia de Deploy

#### 6.1.1 Preparação do Projeto
- **Separação do Backend**: Migrar o backend para um serviço separado (Vercel Functions ou Railway/Render)
- **Configuração de Ambiente**: Setup de variáveis de ambiente para produção
- **Otimizações**: Build optimization e tree-shaking para reduzir bundle size
- **Testes**: Validação completa em ambiente de staging

#### 6.1.2 Deploy Frontend (Vercel)
```bash
# Configurações necessárias:
- Build Command: npm run build
- Output Directory: .next
- Environment Variables: 
  - NEXT_PUBLIC_API_URL=https://api-pedagopass.vercel.app
  - NODE_ENV=production
```

#### 6.1.3 Deploy Backend
**Opção 1: Vercel Functions**
- Migrar endpoints para `/api` routes do Next.js
- Configurar serverless functions

**Opção 2: Serviço Externo**
- Deploy no Railway, Render ou Heroku
- Configurar variáveis de ambiente e CORS

#### 6.1.4 Domínio e SSL
- **Domínio personalizado**: `pedagopass.com.br` (sugestão)
- **SSL automático**: Configuração via Vercel
- **CDN global**: Distribuição de conteúdo otimizada

### 7.2 Timeline para Deploy
- **Semana 1 (30/09-06/10)**: Separação e otimização do backend
- **Semana 2 (07/10-13/10)**: Testes e configuração de ambiente
- **Semana 3 (14/10-20/10)**: Deploy e ajustes finais
- **Semana 4 (21/10-23/10)**: Validação e documentação final

---

## 8. PLANEJAMENTO 4º BIMESTRE - ENTREGA FINAL (23/10/2025)

### 8.1 Cronograma Detalhado

#### **Semana 1 (30/09 - 06/10)**
- [ ] **Backend (Stefany Silva): Sistema de Posts e Feed**
  - API para criação e gerenciamento de posts
  - Upload e gerenciamento de imagens/vídeos
  - Endpoints para feed personalizado
  - Sistema básico de pontuação

- [ ] **Frontend (Ana Luiza): Interface do Feed**
  - Página Feed com timeline de posts
  - Formulário de criação de posts
  - Interface para upload de mídia
  - Design cards para posts de viagem

#### **Semana 2 (07/10 - 13/10)**
- [ ] **Backend (Stefany Silva): Sistema de Comunidades**
  - API para criação e gerenciamento de comunidades
  - Sistema de membros e moderação
  - Endpoints para posts por comunidade
  - Lógica de recomendações de destinos

- [ ] **Frontend (Ana Luiza): Interface de Comunidades**
  - Página de Comunidades com grupos temáticos
  - Interface para criação de comunidades
  - Sistema de navegação entre comunidades
  - Integração com posts do feed

#### **Semana 3 (14/10 - 20/10)**
- [ ] **Backend (Stefany Silva): Sistema de Pontos e Benefícios**
  - Integração com banco de dados MySQL
  - API para sistema de pontuação
  - Lógica de acúmulo de pontos por ações
  - Sistema básico de troca por benefícios

- [ ] **Frontend (Ana Luiza): Páginas Roteiros e Perfil**
  - Interface de Roteiros com recomendações
  - Página de Perfil aprimorada com posts do usuário
  - Sistema de pontos visível na interface
  - Página Sobre Nós informativa

#### **Semana 4 (21/10 - 23/10)**
- [ ] **Integração Final e Testes**
  - **Stefany Silva**: Testes de integração backend/banco de dados
  - **Ana Luiza**: Testes de interface e usabilidade
  - **Ambas**: Testes de integração completos
  - **Ambas**: Documentação final e relatório
  - **Ambas**: Preparação da apresentação

### 8.2 Funcionalidades Planejadas para Implementação

#### 8.2.1 Prioritárias (Must Have) - MVP
- **Feed com Posts de Fotos/Vídeos**
- **Sistema de Comunidades Temáticas** 
- **Recomendações de Roteiros/Destinos**
- **Sistema Básico de Pontos**
- **Deploy Funcional na Vercel**

#### 8.2.2 Desejáveis (Should Have)
- **Troca de Pontos por Benefícios**
- **Ferramentas de Planejamento de Viagem**
- **Sistema de Notificações**
- **Parcerias com Empresas de Viagem**

#### 8.2.3 Opcionais (Could Have)
- **Sistema de Gamificação Avançado**
- **Chat entre Usuários**
- **Aplicativo Mobile (PWA)**
- **Integração com Redes Sociais**

### 8.3 Métricas de Sucesso para MVP
- ✅ **5 páginas principais funcionais** (Feed, Comunidades, Roteiros, Sobre, Perfil)
- 🎯 **Sistema de posts com fotos/vídeos operacional**
- 🎯 **Pelo menos 3 comunidades temáticas criadas**
- 🎯 **Sistema de pontos básico implementado**
- 🎯 **10+ recomendações de destinos no sistema**
- 🎯 **Deploy funcional na Vercel**
- 🎯 **Documentação completa**
- 🎯 **Apresentação demonstrando o MVP**

---

## 9. REPOSITÓRIO E VERSIONAMENTO

### 9.1 Organização do Repositório
- **URL**: `https://github.com/Stefany2510/TCC_PedagoPass`
- **Branch Principal**: `feature/inicial`
- **Commits**: Estruturados e documentados
- **Documentação**: README.md completo e detalhado

### 9.2 Status Atual do Repositório ✅
- Código fonte completo
- Documentação atualizada
- Configurações de desenvolvimento
- Scripts de build e deploy

---

## 10. CONCLUSÃO

O projeto **PedagoPass** encontra-se com uma **base sólida implementada**, tendo toda a infraestrutura fullstack preparada para o desenvolvimento do MVP focado em compartilhamento de experiências e comunidades de professores. A arquitetura TypeScript proporciona escalabilidade para as funcionalidades de rede social educacional planejadas.

### Status Atual: **30% Concluído** 🚧

**Fase atual**: Base técnica implementada (autenticação, estrutura, APIs básicas)  
**Próximos passos**: Implementação do MVP com Feed, Comunidades, Sistema de Pontos e Recomendações de Destinos para entrega final em 23/10/2025.

---

*Relatório gerado em 24/09/2025 - PedagoPass Team*