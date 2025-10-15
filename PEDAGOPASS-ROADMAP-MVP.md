# PedagoPass — MVP Roadmap (proposto)

> Objetivo: colocar no ar uma rede social focada em professores com feed, posts com mídia, catálogo de destinos, comunidades temáticas e pontuação com resgate simples — usando **Next.js 15** (frontend) e **Express 5** (backend) já presentes no repositório.

## 1) Escopo do MVP (fechadinho)
- **Autenticação** (e-mail + senha) — professores.
- **Perfil**: nome, escola, disciplina/segmento, cidade/UF, avatar.
- **Post** com texto + 1–5 mídias (imagens; vídeo opcional) e tags de destino/temas.
- **Feed** cronológico + filtro por disciplina/tema/destino.
- **Destinos** (catálogo): listar, visualizar detalhe, sugerir correções (dados ainda em JSON).
- **Comunidades**: entrar/sair, ver feed do tema, postar lá.
- **Pontos**: ganhar por postar, comentar e avaliar destino; **ranking** semanal.
- **Recompensas**: página simples com ofertas (mock), **resgate manual** gerando um código.
- **Moderação**: denunciar post/comentário; remover via painel admin simples.
- **Notificações** (in-app) mínimas: novo comentário no seu post, resgate aprovado.

> Fora do MVP: chat/DM, vídeo longo, marketplace complexo, parcerias integrais e pagamentos.

## 2) Arquitetura atual (detecção)
- Frontend: **Next.js 15.5.2**, React 18, Tailwind.
- Backend: **Express 5.1**, TypeScript, rotas em `/api` ouvindo em **:3001**.
- Dados: **JSON mock** (`src/backend/data`), sem Prisma/BD ainda.
- Scripts: `npm run dev` (Next), `npm run backend` (Express), `npm run dev:full` (ambos).

## 3) Modelo de dados (pronto p/ migrar a Prisma mais tarde)
- **User**(id, name, email, passwordHash, avatarUrl, school, subject, segment, city, state, bio, verified, createdAt)
- **Post**(id, authorId, communityId?, destinationId?, content, media[], createdAt, updatedAt)
- **Media**(id, postId, url, type: 'image'|'video', width?, height?, duration?)
- **Comment**(id, postId, authorId, content, createdAt)
- **Reaction**(postId, userId, type: 'like')
- **Community**(id, name, slug, topic, rules?)
- **Follow**(followerId, followingId)
- **Destination**(id, name, city, state, country, category, tags[], costRange, suitability, accessibility, contacts)
- **PointsLedger**(id, userId, delta, reason, refType, refId, createdAt)
- **Reward**(id, title, partner?, costPoints, stock, terms)
- **Redemption**(id, userId, rewardId, status: 'requested'|'approved'|'denied', code?, createdAt)
- **Report**(id, refType: 'post'|'comment', refId, reporterId, reason, status)

## 4) API — consolidar e expandir as rotas existentes
`GET /api/hello` — saúde do backend  
`GET /api/destinos` `GET /api/destinos/:id`  
`GET /api/suggestions`  
`GET /api/users/:id/points`  
**Adicionar no MVP:**  
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`
- Posts: `GET /api/posts?community?&destination?`, `POST /api/posts`, `POST /api/posts/:id/reactions`, `POST /api/posts/:id/comments`
- Comunidades: `GET /api/communities`, `POST /api/communities/:id/join`, `POST /api/communities/:id/leave`
- Pontos: `GET /api/points/me`, `POST /api/points/apply` (interno; serviço)
- Recompensas: `GET /api/rewards`, `POST /api/redeem`
- Moderação: `POST /api/reports`, `GET /api/admin/reports`, `PATCH /api/admin/reports/:id`

## 5) Regras de pontos (primeiro rascunho)
- Publicar post: **+10**
- Comentário útil (min. 20 chars): **+3**
- Post com destino marcado: **+5**
- Avaliar destino (1–5 + texto): **+8**
- Post receber 10 curtidas: **+5** (uma vez por post)
- Denúncia confirmada contra você: **-20**

> Anti-gaming: rate limit por usuário, deduplicação por refId, revisão manual para picos anormais.

## 6) Painel admin leve
- Login admin (chave de ambiente).
- Listar reports com filtros; **aprovar/recusar**.
- Lista de recompensas: CRUD simples; aprovar/resgates e gerar `code`.

## 7) Checklist de execução (ordem sugerida)
1. **Auth no backend** (bcrypt + JWT em cookies HTTPOnly) e guardas no frontend.
2. **Modelos TS** (tipos) compartilhados (pasta `src/shared`).
3. **Posts**: endpoints + upload local (mídia em `/public/uploads` no MVP).
4. **Feed** no Next com React Query + filtros.
5. **Comunidades**: listar, entrar/sair, feed por comunidade.
6. **Destinos**: integrar catálogo mockado no frontend (detalhe + avaliações).
7. **Pontos**: serviço de pontuação + ledger + ranking semanal (server-side).
8. **Recompensas**: lista pública + `POST /redeem` ⇒ gerar código e marcar `requested`.
9. **Moderação**: denúncias + tela admin para tratar.
10. **Polir UI**: estados de loading/empty/error, toasts, responsividade.

## 8) Ambiente & .env (sugestão)
```
# Backend
PORT=3001
JWT_SECRET=troque-isto
ADMIN_SECRET=troque-isto

# Frontend
NEXT_PUBLIC_API_BASE=http://localhost:3001/api
```

## 9) Próximos passos pós-MVP
- Migrar JSON → **Prisma + Postgres** (seed a partir dos mocks).
- Upload para **storage** (S3/R2) + CDN.
- Verificação de professor (e-mail institucional ou código da escola).
- Parcerias e auditoria de fraudes de pontos.
- Testes e2e (Playwright) e monitoramento.

---

**Como rodar local:**  
```bash
npm install
npm run dev:full   # frontend :3000 + backend :3001
# ou em janelas separadas:
npm run dev
npm run backend
```
