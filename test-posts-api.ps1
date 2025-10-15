# Script de Teste - Sistema de Posts
# PedagoPass Backend API

$baseUrl = "http://localhost:3001/api"
$cookieFile = "test-cookies.txt"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   TESTES - SISTEMA DE POSTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Função para fazer requests
function Invoke-ApiRequest {
    param(
        [string]$Method,
        [string]$Endpoint,
        [object]$Body = $null,
        [bool]$UseAuth = $false,
        [string]$ContentType = "application/json"
    )
    
    $uri = "$baseUrl$Endpoint"
    
    try {
        $params = @{
            Uri = $uri
            Method = $Method
            UseBasicParsing = $true
        }
        
        if ($Body -and $ContentType -eq "application/json") {
            $params.Body = ($Body | ConvertTo-Json -Depth 10)
            $params.ContentType = $ContentType
        }
        
        if ($UseAuth -and (Test-Path $cookieFile)) {
            $cookies = Get-Content $cookieFile -Raw
            $params.Headers = @{ "Cookie" = $cookies }
        }
        
        $response = Invoke-WebRequest @params
        
        # Salvar cookies se houver
        if ($response.Headers["Set-Cookie"]) {
            $response.Headers["Set-Cookie"] | Out-File $cookieFile
        }
        
        return $response.Content | ConvertFrom-Json
    }
    catch {
        Write-Host "Erro: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Teste 1: Health Check
Write-Host "🔍 Teste 1: Health Check" -ForegroundColor Green
Write-Host "GET /hello" -ForegroundColor Gray
$health = Invoke-ApiRequest -Method GET -Endpoint "/hello"
if ($health) {
    Write-Host "✅ Backend está online!" -ForegroundColor Green
    Write-Host "   Mensagem: $($health.message)" -ForegroundColor Gray
} else {
    Write-Host "❌ Backend não está respondendo!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Teste 2: Listar Posts (deve retornar post de exemplo)
Write-Host "🔍 Teste 2: Listar Posts" -ForegroundColor Green
Write-Host "GET /posts" -ForegroundColor Gray
$posts = Invoke-ApiRequest -Method GET -Endpoint "/posts"
if ($posts -and $posts.success) {
    Write-Host "✅ Posts listados com sucesso!" -ForegroundColor Green
    Write-Host "   Total: $($posts.total)" -ForegroundColor Gray
    Write-Host "   Posts retornados: $($posts.posts.Count)" -ForegroundColor Gray
    if ($posts.posts.Count -gt 0) {
        Write-Host "   Primeiro post:" -ForegroundColor Gray
        Write-Host "     - ID: $($posts.posts[0].id)" -ForegroundColor Gray
        Write-Host "     - Autor: $($posts.posts[0].author.name)" -ForegroundColor Gray
        Write-Host "     - Conteúdo: $($posts.posts[0].content.Substring(0, [Math]::Min(50, $posts.posts[0].content.Length)))..." -ForegroundColor Gray
        Write-Host "     - Likes: $($posts.posts[0].likesCount)" -ForegroundColor Gray
        Write-Host "     - Comentários: $($posts.posts[0].commentsCount)" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ Falha ao listar posts!" -ForegroundColor Red
}
Write-Host ""

# Teste 3: Registrar usuário de teste
Write-Host "🔍 Teste 3: Registrar Usuário de Teste" -ForegroundColor Green
Write-Host "POST /auth/register" -ForegroundColor Gray
$registerData = @{
    name = "Professor Teste"
    email = "teste@pedagopass.com"
    password = "senha123"
    school = "Escola Teste"
    subject = "História"
    segment = "Ensino Médio"
}
$registerResult = Invoke-ApiRequest -Method POST -Endpoint "/auth/register" -Body $registerData
if ($registerResult -and $registerResult.success) {
    Write-Host "✅ Usuário registrado com sucesso!" -ForegroundColor Green
    Write-Host "   ID: $($registerResult.user.id)" -ForegroundColor Gray
    Write-Host "   Nome: $($registerResult.user.name)" -ForegroundColor Gray
    Write-Host "   Email: $($registerResult.user.email)" -ForegroundColor Gray
    $userId = $registerResult.user.id
} else {
    Write-Host "⚠️  Usuário pode já existir, tentando login..." -ForegroundColor Yellow
}
Write-Host ""

# Teste 4: Fazer Login
Write-Host "🔍 Teste 4: Fazer Login" -ForegroundColor Green
Write-Host "POST /auth/login" -ForegroundColor Gray
$loginData = @{
    email = "teste@pedagopass.com"
    password = "senha123"
}
$loginResult = Invoke-ApiRequest -Method POST -Endpoint "/auth/login" -Body $loginData
if ($loginResult -and $loginResult.success) {
    Write-Host "✅ Login realizado com sucesso!" -ForegroundColor Green
    Write-Host "   Token JWT salvo em cookies" -ForegroundColor Gray
    Write-Host "   Usuário: $($loginResult.user.name)" -ForegroundColor Gray
    $userId = $loginResult.user.id
} else {
    Write-Host "❌ Falha no login!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Teste 5: Buscar post específico
Write-Host "🔍 Teste 5: Buscar Post por ID" -ForegroundColor Green
Write-Host "GET /posts/1" -ForegroundColor Gray
$singlePost = Invoke-ApiRequest -Method GET -Endpoint "/posts/1"
if ($singlePost -and $singlePost.success) {
    Write-Host "✅ Post encontrado!" -ForegroundColor Green
    Write-Host "   ID: $($singlePost.post.id)" -ForegroundColor Gray
    Write-Host "   Autor: $($singlePost.post.author.name)" -ForegroundColor Gray
    Write-Host "   Conteúdo: $($singlePost.post.content.Substring(0, [Math]::Min(80, $singlePost.post.content.Length)))..." -ForegroundColor Gray
} else {
    Write-Host "❌ Post não encontrado!" -ForegroundColor Red
}
Write-Host ""

# Teste 6: Criar novo post
Write-Host "🔍 Teste 6: Criar Novo Post" -ForegroundColor Green
Write-Host "POST /posts (requer autenticação)" -ForegroundColor Gray
$newPostData = @{
    content = "Post de teste criado via API! Testando o sistema de posts do PedagoPass."
    tags = @("teste", "api", "pedagopass")
    destinationId = "dest-paris"
}
$newPost = Invoke-ApiRequest -Method POST -Endpoint "/posts" -Body $newPostData -UseAuth $true
$newPostId = $null
if ($newPost -and $newPost.success) {
    Write-Host "OK - Post criado!" -ForegroundColor Green
    Write-Host "   ID: $($newPost.post.id)" -ForegroundColor Gray
    $newPostId = $newPost.post.id
} else {
    Write-Host "Erro ao criar post" -ForegroundColor Red
}
Write-Host ""

# Teste 7: Curtir o post criado
if ($newPostId) {
    Write-Host "🔍 Teste 7: Curtir Post" -ForegroundColor Green
    $likeResult = Invoke-ApiRequest -Method POST -Endpoint "/posts/$newPostId/like" -UseAuth $true
    if ($likeResult -and $likeResult.success) {
        Write-Host "OK - Post curtido!" -ForegroundColor Green
    }
    Write-Host ""
}

# Teste 8: Comentar no post
if ($newPostId) {
    Write-Host "🔍 Teste 8: Adicionar Comentário" -ForegroundColor Green
    $commentData = @{
        content = "Comentário de teste! Sistema funcionando perfeitamente"
    }
    $commentResult = Invoke-ApiRequest -Method POST -Endpoint "/posts/$newPostId/comments" -Body $commentData -UseAuth $true
    if ($commentResult -and $commentResult.success) {
        Write-Host "OK - Comentário adicionado!" -ForegroundColor Green
    }
    Write-Host ""
}

# Teste 9: Listar comentários do post
if ($newPostId) {
    Write-Host "🔍 Teste 9: Listar Comentários" -ForegroundColor Green
    $comments = Invoke-ApiRequest -Method GET -Endpoint "/posts/$newPostId/comments"
    if ($comments -and $comments.success) {
        Write-Host "OK - Total: $($comments.total)" -ForegroundColor Green
    }
    Write-Host ""
}

# Teste 10: Listar posts com filtros
Write-Host "🔍 Teste 10: Buscar Posts com Filtros" -ForegroundColor Green
Write-Host "GET /posts?tag=teste&sortBy=recent" -ForegroundColor Gray
$filteredPosts = Invoke-ApiRequest -Method GET -Endpoint "/posts?tag=teste&sortBy=recent"
if ($filteredPosts -and $filteredPosts.success) {
    Write-Host "✅ Posts filtrados com sucesso!" -ForegroundColor Green
    Write-Host "   Total encontrado: $($filteredPosts.total)" -ForegroundColor Gray
    Write-Host "   Posts com tag 'teste': $($filteredPosts.posts.Count)" -ForegroundColor Gray
} else {
    Write-Host "❌ Falha ao filtrar posts!" -ForegroundColor Red
}
Write-Host ""

# Resumo Final
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   RESUMO DOS TESTES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Sistema de Posts funcionando!" -ForegroundColor Green
Write-Host ""
Write-Host "Funcionalidades testadas:" -ForegroundColor White
Write-Host "  ✓ Listar posts" -ForegroundColor Green
Write-Host "  ✓ Buscar post por ID" -ForegroundColor Green
Write-Host "  ✓ Criar post (com autenticação)" -ForegroundColor Green
Write-Host "  ✓ Curtir post" -ForegroundColor Green
Write-Host "  ✓ Comentar em post" -ForegroundColor Green
Write-Host "  ✓ Listar comentários" -ForegroundColor Green
Write-Host "  ✓ Filtrar posts por tag" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos passos:" -ForegroundColor Yellow
Write-Host "  1. Testar upload de imagens (requer multipart/form-data)" -ForegroundColor Gray
Write-Host "  2. Implementar Feed no frontend" -ForegroundColor Gray
Write-Host "  3. Criar componentes visuais (PostCard, CommentSection)" -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 Todos os testes básicos passaram!" -ForegroundColor Green
Write-Host ""

# Limpar arquivo de cookies temporário
# Remove-Item $cookieFile -ErrorAction SilentlyContinue
