# Debt Assistance CRM — Project Prompt

> Single reference file for AI-assisted development of the DCRM system.
> Combines the SRS, tech decisions from Scope.d, and coding conventions.

---

## Project Overview

A centralized CRM platform for managing the end-to-end lifecycle of customers seeking loan/debt assistance. The system covers lead acquisition, debt analysis, case workflow, fee management, expense tracking, profitability analysis, and a customer self-service portal.

**Lifecycle:** Lead → Qualification → Conversion → Customer Profile → Case Creation → Document Collection → Analysis → Negotiation → Settlement → Fee Calculation → Payment → Expense Tracking → Profit Calculation → Closure

---

## Technology Stack

| Layer                   | Technology                                                              |
| ----------------------- | ----------------------------------------------------------------------- |
| **Frontend**            | React 18+ (Vite, PWA enabled), TypeScript — lives inside Django project |
| **UI Framework**        | Tailwind CSS + shadcn/ui (fresh, modern, compact design)                |
| **Forms & Validation**  | TanStack Forms + Zod                                                    |
| **Data Fetching**       | TanStack React Query                                                    |
| **Backend**             | Django + Django REST Framework (Python)                                 |
| **SPA Serving**         | Django serves the Vite build — single deployment, no separate UI server |
| **Database (dev)**      | SQLite                                                                  |
| **Database (prod)**     | MySQL (via `pymysql`, **not** `mysqlclient`)                            |
| **Auth**                | JWT + OTP (SMS gateway)                                                 |
| **Email**               | ZeptoMail (transactional emails)                                        |
| **SMS**                 | SMS gateway integration (provider TBD)                                  |
| **Storage**             | Local server filesystem (`media/` directory)                            |
| **Hosting**             | VPS or shared hosting via cPanel                                        |
| **Realtime (optional)** | WebSockets                                                              |

---

## Architecture Principles

- **Responsive web application** — mobile-first, works on all screen sizes
- **Lightweight & high performance** — minimal bundle, fast API responses
- **Modular & scalable** — each module is self-contained
- **Best practices** — clean code, DRY, SOLID, easy to read, reusable, robust
- **Small incremental steps** — build, verify, then move forward
- **MAC-based access** — device-level access control where possible
- **Test-driven** — UI and API test cases at every step to minimise errors
- **Django Admin for everything** — register all models in Django admin for quick back-office access

---

## User Roles & Permissions

| Role            | Description                                 |
| --------------- | ------------------------------------------- |
| Admin           | Full control over all modules               |
| Sales Executive | Lead handling, partial customer access      |
| Debt Counsellor | Case management, full customer access       |
| Operations      | Documentation, case support                 |
| Accounts        | Finance, payments, expenses, full reporting |
| Customer        | Self-service portal (own data only)         |

### Permission Matrix

| Module    | Admin | Sales   | Counsellor | Ops     | Accounts | Customer |
| --------- | ----- | ------- | ---------- | ------- | -------- | -------- |
| Leads     | Full  | Full    | View       | View    | View     | No       |
| Customers | Full  | Partial | Full       | Full    | View     | Self     |
| Cases     | Full  | View    | Full       | Full    | View     | View     |
| Fees      | Full  | View    | View       | View    | Full     | View     |
| Payments  | Full  | No      | No         | No      | Full     | View     |
| Expenses  | Full  | No      | Limited    | Limited | Full     | No       |
| Reports   | Full  | Limited | Limited    | Limited | Full     | No       |

---

## System Modules

### 3.1 Lead Management

- Lead capture (manual + integrations)
- Fields: Name, Phone, Email, City, Loan type, Total debt, Income details
- Status: New → Contacted → Interested → Converted
- Lead assignment & follow-up reminders

### 3.2 Customer Management

- Personal profile, financial snapshot, risk categorization
- Linked cases, activity logs

### 3.3 Loan & Debt Management

- Multiple loans per customer
- Fields: Lender name, Outstanding amount, EMI, Interest rate, Overdue status

### 3.4 Case / Workflow Management

- Stages: Case Created → Document Collection → Analysis → Negotiation → Settlement Offer → Closure
- Case assignment, notes, timeline tracking

### 3.5 Document Management

- Upload/download (PAN, Aadhaar, Bank statements, Loan docs)
- Verification status, case tagging

### 3.6 Assistance Fee Management

