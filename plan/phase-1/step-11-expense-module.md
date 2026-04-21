# Phase 1, Step 11 — Expense Module Backend + Wiring

> Expense model, categories, CRUD API, wire frontend

## Tasks

### 11.1 Model

- [ ] `expenses/models.py`:

  ```python
  CATEGORY_CHOICES = [
      ('salary', 'Salary'),
      ('rent', 'Rent'),
      ('marketing', 'Marketing'),
      ('travel', 'Travel'),
      ('legal', 'Legal'),
      ('technology', 'Technology'),
      ('utilities', 'Utilities'),
      ('miscellaneous', 'Miscellaneous'),
  ]

  class Expense(models.Model):
      title = models.CharField(max_length=200)
      category = models.CharField(choices=CATEGORY_CHOICES)
      amount = models.DecimalField(max_digits=12, decimal_places=2)
      expense_date = models.DateField()
      description = models.TextField(blank=True)
      receipt = models.FileField(upload_to='expenses/%Y/%m/', blank=True, null=True)
      approved_by = models.ForeignKey(User, on_delete=SET_NULL, null=True, blank=True, related_name='expenses_approved')
      created_by = models.ForeignKey(User, on_delete=SET_NULL, null=True)
      created_at = models.DateTimeField(auto_now_add=True)
  ```

- [ ] Migration + migrate

### 11.2 Serializers & ViewSet

- [ ] `ExpenseViewSet`: CRUD + filter (category, date range, created_by)
- [ ] Search by title
- [ ] Aggregation endpoint: `@action` `summary` → category totals for date range
- [ ] URLs: `/api/expenses/`, `/api/expenses/summary/`

### 11.3 Admin

- [ ] Register Expense in admin

### 11.4 Wire frontend

- [ ] `expense-api.ts`: CRUD + summary
- [ ] Wire expense list: real API
- [ ] Wire expense form: submit to API (multipart for receipt upload)
- [ ] Wire category breakdown chart: fetch summary data

### 11.5 Tests

- [ ] CRUD tests
- [ ] Summary aggregation test
- [ ] Filter by category/date

## Verification Checklist

- [ ] Expense CRUD works
- [ ] Summary endpoint returns correct category totals
- [ ] Receipt upload works
- [ ] Category breakdown chart renders with real data
- [ ] All tests pass
- [ ] Git commit: `feat: expense module — model, CRUD, summary, frontend wiring`
