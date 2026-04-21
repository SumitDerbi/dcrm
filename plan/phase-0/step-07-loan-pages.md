# Phase 0, Step 7 — Loan Pages

> Loan list per customer, add/edit loan form

## Tasks

### 7.1 Mock data

- [ ] Create `frontend/src/features/loans/data/mock-loans.ts`
- [ ] 15-20 mock loans: id, customerId, customerName, lenderName, loanType (Personal/Home/Business/Vehicle/Credit Card), outstandingAmount, originalAmount, emi, interestRate, overdueAmount, overdueMonths, status (Active/Settled/Written Off), startDate, endDate

### 7.2 Loan list page

- [ ] Create `frontend/src/features/loans/pages/LoanListPage.tsx`
- [ ] DataTable: Customer, Lender, Type, Outstanding, EMI, Interest Rate, Overdue, Status (badge)
- [ ] Status badges: Active=blue, Settled=green, Written Off=red
- [ ] Filters: loan type, status, lender, overdue (yes/no)
- [ ] Search: customer name, lender name
- [ ] "Add Loan" button → `/loans/new`
- [ ] Row click shows inline expand or navigates to customer detail

### 7.3 Loan form (add/edit)

- [ ] Create `frontend/src/features/loans/pages/LoanFormPage.tsx`
- [ ] TanStack Form + Zod:
  ```
  customerId: string (required, select from customers)
  lenderName: string (required)
  loanType: enum (required)
  originalAmount: number (> 0)
  outstandingAmount: number (> 0)
  emi: number (> 0)
  interestRate: number (0-100)
  overdueAmount: number (>= 0)
  overdueMonths: number (>= 0)
  startDate: date (required)
  ```
- [ ] Customer select: searchable dropdown from mock customers
- [ ] Lender select: searchable dropdown from mock lenders (or free text)
- [ ] Submit: `console.log`

### 7.4 Loan detail (inline in customer page)

- [ ] Loan details are primarily shown inside the Customer Detail page
- [ ] Expanding a loan row shows: full details, payment history placeholder, settlement status

## Verification Checklist

- [ ] Loan list shows all mock loans with correct formatting (currency, %)
- [ ] Filters and search work
- [ ] Add loan form validates all fields
- [ ] Customer dropdown is searchable
- [ ] Currency fields format correctly (₹ symbol, commas)
- [ ] Overdue badges highlight in red when overdue > 0
- [ ] Responsive layout
- [ ] Git commit: `feat: loan pages — list, form with mock data`
