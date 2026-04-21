# DCRM — Execution Plan Index

> Debt Assistance CRM — Step-by-step execution plan across 3 phases, 40 steps total

## Phase 0 — Static UI (17 steps)

_Build all frontend pages with mock data for stakeholder approval_

| #   | Step                                                  | File                                              | Status |
| --- | ----------------------------------------------------- | ------------------------------------------------- | ------ |
| 1   | Project Scaffold (Django + Vite + Tailwind + shadcn)  | [step-01](phase-0/step-01-project-scaffold.md)    | ⬜     |
| 2   | App Shell & Layout (sidebar, topbar, routing)         | [step-02](phase-0/step-02-app-shell-layout.md)    | ⬜     |
| 3   | Auth Screens (login, OTP, forgot password)            | [step-03](phase-0/step-03-auth-screens.md)        | ⬜     |
| 4   | Dashboard (admin + portal)                            | [step-04](phase-0/step-04-dashboard.md)           | ⬜     |
| 5   | Lead Pages (list, form, detail)                       | [step-05](phase-0/step-05-lead-pages.md)          | ⬜     |
| 6   | Customer Pages (list, profile, form)                  | [step-06](phase-0/step-06-customer-pages.md)      | ⬜     |
| 7   | Loan Pages (list, form)                               | [step-07](phase-0/step-07-loan-pages.md)          | ⬜     |
| 8   | Case Pages (list, detail, form)                       | [step-08](phase-0/step-08-case-pages.md)          | ⬜     |
| 9   | Document Pages (upload, list, detail)                 | [step-09](phase-0/step-09-document-pages.md)      | ⬜     |
| 10  | Fee Pages (plans, assignments, invoice preview)       | [step-10](phase-0/step-10-fee-pages.md)           | ⬜     |
| 11  | Payment Pages (list, form, receipt preview)           | [step-11](phase-0/step-11-payment-pages.md)       | ⬜     |
| 12  | Expense Pages (list, form, category chart)            | [step-12](phase-0/step-12-expense-pages.md)       | ⬜     |
| 13  | Reports Pages (dashboard + 5 reports)                 | [step-13](phase-0/step-13-reports-pages.md)       | ⬜     |
| 14  | Lender Pages (list, detail, form)                     | [step-14](phase-0/step-14-lender-pages.md)        | ⬜     |
| 15  | Task Pages (list, kanban, form, reminders)            | [step-15](phase-0/step-15-task-pages.md)          | ⬜     |
| 16  | Customer Portal (cases, payments, documents, profile) | [step-16](phase-0/step-16-customer-portal.md)     | ⬜     |
| 17  | Communication Pages (log, call form, send, templates) | [step-17](phase-0/step-17-communication-pages.md) | ⬜     |

**Milestone:** Tag `v0.1.0-ui-approval` — stakeholder review of all static screens

---

## Phase 1 — Backend + Wiring (18 steps)

_Build Django backend, wire every frontend page to real APIs_

| #   | Step                                               | File                                               | Status |
| --- | -------------------------------------------------- | -------------------------------------------------- | ------ |
| 1   | Django Project Config (settings, apps, CORS)       | [step-01](phase-1/step-01-django-config.md)        | ⬜     |
| 2   | Company Settings (model, admin, branding API)      | [step-02](phase-1/step-02-company-settings.md)     | ⬜     |
| 3   | Auth Module (custom user, JWT, OTP)                | [step-03](phase-1/step-03-auth-module.md)          | ⬜     |
| 4   | Lead Module (model, CRUD API, wiring)              | [step-04](phase-1/step-04-lead-module.md)          | ⬜     |
| 5   | Customer Module (model, conversion, wiring)        | [step-05](phase-1/step-05-customer-module.md)      | ⬜     |
| 6   | Loan & Lender Module (models, CRUD, wiring)        | [step-06](phase-1/step-06-loan-module.md)          | ⬜     |
| 7   | Case Module (model, stages, notes, wiring)         | [step-07](phase-1/step-07-case-module.md)          | ⬜     |
| 8   | Document Module (upload, verification, wiring)     | [step-08](phase-1/step-08-document-module.md)      | ⬜     |
| 9   | Fee Module (plans, calculation, invoice, wiring)   | [step-09](phase-1/step-09-fee-module.md)           | ⬜     |
| 10  | Payment Module (recording, receipt, wiring)        | [step-10](phase-1/step-10-payment-module.md)       | ⬜     |
| 11  | Expense Module (CRUD, summary, wiring)             | [step-11](phase-1/step-11-expense-module.md)       | ⬜     |
| 12  | Reports Module (all report APIs, wiring)           | [step-12](phase-1/step-12-reports-module.md)       | ⬜     |
| 13  | Task Module (CRUD, reminders, wiring)              | [step-13](phase-1/step-13-task-module.md)          | ⬜     |
| 14  | Communication Module (calls, messages, templates)  | [step-14](phase-1/step-14-communication-module.md) | ⬜     |
| 15  | Customer Portal Backend (scoped APIs)              | [step-15](phase-1/step-15-customer-portal.md)      | ⬜     |
| 16  | RBAC (role permissions across all modules)         | [step-16](phase-1/step-16-rbac.md)                 | ⬜     |
| 17  | Activity Log (audit trail)                         | [step-17](phase-1/step-17-activity-log.md)         | ⬜     |
| 18  | Deployment (deploy.sh, passenger_wsgi, production) | [step-18](phase-1/step-18-deployment.md)           | ⬜     |

**Milestone:** Tag `v1.0.0-mvp` — fully functional CRM, deployed to production

---

## Phase 2 — Enhancements (5 steps)

_Advanced features and third-party integrations_

| #   | Step                                   | File                                           | Status |
| --- | -------------------------------------- | ---------------------------------------------- | ------ |
| 1   | WhatsApp Integration                   | [step-01](phase-2/step-01-whatsapp.md)         | ⬜     |
| 2   | Real-time Chat (internal + portal)     | [step-02](phase-2/step-02-chat.md)             | ⬜     |
| 3   | Advanced Reports & Export (PDF, Excel) | [step-03](phase-2/step-03-advanced-reports.md) | ⬜     |
| 4   | e-Sign Integration                     | [step-04](phase-2/step-04-esign.md)            | ⬜     |
| 5   | Payment Gateway (Razorpay)             | [step-05](phase-2/step-05-payment-gateway.md)  | ⬜     |

**Milestone:** Tag `v2.0.0-full` — complete system with all integrations

---

## Status Legend

| Icon | Meaning     |
| ---- | ----------- |
| ⬜   | Not started |
| 🔄   | In progress |
| ✅   | Completed   |

## How to Use

1. Open the step file for the current step
2. Follow tasks in order (each has sub-tasks with checkboxes)
3. Complete the verification checklist at the bottom
4. Update this index (change ⬜ → ✅)
5. Git commit with the message from the step file
6. Move to the next step
