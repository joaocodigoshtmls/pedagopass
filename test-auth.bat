@echo off
echo ========================================
echo  PedagoPass - Teste de Autenticacao
echo ========================================
echo.

echo [1/5] Testando health check...
curl -X GET http://localhost:3001/api/hello
echo.
echo.

echo [2/5] Registrando usuario...
curl -X POST http://localhost:3001/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Maria Silva\",\"email\":\"maria@professor.com\",\"password\":\"senha123\",\"school\":\"Escola Estadual\",\"subject\":\"Matematica\"}" ^
  -c cookies.txt
echo.
echo.

echo [3/5] Fazendo login...
curl -X POST http://localhost:3001/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"maria@professor.com\",\"password\":\"senha123\"}" ^
  -c cookies.txt
echo.
echo.

echo [4/5] Validando token...
curl -X GET http://localhost:3001/api/auth/validate -b cookies.txt
echo.
echo.

echo [5/5] Obtendo perfil do usuario...
curl -X GET http://localhost:3001/api/auth/me -b cookies.txt
echo.
echo.

echo ========================================
echo  Testes concluidos!
echo  Verifique se:
echo  - Todos retornaram success: true
echo  - Cookie auth_token foi setado
echo ========================================
pause
