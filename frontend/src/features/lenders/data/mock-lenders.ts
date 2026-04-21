export type LenderType = 'Bank' | 'NBFC' | 'Fintech' | 'Other'
export type NegotiationOutcome = 'Success' | 'Failed' | 'In Progress'

export interface Lender {
    id: number
    name: string
    type: LenderType
    contactPerson: string
    contactPhone: string
    contactEmail: string
    address: string
    totalCasesHandled: number
    avgSettlementRate: number
    notes: string
}

export interface LenderNegotiation {
    id: number
    lenderId: number
    caseId: number
    customerName: string
    originalAmount: number
    negotiatedAmount: number
    discountPct: number
    outcome: NegotiationOutcome
    date: string
    negotiatedBy: string
}

export const lenderTypes: LenderType[] = ['Bank', 'NBFC', 'Fintech', 'Other']

export const lenderTypeColors: Record<LenderType, string> = {
    Bank: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    NBFC: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    Fintech: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
    Other: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
}

export const negotiationOutcomeColors: Record<NegotiationOutcome, string> = {
    Success: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Failed: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    'In Progress': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
}

export const mockLenders: Lender[] = [
    {
        id: 1,
        name: 'HDFC Bank',
        type: 'Bank',
        contactPerson: 'Nitin Arora',
        contactPhone: '9876543210',
        contactEmail: 'nitin.arora@hdfcbank.example',
        address: 'Connaught Place, New Delhi',
        totalCasesHandled: 42,
        avgSettlementRate: 38,
        notes: 'Responsive on structured settlement cases above 6 months overdue.',
    },
    {
        id: 2,
        name: 'ICICI Bank',
        type: 'Bank',
        contactPerson: 'Anjali Mehta',
        contactPhone: '9811122233',
        contactEmail: 'anjali.mehta@icicibank.example',
        address: 'Sector 18, Noida',
        totalCasesHandled: 36,
        avgSettlementRate: 34,
        notes: 'Prefers one-time settlement offers with income proof attached.',
    },
    {
        id: 3,
        name: 'Bajaj Finance',
        type: 'NBFC',
        contactPerson: 'Rahul Sethi',
        contactPhone: '9820012345',
        contactEmail: 'rahul.sethi@bajajfinance.example',
        address: 'Andheri East, Mumbai',
        totalCasesHandled: 31,
        avgSettlementRate: 41,
        notes: 'Good closure speed once hardship letter is approved.',
    },
    {
        id: 4,
        name: 'Tata Capital',
        type: 'NBFC',
        contactPerson: 'Pallavi Rao',
        contactPhone: '9898989898',
        contactEmail: 'pallavi.rao@tatacapital.example',
        address: 'Whitefield, Bengaluru',
        totalCasesHandled: 18,
        avgSettlementRate: 29,
        notes: 'Negotiations take longer on active EMI accounts.',
    },
    {
        id: 5,
        name: 'KreditBee',
        type: 'Fintech',
        contactPerson: 'Manish Dutta',
        contactPhone: '9000011112',
        contactEmail: 'manish.dutta@kreditbee.example',
        address: 'Koramangala, Bengaluru',
        totalCasesHandled: 24,
        avgSettlementRate: 46,
        notes: 'Fast response on email. Often accepts split settlement payment plans.',
    },
    {
        id: 6,
        name: 'MoneyTap',
        type: 'Fintech',
        contactPerson: 'Sonal Khurana',
        contactPhone: '9910011223',
        contactEmail: 'sonal.khurana@moneytap.example',
        address: 'Gurugram Cyber City',
        totalCasesHandled: 17,
        avgSettlementRate: 43,
        notes: 'More flexible after 90+ DPD and verified employment break.',
    },
    {
        id: 7,
        name: 'Axis Bank',
        type: 'Bank',
        contactPerson: 'Deepak Bansal',
        contactPhone: '9818181818',
        contactEmail: 'deepak.bansal@axisbank.example',
        address: 'Janakpuri, New Delhi',
        totalCasesHandled: 27,
        avgSettlementRate: 32,
        notes: 'Escalations help on high-balance unsecured loans.',
    },
    {
        id: 8,
        name: 'Muthoot Finance',
        type: 'Other',
        contactPerson: 'Jijo Thomas',
        contactPhone: '9847012345',
        contactEmail: 'jijo.thomas@muthootfinance.example',
        address: 'MG Road, Kochi',
        totalCasesHandled: 11,
        avgSettlementRate: 24,
        notes: 'Requires branch-led confirmation before final letter issuance.',
    },
    {
        id: 9,
        name: 'Aditya Birla Finance',
        type: 'NBFC',
        contactPerson: 'Keshav Jain',
        contactPhone: '9870012345',
        contactEmail: 'keshav.jain@abfinance.example',
        address: 'Lower Parel, Mumbai',
        totalCasesHandled: 15,
        avgSettlementRate: 37,
        notes: 'Often counters first offer; best results after second negotiation round.',
    },
]

