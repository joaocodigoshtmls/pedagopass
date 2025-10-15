# 🔐 Testes de Autenticação - PedagoPass

## Requisitos
- Backend rodando em `http://localhost:3001`
- Usar Thunder Client, Postman, Insomnia ou curl

---

## 1. Registrar Novo Usuário

**POST** `http://localhost:3001/api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Maria Silva",
  "email": "maria@professor.com",
  "password": "senha123",
  "school": "Escola Estadual José Maria",
  "subject": "Matemática",
  "segment": "Ensino Fundamental II",
  "city": "São Paulo",
  "state": "SP"
}
```

**Resposta esperada (201):**
```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": "uuid-gerado",
    "name": "Maria Silva",
    "email": "maria@professor.com",
    "school": "Escola Estadual José Maria",
    "subject": "Matemática",
    "segment": "Ensino Fundamental II",
    "city": "São Paulo",
    "state": "SP",
    "verified": false,
    "createdAt": "2025-10-15T..."
  }
}
```

**Cookie setado:**
- `auth_token` (HttpOnly, 7 dias de validade)

---

## 2. Login de Usuário

**POST** `http://localhost:3001/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "maria@professor.com",
  "password": "senha123"
}
```

**Resposta esperada (200):**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "user": {
    "id": "uuid-do-usuario",
    "name": "Maria Silva",
    "email": "maria@professor.com",
    ...
  }
}
```

**Cookie setado:**
- `auth_token` (HttpOnly, 7 dias)

---

## 3. Validar Token

**GET** `http://localhost:3001/api/auth/validate`

**Requer:** Cookie `auth_token` setado (após login/registro)

**Resposta esperada (200):**
```json
{
  "success": true,
  "message": "Token válido",
  "user": {
    "id": "uuid-do-usuario",
    "name": "Maria Silva",
    ...
  }
}
```

---

## 4. Obter Dados do Usuário Autenticado

**GET** `http://localhost:3001/api/auth/me`

**Requer:** Cookie `auth_token` (middleware protegido)

**Resposta esperada (200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid-do-usuario",
    "name": "Maria Silva",
    "email": "maria@professor.com",
    ...
  }
}
```

---

## 5. Logout

**POST** `http://localhost:3001/api/auth/logout`

**Requer:** Cookie `auth_token` (opcional, limpa mesmo se não houver)

**Resposta esperada (200):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

**Cookie removido:**
- `auth_token` é limpo

---

## Testes com CURL (Windows CMD)

### Registrar:
```cmd
curl -X POST http://localhost:3001/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Maria Silva\",\"email\":\"maria@professor.com\",\"password\":\"senha123\",\"school\":\"Escola Estadual\",\"subject\":\"Matematica\"}" -c cookies.txt
```

### Login:
```cmd
curl -X POST http://localhost:3001/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"maria@professor.com\",\"password\":\"senha123\"}" -c cookies.txt
```

### Validar Token:
```cmd
curl -X GET http://localhost:3001/api/auth/validate -b cookies.txt
```

### Obter Perfil:
```cmd
curl -X GET http://localhost:3001/api/auth/me -b cookies.txt
```

### Logout:
```cmd
curl -X POST http://localhost:3001/api/auth/logout -b cookies.txt -c cookies.txt
```

---

## Testes de Erro

### E-mail duplicado (deve retornar 400):
```json
POST /api/auth/register
{
  "name": "João Paulo",
  "email": "maria@professor.com",  // mesmo e-mail
  "password": "senha456"
}
```

### Senha incorreta (deve retornar 401):
```json
POST /api/auth/login
{
  "email": "maria@professor.com",
  "password": "senhaErrada"
}
```

### Rota protegida sem token (deve retornar 401):
```
GET /api/auth/me
(sem cookie auth_token)
```

---

## Verificar Cookie HttpOnly

No **Thunder Client / Postman**:
1. Após login/registro, vá em "Cookies"
2. Verifique que existe `auth_token`
3. Confirme que tem as flags: `HttpOnly`, `SameSite=Strict`

No **Browser DevTools** (se testar via frontend):
1. F12 > Application/Storage > Cookies
2. O cookie `auth_token` deve estar marcado como HttpOnly ✅
3. Não deve ser acessível via JavaScript `document.cookie`

---

## Checklist de Aceite ✅

- [ ] `npm run backend` inicia sem erros
- [ ] POST /api/auth/register cria usuário e retorna 201
- [ ] Cookie `auth_token` é setado (HttpOnly)
- [ ] POST /api/auth/login autentica e retorna 200
- [ ] Cookie é setado no login
- [ ] GET /api/auth/me retorna dados do usuário autenticado
- [ ] GET /api/auth/me sem cookie retorna 401
- [ ] POST /api/auth/logout limpa o cookie
- [ ] E-mail duplicado retorna erro 400
- [ ] Credenciais inválidas retornam erro 401
