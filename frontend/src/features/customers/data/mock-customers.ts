export type RiskCategory = 'Low' | 'Medium' | 'High'
export type CustomerStatus = 'Active' | 'Inactive'

export interface Customer {
    id: number
    name: string
    phone: string
    email: string
    city: string
    dateOfBirth: string
    pan: string
    aadhaar: string
    monthlyIncome: number
    riskCategory: RiskCategory
    totalDebt: number
    totalLoans: number
    activeCases: number
    status: CustomerStatus
    createdAt: string
    convertedFromLeadId: number | null
}

export interface LinkedLoan {
    id: number
    lender: string
    type: string
    amount: number
    emi: number
    outstanding: number
    overdueMonths: number
}

export interface LinkedCase {
    id: number
    caseNumber: string
    stage: string
    counsellor: string
    createdAt: string
}

export interface FeeSummary {
    totalFees: number
    paid: number
    pending: number
}

export interface ActivityItem {
    id: number
    action: string
    date: string
    by: string
}

export const riskColors: Record<RiskCategory, string> = {
    Low: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    High: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export const statusColors: Record<CustomerStatus, string> = {
    Active: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

export const mockCustomers: Customer[] = [
    {
        id: 1,
        name: 'Kavita Joshi',
        phone: '9654321098',
        email: 'kavita.j@email.com',
        city: 'Bangalore',
        dateOfBirth: '1988-05-14',
        pan: 'ABCPJ1234K',
        aadhaar: '234567890123',
        monthlyIncome: 62000,
        riskCategory: 'Medium',
        totalDebt: 520000,
        totalLoans: 2,
        activeCases: 1,
        status: 'Active',
        createdAt: '2026-04-10T13:00:00',
        convertedFromLeadId: 6,
    },
    {
        id: 2,
        name: 'Pooja Sharma',
        phone: '9098765432',
        email: 'pooja.s@email.com',
        city: 'Delhi',
        dateOfBirth: '1992-11-22',
        pan: 'BCDPS5678L',
        aadhaar: '345678901234',
        monthlyIncome: 35000,
        riskCategory: 'Low',
        totalDebt: 165000,
        totalLoans: 1,
        activeCases: 1,
        status: 'Active',
        createdAt: '2026-04-08T14:00:00',
        convertedFromLeadId: 12,
    },
    {
        id: 3,
        name: 'Rajesh Khanna',
        phone: '9876012345',
        email: 'rajesh.k@email.com',
        city: 'Mumbai',
        dateOfBirth: '1980-03-08',
        pan: 'CDESK9012M',
        aadhaar: '456789012345',
        monthlyIncome: 95000,
        riskCategory: 'High',
        totalDebt: 2800000,
        totalLoans: 4,
        activeCases: 2,
        status: 'Active',
        createdAt: '2026-03-15T10:30:00',
        convertedFromLeadId: null,
    },
    {
        id: 4,
        name: 'Meena Kumari',
        phone: '9765098123',
        email: 'meena.k@email.com',
        city: 'Chennai',
        dateOfBirth: '1985-07-19',
        pan: 'DEFMK3456N',
        aadhaar: '567890123456',
        monthlyIncome: 48000,
        riskCategory: 'Medium',
        totalDebt: 680000,
        totalLoans: 2,
        activeCases: 1,
        status: 'Active',
        createdAt: '2026-03-20T09:00:00',
        convertedFromLeadId: null,
    },
    {
        id: 5,
        name: 'Amit Verma',
        phone: '9654087612',
        email: 'amit.v@email.com',
        city: 'Pune',
        dateOfBirth: '1990-01-30',
        pan: 'EFGAV7890P',
        aadhaar: '678901234567',
        monthlyIncome: 55000,
        riskCategory: 'Low',
        totalDebt: 210000,
        totalLoans: 1,
        activeCases: 0,
        status: 'Inactive',
        createdAt: '2026-02-10T11:00:00',
        convertedFromLeadId: null,
    },
    {
        id: 6,
        name: 'Sunita Devi',
        phone: '9543076501',
        email: 'sunita.d@email.com',
        city: 'Jaipur',
        dateOfBirth: '1978-12-05',
        pan: 'FGHSD1234Q',
        aadhaar: '789012345678',
        monthlyIncome: 28000,
        riskCategory: 'High',
        totalDebt: 920000,
        totalLoans: 3,
        activeCases: 2,
        status: 'Active',
        createdAt: '2026-03-05T14:30:00',
        convertedFromLeadId: null,
    },
    {
        id: 7,
        name: 'Vikram Malhotra',
        phone: '9432065490',
        email: 'vikram.m@email.com',
        city: 'Hyderabad',
        dateOfBirth: '1983-09-25',
        pan: 'GHIVM5678R',
        aadhaar: '890123456789',
        monthlyIncome: 78000,
        riskCategory: 'Medium',
        totalDebt: 750000,
        totalLoans: 2,
        activeCases: 1,
        status: 'Active',
        createdAt: '2026-03-12T16:00:00',
        convertedFromLeadId: null,
    },
    {
        id: 8,
        name: 'Nisha Agarwal',
        phone: '9321054389',
        email: 'nisha.a@email.com',
        city: 'Kolkata',
        dateOfBirth: '1995-04-17',
        pan: 'HIJNA9012S',
        aadhaar: '901234567890',
        monthlyIncome: 42000,
        riskCategory: 'Low',
        totalDebt: 180000,
        totalLoans: 1,
        activeCases: 1,
        status: 'Active',
        createdAt: '2026-04-01T10:15:00',
        convertedFromLeadId: null,
    },
    {
        id: 9,
        name: 'Deepak Chauhan',
        phone: '9210043278',
        email: 'deepak.c@email.com',
        city: 'Lucknow',
        dateOfBirth: '1987-06-12',
        pan: 'IJKDC3456T',
        aadhaar: '012345678901',
        monthlyIncome: 65000,
        riskCategory: 'High',
        totalDebt: 1450000,
        totalLoans: 3,
        activeCases: 1,
        status: 'Active',
        createdAt: '2026-02-28T08:45:00',
        convertedFromLeadId: null,
    },
    {
        id: 10,
        name: 'Anita Bose',
        phone: '9109032167',
        email: 'anita.b@email.com',
        city: 'Ahmedabad',
        dateOfBirth: '1991-10-03',
        pan: 'JKLAB7890U',
        aadhaar: '123456789012',
        monthlyIncome: 38000,
        riskCategory: 'Medium',
        totalDebt: 420000,
        totalLoans: 2,
        activeCases: 0,
        status: 'Inactive',
        createdAt: '2026-01-15T12:00:00',
        convertedFromLeadId: null,
    },
    {
        id: 11,
        name: 'Ravi Shankar',
        phone: '9898021056',
        email: 'ravi.s@email.com',
        city: 'Indore',
        dateOfBirth: '1982-02-28',
        pan: 'KLMRS1234V',
        aadhaar: '234567890124',
        monthlyIncome: 72000,
        riskCategory: 'Medium',
        totalDebt: 890000,
        totalLoans: 3,
        activeCases: 1,
        status: 'Active',
        createdAt: '2026-03-25T15:30:00',
        convertedFromLeadId: null,
    },
    {
        id: 12,
        name: 'Prerna Gupta',
        phone: '9787010945',
        email: 'prerna.g@email.com',
        city: 'Nagpur',
        dateOfBirth: '1993-08-10',
        pan: 'LMNPG5678W',
        aadhaar: '345678901235',
        monthlyIncome: 30000,
        riskCategory: 'High',
        totalDebt: 1100000,
        totalLoans: 4,
        activeCases: 2,
        status: 'Active',
        createdAt: '2026-04-05T11:00:00',
        convertedFromLeadId: null,
    },
]

// Detail page helpers
export function getLinkedLoans(customerId: number): LinkedLoan[] {
    const customer = mockCustomers.find((c) => c.id === customerId)
    if (!customer) return []

    const loanSets: Record<number, LinkedLoan[]> = {
        1: [
            { id: 101, lender: 'HDFC Bank', type: 'Personal', amount: 300000, emi: 8500, outstanding: 280000, overdueMonths: 2 },
            { id: 102, lender: 'Bajaj Finance', type: 'Credit Card', amount: 220000, emi: 5500, outstanding: 240000, overdueMonths: 3 },
        ],
        2: [
            { id: 103, lender: 'ICICI Bank', type: 'Credit Card', amount: 165000, emi: 4200, outstanding: 158000, overdueMonths: 1 },
        ],
        3: [
            { id: 104, lender: 'SBI', type: 'Home', amount: 1800000, emi: 18000, outstanding: 1650000, overdueMonths: 4 },
            { id: 105, lender: 'HDFC Bank', type: 'Personal', amount: 500000, emi: 12000, outstanding: 480000, overdueMonths: 2 },
            { id: 106, lender: 'Axis Bank', type: 'Vehicle', amount: 350000, emi: 7800, outstanding: 320000, overdueMonths: 1 },
            { id: 107, lender: 'Kotak', type: 'Credit Card', amount: 150000, emi: 3800, outstanding: 350000, overdueMonths: 5 },
        ],
    }

    // Default loans for customers not in the map
    return loanSets[customerId] ?? [
        { id: 200 + customerId, lender: 'HDFC Bank', type: 'Personal', amount: Math.round(customer.totalDebt * 0.6), emi: Math.round(customer.totalDebt * 0.6 * 0.025), outstanding: Math.round(customer.totalDebt * 0.55), overdueMonths: 2 },
        { id: 300 + customerId, lender: 'ICICI Bank', type: 'Credit Card', amount: Math.round(customer.totalDebt * 0.4), emi: Math.round(customer.totalDebt * 0.4 * 0.025), outstanding: Math.round(customer.totalDebt * 0.38), overdueMonths: 1 },
    ]
}

export function getLinkedCases(customerId: number): LinkedCase[] {
    const customer = mockCustomers.find((c) => c.id === customerId)
    if (!customer || customer.activeCases === 0) return []

    const caseSets: Record<number, LinkedCase[]> = {
        1: [{ id: 87, caseNumber: 'CASE-087', stage: 'Negotiation', counsellor: 'Amit Sharma', createdAt: '2026-04-10T13:30:00' }],
        2: [{ id: 92, caseNumber: 'CASE-092', stage: 'Documentation', counsellor: 'Sneha Verma', createdAt: '2026-04-08T14:30:00' }],
        3: [
            { id: 45, caseNumber: 'CASE-045', stage: 'Settlement', counsellor: 'Amit Sharma', createdAt: '2026-03-15T11:00:00' },
            { id: 78, caseNumber: 'CASE-078', stage: 'Negotiation', counsellor: 'Rajesh Gupta', createdAt: '2026-03-20T09:00:00' },
        ],
        6: [
            { id: 56, caseNumber: 'CASE-056', stage: 'Documentation', counsellor: 'Sneha Verma', createdAt: '2026-03-05T15:00:00' },
            { id: 67, caseNumber: 'CASE-067', stage: 'Lead', counsellor: 'Rajesh Gupta', createdAt: '2026-03-18T10:00:00' },
        ],
        12: [
            { id: 101, caseNumber: 'CASE-101', stage: 'Negotiation', counsellor: 'Amit Sharma', createdAt: '2026-04-05T11:30:00' },
            { id: 105, caseNumber: 'CASE-105', stage: 'Documentation', counsellor: 'Sneha Verma', createdAt: '2026-04-12T09:00:00' },
        ],
    }

    return caseSets[customerId] ?? [
        { id: 100 + customerId, caseNumber: `CASE-${100 + customerId}`, stage: 'Negotiation', counsellor: 'Amit Sharma', createdAt: customer.createdAt },
    ]
}

export function getFeeSummary(customerId: number): FeeSummary {
    const summaries: Record<number, FeeSummary> = {
        1: { totalFees: 25000, paid: 15000, pending: 10000 },
        2: { totalFees: 8000, paid: 8000, pending: 0 },
        3: { totalFees: 65000, paid: 40000, pending: 25000 },
        6: { totalFees: 35000, paid: 10000, pending: 25000 },
        12: { totalFees: 42000, paid: 20000, pending: 22000 },
    }
    return summaries[customerId] ?? { totalFees: 15000, paid: 10000, pending: 5000 }
}

export function getCustomerActivity(customerId: number): ActivityItem[] {
    const customer = mockCustomers.find((c) => c.id === customerId)
    if (!customer) return []

    const items: ActivityItem[] = [
        { id: 1, action: 'Customer profile created', date: customer.createdAt, by: 'System' },
    ]

    if (customer.convertedFromLeadId) {
        items.push({ id: 2, action: `Converted from Lead #${customer.convertedFromLeadId}`, date: customer.createdAt, by: 'Amit Sharma' })
    }

    items.push(
        { id: 3, action: 'Case created and assigned', date: new Date(new Date(customer.createdAt).getTime() + 3600000).toISOString(), by: 'Admin' },
        { id: 4, action: 'Document uploaded — ID Proof', date: new Date(new Date(customer.createdAt).getTime() + 86400000).toISOString(), by: customer.name },
        { id: 5, action: 'Document uploaded — Salary Slip', date: new Date(new Date(customer.createdAt).getTime() + 172800000).toISOString(), by: customer.name },
        { id: 6, action: 'Payment received — ₹5,000', date: new Date(new Date(customer.createdAt).getTime() + 259200000).toISOString(), by: 'System' },
        { id: 7, action: 'Follow-up call completed', date: new Date(new Date(customer.createdAt).getTime() + 432000000).toISOString(), by: 'Sneha Verma' },
    )

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
