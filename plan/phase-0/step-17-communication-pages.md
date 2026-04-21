# Phase 0, Step 17 — Communication Pages

> Call log, SMS/email log, templates

## Tasks

### 17.1 Mock data

- [ ] Create `frontend/src/features/communications/data/mock-communications.ts`
- [ ] Mock call logs (10+): id, customerId, customerName, phone, direction (Inbound/Outbound), duration, outcome (Connected/No Answer/Busy/Voicemail), notes, calledBy, calledAt
- [ ] Mock SMS/email logs (10+): id, customerId, customerName, channel (SMS/Email/WhatsApp), recipient, subject (if email), body snippet, status (Sent/Delivered/Failed), sentBy, sentAt
- [ ] Mock templates (5-8): id, name, channel (SMS/Email/WhatsApp), subject, body (with placeholders like `{{customer_name}}`, `{{case_number}}`), isActive

### 17.2 Communication log page

- [ ] Create `frontend/src/features/communications/pages/CommunicationLogPage.tsx`
- [ ] Tab view: All | Calls | SMS | Email | WhatsApp
- [ ] DataTable: Date, Customer, Channel (badge), Direction/Subject, Status (badge), By, Actions
- [ ] Channel badges with icons: Phone=📞, SMS=💬, Email=📧, WhatsApp=green icon
- [ ] Filters: channel, status, date range, customer
- [ ] Search: customer name, content

### 17.3 Call log entry form

- [ ] Create `frontend/src/features/communications/components/CallLogForm.tsx`
- [ ] Modal or side panel form:
  ```
  customerId: searchable select
  phone: auto-filled from customer
  direction: Inbound/Outbound
  duration: number (minutes)
  outcome: enum
  notes: textarea
  ```
- [ ] "Log Call" button on communication page

### 17.4 Send message form

- [ ] Create `frontend/src/features/communications/components/SendMessageForm.tsx`
- [ ] Modal form:
  ```
  channel: SMS/Email/WhatsApp
  customerId: searchable select
  recipient: auto-filled (phone for SMS/WhatsApp, email for Email)
  templateId: optional select (auto-fills body)
  subject: string (if email)
  body: textarea
  ```
- [ ] Template select: choosing a template fills the body with placeholder text
- [ ] "Send" button → `console.log`

### 17.5 Template management page

- [ ] Create `frontend/src/features/communications/pages/TemplateListPage.tsx`
- [ ] DataTable: Name, Channel, Subject, Active (toggle), Actions
- [ ] "Create Template" button
- [ ] Template form: name, channel, subject, body (textarea with placeholder hints)
- [ ] Preview: show rendered template with sample data

## Verification Checklist

- [ ] Communication log shows all mock entries with correct channel icons
- [ ] Tab filtering works (All, Calls, SMS, etc.)
- [ ] Call log form validates and submits
- [ ] Send message form: template select auto-fills body
- [ ] Template list renders with active toggles
- [ ] Template preview shows rendered content
- [ ] All pages responsive
- [ ] Git commit: `feat: communication pages — log, call form, send, templates with mock data`

---

## Phase 0 Complete — Final Verification

After all 17 steps:

- [ ] Every route in the app loads a real page (no placeholder `<h1>` left)
- [ ] All forms use TanStack Forms + Zod validation
- [ ] All tables use shadcn DataTable pattern
- [ ] Company branding (logo, name, colours) flows through entire app
- [ ] Customer portal is visually separate from admin CRM
- [ ] All pages are responsive (test on 375px, 768px, 1024px, 1440px)
- [ ] No console errors
- [ ] Build works: `cd frontend && npm run build` succeeds
- [ ] Django serves built app: `python manage.py runserver` → app loads
- [ ] **Stakeholder review:** walk through every screen, collect feedback
- [ ] Git tag: `v0.1.0-ui-approval`
