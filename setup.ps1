# Quick Setup Script for Windows PowerShell
# Run this script to set up the entire project

Write-Host "🚀 Starting Authentication System Setup..." -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is installed
Write-Host "📋 Checking PostgreSQL installation..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version
    Write-Host "✅ PostgreSQL found: $pgVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ PostgreSQL not found. Please install PostgreSQL first." -ForegroundColor Red
    Write-Host "   Download from: https://www.postgresql.org/download/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend installation failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Yellow
Set-Location ../frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend installation failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green

Set-Location ..

Write-Host ""
Write-Host "⚙️  Configuration Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create PostgreSQL database:" -ForegroundColor Yellow
Write-Host "   psql -U postgres" -ForegroundColor White
Write-Host "   CREATE DATABASE auth_db;" -ForegroundColor White
Write-Host ""
Write-Host "2. Configure backend environment:" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor White
Write-Host "   Copy .env.example to .env" -ForegroundColor White
Write-Host "   Edit .env with your PostgreSQL credentials" -ForegroundColor White
Write-Host ""
Write-Host "3. Run Prisma migrations:" -ForegroundColor Yellow
Write-Host "   npm run prisma:generate" -ForegroundColor White
Write-Host "   npm run prisma:migrate" -ForegroundColor White
Write-Host ""
Write-Host "4. Start the servers:" -ForegroundColor Yellow
Write-Host "   Backend:  cd backend && npm run dev" -ForegroundColor White
Write-Host "   Frontend: cd frontend && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "✅ Setup Complete! Follow the configuration steps above." -ForegroundColor Green
Write-Host ""
Write-Host "📚 For detailed instructions, see README.md" -ForegroundColor Cyan
