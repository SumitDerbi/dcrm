# ============================================================
#  DCRM — Local Deploy Script (Windows PowerShell)
#
#  Run this on your local machine to deploy to production:
#    .\scripts\deploy-local.ps1
#
#  What it does:
#    1. Build the frontend (Vite/React) locally
#    2. Commit the built bundle to git
#    3. Push to GitHub
#    4. SSH into kpserver and run deploy.sh
#       (git pull, pip install, collectstatic, migrate, restart)
#
#  Requirements:
#    - Node.js 18+ installed locally
#    - SSH alias 'kpserver' configured in ~/.ssh/config
#    - Git configured with push access to origin
# ============================================================

param(
    [string]$Message = "",
    [switch]$SkipBuild,
    [switch]$NoPush
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$FrontendDir = Join-Path $ProjectRoot "frontend"

# ---------- Helpers ----------
function Write-Step  { param($Text) Write-Host "`n━━━ $Text ━━━" -ForegroundColor Cyan }
function Write-OK    { param($Text) Write-Host "  ✓ $Text"     -ForegroundColor Green }
function Write-Info  { param($Text) Write-Host "  → $Text"     -ForegroundColor DarkCyan }
function Write-Fail  { param($Text) Write-Host "[ERROR] $Text"  -ForegroundColor Red; exit 1 }

Write-Host "`nDCRM Local Deploy  $(Get-Date -Format 'dd MMM yyyy HH:mm')" -ForegroundColor Green -NoNewline
Write-Host ""

# ──────────────────────────────────────────────────────────────
# STEP 1 — Build frontend
# ──────────────────────────────────────────────────────────────
if (-not $SkipBuild) {
    Write-Step "Building frontend (Vite + React)"
    Push-Location $FrontendDir
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) { Write-Fail "npm run build failed" }
        Write-OK "Frontend built → static/frontend/"
    } finally {
        Pop-Location
    }
} else {
    Write-Info "Skipping frontend build (--SkipBuild flag set)"
}

# ──────────────────────────────────────────────────────────────
# STEP 2 — Commit built files
# ──────────────────────────────────────────────────────────────
Write-Step "Commit built frontend to git"

Push-Location $ProjectRoot
try {
    # Stage the built output (now tracked in git)
    git add static/frontend/ templates/frontend/ 2>&1 | Out-Null

    # Check if there's anything new to commit
    $status = git status --porcelain static/frontend/ templates/frontend/ 2>&1
    if ($status) {
        if ($Message -eq "") {
            $shortHash = (git -C $FrontendDir/../ rev-parse --short HEAD 2>&1).Trim()
            $Message = "build: update frontend bundle"
        }
        git add -A
        git commit -m $Message
        Write-OK "Committed: $Message"
    } else {
        Write-Info "No frontend changes to commit — bundle is up to date"
        git add -A
        $anyChanges = git status --porcelain 2>&1
        if ($anyChanges) {
            git commit -m "chore: pre-deploy update" 2>&1 | Out-Null
            Write-OK "Committed other pending changes"
        }
    }
} finally {
    Pop-Location
}

# ──────────────────────────────────────────────────────────────
# STEP 3 — Push to GitHub
# ──────────────────────────────────────────────────────────────
if (-not $NoPush) {
    Write-Step "Push to GitHub"
    Push-Location $ProjectRoot
    try {
        git push origin main
        if ($LASTEXITCODE -ne 0) { Write-Fail "git push failed" }
        Write-OK "Pushed to origin/main"
    } finally {
        Pop-Location
    }
} else {
    Write-Info "Skipping git push (--NoPush flag set)"
}

# ──────────────────────────────────────────────────────────────
# STEP 4 — Run server-side deploy via SSH
# ──────────────────────────────────────────────────────────────
Write-Step "Server deploy (SSH → kpserver)"
Write-Info "Connecting to kpserver..."

ssh kpserver "bash ~/repositories/dcrm/deploy.sh main dcrm"
if ($LASTEXITCODE -ne 0) { Write-Fail "Server deploy script failed" }

# ──────────────────────────────────────────────────────────────
# Done
# ──────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "╔══════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  DCRM deployed successfully ✓                ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Info "Site: https://dcrm.demosite.tech"
Write-Info "Admin: https://dcrm.demosite.tech/admin/"
