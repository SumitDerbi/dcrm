# Phase 1, Step 4 — Lead Module Backend + Wiring

> Model, CRUD API, admin, wire frontend

## Tasks

### 4.1 Model

- [ ] `leads/models.py`:
  ```python
  class Lead(models.Model):
      full_name = models.CharField(max_length=150)
      phone = models.CharField(max_length=15)
      alt_phone = models.CharField(max_length=15, blank=True)
      email = models.EmailField(blank=True)
      source = models.CharField(choices=SOURCE_CHOICES)  # Walk-in, Referral, Social Media, Website, Other
      status = models.CharField(choices=STATUS_CHOICES, default='New')  # New, Contacted, Interested, Not Interested, Converted
      assigned_to = models.ForeignKey(User, on_delete=SET_NULL, null=True, blank=True)
      notes = models.TextField(blank=True)
      created_by = models.ForeignKey(User, on_delete=SET_NULL, null=True, related_name='leads_created')
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
  ```
- [ ] Migration + migrate

### 4.2 Serializers

- [ ] `LeadListSerializer` — compact for list view (id, name, phone, source, status, assigned_to name, created_at)
- [ ] `LeadDetailSerializer` — all fields, nested assigned_to
- [ ] `LeadCreateUpdateSerializer` — write serializer with validation

### 4.3 ViewSet

- [ ] `leads/views.py`: `LeadViewSet(ModelViewSet)`:
  - List: filterset (status, source, assigned_to, date range), search (name, phone, email), ordering
  - Create: auto-set `created_by` from request.user
  - Permission: IsAuthenticated (later refined by role)

### 4.4 URLs

- [ ] `leads/urls.py`: router.register → `/api/leads/`
- [ ] Actions: list, create, retrieve, update, partial_update, destroy

### 4.5 Admin

- [ ] Register `Lead` in admin: list_display, list_filter (status, source), search_fields

### 4.6 Wire frontend

- [ ] Create `frontend/src/features/leads/api/lead-api.ts`:
  - `getLeads(params)` → GET /api/leads/ (with filters, search, pagination)
  - `getLead(id)` → GET /api/leads/:id/
  - `createLead(data)` → POST /api/leads/
  - `updateLead(id, data)` → PATCH /api/leads/:id/
  - `deleteLead(id)` → DELETE /api/leads/:id/
- [ ] Update lead list page: replace mock data with React Query + real API
- [ ] Update lead form page: submit to API, show success/error toast
- [ ] Update lead detail page: fetch from API

### 4.7 Tests

- [ ] Model test: create lead, default status is New
- [ ] API test: CRUD operations (create, list, retrieve, update, delete)
- [ ] API test: filters work (status, source)
- [ ] API test: search works (name, phone)
- [ ] API test: unauthenticated → 401

## Verification Checklist

- [ ] `GET /api/leads/` returns paginated list
- [ ] `POST /api/leads/` creates new lead, `created_by` auto-set
- [ ] Filters and search work via query params
- [ ] Frontend lead list loads from API (no more mock data)
- [ ] Create lead form submits to API, redirects to list with success toast
- [ ] Edit lead form loads existing data, updates via API
- [ ] Delete lead works with confirmation dialog
- [ ] Django admin shows leads
- [ ] All tests pass
- [ ] Git commit: `feat: lead module — model, CRUD API, admin, frontend wiring`
