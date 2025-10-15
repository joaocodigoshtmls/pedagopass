# Teste Simples de API - Posts PedagoPass
$baseUrl = "http://localhost:3001/api"
$token = ""

Write-Host "=== TESTES API POSTS ===" -ForegroundColor Cyan
Write-Host ""

# Teste 1: Listar Posts
Write-Host "1. GET /posts" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/posts" -Method GET
    Write-Host "OK - Total posts: $($response.total)" -ForegroundColor Green
} catch {
    Write-Host "ERRO" -ForegroundColor Red
}
Write-Host ""

# Teste 2: Registrar usuário
Write-Host "2. POST /auth/register" -ForegroundColor Yellow
try {
    $body = @{
        name = "Prof Teste"
        email = "teste@test.com"
        password = "senha123"
        school = "Escola Teste"
        subject = "Historia"
        segment = "Ensino Medio"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method POST -Body $body -ContentType "application/json"
    Write-Host "OK - Usuario: $($response.user.name)" -ForegroundColor Green
} catch {
    Write-Host "Usuario ja existe (OK)" -ForegroundColor Yellow
}
Write-Host ""

# Teste 3: Login
Write-Host "3. POST /auth/login" -ForegroundColor Yellow
try {
    $body = @{
        email = "teste@test.com"
        password = "senha123"
    } | ConvertTo-Json
    
    $session = $null
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/login" -Method POST -Body $body -ContentType "application/json" -SessionVariable session
    $result = $response.Content | ConvertFrom-Json
    Write-Host "OK - Login realizado: $($result.user.name)" -ForegroundColor Green
    
    # Extrair cookie
    $cookie = $session.Cookies.GetCookies("$baseUrl")
    Write-Host "   Cookie obtido" -ForegroundColor Gray
} catch {
    Write-Host "ERRO no login" -ForegroundColor Red
}
Write-Host ""

# Teste 4: Criar Post (com autenticação)
Write-Host "4. POST /posts (autenticado)" -ForegroundColor Yellow
try {
    $body = @{
        content = "Post de teste via PowerShell!"
        tags = @("teste")
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/posts" -Method POST -Body $body -ContentType "application/json" -WebSession $session
    $result = $response.Content | ConvertFrom-Json
    Write-Host "OK - Post criado: $($result.post.id)" -ForegroundColor Green
    $postId = $result.post.id
} catch {
    Write-Host "ERRO ao criar post" -ForegroundColor Red
    $postId = $null
}
Write-Host ""

# Teste 5: Curtir Post
if ($postId) {
    Write-Host "5. POST /posts/$postId/like" -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl/posts/$postId/like" -Method POST -WebSession $session
        $result = $response.Content | ConvertFrom-Json
        Write-Host "OK - Liked: $($result.liked)" -ForegroundColor Green
    } catch {
        Write-Host "ERRO ao curtir" -ForegroundColor Red
    }
    Write-Host ""
}

# Teste 6: Adicionar Comentário
if ($postId) {
    Write-Host "6. POST /posts/$postId/comments" -ForegroundColor Yellow
    try {
        $body = @{
            content = "Comentario de teste!"
        } | ConvertTo-Json
        
        $response = Invoke-WebRequest -Uri "$baseUrl/posts/$postId/comments" -Method POST -Body $body -ContentType "application/json" -WebSession $session
        $result = $response.Content | ConvertFrom-Json
        Write-Host "OK - Comentario: $($result.comment.id)" -ForegroundColor Green
    } catch {
        Write-Host "ERRO ao comentar" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "=== TESTES CONCLUIDOS ===" -ForegroundColor Cyan
