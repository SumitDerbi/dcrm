# Phase 1, Step 9 — Fee Module Backend + Wiring

> Fee plans, fee assignments, invoice generation, CRUD API, wire frontend

## Tasks

### 9.1 Models

- [ ] `fees/models.py`:

  ```python
  class FeePlan(models.Model):
      name = models.CharField(max_length=200)
      fee_type = models.CharField(choices=FEE_TYPE_CHOICES)  # Flat, Percentage of Debt, Percentage of Settlement, Monthly Retainer
      amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # for Flat/Monthly
      percentage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # for Percentage types
      gst_rate = models.DecimalField(max_digits=5, decimal_places=2, default=18.0)
      description = models.TextField(blank=True)
      is_active = models.BooleanField(default=True)
      created_at = models.DateTimeField(auto_now_add=True)

  class FeeAssignment(models.Model):
      customer = models.ForeignKey(Customer, on_delete=CASCADE, related_name='fee_assignments')
      case = models.ForeignKey('cases.Case', on_delete=SET_NULL, null=True, blank=True)
      fee_plan = models.ForeignKey(FeePlan, on_delete=PROTECT)
      base_amount = models.DecimalField(max_digits=14, decimal_places=2)  # calculated from plan
      gst_amount = models.DecimalField(max_digits=10, decimal_places=2)
      total_amount = models.DecimalField(max_digits=14, decimal_places=2)
      paid_amount = models.DecimalField(max_digits=14, decimal_places=2, default=0)
      status = models.CharField(choices=FEE_STATUS_CHOICES, default='Pending')  # Pending, Partially Paid, Paid, Waived
      invoice_number = models.CharField(max_length=30, unique=True, editable=False)
      notes = models.TextField(blank=True)
      created_at = models.DateTimeField(auto_now_add=True)
  ```

  - Auto-generate `invoice_number`: `INV-YYYYMM-XXXX`
  - Auto-calculate `base_amount` from fee_plan type + customer debt/settlement
  - Auto-calculate `gst_amount` from base + gst_rate

### 9.2 Fee calculation logic

- [ ] `fees/services.py`:
  - `calculate_fee(fee_plan, customer, case)` → returns base_amount
    - Flat → `fee_plan.amount`
    - % of Debt → `fee_plan.percentage * customer.total_debt / 100`
    - % of Settlement → `fee_plan.percentage * case.settlement_amount / 100`
    - Monthly Retainer → `fee_plan.amount`
  - Separate, testable service function

### 9.3 Serializers & ViewSets

- [ ] `FeePlanViewSet`: CRUD
- [ ] `FeeAssignmentViewSet`: CRUD + filter (customer, case, status)
  - On create: auto-calculate amounts via service
  - Custom action: `@action` `generate_invoice` → return PDF or JSON invoice data
- [ ] URLs: `/api/fee-plans/`, `/api/fee-assignments/`

### 9.4 Invoice generation

- [ ] `fees/invoice.py`:
  - Generate invoice data (JSON for now, PDF in Phase 2)
  - Include: company branding (from CompanySettings), customer info, fee details, GST breakdown, total
  - Frontend renders preview using this data

### 9.5 Admin

- [ ] Register FeePlan, FeeAssignment in admin

### 9.6 Wire frontend

- [ ] `fee-api.ts`: CRUD for plans and assignments, generate invoice
- [ ] Wire fee plan pages: list, form — real API
- [ ] Wire fee assignment: create (auto-calculate preview), list
- [ ] Wire invoice preview: fetch invoice data → render with company branding

### 9.7 Tests

- [ ] Fee calculation tests for each fee type
- [ ] Fee assignment auto-calculation on create
- [ ] Invoice number generation
- [ ] GST calculation accuracy

## Verification Checklist

- [ ] Fee plan CRUD works
- [ ] Fee assignment: selecting plan + customer → amounts auto-calculated
- [ ] Invoice number auto-generated
- [ ] GST amounts correct (base × rate)
- [ ] Invoice preview shows company branding + correct amounts
- [ ] Frontend fully wired
- [ ] All tests pass
- [ ] Git commit: `feat: fee module — plans, assignments, invoice, frontend wiring`
