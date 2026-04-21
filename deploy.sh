#!/bin/bash

#===============================================================================
# Deployment Script for DCRM — cPanel Python Application
# Usage: ./deploy.sh [branch_name] [env_name]
# Example: ./deploy.sh main dcrm
#   - Config loaded from: ~/deploy_config/<env_name>/<env_name>.config
#   - Env file loaded from: ~/deploy_config/<env_name>/<env_name>.env
#
# Frontend is built LOCALLY (server has no Node.js) and committed to git.
# Use scripts/deploy-local.ps1 on Windows to build, push, and trigger this.
#===============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
DEFAULT_BRANCH="main"
DEFAULT_ENV_NAME="dcrm"
DEPLOY_CONFIG_BASE="$HOME/deploy_config"

# Parse arguments
BRANCH="${1:-$DEFAULT_BRANCH}"
ENV_NAME="${2:-$DEFAULT_ENV_NAME}"

# Build paths from environment name
CONFIG_PATH="${DEPLOY_CONFIG_BASE}/${ENV_NAME}/${ENV_NAME}.config"
ENV_FILE_PATH="${DEPLOY_CONFIG_BASE}/${ENV_NAME}/${ENV_NAME}.env"

#===============================================================================
# Helper Functions
#===============================================================================

log_info() {
    echo -e "${BLUE}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

cleanup_on_error() {
    log_error "Deployment failed! Rolling back..."
    if [ -n "${BACKUP_DIR:-}" ] && [ -d "$BACKUP_DIR" ]; then
        log_warn "A backup exists at: $BACKUP_DIR"
        log_warn "You may restore manually if needed."
    fi
    exit 1
}

trap cleanup_on_error ERR

#===============================================================================
# Load Configuration
#===============================================================================

load_config() {
    if [ ! -f "$CONFIG_PATH" ]; then
        log_error "Config file not found at: $CONFIG_PATH"
        log_info "Expected location: ~/deploy_config/<env_name>/<env_name>.config"
        log_info "Please create a config file with the following variables:"
        cat <<EOF
# dcrm.config - Sample Configuration
GIT_DIR=~/repositories/dcrm
APP_DIR=~/dcrm/
VIRTUALENV_PATH=/home/username/virtualenv/dcrm/3.11/
ACTIVATE_ENV=/home/username/virtualenv/dcrm/3.11/bin/activate
DB_BACKUP_PATH=~/backups/dcrm/
STATIC_ROOT=~/dcrm.demosite.tech/
REQUIREMENTS_FILE=requirements/production.txt
DOMAIN_DOC_ROOT=~/dcrm.demosite.tech
EOF
        exit 1
    fi

    log_info "Loading configuration from: $CONFIG_PATH"

    # Remove any Windows-style line endings from config file
    CONFIG_CONTENT=$(cat "$CONFIG_PATH" | tr -d '\r')
    eval "$CONFIG_CONTENT"

    log_info "Raw GIT_DIR from config: $GIT_DIR"

    # Set ENV_FILE from the auto-derived path (can be overridden in config)
    ENV_FILE="${ENV_FILE:-$ENV_FILE_PATH}"

    # Validate required variables
    local required_vars=(
        "GIT_DIR"
        "APP_DIR"
        "VIRTUALENV_PATH"
        "ACTIVATE_ENV"
        "REQUIREMENTS_FILE"
    )

    for var in "${required_vars[@]}"; do
        if [ -z "${!var:-}" ]; then
            log_error "Required variable '$var' is not set in config file."
            exit 1
        fi
    done

    # Expand tilde in paths and remove trailing slashes
    GIT_DIR=$(eval echo "$GIT_DIR" | sed 's:/*$::')
    APP_DIR=$(eval echo "$APP_DIR" | sed 's:/*$::')
    VIRTUALENV_PATH=$(eval echo "$VIRTUALENV_PATH" | sed 's:/*$::')
    ACTIVATE_ENV=$(eval echo "$ACTIVATE_ENV")
    DB_BACKUP_PATH=$(eval echo "${DB_BACKUP_PATH:-~/backups/}" | sed 's:/*$::')
    STATIC_ROOT=$(eval echo "${STATIC_ROOT:-}" | sed 's:/*$::')
    ENV_FILE=$(eval echo "${ENV_FILE:-}")
    CONFIG_FILE=$(eval echo "${CONFIG_FILE:-}")

    log_info "GIT_DIR resolved to: $GIT_DIR"
    log_success "Configuration loaded successfully."
}

#===============================================================================
# Pre-flight Checks
#===============================================================================

preflight_checks() {
    log_info "Running pre-flight checks..."

    if ! command -v git &>/dev/null; then
        log_error "git is not installed or not in PATH."
        exit 1
    fi

    if [ ! -d "$GIT_DIR" ]; then
        log_error "Git repository not found at: $GIT_DIR"
        ls -la "$(dirname "$GIT_DIR")" 2>&1 || log_warn "Parent directory not accessible"
        exit 1
    fi

    if [ ! -d "$GIT_DIR/.git" ]; then
        log_warn "Directory exists but is not a git repository (no .git folder at $GIT_DIR/.git)"
    else
        log_info "Git repository verified at: $GIT_DIR"
    fi

    if [ ! -f "$ACTIVATE_ENV" ]; then
        log_error "Virtual environment not found at: $ACTIVATE_ENV"
        log_info "Please create it via cPanel > Setup Python App."
        exit 1
    fi

    if [ -n "$ENV_FILE" ] && [ ! -f "$ENV_FILE" ]; then
        log_warn "Environment file not found at: $ENV_FILE (skipping .env copy)"
    fi

    log_success "Pre-flight checks passed."
}

#===============================================================================
# Backup
#===============================================================================

create_backup() {
    log_info "Creating backup..."

    TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
    BACKUP_DIR="${DB_BACKUP_PATH}/backup_${TIMESTAMP}"
    mkdir -p "$BACKUP_DIR"

    # Backup current app directory
    if [ -d "$APP_DIR" ]; then
        log_info "Backing up application directory..."
        cp -r "$APP_DIR" "$BACKUP_DIR/app_backup"
        log_success "App directory backed up to: $BACKUP_DIR/app_backup"
    fi

    # Backup MySQL database — dcrm uses DB_NAME / DB_USER / DB_PASSWORD
    if [ -n "$ENV_FILE" ] && [ -f "$ENV_FILE" ]; then
        DB_NAME_VAL=$(grep -s '^DB_NAME=' "$ENV_FILE" | cut -d'=' -f2 | tr -d '"' | tr -d "'")
        DB_USER_VAL=$(grep -s '^DB_USER=' "$ENV_FILE" | cut -d'=' -f2 | tr -d '"' | tr -d "'")
        DB_PASS_VAL=$(grep -s '^DB_PASSWORD=' "$ENV_FILE" | cut -d'=' -f2 | tr -d '"' | tr -d "'")
        DB_HOST_VAL=$(grep -s '^DB_HOST=' "$ENV_FILE" | cut -d'=' -f2 | tr -d '"' | tr -d "'" || echo "localhost")

        if [ -n "$DB_NAME_VAL" ] && [ -n "$DB_USER_VAL" ] && command -v mysqldump &>/dev/null; then
            log_info "Backing up MySQL database: $DB_NAME_VAL ..."
            mysqldump -u "$DB_USER_VAL" -p"$DB_PASS_VAL" -h "${DB_HOST_VAL:-localhost}" "$DB_NAME_VAL" \
                > "$BACKUP_DIR/${DB_NAME_VAL}_backup.sql" 2>/dev/null && \
                log_success "MySQL database backed up." || \
                log_warn "mysqldump failed — skipping DB backup."
        else
            log_warn "MySQL credentials not found or mysqldump not available — skipping DB backup."
        fi
    fi

    # Clean old backups (keep last 5)
    log_info "Cleaning old backups (keeping last 5)..."
    cd "$DB_BACKUP_PATH"
    ls -dt backup_*/ 2>/dev/null | tail -n +6 | xargs rm -rf 2>/dev/null || true

    log_success "Backup completed at: $BACKUP_DIR"
}

#===============================================================================
# Pull Latest Code
#===============================================================================

pull_latest_code() {
    log_info "Pulling latest code from branch: $BRANCH"

    cd "$GIT_DIR"
    git fetch --all

    if ! git branch -a | grep -qE "(^|\s)remotes/origin/${BRANCH}$"; then
        log_error "Branch '$BRANCH' does not exist on remote."
        git branch -a
        exit 1
    fi

    git checkout "$BRANCH"
    git reset --hard "origin/$BRANCH"
    git pull origin "$BRANCH"

    LATEST_COMMIT=$(git log -1 --pretty=format:"%h - %s (%ci)")
    log_success "Code updated to: $LATEST_COMMIT"
}

#===============================================================================
# Sync Code to App Directory
#===============================================================================

sync_code() {
    log_info "Syncing code to application directory: $APP_DIR"

    mkdir -p "$APP_DIR"

    rsync -av --delete \
        --exclude='.git' \
        --exclude='.gitignore' \
        --exclude='__pycache__' \
        --exclude='*.pyc' \
        --exclude='.env' \
        --exclude='.htaccess' \
        --exclude='db.sqlite3' \
        --exclude='media/' \
        --exclude='node_modules/' \
        --exclude='frontend/node_modules/' \
        --exclude='frontend/src/' \
        --exclude='.vscode/' \
        --exclude='.idea/' \
        "$GIT_DIR/" "$APP_DIR/"

    chmod 711 "$APP_DIR"

    log_success "Code synced successfully."
}

#===============================================================================
# Copy Environment & Config Files
#===============================================================================

copy_env_files() {
    log_info "Copying environment and config files..."

    if [ -n "$ENV_FILE" ] && [ -f "$ENV_FILE" ]; then
        cp "$ENV_FILE" "$APP_DIR/.env"
        log_success "Environment file copied: $ENV_FILE -> $APP_DIR/.env"
    fi
}

#===============================================================================
# Install Dependencies
#===============================================================================

install_dependencies() {
    log_info "Installing Python dependencies..."

    source "$ACTIVATE_ENV"
    export DJANGO_SETTINGS_MODULE="config.settings.production"
    log_info "Virtual environment activated: $(which python)"
    log_info "Python version: $(python --version)"

    cd "$APP_DIR"
    pip install --upgrade pip

    if [ -f "$APP_DIR/$REQUIREMENTS_FILE" ]; then
        pip install -r "$APP_DIR/$REQUIREMENTS_FILE"
        log_success "Dependencies installed from: $REQUIREMENTS_FILE"
    else
        log_warn "Requirements file not found: $APP_DIR/$REQUIREMENTS_FILE (skipping)"
    fi
}

#===============================================================================
# Run Migrations
#===============================================================================

run_migrations() {
    log_info "Running database migrations..."

    cd "$APP_DIR"
    source "$ACTIVATE_ENV"
    export DJANGO_SETTINGS_MODULE="config.settings.production"

    if [ -f "$APP_DIR/manage.py" ]; then
        python manage.py migrate --noinput
        log_success "Database migrations completed."
    else
        log_warn "manage.py not found. Skipping migrations."
    fi
}

#===============================================================================
# Collect Static Files
#===============================================================================

collect_static() {
    log_info "Collecting static files..."

    cd "$APP_DIR"
    source "$ACTIVATE_ENV"
    export DJANGO_SETTINGS_MODULE="config.settings.production"

    if [ -f "$APP_DIR/manage.py" ]; then
        python manage.py collectstatic --noinput
        log_success "Static files collected."
    else
        log_warn "manage.py not found. Skipping collectstatic."
    fi
}

#===============================================================================
# Create Symlinks (Document Root ≠ App Root)
#===============================================================================

create_symlinks() {
    log_info "Creating symlinks for media and static files..."

    DOMAIN_DOC_ROOT=$(eval echo "${DOMAIN_DOC_ROOT:-}")

    if [ -z "$DOMAIN_DOC_ROOT" ] || [ ! -d "$DOMAIN_DOC_ROOT" ]; then
        log_warn "DOMAIN_DOC_ROOT not set or not found — skipping symlinks."
        return
    fi

    # media symlink: ~/dcrm.demosite.tech/media → ~/dcrm/media
    MEDIA_LINK="$DOMAIN_DOC_ROOT/media"
    MEDIA_TARGET="$APP_DIR/media"
    [ -L "$MEDIA_LINK" ] && rm "$MEDIA_LINK"
    if [ ! -e "$MEDIA_LINK" ]; then
        mkdir -p "$MEDIA_TARGET"
        ln -s "$MEDIA_TARGET" "$MEDIA_LINK"
        log_success "  Media symlink: $MEDIA_LINK → $MEDIA_TARGET"
    fi

    # static symlink: ~/dcrm.demosite.tech/static → ~/dcrm/staticfiles
    STATIC_LINK="$DOMAIN_DOC_ROOT/static"
    STATIC_TARGET="$APP_DIR/staticfiles"
    [ -L "$STATIC_LINK" ] && rm "$STATIC_LINK"
    if [ ! -e "$STATIC_LINK" ]; then
        ln -s "$STATIC_TARGET" "$STATIC_LINK"
        log_success "  Static symlink: $STATIC_LINK → $STATIC_TARGET"
    fi
}

#===============================================================================
# Restart Application (Phusion Passenger)
#===============================================================================

restart_application() {
    log_info "Restarting application..."
    mkdir -p "$APP_DIR/tmp"
    touch "$APP_DIR/tmp/restart.txt"
    log_success "Application restart triggered (Phusion Passenger)."
}

#===============================================================================
# Print Summary
#===============================================================================

print_summary() {
    echo ""
    echo "============================================================"
    echo -e "${GREEN}        DEPLOYMENT COMPLETED SUCCESSFULLY${NC}"
    echo "============================================================"
    echo -e "  Environment:  ${YELLOW}$ENV_NAME${NC}"
    echo -e "  Branch:       ${YELLOW}$BRANCH${NC}"
    echo -e "  Commit:       ${YELLOW}${LATEST_COMMIT:-N/A}${NC}"
    echo -e "  App Dir:      ${YELLOW}$APP_DIR${NC}"
    echo -e "  Python:       ${YELLOW}$(source "$ACTIVATE_ENV" && python --version 2>&1)${NC}"
    echo -e "  Backup:       ${YELLOW}${BACKUP_DIR:-N/A}${NC}"
    echo -e "  Timestamp:    ${YELLOW}$(date '+%Y-%m-%d %H:%M:%S')${NC}"
    echo "============================================================"
    echo -e "  Site:  ${GREEN}https://dcrm.demosite.tech${NC}"
    echo -e "  Admin: ${GREEN}https://dcrm.demosite.tech/admin/${NC}"
    echo "============================================================"
    echo ""
}

#===============================================================================
# Main
#===============================================================================

main() {
    echo ""
    echo "============================================================"
    echo -e "${BLUE}   DCRM — cPanel Python App Deployment Script${NC}"
    echo "============================================================"
    echo -e "  Environment: ${YELLOW}$ENV_NAME${NC}"
    echo -e "  Branch:      ${YELLOW}$BRANCH${NC}"
    echo -e "  Config:      ${YELLOW}$CONFIG_PATH${NC}"
    echo -e "  Env File:    ${YELLOW}$ENV_FILE_PATH${NC}"
    echo "============================================================"
    echo ""

    load_config
    preflight_checks
    create_backup
    pull_latest_code
    sync_code
    copy_env_files
    install_dependencies
    run_migrations
    collect_static
    create_symlinks
    restart_application
    print_summary
}

main
