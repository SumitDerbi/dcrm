# Phase 0, Step 8 — Case Pages

> Case list, detail with stage timeline, notes, assignment

## Tasks

### 8.1 Mock data

- [ ] Create `frontend/src/features/cases/data/mock-cases.ts`
- [ ] 10-15 mock cases: id, caseNumber, customerId, customerName, stage (Case Created/Document Collection/Analysis/Negotiation/Settlement Offer/Closure), assignedTo, counsellor, totalDebt, settlementAmount, savingsAmount, createdAt, updatedAt, notes[], timeline[]

### 8.2 Case list page

- [ ] Create `frontend/src/features/cases/pages/CaseListPage.tsx`
- [ ] DataTable: Case #, Customer, Stage (badge), Counsellor, Total Debt, Settlement, Created, Actions
- [ ] Stage badges with distinct colours per stage
- [ ] Filters: stage dropdown, counsellor, date range
- [ ] Search: case number, customer name
- [ ] "Create Case" button
- [ ] Row click → `/cases/:id`

### 8.3 Case detail page

- [ ] Create `frontend/src/features/cases/pages/CaseDetailPage.tsx`
- [ ] **Header:** case number, customer name (link), stage badge, action buttons (Edit, Move to Next Stage, Close)
- [ ] **Stage timeline:** horizontal stepper component showing all 6 stages, current stage highlighted, completed stages checked
  - Stages: Case Created → Document Collection → Analysis → Negotiation → Settlement Offer → Closure
  - Each stage shows date completed (if done)
- [ ] **Case info:** total debt, settlement target, assigned counsellor, ops person
- [ ] **Linked loans:** table of customer's loans tied to this case
- [ ] **Documents section:** list of documents with status (links to document upload)
- [ ] **Notes:** list of timestamped notes, "Add Note" form (textarea + submit)
- [ ] **Activity timeline:** chronological list of all case events (mock)

### 8.4 Case create form

- [ ] Create `frontend/src/features/cases/pages/CaseFormPage.tsx`
- [ ] TanStack Form + Zod:
  ```
  customerId: string (required, searchable select)
  loanIds: string[] (multi-select — customer's loans)
  assignedCounsellor: string (required, select)
  assignedOps: string (optional, select)
  notes: string (optional)
  ```
- [ ] Customer select auto-populates loan options
- [ ] Submit: `console.log`

### 8.5 Stage stepper component

- [ ] Create `frontend/src/components/ui/stage-stepper.tsx`
- [ ] Reusable: accepts `stages[]` and `currentStage`
- [ ] Visual: horizontal on desktop, vertical on mobile
- [ ] Completed stages: green check, current: pulsing dot, future: grey dot

## Verification Checklist

- [ ] Case list renders with correct stage badges
- [ ] Stage stepper shows correct current stage on detail page
- [ ] Moving to next stage (button) updates the stepper visually (mock state change)
- [ ] Notes section allows adding a note (appends to mock list)
- [ ] Linked loans table shows correct data
- [ ] Case create form: selecting customer populates their loans
- [ ] All pages responsive; stepper goes vertical on mobile
- [ ] Git commit: `feat: case pages — list, detail, stepper, form with mock data`
