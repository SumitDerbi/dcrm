export type LeadStatus = 'New' | 'Contacted' | 'Interested' | 'Converted'
export type LoanType = 'Personal' | 'Home' | 'Business' | 'Vehicle' | 'Credit Card' | 'Other'
export type LeadSource = 'Website' | 'Referral' | 'Ad' | 'Walk-in' | 'Other'

export interface Lead {
    id: number
    name: string
    phone: string
    email: string
    city: string
    loanType: LoanType
    totalDebt: number
    monthlyIncome: number
    status: LeadStatus
    assignedTo: string
    source: LeadSource
    createdAt: string
    lastFollowUp: string | null
    notes: string
}

export interface StatusChange {
    from: LeadStatus | null
    to: LeadStatus
    date: string
    by: string
}

export interface FollowUp {
    id: number
    date: string
    note: string
    by: string
}

export interface ActivityItem {
    id: number
    action: string
    date: string
    by: string
}

export const leadStatusColors: Record<LeadStatus, string> = {
    New: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    Contacted: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Interested: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    Converted: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
}

export const mockLeads: Lead[] = [
    {
        id: 1,
        name: 'Ramesh Kumar',
        phone: '9876543210',
        email: 'ramesh.kumar@email.com',
        city: 'Mumbai',
        loanType: 'Personal',
        totalDebt: 450000,
        monthlyIncome: 55000,
        status: 'New',
        assignedTo: 'Amit Sharma',
        source: 'Website',
        createdAt: '2026-04-18T10:30:00',
        lastFollowUp: null,
        notes: 'Interested in debt settlement for personal loan.',
    },
    {
        id: 2,
        name: 'Priya Patel',
        phone: '9123456789',
        email: 'priya.patel@email.com',
        city: 'Delhi',
        loanType: 'Credit Card',
        totalDebt: 280000,
        monthlyIncome: 42000,
        status: 'Contacted',
        assignedTo: 'Sneha Verma',
        source: 'Referral',
        createdAt: '2026-04-16T14:15:00',
        lastFollowUp: '2026-04-18T11:00:00',
        notes: 'Has 3 credit card debts. Wants consolidation.',
    },
    {
        id: 3,
        name: 'Suresh Reddy',
        phone: '9988776655',
        email: 'suresh.reddy@email.com',
        city: 'Hyderabad',
        loanType: 'Home',
        totalDebt: 1250000,
        monthlyIncome: 85000,
        status: 'Interested',
        assignedTo: 'Amit Sharma',
        source: 'Ad',
        createdAt: '2026-04-14T09:00:00',
        lastFollowUp: '2026-04-17T16:00:00',
        notes: 'Home loan EMI defaulted for 3 months.',
    },
    {
        id: 4,
        name: 'Anita Deshmukh',
        phone: '9871234560',
        email: 'anita.d@email.com',
        city: 'Pune',
        loanType: 'Business',
        totalDebt: 780000,
        monthlyIncome: 0,
        status: 'New',
        assignedTo: 'Rajesh Gupta',
        source: 'Walk-in',
        createdAt: '2026-04-17T11:45:00',
        lastFollowUp: null,
        notes: 'Business shut down. Looking for debt relief options.',
    },
    {
        id: 5,
        name: 'Vikram Singh',
        phone: '9765432109',
        email: 'vikram.singh@email.com',
        city: 'Jaipur',
        loanType: 'Vehicle',
        totalDebt: 320000,
        monthlyIncome: 38000,
        status: 'Contacted',
        assignedTo: 'Sneha Verma',
        source: 'Website',
        createdAt: '2026-04-15T08:30:00',
        lastFollowUp: '2026-04-19T10:00:00',
        notes: 'Vehicle loan 2 EMIs overdue.',
    },
    {
        id: 6,
        name: 'Kavita Joshi',
        phone: '9654321098',
        email: 'kavita.j@email.com',
        city: 'Bangalore',
        loanType: 'Personal',
        totalDebt: 520000,
        monthlyIncome: 62000,
        status: 'Converted',
        assignedTo: 'Amit Sharma',
        source: 'Referral',
        createdAt: '2026-04-10T13:00:00',
        lastFollowUp: '2026-04-18T14:30:00',
        notes: 'Converted to customer. Case created.',
    },
    {
        id: 7,
        name: 'Manoj Tiwari',
        phone: '9543210987',
        email: 'manoj.t@email.com',
        city: 'Lucknow',
        loanType: 'Credit Card',
        totalDebt: 190000,
        monthlyIncome: 30000,
        status: 'New',
        assignedTo: 'Rajesh Gupta',
        source: 'Ad',
        createdAt: '2026-04-19T09:15:00',
        lastFollowUp: null,
        notes: 'Single credit card debt with high interest.',
    },
    {
        id: 8,
        name: 'Deepa Nair',
        phone: '9432109876',
        email: 'deepa.nair@email.com',
        city: 'Chennai',
        loanType: 'Home',
        totalDebt: 980000,
        monthlyIncome: 72000,
        status: 'Interested',
        assignedTo: 'Sneha Verma',
        source: 'Website',
        createdAt: '2026-04-12T15:45:00',
        lastFollowUp: '2026-04-19T11:30:00',
        notes: 'Wants to negotiate home loan settlement.',
    },
    {
        id: 9,
        name: 'Arjun Mehta',
        phone: '9321098765',
        email: 'arjun.mehta@email.com',
        city: 'Ahmedabad',
        loanType: 'Business',
        totalDebt: 1500000,
        monthlyIncome: 95000,
        status: 'Contacted',
        assignedTo: 'Amit Sharma',
        source: 'Referral',
        createdAt: '2026-04-13T10:00:00',
        lastFollowUp: '2026-04-17T09:00:00',
        notes: 'Business loan with 2 banks. Needs consolidation.',
    },
    {
        id: 10,
        name: 'Sunita Rao',
        phone: '9210987654',
        email: 'sunita.rao@email.com',
        city: 'Mumbai',
        loanType: 'Personal',
        totalDebt: 340000,
        monthlyIncome: 45000,
        status: 'New',
        assignedTo: 'Rajesh Gupta',
        source: 'Walk-in',
        createdAt: '2026-04-19T16:00:00',
        lastFollowUp: null,
        notes: 'Walk-in enquiry. Wants to understand the process.',
    },
    {
        id: 11,
        name: 'Rakesh Agarwal',
        phone: '9109876543',
        email: 'rakesh.a@email.com',
        city: 'Kolkata',
        loanType: 'Vehicle',
        totalDebt: 410000,
        monthlyIncome: 48000,
        status: 'Interested',
        assignedTo: 'Sneha Verma',
        source: 'Ad',
        createdAt: '2026-04-11T12:30:00',
        lastFollowUp: '2026-04-18T15:00:00',
        notes: 'Vehicle seized. Wants to negotiate with bank.',
    },
    {
        id: 12,
        name: 'Pooja Sharma',
        phone: '9098765432',
        email: 'pooja.s@email.com',
        city: 'Delhi',
        loanType: 'Credit Card',
        totalDebt: 165000,
        monthlyIncome: 35000,
        status: 'Converted',
        assignedTo: 'Amit Sharma',
        source: 'Website',
        createdAt: '2026-04-08T14:00:00',
        lastFollowUp: '2026-04-16T10:00:00',
        notes: 'Converted. Fee agreement signed.',
    },
    {
        id: 13,
        name: 'Nikhil Banerjee',
        phone: '9887654321',
        email: 'nikhil.b@email.com',
        city: 'Pune',
        loanType: 'Other',
        totalDebt: 620000,
        monthlyIncome: 58000,
        status: 'Contacted',
        assignedTo: 'Rajesh Gupta',
        source: 'Other',
        createdAt: '2026-04-15T17:30:00',
        lastFollowUp: '2026-04-19T14:00:00',
        notes: 'Multiple loans — personal + gold loan.',
    },
    {
        id: 14,
        name: 'Meera Iyer',
        phone: '9776543210',
        email: 'meera.iyer@email.com',
        city: 'Bangalore',
        loanType: 'Personal',
        totalDebt: 290000,
        monthlyIncome: 40000,
        status: 'New',
        assignedTo: 'Sneha Verma',
        source: 'Referral',
        createdAt: '2026-04-20T08:00:00',
        lastFollowUp: null,
        notes: 'Referred by Kavita Joshi (existing customer).',
    },
    {
        id: 15,
        name: 'Sanjay Mishra',
        phone: '9665432109',
        email: 'sanjay.m@email.com',
        city: 'Indore',
        loanType: 'Home',
        totalDebt: 2100000,
        monthlyIncome: 110000,
        status: 'Interested',
        assignedTo: 'Amit Sharma',
        source: 'Ad',
        createdAt: '2026-04-09T11:00:00',
        lastFollowUp: '2026-04-19T16:30:00',
        notes: 'High-value home loan. Bank threatening legal action.',
    },
    {
        id: 16,
        name: 'Fatima Shaikh',
        phone: '9554321098',
        email: 'fatima.s@email.com',
        city: 'Hyderabad',
        loanType: 'Business',
        totalDebt: 870000,
        monthlyIncome: 0,
        status: 'New',
        assignedTo: 'Rajesh Gupta',
        source: 'Website',
        createdAt: '2026-04-20T09:30:00',
        lastFollowUp: null,
        notes: 'Business closed. Multiple creditors calling.',
    },
    {
        id: 17,
        name: 'Anil Kulkarni',
        phone: '9443210987',
        email: 'anil.k@email.com',
        city: 'Nagpur',
        loanType: 'Credit Card',
        totalDebt: 230000,
        monthlyIncome: 32000,
        status: 'Contacted',
        assignedTo: 'Sneha Verma',
        source: 'Walk-in',
        createdAt: '2026-04-14T13:45:00',
        lastFollowUp: '2026-04-18T09:00:00',
        notes: 'Two credit card debts. Minimum payment not affordable.',
    },
]

