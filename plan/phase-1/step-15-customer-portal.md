# Phase 1, Step 15 — Customer Portal Backend + Wiring

> Portal-specific API endpoints, customer data scoping, wire portal frontend

## Tasks

### 15.1 Portal serializers (read-only views)

- [ ] `portal/serializers.py`:
  - `PortalCaseSerializer`: case_number, stage, status, total_debt, settlement_amount, loans summary, recent notes (author hidden for internal)
  - `PortalPaymentSerializer`: receipt_number, amount, mode, date, status
  - `PortalDocumentSerializer`: title, type, verification_status, uploaded_at
  - `PortalNotificationSerializer`: icon, message, timestamp, is_read
  - `PortalProfileSerializer`: name, phone, email, address (read-only)

### 15.2 Portal views (scoped to authenticated customer)

- [ ] `portal/views.py`:
  - `PortalDashboardView` → GET: active cases count, total debt, total paid, pending fees, upcoming tasks, recent notifications
  - `PortalCaseListView` → GET: customer's cases only
  - `PortalCaseDetailView` → GET: single case with stage history, documents, fee summary
  - `PortalPaymentListView` → GET: customer's payments only
  - `PortalDocumentListView` → GET: customer's documents only
  - `PortalDocumentUploadView` → POST: customer uploads document (linked to self)
  - `PortalNotificationListView` → GET: customer's notifications
  - `PortalProfileView` → GET: customer profile
- [ ] All views filter by `request.user.customer` — no access to other customers' data

### 15.3 Notification model (simple)

- [ ] `portal/models.py`:
  ```python
  class Notification(models.Model):
      customer = models.ForeignKey(Customer, on_delete=CASCADE, related_name='notifications')
      message = models.CharField(max_length=500)
      notification_type = models.CharField(max_length=50)  # case_update, payment, document, general
      is_read = models.BooleanField(default=False)
      created_at = models.DateTimeField(auto_now_add=True)
  ```
- [ ] Helper: `create_notification(customer, message, type)` — used by other modules

### 15.4 URLs

- [ ] `portal/urls.py`:
  - `GET /api/portal/dashboard/`
  - `GET /api/portal/cases/`
  - `GET /api/portal/cases/:id/`
  - `GET /api/portal/payments/`
  - `GET /api/portal/documents/`
  - `POST /api/portal/documents/upload/`
  - `GET /api/portal/notifications/`
  - `GET /api/portal/profile/`
- [ ] Permission: `IsAuthenticated` + `IsCustomer` custom permission

### 15.5 Wire frontend portal

- [ ] `portal-api.ts`: all portal endpoints
- [ ] Wire portal dashboard: real stats from API
- [ ] Wire my cases: load from API, case detail with stage stepper
- [ ] Wire payments: load from API, receipt link
- [ ] Wire documents: load from API, upload via API
- [ ] Wire notifications: load from API, mark as read
- [ ] Wire profile: load from API

### 15.6 Tests

- [ ] Customer can only see own data
- [ ] Non-customer user gets 403
- [ ] Document upload scoped to customer
- [ ] Dashboard stats accurate

## Verification Checklist

- [ ] Customer login → portal dashboard with real stats
- [ ] Customer sees only their own cases, payments, documents
- [ ] Admin user cannot access portal endpoints (403)
- [ ] Document upload from portal linked to customer
- [ ] Notifications list works
- [ ] All portal pages load real data
- [ ] All tests pass
- [ ] Git commit: `feat: customer portal — scoped APIs, notifications, frontend wiring`
