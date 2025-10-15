## 📦 Tipos Compartilhados - PedagoPass

### Estrutura

Esta pasta contém todos os tipos TypeScript compartilhados entre **frontend** (Next.js) e **backend** (Express).

```
src/shared/types/
├── user.types.ts          # Usuários, autenticação, perfis
├── post.types.ts          # Posts, mídias, comentários, reações
├── community.types.ts     # Comunidades, memberships
├── points.types.ts        # Sistema de pontos, ledger, ranking
├── reward.types.ts        # Recompensas, resgates
├── destination.types.ts   # Destinos, avaliações
├── moderation.types.ts    # Denúncias, moderação
├── common.types.ts        # Tipos utilitários (API, paginação, etc)
└── index.ts              # Exportação centralizada
```

---

### 🎯 Como Usar

#### **No Frontend (Next.js)**

```typescript
import { User, Post, Community } from '@/shared/types';

const user: User = {
  id: '123',
  name: 'Maria Silva',
  email: 'maria@prof.com',
  verified: false,
  createdAt: new Date(),
};
```

#### **No Backend (Express)**

```typescript
import { User, CreatePostDTO, ApiResponse } from '../shared/types';
// ou
import { User } from '@/shared/types'; // se configurado no tsconfig.backend.json

const createPost = async (data: CreatePostDTO): Promise<ApiResponse<Post>> => {
  // ...
};
```

---

### 📚 Tipos Principais

#### **User Types**
- `User` - Usuário completo
- `PublicUser` - Dados públicos do usuário
- `RegisterDTO` - Cadastro
- `LoginDTO` - Login
- `UpdateProfileDTO` - Atualizar perfil
- `AuthResponse` - Resposta de autenticação
- `JWTPayload` - Payload do token

#### **Post Types**
- `Post` - Post completo
- `Media` - Mídia anexada (imagem/vídeo)
- `Comment` - Comentário
- `Reaction` - Curtida
- `CreatePostDTO` - Criar post
- `PostFilters` - Filtros de busca
- `PostsResponse` - Resposta paginada

#### **Community Types**
- `Community` - Comunidade
- `CommunityMember` - Membro da comunidade
- `CreateCommunityDTO` - Criar comunidade
- `MemberRole` - Papel na comunidade (creator, moderator, member)
- `CommunityTopic` - Tópicos/categorias

#### **Points Types**
- `PointsLedger` - Entrada no ledger
- `UserPoints` - Pontos do usuário
- `PointsReason` - Razões para ganhar/perder pontos
- `LeaderboardEntry` - Entrada no ranking
- `LeaderboardResponse` - Ranking completo

#### **Reward Types**
- `Reward` - Recompensa
- `Redemption` - Resgate
- `RedemptionStatus` - Status do resgate
- `CreateRewardDTO` - Criar recompensa (admin)
- `RequestRedemptionDTO` - Solicitar resgate

#### **Destination Types**
- `Destination` - Destino educacional
- `DestinationReview` - Avaliação de destino
- `Professor` - Professor responsável
- `CreateReviewDTO` - Criar avaliação

#### **Moderation Types**
- `Report` - Denúncia
- `ReportReason` - Razões de denúncia
- `ReportStatus` - Status da denúncia
- `ModerationAction` - Ação tomada
- `CreateReportDTO` - Criar denúncia
- `ProcessReportDTO` - Processar denúncia (admin)

#### **Common Types**
- `ApiResponse<T>` - Resposta padrão da API
- `PaginatedResponse<T>` - Resposta paginada
- `PaginationParams` - Parâmetros de paginação
- `Notification` - Notificação in-app
- `NotificationType` - Tipos de notificação
- `FileUpload` - Upload de arquivo
- `UPLOAD_LIMITS` - Limites de upload

---

### 🔄 Sincronização Backend/Frontend

**Vantagens:**
1. ✅ **DRY** (Don't Repeat Yourself) - um tipo, dois usos
2. ✅ **Type Safety** - erros detectados em tempo de desenvolvimento
3. ✅ **Autocomplete** - IntelliSense em toda aplicação
4. ✅ **Refatoração segura** - mudar um tipo atualiza tudo
5. ✅ **Documentação viva** - tipos são documentação

---

### 🛠️ Enums Importantes

#### **EducationSegment**
```typescript
enum EducationSegment {
  EDUCACAO_INFANTIL = 'Educação Infantil',
  ENSINO_FUNDAMENTAL_I = 'Ensino Fundamental I',
  ENSINO_FUNDAMENTAL_II = 'Ensino Fundamental II',
  ENSINO_MEDIO = 'Ensino Médio',
  EJA = 'Educação de Jovens e Adultos',
  ENSINO_SUPERIOR = 'Ensino Superior',
  EDUCACAO_ESPECIAL = 'Educação Especial',
}
```

#### **CommunityTopic**
```typescript
enum CommunityTopic {
  PEDAGOGIA = 'Pedagogia',
  TECNOLOGIA = 'Tecnologia Educacional',
  INCLUSAO = 'Inclusão e Diversidade',
  GESTAO = 'Gestão Escolar',
  METODOLOGIAS = 'Metodologias Ativas',
  // ...
}
```

#### **PointsReason**
```typescript
enum PointsReason {
  POST_CREATED = 'post_created', // +10
  COMMENT_CREATED = 'comment_created', // +3
  POST_WITH_DESTINATION = 'post_with_destination', // +5
  DESTINATION_REVIEWED = 'destination_reviewed', // +8
  POST_REACHED_10_LIKES = 'post_reached_10_likes', // +5
  REPORT_CONFIRMED = 'report_confirmed', // -20
}
```

---

### 📐 Convenções

1. **Interfaces** para estruturas de dados (`User`, `Post`, etc)
2. **Enums** para valores fixos (`Status`, `MediaType`, etc)
3. **DTOs** para entrada de dados (`CreatePostDTO`, `UpdateUserDTO`)
4. **Responses** para saídas da API (`PostsResponse`, `AuthResponse`)
5. **Filters** para parâmetros de busca (`PostFilters`, `CommunityFilters`)

---

### 🔧 Manutenção

Ao adicionar novos recursos:
1. Crie/atualize o arquivo de tipos relevante
2. Exporte no `index.ts`
3. Use no backend E frontend
4. Evite duplicação de tipos

---

### 📖 Exemplos de Uso

#### **Backend - Controller**
```typescript
import { CreatePostDTO, Post, ApiResponse } from '@/shared/types';

class PostController {
  async create(req: Request, res: Response): Promise<Response> {
    const dto: CreatePostDTO = req.body;
    const post: Post = await PostService.create(dto);
    
    const response: ApiResponse<Post> = {
      success: true,
      message: 'Post criado',
      data: post,
    };
    
    return res.json(response);
  }
}
```

#### **Frontend - Component**
```typescript
import { Post, PublicUser } from '@/shared/types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const author: PublicUser = post.author!;
  
  return (
    <div>
      <h3>{author.name}</h3>
      <p>{post.content}</p>
    </div>
  );
}
```

#### **Frontend - Service**
```typescript
import { Post, PostsResponse, PostFilters } from '@/shared/types';

export async function getPosts(filters: PostFilters): Promise<Post[]> {
  const response = await fetch('/api/posts?' + new URLSearchParams(filters as any));
  const data: PostsResponse = await response.json();
  return data.posts;
}
```

---

**Criado:** 15 de outubro de 2025  
**Autor:** GitHub Copilot + Equipe PedagoPass
