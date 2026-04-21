# Phase 1, Step 12 — Reports Module Backend + Wiring

> API endpoints for dashboard stats, revenue, expense, profit, lead conversion, employee reports

## Tasks

### 12.1 Dashboard stats API

- [ ] `reports/views.py`: `DashboardStatsView` → GET
  - Total leads (new this month), total customers, active cases, settled cases
  - Revenue this month, expenses this month, profit
  - Overdue tasks count
  - Recent activity (last 10 items across modules)
- [ ] URL: `GET /api/reports/dashboard/`

### 12.2 Revenue report API

- [ ] `RevenueReportView` → GET with query params (start_date, end_date, group_by=month/quarter)
  - Payment totals grouped by period
  - Payment mode breakdown
  - Top customers by payment
- [ ] URL: `GET /api/reports/revenue/`

### 12.3 Expense report API

- [ ] `ExpenseReportView` → GET with query params (start_date, end_date)
  - Expense totals grouped by category
  - Monthly trend
- [ ] URL: `GET /api/reports/expenses/`

### 12.4 Profit & Loss report API

- [ ] `ProfitLossView` → GET with query params (start_date, end_date, group_by=month/quarter)
  - Revenue - Expenses per period
  - Running totals
- [ ] URL: `GET /api/reports/profit-loss/`

### 12.5 Lead conversion report API

- [ ] `LeadConversionView` → GET
  - Total leads, converted, conversion rate
  - By source breakdown
  - By assigned employee breakdown
  - Monthly trend
- [ ] URL: `GET /api/reports/lead-conversion/`

### 12.6 Employee performance report API

- [ ] `EmployeePerformanceView` → GET
  - Cases handled, leads converted, tasks completed per employee
  - Revenue collected per employee
  - Date range filter
- [ ] URL: `GET /api/reports/employee-performance/`

### 12.7 Wire frontend

- [ ] `reports-api.ts`: all report endpoints
- [ ] Wire dashboard: replace mock stats with real API data via React Query
- [ ] Wire each report page: fetch data → render charts + tables
- [ ] Add date range pickers that trigger API refetch
- [ ] Charts: use recharts or chart.js (pick one, keep consistent)

### 12.8 Tests

- [ ] Dashboard stats return correct aggregations
- [ ] Revenue report with date range
- [ ] P&L calculation accuracy
- [ ] Lead conversion rates

## Verification Checklist

- [ ] Dashboard loads real stats from API
- [ ] Each report page shows charts + data from API
- [ ] Date range filtering works on all reports
- [ ] Numbers are consistent (revenue in dashboard = revenue report total)
- [ ] Empty state handled (no data for date range)
- [ ] All tests pass
- [ ] Git commit: `feat: reports module — dashboard, revenue, P&L, conversion, employee reports`
