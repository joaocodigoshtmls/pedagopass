# 🔄 Guia de Migração - Tipos Antigos → Tipos Compartilhados

## Objetivo
Migrar gradualmente os tipos locais (backend e frontend) para os tipos compartilhados em `src/shared/types`.

---

## 📋 Status de Migração

### ✅ Já Migrados
- User types (parcialmente - ver observações)

### ⏳ Pendentes de Migração

#### **Backend**
- [ ] `src/backend/models/User.ts` → usar `@/shared/types`
- [ ] `src/backend/models/Points.ts` → usar `@/shared/types`
- [ ] `src/backend/models/Post.ts` → usar `@/shared/types`
- [ ] `src/backend/models/Destino.ts` → usar `@/shared/types`

#### **Frontend**
- [ ] `src/types/destino.ts` → usar `@/shared/types`
- [ ] Criar novos tipos conforme necessário

---

## 🔧 Como Migrar

### **Passo 1: Identificar o tipo antigo**

Exemplo: `src/backend/models/User.ts`
```typescript
// ANTES
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}
```

### **Passo 2: Verificar tipo compartilhado**

Ver em: `src/shared/types/user.types.ts`
```typescript
// DEPOIS (já existe)
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  school?: string;
  // ... mais campos
  verified: boolean;
  createdAt: Date | string;
}
```

### **Passo 3: Atualizar imports**

**Backend:**
```typescript
// ANTES
import { User, LoginDTO } from '../models/User';

// DEPOIS
import { User, LoginDTO } from '@/shared/types';
// ou
import { User, LoginDTO } from '../shared/types';
```

**Frontend:**
```typescript
// ANTES
import { Destino } from '@/types/destino';

// DEPOIS
import { Destination } from '@/shared/types';
```

### **Passo 4: Ajustar código se necessário**

Se o tipo compartilhado tiver campos diferentes:
```typescript
// Adaptar dados antigos para novos tipos
const user: User = {
  ...oldUser,
  verified: oldUser.verified || false,
  createdAt: oldUser.createdAt,
};
```

---

## 📝 Casos Especiais

### **User com passwordHash (Backend)**

O tipo compartilhado `User` **não** tem `passwordHash` por segurança.

**Solução:** Criar tipo interno no backend
```typescript
// src/backend/models/UserInternal.ts
import { User } from '@/shared/types';

export interface UserInternal extends User {
  passwordHash: string;
}
```

### **Date vs string**

Tipos compartilhados usam `Date | string` para compatibilidade JSON.

**Backend (ao salvar):**
```typescript
const user: User = {
  ...data,
  createdAt: new Date(), // Date object
};
```

**Frontend (ao receber da API):**
```typescript
const user: User = apiResponse.data; // createdAt é string
const date = new Date(user.createdAt); // converter se necessário
```

---

## 🎯 Prioridade de Migração

### **Alta Prioridade** (fazer agora)
1. ✅ User types
2. ⏳ Destination types
3. ⏳ Post types

### **Média Prioridade** (próximos sprints)
4. ⏳ Community types
5. ⏳ Points types
6. ⏳ Reward types

### **Baixa Prioridade** (quando necessário)
7. ⏳ Moderation types
8. ⏳ Notification types

---

## 🚨 Observações Importantes

1. **Não deletar tipos antigos imediatamente** - manter até confirmar que tudo funciona
2. **Testar após cada migração** - rodar testes e verificar se API continua funcionando
3. **Documentar diferenças** - se tipo compartilhado for diferente, documentar o motivo
4. **Comunicar com equipe** - avisar sobre mudanças de tipos que afetam outros devs

---

## ✅ Checklist por Arquivo

### **Backend Models**

```
[ ] src/backend/models/User.ts
    [ ] Importar de @/shared/types
    [ ] Criar UserInternal se necessário
    [ ] Atualizar todos os imports que usam este arquivo
    [ ] Testar rotas de auth
    
[ ] src/backend/models/Destino.ts
    [ ] Substituir por Destination de @/shared/types
    [ ] Atualizar DestinoController
    [ ] Atualizar DestinoService
    [ ] Testar rotas de destinos
    
[ ] src/backend/models/Points.ts
    [ ] Substituir por tipos de @/shared/types
    [ ] Atualizar PointsController
    [ ] Atualizar PointsService
    [ ] Testar rotas de pontos
    
[ ] src/backend/models/Post.ts
    [ ] Substituir por tipos de @/shared/types
    [ ] Atualizar PostController
    [ ] Atualizar PostService
    [ ] Testar rotas de posts
```

### **Frontend Types**

```
[ ] src/types/destino.ts
    [ ] Substituir por import de @/shared/types
    [ ] Atualizar páginas que usam (destinos/index.tsx, destinos/[id].tsx)
    [ ] Atualizar services (destinoService.ts)
    [ ] Testar páginas de destinos
```

---

## 📖 Exemplo Completo de Migração

### **Antes: src/backend/controllers/DestinoController.ts**
```typescript
import { Destino } from '../models/Destino';

class DestinoController {
  public index = async (req: Request, res: Response): Promise<Response> => {
    const destinos: Destino[] = this.loadDestinos();
    return res.json({ success: true, data: destinos });
  };
}
```

### **Depois: src/backend/controllers/DestinoController.ts**
```typescript
import { Destination, DestinationsResponse } from '@/shared/types';

class DestinoController {
  public index = async (req: Request, res: Response): Promise<Response> => {
    const destinos: Destination[] = this.loadDestinos();
    
    const response: DestinationsResponse = {
      success: true,
      data: destinos,
      total: destinos.length,
    };
    
    return res.json(response);
  };
}
```

---

**Última atualização:** 15 de outubro de 2025  
**Status:** Em progresso
