# Testes - Sistema de Posts + Upload

## Endpoints Implementados

### 📝 Posts

#### 1. GET /api/posts - Listar posts
Buscar todos os posts com filtros opcionais.

**Query Parameters:**
- `communityId` (opcional): Filtrar por comunidade
- `destinationId` (opcional): Filtrar por destino
- `authorId` (opcional): Filtrar por autor
- `tag` (opcional): Filtrar por tag específica
- `search` (opcional): Buscar no conteúdo do post
- `limit` (opcional): Número de posts por página (padrão: 20)
- `offset` (opcional): Offset para paginação (padrão: 0)
- `sortBy` (opcional): `recent` ou `popular` (padrão: recent)

**Exemplo:**
```bash
curl http://localhost:3001/api/posts?limit=10&sortBy=recent
```

**Resposta:**
```json
{
  "success": true,
  "posts": [...],
  "total": 1,
  "hasMore": false,
  "nextOffset": undefined
}
```

---

#### 2. GET /api/posts/:id - Buscar post por ID
Buscar um post específico pelo ID.

**Exemplo:**
```bash
curl http://localhost:3001/api/posts/1
```

**Resposta:**
```json
{
  "success": true,
  "post": {
    "id": "1",
    "authorId": "user-1",
    "author": {
      "id": "user-1",
      "name": "Prof. Ana Maria",
      "verified": true
    },
    "content": "...",
    "media": [],
    "tags": ["paris", "história", "arte"],
    "likesCount": 127,
    "commentsCount": 34,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

#### 3. POST /api/posts - Criar novo post (REQUER AUTENTICAÇÃO)
Criar um novo post com opcional upload de imagens/vídeos.

**Headers:**
- `Cookie: auth_token=<seu_jwt_token>`

**Body (multipart/form-data):**
- `content` (string, obrigatório): Conteúdo do post
- `communityId` (string, opcional): ID da comunidade
- `destinationId` (string, opcional): ID do destino
- `tags` (string JSON array, opcional): Tags do post
- `files` (files, opcional): 1-5 imagens ou vídeos (max 50MB cada)

**Exemplo com curl:**
```bash
curl -X POST http://localhost:3001/api/posts \
  -H "Cookie: auth_token=SEU_TOKEN_AQUI" \
  -F "content=Minha viagem incrível para Roma! 🏛️" \
  -F "tags=[\"roma\",\"história\"]" \
  -F "destinationId=dest-roma" \
  -F "files=@/caminho/para/imagem1.jpg" \
  -F "files=@/caminho/para/imagem2.jpg"
```

**Resposta:**
```json
{
  "success": true,
  "post": {
    "id": "...",
    "content": "...",
    "media": [
      {
        "id": "...",
        "url": "/uploads/posts/...",
        "thumbnail": "/uploads/thumbnails/...",
        "type": "image",
        "width": 1920,
        "height": 1080
      }
    ]
  },
  "message": "Post criado com sucesso"
}
```

---

#### 4. PUT /api/posts/:id - Atualizar post (REQUER AUTENTICAÇÃO)
Atualizar conteúdo e tags de um post próprio.

**Headers:**
- `Cookie: auth_token=<seu_jwt_token>`

**Body (JSON):**
```json
{
  "content": "Conteúdo atualizado",
  "tags": ["nova", "tags"]
}
```

**Exemplo:**
```bash
curl -X PUT http://localhost:3001/api/posts/1 \
  -H "Cookie: auth_token=SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"content":"Novo conteúdo"}'
```

---

#### 5. DELETE /api/posts/:id - Deletar post (REQUER AUTENTICAÇÃO)
Deletar um post próprio (e suas mídias associadas).

**Headers:**
- `Cookie: auth_token=<seu_jwt_token>`

**Exemplo:**
```bash
curl -X DELETE http://localhost:3001/api/posts/1 \
  -H "Cookie: auth_token=SEU_TOKEN_AQUI"
```

---

### ❤️ Likes

#### 6. POST /api/posts/:id/like - Curtir/Descurtir post (REQUER AUTENTICAÇÃO)
Toggle like em um post.

**Headers:**
- `Cookie: auth_token=<seu_jwt_token>`

**Exemplo:**
```bash
curl -X POST http://localhost:3001/api/posts/1/like \
  -H "Cookie: auth_token=SEU_TOKEN_AQUI"
