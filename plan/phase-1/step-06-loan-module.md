# Phase 1, Step 6 — Loan Module Backend + Wiring

> Loan model, lender reference, CRUD API, wire frontend

## Tasks

### 6.1 Lender model (if not done)

- [ ] `loans/models.py`:
  ```python
  class Lender(models.Model):
      name = models.CharField(max_length=200)
      type = models.CharField(choices=LENDER_TYPE_CHOICES)  # Bank, NBFC, Fintech, Private
      contact_person = models.CharField(max_length=150, blank=True)
      phone = models.CharField(max_length=15, blank=True)
      email = models.EmailField(blank=True)
      address = models.TextField(blank=True)
      notes = models.TextField(blank=True)
      is_active = models.BooleanField(default=True)
      created_at = models.DateTimeField(auto_now_add=True)
  ```

### 6.2 Loan model

- [ ] `loans/models.py`:
  ```python
  class Loan(models.Model):
      customer = models.ForeignKey(Customer, on_delete=CASCADE, related_name='loans')
      lender = models.ForeignKey(Lender, on_delete=SET_NULL, null=True)
      loan_type = models.CharField(choices=LOAN_TYPE_CHOICES)  # Personal, Home, Vehicle, Credit Card, Business, Other
      account_number = models.CharField(max_length=50, blank=True)
      principal_amount = models.DecimalField(max_digits=14, decimal_places=2)
      outstanding_amount = models.DecimalField(max_digits=14, decimal_places=2)
      emi_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
      interest_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
      start_date = models.DateField(null=True, blank=True)
      dpd = models.IntegerField(default=0)  # Days Past Due
      status = models.CharField(choices=LOAN_STATUS_CHOICES, default='Active')  # Active, Settled, Written Off, Closed
      notes = models.TextField(blank=True)
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
  ```
- [ ] Migration + migrate

### 6.3 Serializers & ViewSets

- [ ] `LenderViewSet`: CRUD, list (filter by type, active)
- [ ] `LoanViewSet`: CRUD, filter by customer, lender, loan_type, status; nested under customer optional
- [ ] `LoanListSerializer` (compact), `LoanDetailSerializer` (nested lender, customer name)
- [ ] URLs: `/api/lenders/`, `/api/loans/`

### 6.4 Admin

- [ ] Register both models with appropriate list_display, filters

### 6.5 Wire frontend

- [ ] `lender-api.ts`: CRUD
- [ ] `loan-api.ts`: CRUD + filter by customer
- [ ] Wire lender pages: list, form, detail — real API
- [ ] Wire loan pages: list, form (cascading selects for customer → lender), detail
- [ ] On customer detail page: load loans list from API

### 6.6 Tests

- [ ] Lender CRUD tests
- [ ] Loan CRUD tests, filter by customer

## Verification Checklist

- [ ] Lender list/create/update/delete works via API + frontend
- [ ] Loan list/create works, linked to customer + lender
- [ ] Loan form cascading selects work (select customer → see their loans)
- [ ] Customer detail page shows linked loans
- [ ] All tests pass
- [ ] Git commit: `feat: loan & lender modules — models, CRUD, frontend wiring`
