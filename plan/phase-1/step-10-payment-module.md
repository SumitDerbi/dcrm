# Phase 1, Step 10 — Payment Module Backend + Wiring

> Payment model, receipt generation, CRUD API, wire frontend

## Tasks

### 10.1 Model

- [ ] `payments/models.py`:
  ```python
  class Payment(models.Model):
      customer = models.ForeignKey(Customer, on_delete=CASCADE, related_name='payments')
      fee_assignment = models.ForeignKey('fees.FeeAssignment', on_delete=SET_NULL, null=True, blank=True)
      case = models.ForeignKey('cases.Case', on_delete=SET_NULL, null=True, blank=True)
      receipt_number = models.CharField(max_length=30, unique=True, editable=False)
      amount = models.DecimalField(max_digits=14, decimal_places=2)
      payment_mode = models.CharField(choices=MODE_CHOICES)  # Cash, UPI, Bank Transfer, Cheque, Online
      reference_number = models.CharField(max_length=100, blank=True)  # transaction ID, cheque no
      payment_date = models.DateField()
      notes = models.TextField(blank=True)
      recorded_by = models.ForeignKey(User, on_delete=SET_NULL, null=True)
      created_at = models.DateTimeField(auto_now_add=True)
  ```

  - Auto-generate `receipt_number`: `RCT-YYYYMM-XXXX`

### 10.2 Payment post-save logic

- [ ] On payment creation:
  - Update `FeeAssignment.paid_amount += payment.amount`
  - Update FeeAssignment status: if paid >= total → "Paid", elif paid > 0 → "Partially Paid"
  - Update customer total debt tracking if applicable

### 10.3 Serializers & ViewSet

- [ ] `PaymentListSerializer` (compact: receipt#, customer, amount, mode, date, status)
- [ ] `PaymentDetailSerializer` (all fields + nested customer, fee_assignment)
- [ ] `PaymentCreateSerializer`
- [ ] `PaymentViewSet`: CRUD + filter (customer, case, mode, date range)
  - On create: auto-set `recorded_by`, trigger post-save logic
  - Custom action: `@action` `receipt` → return receipt data (JSON)
- [ ] URLs: `/api/payments/`, `/api/payments/:id/receipt/`

### 10.4 Receipt generation

- [ ] `payments/receipt.py`:
  - Receipt data: company branding, customer info, payment details, receipt number
  - Frontend renders receipt preview

### 10.5 Admin

- [ ] Register Payment in admin

### 10.6 Wire frontend

- [ ] `payment-api.ts`: CRUD, getReceipt
- [ ] Wire payment list: real API
- [ ] Wire record payment form: cascading selects (customer → fee assignments), submit to API
- [ ] Wire receipt preview: fetch receipt data → render with company branding
- [ ] Payment summary widget: total received, pending amounts

### 10.7 Tests

- [ ] Payment creation updates fee assignment paid_amount
- [ ] Status auto-update (Partially Paid → Paid)
- [ ] Receipt number generation
- [ ] Filter by customer/case/date

## Verification Checklist

- [ ] Payment recorded → receipt number auto-generated
- [ ] Fee assignment paid_amount updated correctly
- [ ] Fee assignment status transitions work (Pending → Partially Paid → Paid)
- [ ] Receipt preview shows correct data with branding
- [ ] Cascading selects work (customer → their fee assignments)
- [ ] Frontend fully wired
- [ ] All tests pass
- [ ] Git commit: `feat: payment module — model, receipt, fee tracking, frontend wiring`