- Fee models: Fixed, Percentage (based on savings), Hybrid, Milestone-based
- Fee plan creation, auto calculation, installments, invoice & receipt generation

### 3.7 Payment Tracking

- Record payments (Cash/UPI/Bank)
- Status: Paid / Pending / Overdue
- Installment handling, receipt generation

### 3.8 Expense Management

- Categories: Salaries, Marketing, Rent, Tools, etc.
- Entry: Date, amount, category, description
- Payment mode tracking, case-linked expenses

### 3.9 Profit & Financial Management

- Net Profit = Fees Collected – Expenses
- Case Profit = Case Fee – Case Expenses
- Profit dashboard, periodic reports, expense breakdown, revenue tracking

### 3.10 Communication Module

- Call logs, SMS/WhatsApp/Email tracking, templates, notifications

### 3.11 Task & Follow-up Management

- Task creation, daily reminders, escalations

### 3.12 Reporting & Analytics

- Lead conversion, case success rate, revenue/expense/profit reports, employee performance

### 3.13 Lender Management

- Lender database, contacts, negotiation history

### 3.14 Customer Portal

- **Auth:** OTP login (primary), email/password (optional)
- **Dashboard:** Case progress, debt vs settlement, fee summary
- **Features:** Loan details, case tracker (visual stages), payment tracking, document upload, notifications, agreements viewing

---

## Data Model (High-Level)

Tables: `users`, `leads`, `customers`, `loans`, `cases`, `documents`, `fee_plans`, `payments`, `invoices`, `expenses`, `expense_categories`, `tasks`, `notifications`

---

## Security Requirements

- Role-based access control (RBAC)
- MAC-based device access (where feasible)
- HTTPS encryption everywhere
- Secure document storage (server filesystem, restricted access via Django)
- Audit logs for all sensitive operations
- Regular backups

---

## Testing Strategy

- **Unit tests** — Django: pytest; React: Vitest
- **API tests** — DRF test client / pytest
- **UI tests** — React Testing Library + Playwright for E2E
- **Role-based tests** — verify permissions per role
- **Security tests** — OWASP checks, auth edge cases
- Run tests at every step before moving forward

---

## MVP Phasing

### Phase 1 (Core)

1. Lead management
2. Customer module
3. Loan tracking
4. Case workflow
5. Fee management (basic)
6. Payment tracking
7. Expense tracking
8. Customer portal (basic)

### Phase 2 (Enhancements)

1. WhatsApp integration
2. Chat system
3. Advanced reports
4. eSign
5. Payment gateway

---

## Future Enhancements

- AI-based debt advisory
- Credit score integration
- Mobile app (React Native / PWA)
- Automation workflows
- Accounting integrations

---

## Risks & Considerations

- Sensitive financial data → high security needed
- Fee calculations must be accurate
- Overengineering may delay launch — keep it simple
- UX must be simple for customers

---

## Coding Conventions

### Backend (Django)

- Use Django REST Framework serializers for all API I/O
- `pymysql` for MySQL connectivity (install via `pymysql.install_as_MySQLdb()`)
- SQLite for local development, MySQL for production
- Keep apps modular: `leads`, `customers`, `loans`, `cases`, `documents`, `fees`, `payments`, `expenses`, `reports`, `communications`, `tasks`, `portal`
- **Register all models in Django Admin** with search, filters, list display for back-office management
- JWT auth via `djangorestframework-simplejwt`
- File uploads stored locally in `media/` (no cloud storage services)
- Include `passenger_wsgi.py` at project root — required by cPanel's Phusion Passenger

### Frontend (React — inside Django project)

- Lives in `frontend/` directory at the project root (monorepo)
- Vite + TypeScript
- Tailwind CSS + shadcn/ui components
- TanStack Forms + Zod for form handling & validation
- TanStack React Query for all server state
- Folder structure: `frontend/src/features/` based (each module = feature folder)
- Responsive-first — all layouts must work on mobile
- **Build:** `cd frontend && npm run build` produces optimised output — Tailwind purged, shadcn compiled
- **Vite output config:** build output goes to `static/frontend/` (JS/CSS) and `index.html` to `templates/frontend/index.html`
- Django serves `index.html` as a catch-all template view; React Router handles client-side routing
- No separate UI deployment — everything ships as one Django app

### Project Directory Structure

