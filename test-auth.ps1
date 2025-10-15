# Testar Registro
$registerBody = @{
    name = "Maria Silva"
    email = "maria@professor.com"
    password = "senha123"
    school = "Escola Estadual"
    subject = "Matematica"
} | ConvertTo-Json

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Teste 1: Registrar Usuario" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/auth/register" `
        -Method POST `
        -ContentType "application/json" `
        -Body $registerBody `
        -SessionVariable session `
        -UseBasicParsing

    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
    Write-Host "`nCookies:" -ForegroundColor Yellow
    $session.Cookies.GetCookies("http://localhost:3001") | Format-Table -AutoSize
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
    Write-Host $_.Exception.Response.StatusCode -ForegroundColor Red
}

Write-Host "`n"

# Testar Login
$loginBody = @{
    email = "maria@professor.com"
    password = "senha123"
} | ConvertTo-Json

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Teste 2: Fazer Login" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginBody `
        -SessionVariable session2 `
        -UseBasicParsing

    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
    Write-Host "`nCookies:" -ForegroundColor Yellow
    $session2.Cookies.GetCookies("http://localhost:3001") | Format-Table -AutoSize
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

Write-Host "`n"

# Testar Rota Protegida
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Teste 3: Obter Perfil (Rota Protegida)" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/auth/me" `
        -Method GET `
        -WebSession $session2 `
        -UseBasicParsing

    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $errorBody = $reader.ReadToEnd()
        Write-Host "Error body: $errorBody" -ForegroundColor Red
    }
}

Write-Host "`n"

# Testar Validar Token
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Teste 4: Validar Token" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/auth/validate" `
        -Method GET `
        -WebSession $session2 `
        -UseBasicParsing

    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

Write-Host "`n"

# Testar Logout
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Teste 5: Fazer Logout" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/auth/logout" `
        -Method POST `
        -WebSession $session2 `
        -UseBasicParsing

    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "Testes Concluidos!" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
