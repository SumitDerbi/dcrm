# Phase 0, Step 11 — Payment Pages

> Payment list, record payment form, receipt preview

## Tasks

### 11.1 Mock data

- [ ] Create `frontend/src/features/payments/data/mock-payments.ts`
- [ ] 15-20 mock payments: id, customerId, customerName, caseId, feeAssignmentId, amount, paymentMode (Cash/UPI/Bank Transfer/Cheque), referenceNumber, paymentDate, status (Paid/Pending/Overdue/Failed), receiptNumber, notes, createdBy

### 11.2 Payment list page

- [ ] Create `frontend/src/features/payments/pages/PaymentListPage.tsx`
- [ ] DataTable: Receipt #, Customer, Amount (₹), Mode (badge), Date, Status (badge), Actions
- [ ] Mode badges: Cash=gray, UPI=purple, Bank=blue, Cheque=orange
- [ ] Status badges: Paid=green, Pending=yellow, Overdue=red, Failed=gray
- [ ] Filters: status, payment mode, date range, customer
- [ ] Search: customer name, receipt number, reference number
- [ ] Summary row at top: Total Collected, Pending, Overdue (calculated from mock)
- [ ] "Record Payment" button

### 11.3 Record payment form

- [ ] Create `frontend/src/features/payments/pages/PaymentFormPage.tsx`
- [ ] TanStack Form + Zod:
  ```
  customerId: string (required, searchable select)
  caseId: string (required, auto-filtered by customer)
  feeAssignmentId: string (auto-filtered by case)
  amount: number (> 0, required)
  paymentMode: enum (Cash/UPI/Bank Transfer/Cheque)
  referenceNumber: string (required if UPI/Bank/Cheque)
  paymentDate: date (required, default today)
  notes: string (optional)
  ```
- [ ] Cascading selects: Customer → Case → Fee Assignment (shows pending amount)
- [ ] Display pending amount for selected fee assignment
- [ ] Submit: `console.log`

### 11.4 Receipt preview

- [ ] Create `frontend/src/features/payments/components/ReceiptPreview.tsx`
- [ ] Modal or page: printable receipt layout
  - Company name/logo from branding
  - Receipt number, date
  - Customer name, phone
  - Amount (in words + figures)
  - Payment mode, reference
  - "Thank you" footer
- [ ] "Print" button → `window.print()`

## Verification Checklist

- [ ] Payment list shows mock data with formatted currency
- [ ] Summary row shows correct totals
- [ ] Filters and search work
- [ ] Record payment form: cascading selects work (customer → case → fee)
- [ ] Pending amount displays for selected fee assignment
- [ ] Receipt preview shows company branding and payment details
- [ ] Print button triggers browser print
- [ ] All pages responsive
- [ ] Git commit: `feat: payment pages — list, form, receipt with mock data`