export const mockNegotiationHistory: LenderNegotiation[] = [
    { id: 1, lenderId: 1, caseId: 1, customerName: 'Rajesh Khanna', originalAmount: 1400000, negotiatedAmount: 870000, discountPct: 38, outcome: 'Success', date: '2026-04-18', negotiatedBy: 'Amit Sharma' },
    { id: 2, lenderId: 1, caseId: 7, customerName: 'Prerna Gupta', originalAmount: 620000, negotiatedAmount: 409000, discountPct: 34, outcome: 'In Progress', date: '2026-04-20', negotiatedBy: 'Amit Sharma' },
    { id: 3, lenderId: 1, caseId: 9, customerName: 'Meena Kumari', originalAmount: 360000, negotiatedAmount: 252000, discountPct: 30, outcome: 'Failed', date: '2026-04-08', negotiatedBy: 'Priya Nair' },
    { id: 4, lenderId: 2, caseId: 4, customerName: 'Pooja Sharma', originalAmount: 165000, negotiatedAmount: 112000, discountPct: 32, outcome: 'Success', date: '2026-04-11', negotiatedBy: 'Sneha Verma' },
    { id: 5, lenderId: 2, caseId: 10, customerName: 'Rohit Malhotra', originalAmount: 540000, negotiatedAmount: 389000, discountPct: 28, outcome: 'In Progress', date: '2026-04-17', negotiatedBy: 'Rajesh Gupta' },
    { id: 6, lenderId: 3, caseId: 3, customerName: 'Kavita Joshi', originalAmount: 280000, negotiatedAmount: 156000, discountPct: 44, outcome: 'Success', date: '2026-04-16', negotiatedBy: 'Amit Sharma' },
    { id: 7, lenderId: 3, caseId: 5, customerName: 'Sunita Devi', originalAmount: 470000, negotiatedAmount: 282000, discountPct: 40, outcome: 'Success', date: '2026-04-09', negotiatedBy: 'Sneha Verma' },
    { id: 8, lenderId: 3, caseId: 6, customerName: 'Sunita Devi', originalAmount: 210000, negotiatedAmount: 138000, discountPct: 34, outcome: 'In Progress', date: '2026-03-25', negotiatedBy: 'Rajesh Gupta' },
    { id: 9, lenderId: 4, caseId: 2, customerName: 'Rajesh Khanna', originalAmount: 350000, negotiatedAmount: 259000, discountPct: 26, outcome: 'In Progress', date: '2026-04-14', negotiatedBy: 'Rajesh Gupta' },
    { id: 10, lenderId: 4, caseId: 8, customerName: 'Prerna Gupta', originalAmount: 450000, negotiatedAmount: 351000, discountPct: 22, outcome: 'Failed', date: '2026-04-15', negotiatedBy: 'Sneha Verma' },
    { id: 11, lenderId: 5, caseId: 11, customerName: 'Neha Kapoor', originalAmount: 195000, negotiatedAmount: 99000, discountPct: 49, outcome: 'Success', date: '2026-04-13', negotiatedBy: 'Priya Nair' },
    { id: 12, lenderId: 5, caseId: 12, customerName: 'Vikas Anand', originalAmount: 132000, negotiatedAmount: 70000, discountPct: 47, outcome: 'Success', date: '2026-04-07', negotiatedBy: 'Amit Sharma' },
    { id: 13, lenderId: 6, caseId: 13, customerName: 'Shreya Bhat', originalAmount: 98000, negotiatedAmount: 56000, discountPct: 43, outcome: 'In Progress', date: '2026-04-18', negotiatedBy: 'Sneha Verma' },
    { id: 14, lenderId: 6, caseId: 14, customerName: 'Farhan Ali', originalAmount: 145000, negotiatedAmount: 77000, discountPct: 47, outcome: 'Success', date: '2026-04-04', negotiatedBy: 'Priya Nair' },
    { id: 15, lenderId: 7, caseId: 15, customerName: 'Anita Goyal', originalAmount: 520000, negotiatedAmount: 374000, discountPct: 28, outcome: 'Success', date: '2026-03-30', negotiatedBy: 'Rajesh Gupta' },
    { id: 16, lenderId: 7, caseId: 16, customerName: 'Harish Nanda', originalAmount: 315000, negotiatedAmount: 246000, discountPct: 22, outcome: 'Failed', date: '2026-04-10', negotiatedBy: 'Amit Sharma' },
    { id: 17, lenderId: 8, caseId: 17, customerName: 'Latha Menon', originalAmount: 260000, negotiatedAmount: 205000, discountPct: 21, outcome: 'In Progress', date: '2026-04-06', negotiatedBy: 'Sneha Verma' },
    { id: 18, lenderId: 9, caseId: 18, customerName: 'Ajay Bedi', originalAmount: 410000, negotiatedAmount: 258000, discountPct: 37, outcome: 'Success', date: '2026-04-02', negotiatedBy: 'Amit Sharma' },
]

export function getLenderNegotiations(lenderId: number) {
    return mockNegotiationHistory.filter((entry) => entry.lenderId === lenderId)
}

export function getLenderStats(lenderId: number) {
    const history = getLenderNegotiations(lenderId)
    const successful = history.filter((entry) => entry.outcome === 'Success')
    const totalCases = new Set(history.map((entry) => entry.caseId)).size
    const avgSettlementRate = successful.length > 0
        ? successful.reduce((sum, entry) => sum + entry.discountPct, 0) / successful.length
        : 0
    const successRate = history.length > 0 ? (successful.length / history.length) * 100 : 0

    return {
        totalCases,
        avgSettlementRate,
        successRate,
    }
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value)
}

export function formatDate(value: string) {
    return new Date(value).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}