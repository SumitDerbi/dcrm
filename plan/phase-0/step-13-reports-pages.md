# Phase 0, Step 13 — Reports Pages

> Profit dashboard, revenue/expense charts, lead conversion report

## Tasks

### 13.1 Mock data

- [ ] Create `frontend/src/features/reports/data/mock-reports.ts`
- [ ] Monthly revenue data (last 12 months): total fees collected per month
- [ ] Monthly expense data (last 12 months): total expenses per month
- [ ] Lead conversion data: leads by status (funnel), conversion rate by month
- [ ] Case data: cases by stage, success rate, average resolution time
- [ ] Employee performance: leads handled, cases closed, revenue generated per employee

### 13.2 Reports dashboard page

- [ ] Create `frontend/src/features/reports/pages/ReportsDashboardPage.tsx`
- [ ] Top summary cards: Total Revenue (YTD), Total Expenses (YTD), Net Profit (YTD), Profit Margin %
- [ ] Period selector: This Month / This Quarter / This Year / Custom Range
- [ ] Charts (use chart placeholders or a lightweight chart lib like recharts):
  - Revenue vs Expenses (bar chart, monthly)
  - Net Profit Trend (line chart, monthly)
  - Expense Breakdown by Category (pie/donut chart)
  - Lead Conversion Funnel (funnel/bar chart)

### 13.3 Revenue report page

- [ ] Create `frontend/src/features/reports/pages/RevenueReportPage.tsx`
- [ ] Table: Month, Fees Collected, # Payments, Average Payment, Top Customer
- [ ] Chart: monthly trend line
- [ ] Filter: date range

### 13.4 Expense report page

- [ ] Create `frontend/src/features/reports/pages/ExpenseReportPage.tsx`
- [ ] Table: Month, Total Expense, By Category breakdown
- [ ] Chart: monthly trend + category pie
- [ ] Filter: date range, category

### 13.5 Profit report page

- [ ] Create `frontend/src/features/reports/pages/ProfitReportPage.tsx`
- [ ] Table: Month, Revenue, Expenses, Net Profit, Margin %
- [ ] Case-level profit: Case #, Customer, Fee, Expenses, Profit
- [ ] Charts: monthly profit trend, case profitability distribution

### 13.6 Lead conversion report

- [ ] Create `frontend/src/features/reports/pages/LeadConversionReportPage.tsx`
- [ ] Funnel: New → Contacted → Interested → Converted (with numbers and %)
- [ ] Table: Month, Leads Added, Converted, Conversion Rate
- [ ] By source: which lead sources convert best

### 13.7 Employee performance report

- [ ] Create `frontend/src/features/reports/pages/EmployeeReportPage.tsx`
- [ ] Table: Employee, Leads Handled, Cases Closed, Revenue Generated, Active Cases
- [ ] Ranking visual or bar chart

## Verification Checklist

- [ ] Reports dashboard shows all summary cards with mock data
- [ ] Period selector changes displayed data
- [ ] All charts render (placeholder or actual)
- [ ] Individual report pages show tables and charts
- [ ] Profit calculations correct: Revenue - Expenses = Profit
- [ ] Lead funnel shows correct narrowing numbers
- [ ] All pages responsive
- [ ] Git commit: `feat: report pages — dashboard, revenue, expense, profit, leads, employee`
