@echo off
REM Start Birthday Surprise Server
REM Your IP: 10.71.87.149

cd /d "%~dp0"
echo.
echo ====================================
echo   Birthday Surprise Server
echo ====================================
echo.
echo Your computer IP: 10.71.87.149
echo.
echo Open in browser on ANY device:
echo http://10.71.87.149:8000
echo.
echo Press Ctrl+C to stop the server
echo.
echo Waiting for Node.js http-server...
echo.

npx http-server -p 8000 -c-1

pause
