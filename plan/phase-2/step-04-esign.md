# Phase 2, Step 4 — e-Sign Integration

> Digital signature collection for settlement agreements and NOCs

## Tasks

### 4.1 e-Sign provider integration

- [ ] Choose provider: Digio, Leegality, or simple OTP-based consent
- [ ] `documents/esign.py`:
  - `request_signature(document_id, signer_phone, signer_email)` → initiate e-sign
  - `check_signature_status(reference_id)` → poll status
  - Webhook handler for signature completion

### 4.2 e-Sign model extension

- [ ] Add to Document model or create:
  ```python
  class ESignRequest(models.Model):
      document = models.ForeignKey(Document, on_delete=CASCADE)
      signer_name = models.CharField(max_length=150)
      signer_phone = models.CharField(max_length=15)
      signer_email = models.EmailField()
      status = models.CharField(choices=ESIGN_STATUS)  # Pending, Signed, Expired, Rejected
      provider_reference = models.CharField(max_length=200, blank=True)
      signed_at = models.DateTimeField(null=True, blank=True)
      signed_document = models.FileField(upload_to='esign/', null=True, blank=True)
      created_at = models.DateTimeField(auto_now_add=True)
  ```

### 4.3 API endpoints

- [ ] `POST /api/documents/:id/request-esign/` — initiate e-sign
- [ ] `GET /api/documents/:id/esign-status/` — check status
- [ ] `POST /api/documents/esign-webhook/` — provider callback

### 4.4 Frontend integration

- [ ] "Request e-Sign" button on document detail
- [ ] Status indicator on documents pending signature
- [ ] Signed document preview

### 4.5 Tests

- [ ] e-Sign request created
- [ ] Status tracking
- [ ] Signed document stored

## Verification Checklist

- [ ] e-Sign request sends to provider (sandbox)
- [ ] Webhook updates status
- [ ] Signed document stored and viewable
- [ ] Git commit: `feat: e-sign integration — digital signatures for documents`
