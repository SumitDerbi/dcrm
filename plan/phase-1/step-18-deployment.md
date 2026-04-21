# Phase 1, Step 18 — Deployment Setup

> deploy.sh script, passenger_wsgi.py, .env files, static/media config, production checklist

## Tasks

### 18.1 passenger_wsgi.py

- [ ] Create `passenger_wsgi.py` at project root:

  ```python
  import os
  import sys

  sys.path.insert(0, os.path.dirname(__file__))
  os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')

  from django.core.wsgi import get_wsgi_application
  application = get_wsgi_application()
  ```

### 18.2 deploy.sh script

- [ ] Create `deploy.sh`:

  ```bash
  #!/bin/bash
  set -e

  echo "=== DCRM Deployment ==="

  # Pull latest code
  git pull origin main

  # Backend
  source venv/bin/activate
  pip install -r requirements.txt
  python manage.py migrate --settings=config.settings.production
  python manage.py collectstatic --noinput --settings=config.settings.production

  # Frontend
  cd frontend
  npm ci
  npm run build
  cd ..

  # Restart (cPanel/Passenger)
  touch tmp/restart.txt

  echo "=== Deployment Complete ==="
  ```

- [ ] Make executable: `chmod +x deploy.sh`

### 18.3 Environment files

- [ ] Update `.env.example` with all required keys:
  ```
  SECRET_KEY=
  DEBUG=False
  ALLOWED_HOSTS=
  DB_NAME=
  DB_USER=
  DB_PASSWORD=
  DB_HOST=
  DB_PORT=
  CORS_ALLOWED_ORIGINS=
  SMS_API_KEY=
  ZEPTOMAIL_API_KEY=
  ```
- [ ] Create `.env.dev.example` for development defaults

### 18.4 Static files & media

- [ ] `STATIC_ROOT = BASE_DIR / 'staticfiles'`
- [ ] `MEDIA_ROOT = BASE_DIR / 'media'`
- [ ] Frontend build outputs to `static/frontend/` (already configured in Vite)
- [ ] `collectstatic` gathers everything to `staticfiles/`
- [ ] `.htaccess` for cPanel if needed (serve static/media directly)

### 18.5 requirements.txt

- [ ] Ensure all production dependencies listed:
  ```
  django
  djangorestframework
  djangorestframework-simplejwt
  django-cors-headers
  django-filter
  pymysql
  python-decouple
  Pillow
  gunicorn
  ```

### 18.6 Production security

- [ ] `SECURE_SSL_REDIRECT = True`
- [ ] `SESSION_COOKIE_SECURE = True`
- [ ] `CSRF_COOKIE_SECURE = True`
- [ ] `SECURE_HSTS_SECONDS = 31536000`
- [ ] `X_FRAME_OPTIONS = 'DENY'`
- [ ] `python manage.py check --deploy` passes

### 18.7 README update

- [ ] Update `README.md` with:
  - Project overview
  - Local dev setup instructions
  - Production deployment instructions
  - Environment variables reference

## Verification Checklist

- [ ] `passenger_wsgi.py` works on Passenger/cPanel
- [ ] `deploy.sh` runs without errors
- [ ] `python manage.py check --deploy` passes
- [ ] `collectstatic` gathers all static files
- [ ] Frontend build + Django serving works in production mode
- [ ] `.env.example` has all required keys
- [ ] README is complete
- [ ] Git commit: `feat: deployment — passenger_wsgi, deploy.sh, production config`
- [ ] Git tag: `v1.0.0-mvp`

---

## Phase 1 Complete — Final Verification

After all 18 steps:

- [ ] All modules have backend API + frontend wired
- [ ] No mock data remains in frontend — all real API calls
- [ ] RBAC enforced on all endpoints
- [ ] Activity logging on all CRUD operations
- [ ] All tests pass: `python manage.py test`
- [ ] Frontend build succeeds: `cd frontend && npm run build`
- [ ] Full app works locally end-to-end
- [ ] Deploy script works on target server
- [ ] **Full QA pass**: create lead → convert to customer → add loans → create case → add documents → assign fees → record payments → generate reports
