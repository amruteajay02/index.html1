# Birthday Surprise - Start Server
# Your IP: 10.71.87.149

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Birthday Surprise Server" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your computer IP: " -NoNewline
Write-Host "10.71.87.149" -ForegroundColor Yellow
Write-Host ""
Write-Host "Open in browser on ANY device:" -ForegroundColor Green
Write-Host "http://10.71.87.149:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Magenta
Write-Host ""

Set-Location (Split-Path $MyInvocation.MyCommand.Path)

# Try npx first (Node.js)
try {
    Write-Host "Starting server with Node.js..." -ForegroundColor Cyan
    & npx http-server -p 8000 -c-1
} catch {
    Write-Host "Node.js not found. Trying Python..." -ForegroundColor Yellow
    try {
        & python -m http.server 8000
    } catch {
        Write-Host "Neither Node.js nor Python found." -ForegroundColor Red
        Write-Host "Please install Node.js or Python, or use VS Code's Live Server extension." -ForegroundColor Red
        Read-Host "Press Enter to exit"
    }
}
