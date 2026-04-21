# Phase 0, Step 9 — Document Pages

> Document upload area, document list with status badges, verification

## Tasks

### 9.1 Mock data

- [ ] Create `frontend/src/features/documents/data/mock-documents.ts`
- [ ] 15+ mock documents: id, customerId, customerName, caseId, caseNumber, documentType (PAN/Aadhaar/Bank Statement/Loan Document/Salary Slip/Other), fileName, fileSize, uploadedAt, uploadedBy, verificationStatus (Pending/Verified/Rejected), rejectionReason, notes

### 9.2 Document list page

- [ ] Create `frontend/src/features/documents/pages/DocumentListPage.tsx`
- [ ] DataTable: Customer, Case #, Type, File Name, Uploaded, Status (badge), Actions
- [ ] Status badges: Pending=yellow, Verified=green, Rejected=red
- [ ] Filters: document type, verification status, customer, case
- [ ] Search: customer name, file name
- [ ] Bulk verify/reject (select multiple → action)

### 9.3 Document upload area

- [ ] Create `frontend/src/features/documents/components/DocumentUpload.tsx`
- [ ] Drag-and-drop zone + file picker button
- [ ] Document type selector (dropdown)
- [ ] Customer/case selector (if uploading from global documents page)
- [ ] File preview: show file name, size, type icon after selection
- [ ] Multiple file upload support
- [ ] Accepted formats: PDF, JPG, PNG, JPEG (validate client-side)
- [ ] Max size: 10MB per file (validate client-side)
- [ ] Submit: `console.log` (mock — no actual upload)

### 9.4 Document detail / viewer

- [ ] Clicking a document shows a modal or side panel with:
  - File info (name, type, size, uploaded date)
  - Verification status with action buttons: Verify / Reject (with reason)
  - Notes field
  - Placeholder for file preview (image thumbnail or PDF icon)

## Verification Checklist

- [ ] Document list shows mock data with correct badges
- [ ] Filters work correctly
- [ ] Upload area accepts drag-and-drop and file picker
- [ ] Client-side validation rejects wrong file types and oversized files
- [ ] Document type dropdown works
- [ ] Detail modal shows file info and verification controls
- [ ] Verify/Reject buttons toggle status visually (mock state)
- [ ] Responsive: upload area stacks, table scrolls
- [ ] Git commit: `feat: document pages — list, upload, verification with mock data`