// Mock data for detail page
export function getLeadStatusHistory(leadId: number): StatusChange[] {
    const lead = mockLeads.find((l) => l.id === leadId)
    if (!lead) return []

    const history: StatusChange[] = [
        { from: null, to: 'New', date: lead.createdAt, by: 'System' },
    ]
    if (lead.status === 'Contacted' || lead.status === 'Interested' || lead.status === 'Converted') {
        history.push({ from: 'New', to: 'Contacted', date: '2026-04-15T10:00:00', by: lead.assignedTo })
    }
    if (lead.status === 'Interested' || lead.status === 'Converted') {
        history.push({ from: 'Contacted', to: 'Interested', date: '2026-04-17T14:00:00', by: lead.assignedTo })
    }
    if (lead.status === 'Converted') {
        history.push({ from: 'Interested', to: 'Converted', date: '2026-04-18T16:00:00', by: lead.assignedTo })
    }
    return history
}

export function getLeadFollowUps(leadId: number): FollowUp[] {
    const lead = mockLeads.find((l) => l.id === leadId)
    if (!lead || !lead.lastFollowUp) return []

    return [
        { id: 1, date: lead.lastFollowUp, note: 'Called customer. Discussed settlement options.', by: lead.assignedTo },
        { id: 2, date: '2026-04-22T10:00:00', note: 'Schedule next follow-up call', by: lead.assignedTo },
    ]
}

export function getLeadActivity(leadId: number): ActivityItem[] {
    const lead = mockLeads.find((l) => l.id === leadId)
    if (!lead) return []

    return [
        { id: 1, action: `Lead created via ${lead.source}`, date: lead.createdAt, by: 'System' },
        { id: 2, action: `Assigned to ${lead.assignedTo}`, date: lead.createdAt, by: 'Admin' },
        ...(lead.lastFollowUp
            ? [{ id: 3, action: 'Follow-up call completed', date: lead.lastFollowUp, by: lead.assignedTo }]
            : []),
        ...(lead.status === 'Converted'
            ? [{ id: 4, action: 'Lead converted to customer', date: '2026-04-18T16:00:00', by: lead.assignedTo }]
            : []),
    ]
}
