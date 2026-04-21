# Phase 1, Step 13 — Task Module Backend + Wiring

> Task model, reminders, CRUD API, wire frontend

## Tasks

### 13.1 Model

- [ ] `tasks/models.py`:
  ```python
  class Task(models.Model):
      title = models.CharField(max_length=200)
      description = models.TextField(blank=True)
      task_type = models.CharField(choices=TYPE_CHOICES)  # Follow-up, Call, Document, Meeting, Other
      priority = models.CharField(choices=PRIORITY_CHOICES, default='Medium')  # Low, Medium, High, Urgent
      status = models.CharField(choices=STATUS_CHOICES, default='Pending')  # Pending, In Progress, Completed, Overdue
      assigned_to = models.ForeignKey(User, on_delete=SET_NULL, null=True, related_name='tasks_assigned')
      assigned_by = models.ForeignKey(User, on_delete=SET_NULL, null=True, related_name='tasks_created')
      related_type = models.CharField(max_length=20, blank=True)  # Lead, Customer, Case
      related_id = models.IntegerField(null=True, blank=True)
      due_date = models.DateTimeField()
      completed_at = models.DateTimeField(null=True, blank=True)
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
  ```
- [ ] Migration + migrate

### 13.2 Overdue task management

- [ ] Management command or periodic check: mark tasks past due_date as "Overdue"
- [ ] `tasks/management/commands/mark_overdue_tasks.py`
- [ ] Can be run via cron or called from view

### 13.3 Serializers & ViewSet

- [ ] `TaskViewSet`: CRUD + filters (status, priority, type, assigned_to, due_date range)
- [ ] Custom actions:
  - `@action` `complete` → mark completed + timestamp
  - `@action` `my_tasks` → tasks assigned to current user
  - `@action` `today` → tasks due today + overdue
- [ ] URLs: `/api/tasks/`, `/api/tasks/complete/`, `/api/tasks/my-tasks/`, `/api/tasks/today/`

### 13.4 Admin

- [ ] Register Task in admin

### 13.5 Wire frontend

- [ ] `task-api.ts`: CRUD, complete, myTasks, today
- [ ] Wire task list: real API
- [ ] Wire kanban: group by status from API
- [ ] Wire task form: submit to API
- [ ] Wire today's reminders widget: fetch from today endpoint
- [ ] Dashboard widget: upcoming tasks count + overdue

### 13.6 Tests

- [ ] CRUD tests
- [ ] Complete action sets timestamp
- [ ] My tasks filter
- [ ] Overdue marking

## Verification Checklist

- [ ] Task CRUD works via API + frontend
- [ ] Complete action works (status + timestamp)
- [ ] Kanban view groups by status from real data
- [ ] Today's reminders shows correct tasks
- [ ] Overdue tasks highlighted
- [ ] All tests pass
- [ ] Git commit: `feat: task module — model, CRUD, reminders, frontend wiring`
