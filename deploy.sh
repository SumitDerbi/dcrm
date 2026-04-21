#!/usr/bin/env bash
# ============================================================
#  DCRM — Production Deployment Script
#  Tested on: cPanel (Phusion Passenger) and Ubuntu VPS
#
#  Usage:
#    chmod +x deploy.sh
#    ./deploy.sh
#
#  Requirements:
#    - Python 3.10+
#    - Node.js 18+ and npm
#    - .env file present (copy .env.example and fill values)
#    - Virtual environment supported (auto-created if absent)
# ============================================================

set -euo pipefail

# ---------- Colour helpers ----------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

log()   { echo -e "${GREEN}[$(date '+%H:%M:%S')] ${BOLD}$1${NC}"; }
info()  { echo -e "${CYAN}  → $1${NC}"; }
warn()  { echo -e "${YELLOW}[WARN] $1${NC}"; }
error() { echo -e "${RED}[ERROR] $1${NC}"; exit 1; }
step()  { echo -e "\n${BOLD}${CYAN}━━━ $1 ━━━${NC}"; }

# ---------- Resolve project root ----------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
PROJECT_ROOT="$SCRIPT_DIR"

log "DCRM Deployment — Phase 0  ($(date '+%d %b %Y %H:%M'))"
info "Project root: $PROJECT_ROOT"

# ──────────────────────────────────────────────────────────────
# STEP 1 — Preflight checks
# ──────────────────────────────────────────────────────────────
step "Preflight checks"

command -v python3 >/dev/null 2>&1 || error "python3 not found. Install Python 3.10+."
command -v node    >/dev/null 2>&1 || error "node not found. Install Node.js 18+."
command -v npm     >/dev/null 2>&1 || error "npm not found."

PY_VER=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
NODE_VER=$(node -e "process.stdout.write(process.versions.node)")
info "Python $PY_VER  •  Node $NODE_VER"

if [ ! -f .env ]; then
    warn ".env not found — creating from .env.example"
    cp .env.example .env
    error "Please fill in all required values in .env and re-run deploy.sh"
fi

# Quick check that SECRET_KEY is set (non-empty)
SECRET_KEY_VAL=$(grep -E "^SECRET_KEY=" .env | cut -d= -f2- | tr -d '[:space:]')
[ -z "$SECRET_KEY_VAL" ] && error "SECRET_KEY is empty in .env — set a secure random key."
info "✓ .env present and SECRET_KEY is set"

# ──────────────────────────────────────────────────────────────
# STEP 2 — Python virtual environment
# ──────────────────────────────────────────────────────────────
step "Python virtual environment"

if [ ! -d .venv ]; then
    info "Creating virtual environment..."
    python3 -m venv .venv
fi

# shellcheck disable=SC1091
source .venv/bin/activate
info "✓ Virtual environment active: $(python --version)"

# ──────────────────────────────────────────────────────────────
# STEP 3 — Python dependencies
# ──────────────────────────────────────────────────────────────
step "Python dependencies"

pip install --quiet --upgrade pip
pip install --quiet -r requirements/production.txt
info "✓ Python packages installed"

# ──────────────────────────────────────────────────────────────
# STEP 4 — Frontend build
# ──────────────────────────────────────────────────────────────
step "Frontend build (Vite + React)"

cd frontend

if [ ! -d node_modules ]; then
    info "Running npm ci (fresh install)..."
    npm ci --silent
else
    info "node_modules present — running npm ci to sync lockfile..."
    npm ci --silent
fi

info "Building production bundle..."
npm run build
info "✓ Frontend built → static/frontend/"

cd "$PROJECT_ROOT"

# ──────────────────────────────────────────────────────────────
# STEP 5 — Django: collect static
# ──────────────────────────────────────────────────────────────
step "Collect static files"

DJANGO_SETTINGS_MODULE=config.settings.production \
    python manage.py collectstatic --noinput 2>&1 | tail -3
info "✓ Static files collected → staticfiles/"

# ──────────────────────────────────────────────────────────────
# STEP 6 — Django: database migrations
# ──────────────────────────────────────────────────────────────
step "Database migrations"

DJANGO_SETTINGS_MODULE=config.settings.production \
    python manage.py migrate --noinput
info "✓ Migrations applied"

# ──────────────────────────────────────────────────────────────
# STEP 7 — Create/ensure tmp/ directory for Passenger
# ──────────────────────────────────────────────────────────────
step "Passenger / server restart"

mkdir -p tmp

if [ -f tmp/restart.txt ]; then
    touch tmp/restart.txt
    info "✓ Passenger restarted via tmp/restart.txt"
elif systemctl is-active --quiet gunicorn 2>/dev/null; then
    systemctl restart gunicorn
    info "✓ gunicorn service restarted"
elif supervisorctl status dcrm >/dev/null 2>&1; then
    supervisorctl restart dcrm
    info "✓ Supervisor process restarted"
else
    warn "No auto-restart method found."
    warn "If using Phusion Passenger (cPanel): touch tmp/restart.txt"
    warn "If using gunicorn:                    systemctl restart gunicorn"
    warn "If using supervisor:                  supervisorctl restart dcrm"
    touch tmp/restart.txt
    info "Created tmp/restart.txt anyway — Passenger will pick it up if present."
fi

# ──────────────────────────────────────────────────────────────
# Done
# ──────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}╔══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}${BOLD}║  DCRM deployment completed successfully ✓    ║${NC}"
echo -e "${GREEN}${BOLD}╚══════════════════════════════════════════════╝${NC}"
echo ""
info "Phase 0 UI is live — review all screens with the client."
info "Once approved, create the git tag:  git tag v0.1.0-ui-approval && git push --tags"
