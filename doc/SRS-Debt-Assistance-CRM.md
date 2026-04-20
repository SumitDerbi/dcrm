# Software Requirements Specification (SRS)

**Project Title:** Debt Assistance CRM System with Customer Portal & Financial Management

---

## 1. Introduction

### 1.1 Purpose

This system is designed to build a centralized CRM platform for managing the end-to-end lifecycle of customers seeking loan/debt assistance, including:

- Lead acquisition and conversion
- Debt analysis and resolution workflows
- Assistance fee calculation and tracking
- Expense tracking and profitability analysis
- Customer self-service portal for transparency

### 1.2 Scope

The system will:

- Manage complete lifecycle: Lead → Case → Settlement → Closure
- Enable internal teams to manage operations efficiently
- Provide a customer login portal
- Track revenue (fees) and expenses
- Generate profitability insights

### 1.3 Definitions

| Term           | Meaning                    |
| -------------- | -------------------------- |
| Lead           | Potential customer         |
| Customer       | Converted lead             |
| Case           | Debt resolution engagement |
| Settlement     | Negotiated reduced payment |
| Assistance Fee | Service charge             |
| Expense        | Business cost              |
| Profit         | Revenue – Expenses         |

---

## 2. Overall Description

### 2.1 Product Perspective

- Web-based CRM system
- Modular, scalable architecture
- Multi-role access
- Integrated financial tracking

### 2.2 Product Functions

- Lead & customer management
- Loan/debt tracking
- Case workflow management
- Fee calculation & collection
- Expense tracking
- Profit analysis
- Reporting & analytics
- Customer self-service portal

### 2.3 User Roles

| Role            | Description        |
| --------------- | ------------------ |
| Admin           | Full control       |
| Sales Executive | Lead handling      |
| Debt Counsellor | Case management    |
| Operations      | Documentation      |
| Accounts        | Finance & payments |
| Customer        | Portal access      |

---

## 3. System Modules

### 3.1 Lead Management

**Features:**

- Lead capture (manual + integrations)
- Fields:
  - Name, Phone, Email, City
  - Loan type, total debt
  - Income details
- Status tracking:
  - New, Contacted, Interested, Converted
- Lead assignment
- Follow-up reminders

### 3.2 Customer Management

**Features:**

- Personal profile
- Financial snapshot
- Risk categorization
- Linked cases
- Activity logs

### 3.3 Loan & Debt Management

**Features:**

- Multiple loans per customer
- Fields:
  - Lender name, Outstanding amount, EMI, Interest rate, Overdue status

### 3.4 Case / Workflow Management

**Stages:**

1. Case Created
2. Document Collection
3. Analysis
4. Negotiation
5. Settlement Offer
6. Closure

**Features:**

- Case assignment
- Notes
- Timeline tracking

### 3.5 Document Management

**Features:**

- Upload/download
- Document types:
  - PAN, Aadhaar
  - Bank statements
  - Loan docs
- Verification status
- Case tagging

### 3.6 Assistance Fee Management

**Fee Models:**

- Fixed
- Percentage (based on savings)
- Hybrid
- Milestone-based

**Features:**

- Fee plan creation
- Assign to customer
- Auto calculation
- Installments
- Invoice generation
- Receipt tracking

### 3.7 Payment Tracking

**Features:**

- Record payments (Cash/UPI/Bank)
- Track:
  - Paid / Pending / Overdue
- Installment handling
- Receipt generation

### 3.8 Expense Management

**Features:**

- Expense categories:
  - Salaries, Marketing, Rent, Tools, etc.
- Expense entry:
  - Date, amount, category, description
- Payment mode tracking
- Case-linked expenses

### 3.9 Profit & Financial Management

**Calculations:**

- Net Profit = Fees Collected – Expenses
- Case Profit = Case Fee – Case Expenses

**Features:**

- Profit dashboard
- Periodic reports (monthly, custom)
- Expense breakdown
- Revenue tracking

### 3.10 Communication Module

**Features:**

- Call logs
- SMS / WhatsApp / Email tracking
- Templates
- Notifications

### 3.11 Task & Follow-up Management

**Features:**

- Task creation
- Daily reminders
- Escalations

### 3.12 Reporting & Analytics

**Reports:**

- Lead conversion
- Case success rate
- Revenue reports
- Expense reports
- Profit reports
- Employee performance

### 3.13 Lender Management

**Features:**

- Lender database
- Contacts
- Negotiation history

### 3.14 Customer Portal

**Authentication:**

- OTP login (primary)
- Email/password (optional)

**Dashboard:**

- Case progress
- Debt vs settlement
- Fee summary

**Features:**

- Loan details
- Case tracker (visual stages)
- Payment tracking
- Document upload
- Notifications
- Agreements viewing

---

## 4. User Permissions (Summary)

| Module    | Admin | Sales   | Counsellor | Ops     | Accounts | Customer |
| --------- | ----- | ------- | ---------- | ------- | -------- | -------- |
| Leads     | Full  | Full    | View       | View    | View     | No       |
| Customers | Full  | Partial | Full       | Full    | View     | Self     |
| Cases     | Full  | View    | Full       | Full    | View     | View     |
| Fees      | Full  | View    | View       | View    | Full     | View     |
| Payments  | Full  | No      | No         | No      | Full     | View     |
| Expenses  | Full  | No      | Limited    | Limited | Full     | No       |
| Reports   | Full  | Limited | Limited    | Limited | Full     | No       |

---

## 5. System Workflow

```
Lead → Qualification → Conversion → Customer Profile → Case Creation → Document Collection →
Analysis → Negotiation → Settlement → Fee Calculation → Payment → Expense Tracking →
Profit Calculation → Closure
```

---

## 6. Technology Stack

| Layer               | Technology                     |
| ------------------- | ------------------------------ |
| Frontend            | React.js (PWA enabled)         |
| Backend             | Django + Django REST Framework |
| Database            | PostgreSQL                     |
| Storage             | AWS S3 / Cloud storage         |
| Authentication      | JWT + OTP                      |
| Realtime (Optional) | WebSockets                     |

---

## 7. Security Requirements

- Role-based access control
- HTTPS encryption
- Secure document storage
- Audit logs
- Regular backups

---

## 8. Data Model (High-Level)

**Tables:**

- `users`
- `leads`
- `customers`
- `loans`
- `cases`
- `documents`
- `fee_plans`
- `payments`
- `invoices`
- `expenses`
- `expense_categories`
- `tasks`
- `notifications`

---

## 9. Testing Requirements

- Unit testing
- API testing
- UI testing
- Role-based testing
- Security testing

---

## 10. MVP Scope

### Phase 1

- Lead management
- Customer module
- Loan tracking
- Case workflow
- Fee management (basic)
- Payment tracking
- Expense tracking
- Customer portal (basic)

### Phase 2

- WhatsApp integration
- Chat system
- Advanced reports
- eSign
- Payment gateway

---

## 11. Risks & Considerations

- Sensitive financial data → high security needed
- Fee calculations must be accurate
- Overengineering may delay launch
- UX must be simple for customers

---

## 12. Future Enhancements

- AI-based debt advisory
- Credit score integration
- Mobile app
- Automation workflows
- Accounting integrations

---

## Final Summary

This system will act as:

- **CRM** (operations)
- **Customer Portal** (experience)
- **Revenue Engine** (fees)
- **Financial Tracker** (profitability)

> In short: a complete business operating system for debt assistance services.
