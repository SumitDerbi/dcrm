# Phase 1, Step 7 — Case Module Backend + Wiring

> Case model, stages, notes, CRUD API, wire frontend

## Tasks

### 7.1 Model

- [ ] `cases/models.py`:

  ```python
  STAGE_CHOICES = [
      ('intake', 'Intake'),
      ('document_collection', 'Document Collection'),
      ('analysis', 'Analysis'),
      ('negotiation', 'Negotiation'),
      ('settlement', 'Settlement'),
      ('payment_plan', 'Payment Plan'),
      ('closure', 'Closure'),
  ]

  class Case(models.Model):
      case_number = models.CharField(max_length=20, unique=True, editable=False)
      customer = models.ForeignKey(Customer, on_delete=CASCADE, related_name='cases')
      loans = models.ManyToManyField('loans.Loan', blank=True, related_name='cases')
      stage = models.CharField(choices=STAGE_CHOICES, default='intake')
      status = models.CharField(choices=STATUS_CHOICES, default='Open')  # Open, In Progress, On Hold, Settled, Closed
      assigned_to = models.ForeignKey(User, on_delete=SET_NULL, null=True, blank=True)
      total_debt = models.DecimalField(max_digits=14, decimal_places=2, default=0)
      settlement_amount = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
      settlement_date = models.DateField(null=True, blank=True)
      created_by = models.ForeignKey(User, on_delete=SET_NULL, null=True, related_name='cases_created')
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
  ```

  - Auto-generate case_number: `CASE-YYYYMM-XXXX` using `pre_save` signal or `save()` override

### 7.2 Case note model

- [ ] ```python
      class CaseNote(models.Model):
          case = models.ForeignKey(Case, on_delete=CASCADE, related_name='notes')
          author = models.ForeignKey(User, on_delete=SET_NULL, null=True)
          content = models.TextField()
          created_at = models.DateTimeField(auto_now_add=True)
      ```

### 7.3 Stage change log

- [ ] ```python
      class CaseStageLog(models.Model):
          case = models.ForeignKey(Case, on_delete=CASCADE, related_name='stage_logs')
          from_stage = models.CharField(max_length=30)
          to_stage = models.CharField(max_length=30)
          changed_by = models.ForeignKey(User, on_delete=SET_NULL, null=True)
          notes = models.TextField(blank=True)
          changed_at = models.DateTimeField(auto_now_add=True)
      ```
- [ ] Create stage log entry whenever `stage` changes (signal or ViewSet override)

### 7.4 Serializers & ViewSet

- [ ] `CaseListSerializer` (compact + stage + status)
- [ ] `CaseDetailSerializer` (nested: customer, loans, notes, stage_logs)
- [ ] `CaseCreateSerializer` (customer, loans, assigned_to)
- [ ] `CaseNoteSerializer`
- [ ] `CaseViewSet`: CRUD + filters (stage, status, assigned_to, customer)
  - Custom action: `@action` `change_stage` — validate allowed transitions, create log
  - Nested action: `@action` `notes` — list/create notes for a case
- [ ] URLs: `/api/cases/`, `/api/cases/:id/change-stage/`, `/api/cases/:id/notes/`

### 7.5 Admin

- [ ] Register Case, CaseNote, CaseStageLog in admin

### 7.6 Wire frontend

- [ ] `case-api.ts`: CRUD, changeStage, getNotes, addNote
- [ ] Wire case list: real API with filters
- [ ] Wire case detail: stage stepper → calls `change-stage` API on advance
- [ ] Wire case notes: load from API, add note → real POST
- [ ] Wire case form: create with customer select + loan multi-select

### 7.7 Tests

- [ ] Case creation with auto-number
- [ ] Stage change creates log entry
- [ ] Notes CRUD
- [ ] Filter by stage, status

## Verification Checklist

- [ ] Case number auto-generated (e.g., `CASE-202501-0001`)
- [ ] Stage stepper: advancing stage creates log, UI updates
- [ ] Notes: add note → appears in timeline
- [ ] Case detail shows linked loans, customer, notes, stage history
- [ ] Frontend fully wired — no mock data remains
- [ ] All tests pass
- [ ] Git commit: `feat: case module — model, stages, notes, CRUD, frontend wiring`
