# Phase 0, Step 14 — Lender Pages

> Lender list, detail with contacts and negotiation history

## Tasks

### 14.1 Mock data

- [ ] Create `frontend/src/features/lenders/data/mock-lenders.ts`
- [ ] 8-10 mock lenders: id, name, type (Bank/NBFC/Fintech/Other), contactPerson, contactPhone, contactEmail, address, totalCasesHandled, avgSettlementRate, notes
- [ ] Mock negotiation history: lenderId, caseId, customerName, originalAmount, negotiatedAmount, discount%, outcome (Success/Failed/In Progress), date, negotiatedBy

### 14.2 Lender list page

- [ ] Create `frontend/src/features/lenders/pages/LenderListPage.tsx`
- [ ] DataTable: Name, Type (badge), Contact Person, Phone, Cases Handled, Avg Settlement %, Actions
- [ ] Filters: type
- [ ] Search: name, contact person
- [ ] "Add Lender" button

### 14.3 Lender detail page

- [ ] Create `frontend/src/features/lenders/pages/LenderDetailPage.tsx`
- [ ] Header: name, type badge, action buttons (Edit, Delete)
- [ ] Contact info: person, phone, email, address
- [ ] Stats: total cases, avg settlement rate, success rate
- [ ] **Negotiation history** table: Case, Customer, Original Amount, Negotiated, Discount %, Outcome (badge), Date
- [ ] Outcome badges: Success=green, Failed=red, In Progress=yellow

### 14.4 Lender form (add/edit)

- [ ] Create `frontend/src/features/lenders/pages/LenderFormPage.tsx`
- [ ] TanStack Form + Zod:
  ```
  name: string (required)
  type: enum (Bank/NBFC/Fintech/Other)
  contactPerson: string
  contactPhone: string
  contactEmail: string (email)
  address: string
  notes: string
  ```

## Verification Checklist

- [ ] Lender list renders with type badges
- [ ] Detail page shows contact info and negotiation history
- [ ] Stats calculate from mock negotiation data
- [ ] Form validates and submits
- [ ] Responsive layout
- [ ] Git commit: `feat: lender pages — list, detail, form with mock data`
