# Phase 1, Step 17 — Activity Log & Audit Trail

> Track all user actions for accountability

## Tasks

### 17.1 Activity log model

- [ ] Create `accounts/models.py` (or separate `audit` app):
  ```python
  class ActivityLog(models.Model):
      user = models.ForeignKey(User, on_delete=SET_NULL, null=True)
      action = models.CharField(max_length=50)  # created, updated, deleted, viewed, status_changed
      model_name = models.CharField(max_length=50)  # Lead, Customer, Case, etc.
      object_id = models.IntegerField()
      details = models.JSONField(default=dict)  # changed fields, old/new values
      ip_address = models.GenericIPAddressField(null=True, blank=True)
      created_at = models.DateTimeField(auto_now_add=True)
  ```
- [ ] Migration + migrate

### 17.2 Logging utility

- [ ] `accounts/activity.py`:
  - `log_activity(user, action, model_name, object_id, details=None, request=None)`
  - Extract IP from request if provided
- [ ] Integrate into ViewSet `perform_create`, `perform_update`, `perform_destroy` mixins
  - Create a `LoggingMixin` that auto-logs CRUD actions

### 17.3 Admin

- [ ] Register ActivityLog: list_display, filters (user, model_name, action, date), read-only

### 17.4 API

- [ ] `GET /api/activity-log/` — Admin/Manager only, filter by user, model, action, date range
- [ ] Used on customer detail page: "Activity Log" tab

### 17.5 Wire frontend

- [ ] Wire customer detail activity log tab: fetch from API filtered by customer
- [ ] Wire admin activity log page (if needed, or just use Django admin)

### 17.6 Tests

- [ ] Creating a lead generates activity log
- [ ] Updating case stage generates log with old/new values
- [ ] Filter by model works

## Verification Checklist

- [ ] CRUD operations generate activity log entries
- [ ] Activity log shows user, action, timestamp, details
- [ ] Customer detail page shows activity timeline
- [ ] Django admin shows all logs
- [ ] All tests pass
- [ ] Git commit: `feat: activity log — audit trail for all CRUD operations`
