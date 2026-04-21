// ─── Monthly revenue & expense data (last 12 months) ───

export interface MonthlyFinancials {
    month: string // "YYYY-MM"
    label: string // "Apr 2026"
    revenue: number
    expenses: number
    netProfit: number
    paymentsCount: number
    topCustomer: string
}

export const monthlyFinancials: MonthlyFinancials[] = [
    { month: '2025-05', label: 'May 2025', revenue: 82000, expenses: 195000, netProfit: -113000, paymentsCount: 6, topCustomer: 'Deepak Chauhan' },
    { month: '2025-06', label: 'Jun 2025', revenue: 95000, expenses: 205000, netProfit: -110000, paymentsCount: 8, topCustomer: 'Kavita Joshi' },
    { month: '2025-07', label: 'Jul 2025', revenue: 110000, expenses: 210000, netProfit: -100000, paymentsCount: 9, topCustomer: 'Rajesh Khanna' },
    { month: '2025-08', label: 'Aug 2025', revenue: 125000, expenses: 218000, netProfit: -93000, paymentsCount: 10, topCustomer: 'Rajesh Khanna' },
    { month: '2025-09', label: 'Sep 2025', revenue: 145000, expenses: 222000, netProfit: -77000, paymentsCount: 11, topCustomer: 'Prerna Gupta' },
    { month: '2025-10', label: 'Oct 2025', revenue: 168000, expenses: 230000, netProfit: -62000, paymentsCount: 13, topCustomer: 'Meena Kumari' },
    { month: '2025-11', label: 'Nov 2025', revenue: 192000, expenses: 235000, netProfit: -43000, paymentsCount: 15, topCustomer: 'Prerna Gupta' },
    { month: '2025-12', label: 'Dec 2025', revenue: 215000, expenses: 240000, netProfit: -25000, paymentsCount: 14, topCustomer: 'Sunita Devi' },
    { month: '2026-01', label: 'Jan 2026', revenue: 248000, expenses: 245000, netProfit: 3000, paymentsCount: 16, topCustomer: 'Rajesh Khanna' },
    { month: '2026-02', label: 'Feb 2026', revenue: 275000, expenses: 250000, netProfit: 25000, paymentsCount: 18, topCustomer: 'Deepak Chauhan' },
    { month: '2026-03', label: 'Mar 2026', revenue: 310000, expenses: 260000, netProfit: 50000, paymentsCount: 20, topCustomer: 'Vikram Malhotra' },
    { month: '2026-04', label: 'Apr 2026', revenue: 345000, expenses: 271330, netProfit: 73670, paymentsCount: 22, topCustomer: 'Prerna Gupta' },
]

// ─── Expense breakdown by category per month ───

export interface MonthlyExpenseBreakdown {
    month: string
    label: string
    Salaries: number
    Marketing: number
    Rent: number
    'Software/Tools': number
    Legal: number
    Travel: number
    'Office Supplies': number
    Other: number
    total: number
}

