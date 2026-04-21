# Phase 0, Step 12 — Expense Pages

> Expense list, add expense form, category filter

## Tasks

### 12.1 Mock data

- [ ] Create `frontend/src/features/expenses/data/mock-expenses.ts`
- [ ] Mock expense categories: Salaries, Marketing, Rent, Software/Tools, Legal, Travel, Office Supplies, Other
- [ ] 20+ mock expenses: id, category, description, amount, paymentMode (Cash/UPI/Bank), date, caseId (optional), caseNumber (optional), createdBy, receiptAttached (boolean)

### 12.2 Expense list page

- [ ] Create `frontend/src/features/expenses/pages/ExpenseListPage.tsx`
- [ ] DataTable: Date, Category (badge), Description, Amount (₹), Mode, Case (if linked), Created By, Actions
- [ ] Category badges with distinct colours
- [ ] Filters: category, date range, payment mode, case-linked (yes/no)
- [ ] Search: description
- [ ] Summary cards at top: Total This Month, By Category breakdown (top 3), Month-over-Month change
- [ ] "Add Expense" button

### 12.3 Add/edit expense form

- [ ] Create `frontend/src/features/expenses/pages/ExpenseFormPage.tsx`
- [ ] TanStack Form + Zod:
  ```
  category: enum (required)
  description: string (required)
  amount: number (> 0, required)
  paymentMode: enum (Cash/UPI/Bank)
  date: date (required, default today)
  caseId: string (optional, searchable select)
  receiptAttached: boolean
  notes: string (optional)
  ```
- [ ] Submit: `console.log`

### 12.4 Expense category summary

- [ ] Create `frontend/src/features/expenses/components/CategoryBreakdown.tsx`
- [ ] Visual breakdown: horizontal stacked bar or small pie showing % by category
- [ ] Click a category to filter the table

## Verification Checklist

- [ ] Expense list renders with formatted currency and coloured category badges
- [ ] Summary cards show correct calculated totals
- [ ] Filters narrow the list (especially date range and category)
- [ ] Case-linked filter shows only expenses tied to a case
- [ ] Add form validates and submits
- [ ] Category breakdown visual renders correctly
- [ ] Responsive layout
- [ ] Git commit: `feat: expense pages — list, form, category breakdown with mock data`
