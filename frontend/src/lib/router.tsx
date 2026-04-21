import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'

// Lazy load pages
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import LeadListPage from '@/features/leads/pages/LeadListPage'
import LeadNewPage from '@/features/leads/pages/LeadNewPage'
import LeadDetailPage from '@/features/leads/pages/LeadDetailPage'
import CustomerListPage from '@/features/customers/pages/CustomerListPage'
import CustomerDetailPage from '@/features/customers/pages/CustomerDetailPage'
import CustomerEditPage from '@/features/customers/pages/CustomerEditPage'
import LoanListPage from '@/features/loans/pages/LoanListPage'
import LoanFormPage from '@/features/loans/pages/LoanFormPage'
import CaseListPage from '@/features/cases/pages/CaseListPage'
import CaseDetailPage from '@/features/cases/pages/CaseDetailPage'
import CaseFormPage from '@/features/cases/pages/CaseFormPage'
import DocumentListPage from '@/features/documents/pages/DocumentListPage'
import FeeListPage from '@/features/fees/pages/FeeListPage'
import FeeNewPage from '@/features/fees/pages/FeeNewPage'
import FeeAssignmentPage from '@/features/fees/pages/FeeAssignmentPage'
import PaymentListPage from '@/features/payments/pages/PaymentListPage'
import PaymentNewPage from '@/features/payments/pages/PaymentNewPage'
import ExpenseListPage from '@/features/expenses/pages/ExpenseListPage'
import ExpenseNewPage from '@/features/expenses/pages/ExpenseNewPage'
import ReportsPage from '@/features/reports/pages/ReportsPage'
import RevenueReportPage from '@/features/reports/pages/RevenueReportPage'
import ExpenseReportPage from '@/features/reports/pages/ExpenseReportPage'
import ProfitReportPage from '@/features/reports/pages/ProfitReportPage'
import LeadConversionReportPage from '@/features/reports/pages/LeadConversionReportPage'
import EmployeeReportPage from '@/features/reports/pages/EmployeeReportPage'
import LenderListPage from '@/features/lenders/pages/LenderListPage'
import LenderDetailPage from '@/features/lenders/pages/LenderDetailPage'
import LenderFormPage from '@/features/lenders/pages/LenderFormPage'
import TaskListPage from '@/features/tasks/pages/TaskListPage'
import TaskFormPage from '@/features/tasks/pages/TaskFormPage'
import CommunicationsPage from '@/features/communications/pages/CommunicationsPage'
import TemplateListPage from '@/features/communications/pages/TemplateListPage'
import SettingsPage from '@/features/settings/pages/SettingsPage'
import LoginPage from '@/features/auth/pages/LoginPage'
import VerifyOtpPage from '@/features/auth/pages/VerifyOtpPage'
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage'
import OtpLoginPage from '@/features/auth/pages/OtpLoginPage'
import PortalLayout from '@/features/portal/components/PortalLayout'
import PortalDashboardPage from '@/features/portal/pages/PortalDashboardPage'
import PortalCasesPage from '@/features/portal/pages/PortalCasesPage'
import PortalCaseDetailPage from '@/features/portal/pages/PortalCaseDetailPage'
import PortalPaymentsPage from '@/features/portal/pages/PortalPaymentsPage'
import PortalDocumentsPage from '@/features/portal/pages/PortalDocumentsPage'
import PortalNotificationsPage from '@/features/portal/pages/PortalNotificationsPage'
import PortalProfilePage from '@/features/portal/pages/PortalProfilePage'

function AppShellLayout() {
    return (
        <AppShell>
            <Outlet />
        </AppShell>
    )
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth routes — no sidebar */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/otp-login" element={<OtpLoginPage />} />
                <Route path="/verify-otp" element={<VerifyOtpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Customer portal */}
                <Route path="/portal" element={<PortalLayout />}>
                    <Route index element={<PortalDashboardPage />} />
                    <Route path="cases" element={<PortalCasesPage />} />
                    <Route path="cases/:id" element={<PortalCaseDetailPage />} />
                    <Route path="payments" element={<PortalPaymentsPage />} />
                    <Route path="documents" element={<PortalDocumentsPage />} />
                    <Route path="notifications" element={<PortalNotificationsPage />} />
                    <Route path="profile" element={<PortalProfilePage />} />
                </Route>

                {/* App routes — inside AppShell */}
                <Route element={<AppShellLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/leads" element={<LeadListPage />} />
                    <Route path="/leads/new" element={<LeadNewPage />} />
                    <Route path="/leads/:id" element={<LeadDetailPage />} />
                    <Route path="/leads/:id/edit" element={<LeadNewPage />} />
                    <Route path="/customers" element={<CustomerListPage />} />
                    <Route path="/customers/:id" element={<CustomerDetailPage />} />
                    <Route path="/customers/:id/edit" element={<CustomerEditPage />} />
                    <Route path="/loans" element={<LoanListPage />} />
                    <Route path="/loans/new" element={<LoanFormPage />} />
                    <Route path="/loans/:id/edit" element={<LoanFormPage />} />
                    <Route path="/cases" element={<CaseListPage />} />
                    <Route path="/cases/new" element={<CaseFormPage />} />
                    <Route path="/cases/:id" element={<CaseDetailPage />} />
                    <Route path="/cases/:id/edit" element={<CaseFormPage />} />
                    <Route path="/documents" element={<DocumentListPage />} />
                    <Route path="/fees" element={<FeeListPage />} />
                    <Route path="/fees/new" element={<FeeNewPage />} />
                    <Route path="/fees/:id/edit" element={<FeeNewPage />} />
                    <Route path="/fees/assignments" element={<FeeAssignmentPage />} />
                    <Route path="/payments" element={<PaymentListPage />} />
                    <Route path="/payments/new" element={<PaymentNewPage />} />
                    <Route path="/expenses" element={<ExpenseListPage />} />
                    <Route path="/expenses/new" element={<ExpenseNewPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/reports/revenue" element={<RevenueReportPage />} />
                    <Route path="/reports/expenses" element={<ExpenseReportPage />} />
                    <Route path="/reports/profit" element={<ProfitReportPage />} />
                    <Route path="/reports/leads" element={<LeadConversionReportPage />} />
                    <Route path="/reports/employees" element={<EmployeeReportPage />} />
                    <Route path="/lenders" element={<LenderListPage />} />
                    <Route path="/lenders/new" element={<LenderFormPage />} />
                    <Route path="/lenders/:id" element={<LenderDetailPage />} />
                    <Route path="/lenders/:id/edit" element={<LenderFormPage />} />
                    <Route path="/tasks" element={<TaskListPage />} />
                    <Route path="/tasks/new" element={<TaskFormPage />} />
                    <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
                    <Route path="/communications" element={<CommunicationsPage />} />
                    <Route path="/communications/templates" element={<TemplateListPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
