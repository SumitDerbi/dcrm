# Phase 1, Step 5 — Customer Module Backend + Wiring

> Model, CRUD API, lead-to-customer conversion, admin, wire frontend

## Tasks

### 5.1 Model

- [ ] `customers/models.py`:
  ```python
  class Customer(models.Model):
      user = models.OneToOneField(User, on_delete=CASCADE, null=True, blank=True)
      lead = models.OneToOneField('leads.Lead', on_delete=SET_NULL, null=True, blank=True)
      full_name = models.CharField(max_length=150)
      phone = models.CharField(max_length=15)
      alt_phone = models.CharField(max_length=15, blank=True)
      email = models.EmailField(blank=True)
      date_of_birth = models.DateField(null=True, blank=True)
      address = models.TextField(blank=True)
      city = models.CharField(max_length=100, blank=True)
      state = models.CharField(max_length=100, blank=True)
      pincode = models.CharField(max_length=10, blank=True)
      pan_number = models.CharField(max_length=10, blank=True)
      aadhar_number = models.CharField(max_length=12, blank=True)
      monthly_income = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
      total_debt = models.DecimalField(max_digits=14, decimal_places=2, default=0)
      assigned_to = models.ForeignKey(User, on_delete=SET_NULL, null=True, blank=True, related_name='customers_assigned')
      created_by = models.ForeignKey(User, on_delete=SET_NULL, null=True, related_name='customers_created')
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
  ```
- [ ] Migration + migrate

### 5.2 Lead-to-Customer conversion

- [ ] `leads/views.py`: add `@action(detail=True, methods=['post'])` `convert_to_customer`
  - Set lead status to "Converted"
  - Create Customer with lead data
  - Optionally create User account for portal access
  - Return customer ID

### 5.3 Serializers & ViewSet

- [ ] `CustomerListSerializer`, `CustomerDetailSerializer` (with financial snapshot: total_debt, total_cases, total_paid)
- [ ] `CustomerCreateUpdateSerializer`
- [ ] `CustomerViewSet`: list (filter by assigned_to, city), search (name, phone, email), CRUD
- [ ] URL: `/api/customers/`

### 5.4 Admin

- [ ] Register `Customer` in admin with list_display, filters, search

### 5.5 Wire frontend

- [ ] `customer-api.ts`: CRUD + search
- [ ] Wire list page: real API with pagination + filters
- [ ] Wire form page: create/edit via API
- [ ] Wire detail page: fetch customer, show financial snapshot from API
- [ ] Wire lead convert button: call convert API → navigate to new customer

### 5.6 Tests

- [ ] CRUD API tests
- [ ] Lead-to-customer conversion test
- [ ] Financial snapshot aggregation test

## Verification Checklist

- [ ] `GET /api/customers/` returns paginated list
- [ ] Lead conversion: click convert on lead → customer created, lead marked Converted
- [ ] Customer detail shows financial snapshot
- [ ] Frontend CRUD works end-to-end
- [ ] PAN/Aadhar stored (encrypted at rest in Phase 2)
- [ ] All tests pass
- [ ] Git commit: `feat: customer module — model, conversion, CRUD, frontend wiring`
