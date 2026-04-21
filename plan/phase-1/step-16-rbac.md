# Phase 1, Step 16 — Permissions & RBAC

> Role-based access control across all modules

## Tasks

### 16.1 Custom permissions

- [ ] `accounts/permissions.py`:

  ```python
  class IsAdmin(BasePermission):
      def has_permission(self, request, view):
          return request.user.role == 'Admin'

  class IsAdminOrManager(BasePermission):
      ...

  class IsCustomer(BasePermission):
      ...

  class IsOwnerOrAdmin(BasePermission):
      def has_object_permission(self, request, view, obj):
          ...
  ```

### 16.2 Apply permissions to ViewSets

- [ ] **Lead module**: Admin, Manager, Telecaller can CRUD; Field Worker read-only
- [ ] **Customer module**: Admin, Manager full CRUD; Telecaller/Field Worker read-only
- [ ] **Loan module**: Admin, Manager full CRUD
- [ ] **Case module**: Admin, Manager CRUD; Telecaller/Field Worker read assigned cases only
- [ ] **Document module**: Admin, Manager verify/reject; all staff upload; Customer upload own
- [ ] **Fee module**: Admin, Manager only
- [ ] **Payment module**: Admin, Manager record; others read-only
- [ ] **Expense module**: Admin, Manager CRUD; others read-only
- [ ] **Reports module**: Admin, Manager full; others limited dashboard
- [ ] **Task module**: Admin, Manager create for anyone; others see assigned only
- [ ] **Communication module**: All staff log calls/messages; templates: Admin, Manager only
- [ ] **Company settings**: Admin only

### 16.3 Frontend role guards

- [ ] Update `RoleGuard` component with real permission matrix
- [ ] Hide sidebar menu items based on role
- [ ] Hide action buttons (delete, verify, etc.) based on role
- [ ] Show appropriate 403 page when accessing unauthorized routes

### 16.4 Tests

- [ ] Test each role against each module endpoint (matrix tests)
- [ ] Test object-level permissions (e.g., assigned cases only)
- [ ] Test frontend hides unauthorized elements

## Verification Checklist

- [ ] Admin: full access to everything
- [ ] Manager: full access except company settings
- [ ] Telecaller: leads CRUD, read customers/cases assigned, log communications
- [ ] Field Worker: read assigned data, upload documents
- [ ] Customer: portal only, own data only
- [ ] Unauthorized API calls return 403
- [ ] Frontend hides inaccessible menu items
- [ ] All tests pass
- [ ] Git commit: `feat: RBAC — role permissions across all modules`
