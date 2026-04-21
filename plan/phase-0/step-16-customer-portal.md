# Phase 0, Step 16 — Customer Portal

> Customer-facing dashboard, case tracker, payment history, document upload

## Tasks

### 16.1 Portal layout

- [ ] Create `frontend/src/features/portal/components/PortalLayout.tsx`
- [ ] Simpler layout than admin: top nav only (no sidebar) or minimal sidebar
- [ ] Company logo + name from branding
- [ ] Customer name + avatar placeholder
- [ ] Nav: Dashboard, My Cases, Payments, Documents, Notifications, Profile
- [ ] Logout button
- [ ] Mobile: responsive top nav with hamburger

### 16.2 Portal routes

- [ ] `/portal/` → Portal Dashboard (already done in step 4)
- [ ] `/portal/cases` → My Cases list
- [ ] `/portal/cases/:id` → Case detail with tracker
- [ ] `/portal/payments` → Payment history
- [ ] `/portal/documents` → My Documents + upload
- [ ] `/portal/notifications` → Notifications list
- [ ] `/portal/profile` → My Profile

### 16.3 My Cases page

- [ ] Create `frontend/src/features/portal/pages/PortalCasesPage.tsx`
- [ ] Card-based layout (not table): each case as a card showing:
  - Case number, stage progress bar (reuse stage-stepper), total debt, settlement status
- [ ] Click card → case detail

### 16.4 Portal case detail

- [ ] Create `frontend/src/features/portal/pages/PortalCaseDetailPage.tsx`
- [ ] Stage stepper (read-only)
- [ ] Debt summary: original debt, settlement amount, savings
- [ ] Linked documents list (read-only)
- [ ] Fee summary: total fee, paid, pending
- [ ] Recent updates timeline

### 16.5 Payment history page

- [ ] Create `frontend/src/features/portal/pages/PortalPaymentsPage.tsx`
- [ ] Table/card list: Date, Amount, Mode, Receipt #, Status
- [ ] Summary: Total Paid, Pending
- [ ] "View Receipt" button → receipt preview (reuse from payment module)

### 16.6 My Documents page

- [ ] Create `frontend/src/features/portal/pages/PortalDocumentsPage.tsx`
- [ ] List of uploaded documents with status badges
- [ ] "Upload Document" button → reuse upload component
- [ ] Customer can only see their own documents

### 16.7 Notifications page

- [ ] Create `frontend/src/features/portal/pages/PortalNotificationsPage.tsx`
- [ ] List of notifications: icon, message, timestamp, read/unread badge
- [ ] Mock notifications: "Document verified", "Payment received", "Case moved to Negotiation"

### 16.8 Profile page

- [ ] Create `frontend/src/features/portal/pages/PortalProfilePage.tsx`
- [ ] Read-only view of customer info (name, phone, email)
- [ ] "Request Profile Update" button (just shows a message for now)

## Verification Checklist

- [ ] Portal layout is visually distinct from admin (simpler, customer-friendly)
- [ ] Company branding appears in portal nav
- [ ] My Cases shows cards with stage stepper
- [ ] Case detail shows read-only info and timeline
- [ ] Payment history shows formatted data and receipt link
- [ ] Document upload UI works (mock)
- [ ] Notifications render with read/unread state
- [ ] Profile shows customer info
- [ ] All portal pages responsive
- [ ] Portal routes are separate from admin routes
- [ ] Git commit: `feat: customer portal — dashboard, cases, payments, documents, profile`
