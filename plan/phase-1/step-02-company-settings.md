# Phase 1, Step 2 — Company Settings Module

> Singleton model, Django Admin UI, branding API, wire frontend

## Tasks

### 2.1 Model

- [ ] Create `company/models.py`:
  ```python
  class CompanySettings(models.Model):
      company_name = models.CharField(max_length=255)
      logo = models.ImageField(upload_to='branding/', blank=True, null=True)
      favicon = models.ImageField(upload_to='branding/', blank=True, null=True)
      primary_color = models.CharField(max_length=7, default='#2563eb')  # hex
      secondary_color = models.CharField(max_length=7, default='#f59e0b')
      tagline = models.CharField(max_length=255, blank=True)
      address = models.TextField(blank=True)
      phone = models.CharField(max_length=20, blank=True)
      email = models.EmailField(blank=True)
      website = models.URLField(blank=True)
      gst_number = models.CharField(max_length=20, blank=True)
  ```
- [ ] Add singleton enforcement: override `save()` to prevent multiple rows, or use `django-solo`
- [ ] Create migration: `python manage.py makemigrations company`
- [ ] Run migration: `python manage.py migrate`

### 2.2 Django Admin

- [ ] Register `CompanySettings` in `company/admin.py`
- [ ] Customize admin: fieldsets (Branding, Contact, Legal), logo preview in admin
- [ ] Prevent add/delete (singleton) — only allow edit
- [ ] Seed initial data via data migration or management command

### 2.3 API endpoint

- [ ] Create `company/serializers.py`: `CompanySettingsSerializer` (all fields, logo as URL)
- [ ] Create `company/views.py`: `BrandingView` — GET only, no auth required (public)
- [ ] Create `company/urls.py`: `GET /api/settings/branding/`
- [ ] Register in `config/urls.py`

### 2.4 Wire frontend

- [ ] Update `frontend/src/lib/branding-context.tsx`:
  - On app load, fetch `GET /api/settings/branding/`
  - Use React Query for caching (staleTime: 5 min)
  - Fallback to defaults if API fails
  - Loading state: show spinner or skeleton
- [ ] Remove hardcoded mock data from branding context
- [ ] Verify: change company name in Django Admin → frontend reflects it after refresh

### 2.5 Tests

- [ ] API test: `GET /api/settings/branding/` returns 200 with correct fields
- [ ] API test: endpoint works without authentication
- [ ] API test: only one CompanySettings instance allowed
- [ ] Admin test: can update company name, logo via admin

## Verification Checklist

- [ ] Django Admin shows CompanySettings with all fields
- [ ] Cannot create second CompanySettings row
- [ ] Logo upload works, served at `/media/branding/...`
- [ ] `GET /api/settings/branding/` returns JSON with all branding fields
- [ ] Frontend loads branding from API (visible in Network tab)
- [ ] Changing company name in admin → shows on frontend after refresh
- [ ] Changing primary colour in admin → theme colour changes on frontend
- [ ] Logo change in admin → reflected in sidebar and login page
- [ ] All tests pass
- [ ] Git commit: `feat: company settings — model, admin, API, frontend wiring`
