# Phase 0, Step 4 — Dashboard

> Admin dashboard + customer portal dashboard with summary cards and chart placeholders

## Tasks

### 4.1 Admin dashboard

- [ ] Create `frontend/src/features/dashboard/pages/DashboardPage.tsx`
- [ ] Summary cards row (shadcn Card): Total Leads, Active Cases, Revenue This Month, Pending Payments, Overdue Payments, Net Profit
- [ ] Use mock numbers (hardcoded)
- [ ] Cards should show: icon, label, value, % change indicator (up/down arrow)
- [ ] Charts section (placeholder):
  - Lead conversion funnel (placeholder div with label)
  - Revenue vs Expenses (bar chart placeholder)
  - Case status distribution (pie chart placeholder)
  - Monthly trend (line chart placeholder)
- [ ] Recent activity feed: last 5 items (mock data) — "Lead created", "Payment received", etc.
- [ ] Quick actions: "Add Lead", "Create Case", "Record Payment" buttons

### 4.2 Customer portal dashboard

- [ ] Create `frontend/src/features/portal/pages/PortalDashboardPage.tsx`
- [ ] Simpler layout: company logo, welcome message ("Hi, [Customer Name]")
- [ ] Summary cards: My Cases (active), Total Debt, Settlement Progress, Fees Paid / Pending
- [ ] Case progress visual: stage indicator (step progress bar) showing current stage
- [ ] Recent updates: last 3-5 notifications (mock)
- [ ] Quick links: "View Documents", "Payment History", "Upload Document"

### 4.3 Shared components

- [ ] Create `frontend/src/components/ui/stat-card.tsx` — reusable card with icon, title, value, change
- [ ] Create `frontend/src/components/ui/chart-placeholder.tsx` — labeled placeholder box for charts (replace with real charts later)

## Verification Checklist

- [ ] Admin dashboard shows all 6 summary cards with mock data
- [ ] Chart placeholders render with correct labels
- [ ] Recent activity list shows mock entries
- [ ] Quick action buttons navigate to correct routes
- [ ] Customer portal dashboard shows customer-specific cards
- [ ] Case stage progress bar renders visual stages
- [ ] Both dashboards are responsive (cards stack on mobile, grid on desktop)
- [ ] Git commit: `feat: dashboard — admin + customer portal with mock data`
