# ==============================================================
#  DCRM — Windows Local Development Setup
#  Usage:  .\scripts\dev-setup.ps1
# ==============================================================

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Step([string]$msg) { Write-Host "`n━━━ $msg ━━━" -ForegroundColor Cyan }
function Write-OK([string]$msg)   { Write-Host "  ✓ $msg"    -ForegroundColor Green }
function Write-Info([string]$msg) { Write-Host "  → $msg"    -ForegroundColor White }
function Write-Warn([string]$msg) { Write-Host "  ! $msg"    -ForegroundColor Yellow }

$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

Write-Host "`nDCRM — Development Setup" -ForegroundColor Cyan -NoNewline
Write-Host "  ($(Get-Date -Format 'dd MMM yyyy HH:mm'))`n"

# ──────────────────────────────────────────────────────────────
# Step 1 — .env
# ──────────────────────────────────────────────────────────────
Write-Step "Environment file"
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Warn ".env created from .env.example — no action needed for dev (SQLite, DEBUG=True)"
} else {
    Write-OK ".env already present"
}

# ──────────────────────────────────────────────────────────────
# Step 2 — Python virtual environment
# ──────────────────────────────────────────────────────────────
Write-Step "Python virtual environment"
if (-not (Test-Path .venv)) {
    python -m venv .venv
    Write-OK "Created .venv"
}
& .\.venv\Scripts\Activate.ps1
Write-OK "Activated: $(python --version)"

# ──────────────────────────────────────────────────────────────
# Step 3 — Python dependencies (development)
# ──────────────────────────────────────────────────────────────
Write-Step "Python dependencies"
pip install --quiet --upgrade pip
pip install --quiet -r requirements/development.txt
Write-OK "Packages installed"

# ──────────────────────────────────────────────────────────────
# Step 4 — Django: migrate
# ──────────────────────────────────────────────────────────────
Write-Step "Django migrations"
python manage.py migrate
Write-OK "Database ready (SQLite)"

# ──────────────────────────────────────────────────────────────
# Step 5 — Frontend
# ──────────────────────────────────────────────────────────────
Write-Step "Frontend dependencies"
Set-Location frontend
if (-not (Test-Path node_modules)) {
    npm install
} else {
    Write-Info "node_modules present — running npm ci to sync..."
    npm ci
}
Write-OK "Node packages installed"
Set-Location $ProjectRoot

# ──────────────────────────────────────────────────────────────
# Done
# ──────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Info "Start backend:   python manage.py runserver"
Write-Info "Start frontend:  cd frontend ; npm run dev"
Write-Info "Open browser:    http://localhost:5173"
