# Phase 1, Step 1 — Django Project Config

> Settings (dev/prod), auth, CORS, pymysql, admin site

## Tasks

### 1.1 Settings split

- [ ] Confirm `config/settings/base.py` exists with shared settings
- [ ] `INSTALLED_APPS` in base: `django.contrib.admin`, `django.contrib.auth`, `rest_framework`, `rest_framework_simplejwt`, `corsheaders`, and all project apps
- [ ] `MIDDLEWARE` in base: include `corsheaders.middleware.CorsMiddleware` before `CommonMiddleware`
- [ ] `AUTH_USER_MODEL = 'accounts.User'` (custom user model — set up in next step)
- [ ] `REST_FRAMEWORK` config: default authentication (JWT), pagination (PageNumberPagination, page_size=20), default permission (IsAuthenticated)

### 1.2 Development settings

- [ ] `development.py`: import from base
- [ ] `DEBUG = True`
- [ ] `DATABASES`: SQLite
- [ ] `CORS_ALLOW_ALL_ORIGINS = True`
- [ ] `INSTALLED_APPS += ['debug_toolbar']`

### 1.3 Production settings

- [ ] `production.py`: import from base
- [ ] `DEBUG = False`
- [ ] Read all secrets from `python-decouple` (`config()`)
- [ ] `DATABASES`: MySQL via pymysql (read host, name, user, pass from env)
- [ ] `CORS_ALLOWED_ORIGINS` from env
- [ ] `STATIC_ROOT`, `MEDIA_ROOT` configured
- [ ] `SECURE_SSL_REDIRECT`, `SESSION_COOKIE_SECURE`, etc.

### 1.4 pymysql setup

- [ ] In `config/__init__.py`:
  ```python
  import pymysql
  pymysql.install_as_MySQLdb()
  ```

### 1.5 URL configuration

- [ ] `config/urls.py`:
  - `/admin/` → Django admin
  - `/api/` → include app URL files
  - Catch-all → serve `templates/frontend/index.html`
- [ ] Each app gets its own `urls.py` (empty for now)

### 1.6 Create all Django apps (empty shells)

- [ ] `python manage.py startapp accounts` (custom user)
- [ ] `python manage.py startapp company` (company_settings)
- [ ] `python manage.py startapp leads`
- [ ] `python manage.py startapp customers`
- [ ] `python manage.py startapp loans`
- [ ] `python manage.py startapp cases`
- [ ] `python manage.py startapp documents`
- [ ] `python manage.py startapp fees`
- [ ] `python manage.py startapp payments`
- [ ] `python manage.py startapp expenses`
- [ ] `python manage.py startapp reports`
- [ ] `python manage.py startapp communications`
- [ ] `python manage.py startapp tasks`
- [ ] `python manage.py startapp portal`
- [ ] Add all to `INSTALLED_APPS`

### 1.7 Admin site customization

- [ ] `config/admin.py` or app-level: customize admin site header/title using company branding fallback
- [ ] `admin.site.site_header = "DCRM Admin"`
- [ ] `admin.site.site_title = "DCRM"`

## Verification Checklist

- [ ] `python manage.py check` passes with no errors
- [ ] `python manage.py runserver` starts (dev settings)
- [ ] `/admin/` loads Django admin login page
- [ ] All apps created and registered in `INSTALLED_APPS`
- [ ] CORS headers present in API responses
- [ ] `.env.example` updated with all new env keys
- [ ] Git commit: `feat: Django project config — settings, apps, CORS, admin`