```

**Resposta:**
```json
{
  "success": true,
  "liked": true,
  "likesCount": 128,
  "message": "Post curtido"
}
```

---

### 💬 Comentários

#### 7. POST /api/posts/:id/comments - Adicionar comentário (REQUER AUTENTICAÇÃO)
Adicionar um comentário a um post.

**Headers:**
- `Cookie: auth_token=<seu_jwt_token>`

**Body (JSON):**
```json
{
  "content": "Que experiência incrível!",
  "parentCommentId": "opcional-para-respostas"
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3001/api/posts/1/comments \
  -H "Cookie: auth_token=SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"content":"Adorei seu post!"}'
```

---

#### 8. GET /api/posts/:id/comments - Listar comentários
Buscar todos os comentários de um post.

**Exemplo:**
```bash
curl http://localhost:3001/api/posts/1/comments
```

**Resposta:**
```json
{
  "success": true,
  "comments": [
    {
      "id": "...",
      "postId": "1",
      "authorId": "...",
      "author": {
        "id": "...",
        "name": "Prof. João",
        "verified": false
      },
      "content": "Adorei!",
      "createdAt": "..."
    }
  ],
  "total": 1
}
```

---

#### 9. DELETE /api/comments/:id - Deletar comentário (REQUER AUTENTICAÇÃO)
Deletar um comentário próprio.

**Headers:**
- `Cookie: auth_token=<seu_jwt_token>`

**Exemplo:**
```bash
curl -X DELETE http://localhost:3001/api/comments/comment-123 \
  -H "Cookie: auth_token=SEU_TOKEN_AQUI"
```

---

## 🧪 Fluxo de Teste Completo

### 1. Primeiro, faça login para obter o token:

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com","password":"suasenha"}' \
  -c cookies.txt
```

O token JWT será salvo em `cookies.txt`.

### 2. Listar posts existentes:

```bash
curl http://localhost:3001/api/posts
```

### 3. Criar um novo post com imagem:

```bash
curl -X POST http://localhost:3001/api/posts \
  -b cookies.txt \
  -F "content=Minha viagem para Paris foi incrível! 🗼" \
  -F "tags=[\"paris\",\"viagem\",\"educação\"]" \
  -F "files=@foto-torre-eiffel.jpg"
```

### 4. Curtir o post criado (use o ID retornado):

```bash
curl -X POST http://localhost:3001/api/posts/POST_ID/like \
  -b cookies.txt
```

### 5. Comentar no post:

```bash
curl -X POST http://localhost:3001/api/posts/POST_ID/comments \
  -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{"content":"Que experiência maravilhosa!"}'
```

### 6. Buscar posts por tag:

```bash
curl "http://localhost:3001/api/posts?tag=paris"
```

### 7. Buscar posts populares:

```bash
curl "http://localhost:3001/api/posts?sortBy=popular&limit=5"
```

---

## 📊 Status Atual

✅ **Backend completo implementado:**
- ✅ PostService com armazenamento em memória
- ✅ PostController com todos os endpoints REST
- ✅ Upload de múltiplas imagens/vídeos (multer)
- ✅ Processamento de imagens com thumbnails (sharp)
- ✅ Sistema de likes e comentários
- ✅ Filtros e paginação
- ✅ Autenticação JWT com cookies
- ✅ Validações e tratamento de erros
- ✅ Backend compilando e rodando sem erros

⏳ **Próximos passos:**
1. Testar todos os endpoints manualmente
2. Implementar Feed no frontend (React Query)
3. Criar componentes de Post, Like, Comment
4. Implementar infinite scroll
5. Migrar de armazenamento em memória para Prisma + PostgreSQL

---

## 🐛 Troubleshooting

### Erro 401 - Não autenticado
Certifique-se de que está enviando o cookie `auth_token` no header.

### Erro 400 - Conteúdo vazio
O campo `content` é obrigatório e não pode estar vazio.

### Erro 413 - Arquivo muito grande
Cada arquivo deve ter no máximo 50MB. Total de 5 arquivos por post.

### Erro 415 - Tipo de arquivo não suportado
Apenas imagens (jpg, jpeg, png, gif, webp) e vídeos (mp4, webm, avi, mov) são aceitos.

---

## 📁 Estrutura de Arquivos

```
src/backend/
├── controllers/
│   └── PostController.ts       ✅ Criado - 9 endpoints REST
├── services/
│   ├── PostService.ts          ✅ Criado - Lógica de negócio
│   └── ImageService.ts         ✅ Criado - Processamento de imagens
├── middlewares/
│   ├── authMiddleware.ts       ✅ Existente - Autenticação JWT
│   └── uploadMiddleware.ts     ✅ Criado - Upload com multer
└── routes/
    └── index.ts                ✅ Atualizado - Rotas registradas

public/uploads/
├── posts/                      ✅ Criado - Imagens/vídeos originais
├── thumbnails/                 ✅ Criado - Miniaturas 400x400
└── avatars/                    ✅ Criado - Avatares de usuários
```
