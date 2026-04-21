# Phase 0, Step 15 — Task Pages

> Task list, create task form, reminders view

## Tasks

### 15.1 Mock data

- [ ] Create `frontend/src/features/tasks/data/mock-tasks.ts`
- [ ] 15+ mock tasks: id, title, description, type (Follow-up/Call/Document/Meeting/Other), priority (Low/Medium/High/Urgent), status (Pending/In Progress/Completed/Overdue), assignedTo, assignedBy, relatedTo (Lead/Customer/Case + id), dueDate, completedAt, notes

### 15.2 Task list page

- [ ] Create `frontend/src/features/tasks/pages/TaskListPage.tsx`
- [ ] View toggle: List view / Kanban board (Pending | In Progress | Completed)
- [ ] **List view** DataTable: Title, Type, Priority (badge), Assigned To, Related To, Due Date, Status (badge)
- [ ] Priority badges: Low=gray, Medium=blue, High=orange, Urgent=red
- [ ] Status badges: Pending=yellow, In Progress=blue, Completed=green, Overdue=red
- [ ] Filters: status, priority, type, assigned to, due date range
- [ ] Search: title, description
- [ ] "Create Task" button
- [ ] Overdue tasks highlighted (red background or border)

### 15.3 Kanban view

- [ ] Create `frontend/src/features/tasks/components/TaskKanban.tsx`
- [ ] Three columns: Pending, In Progress, Completed
- [ ] Task cards: title, priority badge, assignee, due date
- [ ] Drag-and-drop between columns (mock state change) — optional, can use simple move buttons

### 15.4 Task form

- [ ] Create `frontend/src/features/tasks/pages/TaskFormPage.tsx`
- [ ] TanStack Form + Zod:
  ```
  title: string (required)
  description: string (optional)
  type: enum (required)
  priority: enum (required, default Medium)
  assignedTo: string (required, select)
  relatedType: enum (Lead/Customer/Case, optional)
  relatedId: string (optional, filtered select)
  dueDate: date (required)
  ```
- [ ] Related entity: selecting type filters the ID dropdown

### 15.5 Today's reminders widget

- [ ] Create `frontend/src/features/tasks/components/TodayReminders.tsx`
- [ ] Shows tasks due today + overdue tasks
- [ ] Compact card style
- [ ] Usable as a dashboard widget (import in DashboardPage)

## Verification Checklist

- [ ] Task list renders in both list and kanban views
- [ ] View toggle switches between list and kanban
- [ ] Priority and status badges render correctly
- [ ] Overdue tasks are visually highlighted
- [ ] Kanban columns show correct tasks by status
- [ ] Task form validates and submits
- [ ] Related entity cascading select works
- [ ] Today's reminders widget shows correct tasks
- [ ] Responsive: kanban stacks vertically on mobile
- [ ] Git commit: `feat: task pages — list, kanban, form, reminders with mock data`
