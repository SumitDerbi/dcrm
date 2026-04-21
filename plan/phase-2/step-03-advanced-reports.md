# Phase 2, Step 3 — Advanced Reports & Export

> PDF report generation, Excel export, scheduled reports

## Tasks

### 3.1 PDF generation

- [ ] Install `reportlab` or `weasyprint`
- [ ] `reports/pdf.py`:
  - Generate PDF reports with company branding header/footer
  - Invoice PDF (from fee assignment data)
  - Receipt PDF (from payment data)
  - Case summary PDF
  - Monthly report PDF
- [ ] API: `GET /api/reports/export/pdf/?type=invoice&id=123`

### 3.2 Excel export

- [ ] Install `openpyxl`
- [ ] `reports/excel.py`:
  - Export lead list to Excel
  - Export customer list to Excel
  - Export payment report to Excel
  - Export expense report to Excel
- [ ] API: `GET /api/reports/export/excel/?type=payments&start_date=...&end_date=...`
- [ ] Proper formatting: headers, column widths, number formats

### 3.3 Bulk export

- [ ] "Export" button on list pages → download filtered data as Excel
- [ ] Add `export` action to relevant ViewSets

### 3.4 Frontend integration

- [ ] Download buttons on report pages → trigger file download
- [ ] Invoice "Download PDF" button
- [ ] Receipt "Download PDF" button
- [ ] List pages "Export to Excel" button

### 3.5 Tests

- [ ] PDF generation produces valid PDF
- [ ] Excel export produces valid .xlsx
- [ ] Export respects filters/date range

## Verification Checklist

- [ ] Invoice PDF generated with correct branding + data
- [ ] Receipt PDF generated
- [ ] Excel export downloads with correct data
- [ ] Export buttons work on frontend
- [ ] Git commit: `feat: advanced reports — PDF, Excel export`
