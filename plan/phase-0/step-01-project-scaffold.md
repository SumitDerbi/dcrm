# Phase 0, Step 1 — Project Scaffold

> Django project + Vite React app + Tailwind + shadcn setup

## Tasks

### 1.1 Initialize Django project

- [ ] Create Django project with `config` as the project directory name
- [ ] Create `config/settings/` directory with `base.py`, `development.py`, `production.py`
- [ ] In `base.py`: set `INSTALLED_APPS`, `MIDDLEWARE`, `TEMPLATES` (include `templates/` dir), `STATICFILES_DIRS` (include `static/`)
- [ ] In `development.py`: `DEBUG=True`, SQLite database, `ALLOWED_HOSTS=['*']`
- [ ] In `production.py`: `DEBUG=False`, MySQL via pymysql, read from env vars
- [ ] Add `pymysql.install_as_MySQLdb()` in `config/__init__.py`
- [ ] Create `manage.py` pointing to `config.settings.development`
- [ ] Create `passenger_wsgi.py` pointing to `config.settings.production`
- [ ] Create `requirements/base.txt`, `development.txt`, `production.txt`
  - base: `django`, `djangorestframework`, `djangorestframework-simplejwt`, `django-cors-headers`, `python-decouple`, `Pillow`
  - development: `-r base.txt`, `django-debug-toolbar`
  - production: `-r base.txt`, `pymysql`, `gunicorn`
- [ ] Create `.env.example` with all env var keys
- [ ] Create `.gitignore` (Python + Node + IDE + `.env` + `db.sqlite3` + `media/` + `staticfiles/` + `node_modules/`)

### 1.2 Initialize Vite React app inside `frontend/`

- [ ] Run `npm create vite@latest frontend -- --template react-ts`
- [ ] Verify: `cd frontend && npm install && npm run dev` → Vite dev server starts
- [ ] Clean up default Vite boilerplate (remove default App.tsx content, CSS)

### 1.3 Install & configure Tailwind CSS

- [ ] `cd frontend && npm install -D tailwindcss @tailwindcss/vite`
- [ ] Add Tailwind vite plugin in `vite.config.ts`
- [ ] Add `@import "tailwindcss"` in `src/index.css`
- [ ] Verify: add `<h1 className="text-3xl font-bold text-blue-600">Hello</h1>` → styles render

### 1.4 Install & configure shadcn/ui

- [ ] Run `npx shadcn@latest init` in `frontend/`
- [ ] Choose defaults: TypeScript, Tailwind, `src/components/ui`
- [ ] Install a test component: `npx shadcn@latest add button`
- [ ] Verify: render `<Button>Test</Button>` → shadcn button renders correctly

### 1.5 Install TanStack + Zod + React Router

- [ ] `npm install @tanstack/react-query @tanstack/react-form zod react-router-dom`
- [ ] Create `src/lib/query-client.ts` — export a `QueryClient` instance
- [ ] Wrap `App` with `QueryClientProvider` in `main.tsx`
- [ ] Create `src/lib/router.tsx` — basic `BrowserRouter` with a placeholder `/` route
- [ ] Verify: app loads without errors, React Query devtools visible in dev

### 1.6 Configure Vite build output for Django

- [ ] Update `vite.config.ts`:
  - `build.outDir`: `../static/frontend`
  - `build.emptyOutDir`: true
  - Plugin or post-build script to copy `index.html` to `../templates/frontend/index.html`
  - `base`: `/static/frontend/`
- [ ] Create Django view in `config/urls.py`: catch-all route serves `templates/frontend/index.html`
- [ ] Verify: `cd frontend && npm run build` → files appear in `static/frontend/` and `templates/frontend/index.html`
- [ ] Verify: `python manage.py runserver` → visiting `http://localhost:8000` serves the React app

### 1.7 Dev workflow setup

- [ ] Add Vite proxy config: API calls to `/api/` proxy to `localhost:8000` in dev
- [ ] Create `frontend/src/lib/api-client.ts` — axios or fetch wrapper with base URL from env
- [ ] Create `frontend/.env.development` with `VITE_API_BASE_URL=http://localhost:8000`
- [ ] Verify: Vite dev server (`npm run dev` on port 5173) + Django (`runserver` on port 8000) work together

## Verification Checklist

- [ ] `python manage.py runserver` starts without errors
- [ ] `cd frontend && npm run dev` starts Vite dev server
- [ ] `cd frontend && npm run build` outputs to `static/frontend/` and `templates/frontend/`
- [ ] Visiting Django at `localhost:8000` serves the built React app
- [ ] Tailwind classes render correctly
- [ ] shadcn Button component renders
- [ ] React Router navigates without page reload
- [ ] `.gitignore` excludes `node_modules/`, `.env`, `db.sqlite3`, `media/`, `staticfiles/`
- [ ] Git commit: `feat: project scaffold — Django + Vite + Tailwind + shadcn`
