# Phase 0, Step 6 — Customer Pages

> Customer list, profile with financial snapshot, activity log

## Tasks

### 6.1 Mock data

- [ ] Create `frontend/src/features/customers/data/mock-customers.ts`
- [ ] 10-15 mock customers: id, name, phone, email, city, dateOfBirth, pan, aadhaar, monthlyIncome, riskCategory (Low/Medium/High), totalDebt, totalLoans, activeCases, status (Active/Inactive), createdAt, convertedFromLeadId

### 6.2 Customer list page

- [ ] Create `frontend/src/features/customers/pages/CustomerListPage.tsx`
- [ ] DataTable: Name, Phone, City, Risk (badge), Total Debt, Active Cases, Status, Created
- [ ] Risk badges: Low=green, Medium=yellow, High=red
- [ ] Filters: risk category, status, city, search (name/phone/email)
- [ ] Pagination
- [ ] Row click → `/customers/:id`

### 6.3 Customer detail / profile page

- [ ] Create `frontend/src/features/customers/pages/CustomerDetailPage.tsx`
- [ ] Header: name, risk badge, status, action buttons (Edit, Deactivate)
- [ ] **Personal info** section: phone, email, city, DOB, PAN, Aadhaar (masked)
- [ ] **Financial snapshot** card: total debt, monthly income, debt-to-income ratio, number of loans
- [ ] **Linked loans** table: lender, amount, EMI, overdue status (links to loan detail)
- [ ] **Linked cases** table: case ID, stage, counsellor, created date (links to case detail)
- [ ] **Fee summary**: total fees, paid, pending
- [ ] **Activity log**: timeline of actions (mock entries: "Lead converted", "Case created", "Document uploaded", "Payment received")

### 6.4 Customer edit form

- [ ] Create `frontend/src/features/customers/pages/CustomerEditPage.tsx`
- [ ] TanStack Form + Zod: name, phone, email, city, dob, pan, aadhaar, monthlyIncome
- [ ] Pre-fill from mock data
- [ ] Submit: `console.log` (no API)

## Verification Checklist

- [ ] Customer list renders mock data with correct badges
- [ ] Filters and search narrow the list
- [ ] Customer detail page shows all sections
- [ ] Financial snapshot calculates debt-to-income ratio from mock data
- [ ] Linked loans/cases tables render and link correctly
- [ ] Activity log timeline renders in chronological order
- [ ] Edit form pre-fills and validates
- [ ] Responsive on all screen sizes
- [ ] Git commit: `feat: customer pages — list, profile, edit with mock data`
