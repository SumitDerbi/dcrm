# Phase 1, Step 8 — Document Module Backend + Wiring

> Document model, file upload, verification, CRUD API, wire frontend

## Tasks

### 8.1 Model

- [ ] `documents/models.py`:
  ```python
  class Document(models.Model):
      customer = models.ForeignKey(Customer, on_delete=CASCADE, related_name='documents')
      case = models.ForeignKey('cases.Case', on_delete=SET_NULL, null=True, blank=True, related_name='documents')
      title = models.CharField(max_length=200)
      doc_type = models.CharField(choices=DOC_TYPE_CHOICES)  # PAN, Aadhar, Bank Statement, Salary Slip, Loan Statement, NOC, Settlement Letter, Other
      file = models.FileField(upload_to='documents/%Y/%m/')
      file_size = models.IntegerField(default=0)  # bytes
      mime_type = models.CharField(max_length=100, blank=True)
      verification_status = models.CharField(choices=VERIFICATION_CHOICES, default='Pending')  # Pending, Verified, Rejected
      verified_by = models.ForeignKey(User, on_delete=SET_NULL, null=True, blank=True, related_name='documents_verified')
      verified_at = models.DateTimeField(null=True, blank=True)
      rejection_reason = models.TextField(blank=True)
      uploaded_by = models.ForeignKey(User, on_delete=SET_NULL, null=True)
      created_at = models.DateTimeField(auto_now_add=True)
  ```
- [ ] Migration + migrate

### 8.2 File upload handling

- [ ] Validate file types (PDF, JPG, PNG, DOCX) — max 10MB
- [ ] Auto-populate `file_size`, `mime_type` on upload
- [ ] Use `upload_to` with date-based directory structure

### 8.3 Serializers & ViewSet

- [ ] `DocumentListSerializer` (compact: id, title, type, verification badge, uploaded_by, date)
- [ ] `DocumentDetailSerializer` (all fields + file URL)
- [ ] `DocumentUploadSerializer` (multipart: file, title, doc_type, customer, case)
- [ ] `DocumentViewSet`: CRUD + filter (customer, case, doc_type, verification_status)
  - Custom action: `@action` `verify` — set status + verified_by + timestamp
  - Custom action: `@action` `reject` — set status + reason
- [ ] URLs: `/api/documents/`, `/api/documents/:id/verify/`, `/api/documents/:id/reject/`

### 8.4 Admin

- [ ] Register Document with list_display, filters, file link

### 8.5 Wire frontend

- [ ] `document-api.ts`: upload (FormData), list, verify, reject, download
- [ ] Wire document list: real API
- [ ] Wire upload: real multipart POST, progress indicator
- [ ] Wire verification: verify/reject buttons call API
- [ ] Wire detail modal: show file (PDF viewer / image preview) + metadata

### 8.6 Tests

- [ ] Upload test with valid file
- [ ] Upload test with invalid file type → 400
- [ ] Upload test with oversize file → 400
- [ ] Verify/reject flow
- [ ] Filter by customer/case

## Verification Checklist

- [ ] File upload works (PDF, images)
- [ ] File stored at `MEDIA_ROOT/documents/YYYY/MM/filename`
- [ ] Oversized/invalid files rejected
- [ ] Verification: click verify → status changes, verified_by set
- [ ] Rejection: click reject → reason saved
- [ ] Frontend: upload progress shows, file preview works
- [ ] Download link works
- [ ] All tests pass
- [ ] Git commit: `feat: document module — upload, verification, CRUD, frontend wiring`