export const monthlyExpenseBreakdown: MonthlyExpenseBreakdown[] = [
    { month: '2025-05', label: 'May 2025', Salaries: 120000, Marketing: 20000, Rent: 40000, 'Software/Tools': 5000, Legal: 3000, Travel: 2000, 'Office Supplies': 2000, Other: 3000, total: 195000 },
    { month: '2025-06', label: 'Jun 2025', Salaries: 125000, Marketing: 22000, Rent: 40000, 'Software/Tools': 5500, Legal: 4000, Travel: 3000, 'Office Supplies': 2500, Other: 3000, total: 205000 },
    { month: '2025-07', label: 'Jul 2025', Salaries: 130000, Marketing: 22000, Rent: 40000, 'Software/Tools': 5500, Legal: 4500, Travel: 3000, 'Office Supplies': 2000, Other: 3000, total: 210000 },
    { month: '2025-08', label: 'Aug 2025', Salaries: 135000, Marketing: 24000, Rent: 40000, 'Software/Tools': 6000, Legal: 4000, Travel: 3500, 'Office Supplies': 2500, Other: 3000, total: 218000 },
    { month: '2025-09', label: 'Sep 2025', Salaries: 138000, Marketing: 25000, Rent: 40000, 'Software/Tools': 6000, Legal: 4000, Travel: 3500, 'Office Supplies': 2500, Other: 3000, total: 222000 },
    { month: '2025-10', label: 'Oct 2025', Salaries: 142000, Marketing: 28000, Rent: 42000, 'Software/Tools': 5500, Legal: 4000, Travel: 3500, 'Office Supplies': 2000, Other: 3000, total: 230000 },
    { month: '2025-11', label: 'Nov 2025', Salaries: 145000, Marketing: 30000, Rent: 42000, 'Software/Tools': 5500, Legal: 3500, Travel: 4000, 'Office Supplies': 2000, Other: 3000, total: 235000 },
    { month: '2025-12', label: 'Dec 2025', Salaries: 148000, Marketing: 30000, Rent: 42000, 'Software/Tools': 6000, Legal: 4000, Travel: 4500, 'Office Supplies': 2500, Other: 3000, total: 240000 },
    { month: '2026-01', label: 'Jan 2026', Salaries: 152000, Marketing: 30000, Rent: 45000, 'Software/Tools': 6000, Legal: 3500, Travel: 3000, 'Office Supplies': 2500, Other: 3000, total: 245000 },
    { month: '2026-02', label: 'Feb 2026', Salaries: 155000, Marketing: 32000, Rent: 45000, 'Software/Tools': 6000, Legal: 3500, Travel: 3000, 'Office Supplies': 2500, Other: 3000, total: 250000 },
    { month: '2026-03', label: 'Mar 2026', Salaries: 160000, Marketing: 34000, Rent: 45000, 'Software/Tools': 7000, Legal: 5000, Travel: 3500, 'Office Supplies': 2500, Other: 3000, total: 260000 },
    { month: '2026-04', label: 'Apr 2026', Salaries: 160000, Marketing: 34500, Rent: 51800, 'Software/Tools': 8700, Legal: 7200, Travel: 2930, 'Office Supplies': 3500, Other: 2700, total: 271330 },
]

// ─── Lead conversion data ───

export interface LeadFunnel {
    stage: string
    count: number
    color: string
}

export const leadFunnel: LeadFunnel[] = [
    { stage: 'New', count: 340, color: '#3b82f6' },
    { stage: 'Contacted', count: 265, color: '#8b5cf6' },
    { stage: 'Interested', count: 158, color: '#f59e0b' },
    { stage: 'Converted', count: 92, color: '#10b981' },
    { stage: 'Lost', count: 73, color: '#ef4444' },
]

export interface MonthlyLeadConversion {
    month: string
    label: string
    leadsAdded: number
    converted: number
    conversionRate: number
}

export const monthlyLeadConversions: MonthlyLeadConversion[] = [
    { month: '2025-05', label: 'May 2025', leadsAdded: 22, converted: 4, conversionRate: 18.2 },
    { month: '2025-06', label: 'Jun 2025', leadsAdded: 25, converted: 5, conversionRate: 20.0 },
    { month: '2025-07', label: 'Jul 2025', leadsAdded: 28, converted: 6, conversionRate: 21.4 },
    { month: '2025-08', label: 'Aug 2025', leadsAdded: 30, converted: 7, conversionRate: 23.3 },
    { month: '2025-09', label: 'Sep 2025', leadsAdded: 26, converted: 7, conversionRate: 26.9 },
    { month: '2025-10', label: 'Oct 2025', leadsAdded: 32, converted: 9, conversionRate: 28.1 },
    { month: '2025-11', label: 'Nov 2025', leadsAdded: 35, converted: 10, conversionRate: 28.6 },
    { month: '2025-12', label: 'Dec 2025', leadsAdded: 28, converted: 8, conversionRate: 28.6 },
    { month: '2026-01', label: 'Jan 2026', leadsAdded: 38, converted: 12, conversionRate: 31.6 },
    { month: '2026-02', label: 'Feb 2026', leadsAdded: 34, converted: 10, conversionRate: 29.4 },
    { month: '2026-03', label: 'Mar 2026', leadsAdded: 40, converted: 13, conversionRate: 32.5 },
    { month: '2026-04', label: 'Apr 2026', leadsAdded: 42, converted: 14, conversionRate: 33.3 },
]

export interface LeadSourceConversion {
    source: string
    totalLeads: number
    converted: number
    conversionRate: number
}

export const leadSourceConversions: LeadSourceConversion[] = [
    { source: 'Referral', totalLeads: 85, converted: 38, conversionRate: 44.7 },
    { source: 'Website', totalLeads: 110, converted: 22, conversionRate: 20.0 },
    { source: 'Social Media', totalLeads: 65, converted: 13, conversionRate: 20.0 },
    { source: 'Walk-in', totalLeads: 45, converted: 12, conversionRate: 26.7 },
    { source: 'Phone Inquiry', totalLeads: 35, converted: 7, conversionRate: 20.0 },
]