```
dcrm/
├── config/                     # Django project settings
│   ├── settings/
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   └── wsgi.py
├── leads/                      # Django app
├── customers/                  # Django app
├── loans/                      # Django app
├── cases/                      # Django app
├── documents/                  # Django app
├── fees/                       # Django app
├── payments/                   # Django app
├── expenses/                   # Django app
├── reports/                    # Django app
├── communications/             # Django app
├── tasks/                      # Django app
├── portal/                     # Django app (customer portal API)
├── frontend/                   # React app (Vite)
│   ├── src/
│   │   ├── features/           # feature folders (leads, customers, etc.)
│   │   ├── components/         # shared UI components
│   │   ├── lib/                # utils, api client, auth
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
├── templates/
│   └── frontend/
│       └── index.html          # Vite-built SPA entry (served by Django)
├── static/
│   └── frontend/               # Vite-built JS/CSS assets
├── media/                      # user uploads
├── manage.py
├── passenger_wsgi.py
├── deploy.sh
├── requirements/
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
└── .env
```

### General

- Small, verifiable increments — build one module at a time
- Write tests alongside code, not after
- API-first: define endpoints, then build UI against them
- Best practices: clean, reusable, modular, robust code

---

## Deployment

- **Target:** VPS or shared hosting with cPanel
- **Strategy:** Bash deployment script (`deploy.sh`) following the same pattern as kimplaspiping/kp
- **Single deployment** — frontend and backend deploy together as one unit
- **Deployment flow:**
  1. Load config from `~/deploy_config/<env>/<env>.config`
  2. Load env vars from `~/deploy_config/<env>/<env>.env`
  3. Pre-flight checks (git, virtualenv, directories)
  4. Backup current app + MySQL database
  5. Git pull latest code from branch
  6. Rsync code to app directory (exclude `.git`, `media/`, `.env`, `node_modules/`)
  7. Copy `.env` and config files
  8. **Build frontend:** `cd frontend && npm ci && npm run build` (output to `templates/frontend/` + `static/frontend/`)
  9. Activate virtualenv, install pip dependencies
  10. Run Django migrations
  11. Collect static files (`python manage.py collectstatic`)
  12. Create symlinks for media/static in document root
  13. Touch `tmp/restart.txt` to trigger Passenger reload
- **Folder structure on server:**
  ```
  ~/deploy_config/dcrm/dcrm.config   # deployment settings
  ~/deploy_config/dcrm/dcrm.env      # environment variables
  ~/repositories/dcrm/               # git bare/clone
  ~/dcrm/                            # live app directory
  ~/dcrm/media/                      # uploaded files
  ~/dcrm/staticfiles/                # collected static
  ~/dcrm/tmp/restart.txt             # Passenger restart trigger
  ```
- **Passenger WSGI:** A `passenger_wsgi.py` file must exist at the app root — cPanel uses Phusion Passenger for Python apps
  ```python
  # passenger_wsgi.py
  import os
  os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")
  from django.core.wsgi import get_wsgi_application
  application = get_wsgi_application()
  ```
- **Frontend build (during deploy):**
  - `cd frontend && npm ci && npm run build`
  - Vite outputs JS/CSS to `static/frontend/` and `index.html` to `templates/frontend/index.html`
  - Django's `collectstatic` then gathers everything into `staticfiles/`
  - Django catch-all view serves `index.html`; React Router handles all client-side routes

---

## Example Environment Files

### Backend `.env` (example)

```env
# Django
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database (production — MySQL via pymysql)
DATABASE_NAME=dcrm_db
DATABASE_USER=dcrm_user
DATABASE_PASSWORD=strong-password-here
DATABASE_HOST=localhost
DATABASE_PORT=3306

# JWT
JWT_SECRET_KEY=your-jwt-secret
JWT_ACCESS_TOKEN_LIFETIME_MINUTES=60
JWT_REFRESH_TOKEN_LIFETIME_DAYS=7

# Email — ZeptoMail
ZEPTOMAIL_API_KEY=your-zeptomail-api-key
ZEPTOMAIL_FROM_EMAIL=noreply@yourdomain.com

# SMS Gateway
SMS_GATEWAY_API_KEY=your-sms-api-key
SMS_GATEWAY_SENDER_ID=DCRM

# CORS
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

### Frontend `.env` (example)

```env
# API
VITE_API_BASE_URL=https://api.yourdomain.com

# App
VITE_APP_NAME=Debt Assistance CRM
```
