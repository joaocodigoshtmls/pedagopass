# Teste debug - criar post
$baseUrl = "http://localhost:3001/api"

Write-Host "=== DEBUG: Criar Post ===" -ForegroundColor Cyan
Write-Host ""

# Login
Write-Host "1. Fazendo login..." -ForegroundColor Yellow
$loginBody = @{
    email = "teste@test.com"
    password = "senha123"
} | ConvertTo-Json

$session = $null
$response = Invoke-WebRequest -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -SessionVariable session
$loginResult = $response.Content | ConvertFrom-Json
Write-Host "OK - Usuario: $($loginResult.user.name)" -ForegroundColor Green
Write-Host ""

# Criar post
Write-Host "2. Criando post..." -ForegroundColor Yellow
$postBody = @{
    content = "Post de teste via PowerShell!"
    tags = @("teste")
} | ConvertTo-Json

Write-Host "Body: $postBody" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/posts" -Method POST -Body $postBody -ContentType "application/json" -WebSession $session
    $result = $response.Content | ConvertFrom-Json
    Write-Host "OK - Post criado!" -ForegroundColor Green
    Write-Host "ID: $($result.post.id)" -ForegroundColor Gray
    Write-Host "Content: $($result.post.content)" -ForegroundColor Gray
} catch {
    Write-Host "ERRO!" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Descricao: $($_.Exception.Response.StatusDescription)" -ForegroundColor Yellow
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Resposta: $responseBody" -ForegroundColor Yellow
    }
}