// ─── Case data ───

export interface CaseByStage {
    stage: string
    count: number
    color: string
}

export const casesByStage: CaseByStage[] = [
    { stage: 'Case Created', count: 8, color: '#3b82f6' },
    { stage: 'Document Collection', count: 12, color: '#8b5cf6' },
    { stage: 'Analysis', count: 15, color: '#f59e0b' },
    { stage: 'Negotiation', count: 22, color: '#f97316' },
    { stage: 'Settlement Offer', count: 18, color: '#10b981' },
    { stage: 'Closure', count: 17, color: '#06b6d4' },
]

export const caseStats = {
    totalCases: 92,
    successRate: 78.3,
    avgResolutionDays: 45,
    activeCases: 57,
}

// ─── Case-level profitability ───

export interface CaseProfit {
    caseNumber: string
    customerName: string
    totalFee: number
    expenses: number
    profit: number
    marginPct: number
}

export const caseProfitData: CaseProfit[] = [
    { caseNumber: 'CASE-045', customerName: 'Rajesh Khanna', totalFee: 104600, expenses: 12500, profit: 92100, marginPct: 88.0 },
    { caseNumber: 'CASE-078', customerName: 'Rajesh Khanna', totalFee: 25000, expenses: 3200, profit: 21800, marginPct: 87.2 },
    { caseNumber: 'CASE-087', customerName: 'Kavita Joshi', totalFee: 52000, expenses: 8500, profit: 43500, marginPct: 83.7 },
    { caseNumber: 'CASE-092', customerName: 'Pooja Sharma', totalFee: 8250, expenses: 1200, profit: 7050, marginPct: 85.5 },
    { caseNumber: 'CASE-056', customerName: 'Sunita Devi', totalFee: 30000, expenses: 5800, profit: 24200, marginPct: 80.7 },
    { caseNumber: 'CASE-101', customerName: 'Prerna Gupta', totalFee: 182000, expenses: 28000, profit: 154000, marginPct: 84.6 },
    { caseNumber: 'CASE-034', customerName: 'Meena Kumari', totalFee: 25000, expenses: 4500, profit: 20500, marginPct: 82.0 },
    { caseNumber: 'CASE-112', customerName: 'Vikram Malhotra', totalFee: 75000, expenses: 9800, profit: 65200, marginPct: 86.9 },
    { caseNumber: 'CASE-025', customerName: 'Deepak Chauhan', totalFee: 58000, expenses: 7200, profit: 50800, marginPct: 87.6 },
    { caseNumber: 'CASE-118', customerName: 'Nisha Agarwal', totalFee: 25000, expenses: 2000, profit: 23000, marginPct: 92.0 },
]

// ─── Employee performance ───

export interface EmployeePerformance {
    name: string
    role: string
    leadsHandled: number
    casesClosed: number
    activeCases: number
    revenueGenerated: number
}

export const employeePerformance: EmployeePerformance[] = [
    { name: 'Amit Sharma', role: 'Senior Counsellor', leadsHandled: 85, casesClosed: 22, activeCases: 8, revenueGenerated: 425000 },
    { name: 'Karan Singh', role: 'Counsellor', leadsHandled: 72, casesClosed: 18, activeCases: 6, revenueGenerated: 350000 },
    { name: 'Sneha Verma', role: 'Counsellor', leadsHandled: 68, casesClosed: 16, activeCases: 7, revenueGenerated: 310000 },
    { name: 'Priya Nair', role: 'Junior Counsellor', leadsHandled: 55, casesClosed: 12, activeCases: 5, revenueGenerated: 220000 },
    { name: 'Deepa Rao', role: 'Operations', leadsHandled: 30, casesClosed: 10, activeCases: 4, revenueGenerated: 180000 },
    { name: 'Rajesh Gupta', role: 'Operations', leadsHandled: 25, casesClosed: 8, activeCases: 3, revenueGenerated: 145000 },
]

// ─── Helpers ───

export function formatCurrency(n: number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(n)
}

export type Period = 'month' | 'quarter' | 'year'

export function filterByPeriod<T extends { month: string }>(data: T[], period: Period): T[] {
    switch (period) {
        case 'month':
            return data.filter((d) => d.month === '2026-04')
        case 'quarter':
            return data.filter((d) => d.month >= '2026-01' && d.month <= '2026-04')
        case 'year':
            return data.filter((d) => d.month >= '2025-05' && d.month <= '2026-04')
        default:
            return data
    }
}
