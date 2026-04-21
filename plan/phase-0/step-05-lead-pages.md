# Phase 0, Step 5 — Lead Pages

> Lead list (table with filters), create/edit form, detail view

## Tasks

### 5.1 Mock data

- [ ] Create `frontend/src/features/leads/data/mock-leads.ts`
- [ ] 15-20 mock leads with fields: id, name, phone, email, city, loanType, totalDebt, income, status (New/Contacted/Interested/Converted), assignedTo, source, createdAt, lastFollowUp, notes

### 5.2 Lead list page

- [ ] Create `frontend/src/features/leads/pages/LeadListPage.tsx`
- [ ] shadcn DataTable with columns: Name, Phone, City, Loan Type, Total Debt, Status (badge), Assigned To, Created, Actions
- [ ] Status badges: colour-coded (New=gray, Contacted=blue, Interested=yellow, Converted=green)
- [ ] Filters bar above table:
  - Status dropdown (multi-select)
  - Loan type dropdown
  - City text search
  - Date range picker
  - Assigned to dropdown
- [ ] Search input: search by name, phone, email
- [ ] Pagination (client-side for now)
- [ ] "Add Lead" button → navigates to `/leads/new`
- [ ] Row click → navigates to `/leads/:id`
- [ ] Bulk actions: select multiple → assign, change status

### 5.3 Lead create/edit form

- [ ] Create `frontend/src/features/leads/pages/LeadFormPage.tsx`
- [ ] TanStack Form + Zod schema:
  ```
  name: string (required)
  phone: string (10 digits, required)
  email: string (email format, optional)
  city: string (required)
  loanType: enum (Personal/Home/Business/Vehicle/Credit Card/Other)
  totalDebt: number (> 0, required)
  monthlyIncome: number (optional)
  source: enum (Website/Referral/Ad/Walk-in/Other)
  notes: string (optional)
  ```
- [ ] Fields use shadcn Input, Select, Textarea
- [ ] Inline validation errors (Zod)
- [ ] Submit: `console.log(values)` (no API)
- [ ] Cancel button → back to list
- [ ] Same form for create and edit (pre-filled in edit mode from mock data)

### 5.4 Lead detail page

- [ ] Create `frontend/src/features/leads/pages/LeadDetailPage.tsx`
- [ ] Header: name, status badge, action buttons (Edit, Convert to Customer, Delete)
- [ ] Info section: all lead fields in a clean grid
- [ ] Status timeline: visual history of status changes (mock)
- [ ] Follow-up section: next follow-up date, add follow-up button
- [ ] Notes section: list of notes with timestamps (mock)
- [ ] Activity log: recent actions (mock)

## Verification Checklist

- [ ] Lead list loads with mock data, all columns visible
- [ ] Filters narrow down the list correctly
- [ ] Search by name/phone works
- [ ] Pagination controls work
- [ ] Clicking a row navigates to detail page with correct data
- [ ] Create form validates all fields (submit with empty → errors show)
- [ ] Edit form pre-fills data from mock lead
- [ ] Detail page shows all sections with mock data
- [ ] Status badges are colour-coded
- [ ] All pages responsive (table scrolls horizontally on mobile, form stacks)
- [ ] Git commit: `feat: lead pages — list, form, detail with mock data`
