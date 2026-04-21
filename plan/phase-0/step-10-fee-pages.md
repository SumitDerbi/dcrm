# Phase 0, Step 10 — Fee Pages

> Fee plan list, create fee plan form, fee assignment view

## Tasks

### 10.1 Mock data

- [ ] Create `frontend/src/features/fees/data/mock-fees.ts`
- [ ] Mock fee plans (5-8): id, name, feeModel (Fixed/Percentage/Hybrid/Milestone), fixedAmount, percentage, milestones[], description, isActive
- [ ] Mock fee assignments (10-15): id, customerId, customerName, caseId, feePlanId, feePlanName, totalFee, paidAmount, pendingAmount, installments[], status (Active/Completed/Cancelled), createdAt

### 10.2 Fee plan list page

- [ ] Create `frontend/src/features/fees/pages/FeePlanListPage.tsx`
- [ ] DataTable: Plan Name, Model (badge), Amount/Rate, Active (toggle), Actions
- [ ] Model badges: Fixed=blue, Percentage=purple, Hybrid=orange, Milestone=teal
- [ ] "Create Fee Plan" button

### 10.3 Fee plan create/edit form

- [ ] Create `frontend/src/features/fees/pages/FeePlanFormPage.tsx`
- [ ] TanStack Form + Zod:
  ```
  name: string (required)
  feeModel: enum (Fixed/Percentage/Hybrid/Milestone)
  fixedAmount: number (required if Fixed or Hybrid)
  percentage: number (required if Percentage or Hybrid, 0-100)
  milestones: array of { stageName, percentage } (if Milestone)
  description: string (optional)
  ```
- [ ] Dynamic form: fields change based on selected feeModel
- [ ] Milestone model: add/remove milestone rows dynamically
- [ ] Submit: `console.log`

### 10.4 Fee assignment / customer fee view

- [ ] Create `frontend/src/features/fees/pages/FeeAssignmentPage.tsx`
- [ ] List of fee assignments: Customer, Case, Plan, Total Fee, Paid, Pending, Status
- [ ] Filters: status, customer, fee plan
- [ ] Clicking a row shows detail:
  - Fee breakdown: total, paid, pending
  - Installment schedule: table of installments (date, amount, status: Paid/Due/Overdue)
  - "Assign Fee Plan" button: select customer + case + fee plan → preview calculated fee → confirm

### 10.5 Invoice preview

- [ ] Create `frontend/src/features/fees/components/InvoicePreview.tsx`
- [ ] Modal or page: shows a printable invoice layout
  - Company name/logo from branding
  - Customer details
  - Fee breakdown line items
  - Total, paid, balance due
  - Invoice number, date
- [ ] "Print" / "Download" button (mock — just `window.print()` for now)

## Verification Checklist

- [ ] Fee plan list shows mock plans with correct model badges
- [ ] Create form dynamically changes fields based on fee model
- [ ] Milestone model allows adding/removing milestone rows
- [ ] Fee assignment list shows correct calculated amounts
- [ ] Installment schedule renders with correct statuses
- [ ] Invoice preview shows company branding, customer details, fee lines
- [ ] Print button triggers browser print dialog
- [ ] All pages responsive
- [ ] Git commit: `feat: fee pages — plans, assignments, invoice preview with mock data`
