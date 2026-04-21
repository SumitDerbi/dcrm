export type CaseStage =
    | 'Case Created'
    | 'Document Collection'
    | 'Analysis'
    | 'Negotiation'
    | 'Settlement Offer'
    | 'Closure'

export const caseStages: CaseStage[] = [
    'Case Created',
    'Document Collection',
    'Analysis',
    'Negotiation',
    'Settlement Offer',
    'Closure',
]

export const stageColors: Record<CaseStage, string> = {
    'Case Created': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    'Document Collection': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    Analysis: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Negotiation: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    'Settlement Offer': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    Closure: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
}

export interface CaseNote {
    id: number
    text: string
    by: string
    date: string
}

export interface CaseTimelineEvent {
    id: number
    stage: CaseStage
    completedAt: string | null
}

export interface CaseActivity {
    id: number
    action: string
    by: string
    date: string
}

export interface CaseDocument {
    id: number
    name: string
    status: 'Pending' | 'Uploaded' | 'Verified'
}

export interface Case {
    id: number
    caseNumber: string
    customerId: number
    customerName: string
    stage: CaseStage
    assignedTo: string
    counsellor: string
    opsAssigned: string | null
    totalDebt: number
    settlementAmount: number | null
    savingsAmount: number | null
    loanIds: number[]
    createdAt: string
    updatedAt: string
}

export const counsellors = ['Amit Sharma', 'Sneha Verma', 'Rajesh Gupta', 'Priya Nair']
export const opsTeam = ['Karan Singh', 'Neha Jain', 'Deepa Rao']

export const mockCases: Case[] = [
    {
        id: 1,
        caseNumber: 'CASE-045',
        customerId: 3,
        customerName: 'Rajesh Khanna',
        stage: 'Settlement Offer',
        assignedTo: 'Amit Sharma',
        counsellor: 'Amit Sharma',
        opsAssigned: 'Karan Singh',
        totalDebt: 2800000,
        settlementAmount: 1680000,
        savingsAmount: 1120000,
        loanIds: [1, 2],
        createdAt: '2026-03-15T11:00:00',
        updatedAt: '2026-04-18T14:30:00',
    },
    {
        id: 2,
        caseNumber: 'CASE-078',
        customerId: 3,
        customerName: 'Rajesh Khanna',
        stage: 'Negotiation',
        assignedTo: 'Rajesh Gupta',
        counsellor: 'Rajesh Gupta',
        opsAssigned: null,
        totalDebt: 700000,
        settlementAmount: null,
        savingsAmount: null,
        loanIds: [3, 4],
        createdAt: '2026-03-20T09:00:00',
        updatedAt: '2026-04-15T10:00:00',
    },
    {
        id: 3,
        caseNumber: 'CASE-087',
        customerId: 1,
        customerName: 'Kavita Joshi',
        stage: 'Negotiation',
        assignedTo: 'Amit Sharma',
        counsellor: 'Amit Sharma',
        opsAssigned: 'Neha Jain',
        totalDebt: 520000,
        settlementAmount: null,
        savingsAmount: null,
        loanIds: [5, 6],
        createdAt: '2026-04-10T13:30:00',
        updatedAt: '2026-04-17T09:00:00',
    },
    {
        id: 4,
        caseNumber: 'CASE-092',
        customerId: 2,
        customerName: 'Pooja Sharma',
        stage: 'Document Collection',
        assignedTo: 'Sneha Verma',
        counsellor: 'Sneha Verma',
        opsAssigned: null,
        totalDebt: 165000,
        settlementAmount: null,
        savingsAmount: null,
        loanIds: [7],
        createdAt: '2026-04-08T14:30:00',
        updatedAt: '2026-04-12T11:00:00',
    },
    {
        id: 5,
        caseNumber: 'CASE-056',
        customerId: 6,
        customerName: 'Sunita Devi',
        stage: 'Analysis',
        assignedTo: 'Sneha Verma',
        counsellor: 'Sneha Verma',
        opsAssigned: 'Deepa Rao',
        totalDebt: 920000,
        settlementAmount: null,
        savingsAmount: null,
        loanIds: [10, 11],
        createdAt: '2026-03-05T15:00:00',
        updatedAt: '2026-04-10T16:00:00',
    },
    {
        id: 6,
        caseNumber: 'CASE-067',
        customerId: 6,
        customerName: 'Sunita Devi',
        stage: 'Case Created',
        assignedTo: 'Rajesh Gupta',
        counsellor: 'Rajesh Gupta',
        opsAssigned: null,
        totalDebt: 210000,
        settlementAmount: null,
        savingsAmount: null,
        loanIds: [12],
        createdAt: '2026-03-18T10:00:00',
        updatedAt: '2026-03-18T10:00:00',
    },
    {
        id: 7,
        caseNumber: 'CASE-101',
        customerId: 12,
        customerName: 'Prerna Gupta',
        stage: 'Negotiation',
        assignedTo: 'Amit Sharma',
        counsellor: 'Amit Sharma',
        opsAssigned: 'Karan Singh',
        totalDebt: 1100000,
        settlementAmount: null,
        savingsAmount: null,
        loanIds: [16, 17],
        createdAt: '2026-04-05T11:30:00',
        updatedAt: '2026-04-19T09:30:00',
    },
    {
        id: 8,
        caseNumber: 'CASE-105',
        customerId: 12,
        customerName: 'Prerna Gupta',
        stage: 'Document Collection',
        assignedTo: 'Sneha Verma',
        counsellor: 'Sneha Verma',
        opsAssigned: null,
        totalDebt: 450000,
        settlementAmount: null,
        savingsAmount: null,
        loanIds: [16],
        createdAt: '2026-04-12T09:00:00',
        updatedAt: '2026-04-14T15:00:00',
    },
    {
        id: 9,
        caseNumber: 'CASE-034',
        customerId: 4,
        customerName: 'Meena Kumari',
        stage: 'Analysis',
        assignedTo: 'Priya Nair',
        counsellor: 'Priya Nair',
        opsAssigned: 'Deepa Rao',
        totalDebt: 680000,
        settlementAmount: null,
        savingsAmount: null,
        loanIds: [8, 9],
        createdAt: '2026-03-20T09:00:00',
        updatedAt: '2026-04-08T11:00:00',
    },
    {
        id: 10,
        caseNumber: 'CASE-112',
        customerId: 7,
        customerName: 'Vikram Malhotra',
        stage: 'Document Collection',
        assignedTo: 'Priya Nair',
        counsellor: 'Priya Nair',
        opsAssigned: null,
        totalDebt: 750000,
        settlementAmount: null,
        savingsAmount: null,
        loanIds: [14, 15],
        createdAt: '2026-04-14T10:00:00',
        updatedAt: '2026-04-16T14:00:00',
    },
    {
        id: 11,
        caseNumber: 'CASE-118',
        customerId: 8,
        customerName: 'Nisha Agarwal',
        stage: 'Case Created',
        assignedTo: 'Rajesh Gupta',
        counsellor: 'Rajesh Gupta',
        opsAssigned: null,
        totalDebt: 180000,
        settlementAmount: null,
        savingsAmount: null,
        loanIds: [],
        createdAt: '2026-04-18T09:00:00',
        updatedAt: '2026-04-18T09:00:00',
    },
    {
        id: 12,
        caseNumber: 'CASE-025',
        customerId: 9,
        customerName: 'Deepak Chauhan',
        stage: 'Closure',
        assignedTo: 'Amit Sharma',
        counsellor: 'Amit Sharma',
        opsAssigned: 'Karan Singh',
        totalDebt: 1450000,
        settlementAmount: 870000,
        savingsAmount: 580000,
        loanIds: [16, 17],
        createdAt: '2026-02-28T08:45:00',
        updatedAt: '2026-04-15T16:00:00',
    },
]

export function getCaseTimeline(caseId: number): CaseTimelineEvent[] {
    const c = mockCases.find((x) => x.id === caseId)
    if (!c) return []

    const stageIndex = caseStages.indexOf(c.stage)
    const baseDate = new Date(c.createdAt)

    return caseStages.map((stage, i) => ({
        id: i + 1,
        stage,
        completedAt:
            i < stageIndex
                ? new Date(baseDate.getTime() + (i + 1) * 3 * 86400000).toISOString()
                : i === stageIndex
                    ? null // current stage, not completed yet
                    : null,
    }))
}

export function getCaseNotes(caseId: number): CaseNote[] {
    const noteSets: Record<number, CaseNote[]> = {
        1: [
            { id: 1, text: 'Customer agreed to 60% settlement on home loan. Waiting for lender confirmation.', by: 'Amit Sharma', date: '2026-04-18T14:30:00' },
            { id: 2, text: 'SBI regional manager contacted. Follow up on Monday.', by: 'Amit Sharma', date: '2026-04-15T11:00:00' },
            { id: 3, text: 'Lender documents collected. All clear for analysis.', by: 'Karan Singh', date: '2026-03-25T10:00:00' },
        ],
        2: [
            { id: 1, text: 'Axis Bank offering 45% settlement. Customer wants 40%.', by: 'Rajesh Gupta', date: '2026-04-15T10:00:00' },
            { id: 2, text: 'Vehicle loan — customer wants to retain vehicle.', by: 'Rajesh Gupta', date: '2026-04-01T09:00:00' },
        ],
        3: [
            { id: 1, text: 'HDFC willing to negotiate. Scheduling meeting next week.', by: 'Amit Sharma', date: '2026-04-17T09:00:00' },
            { id: 2, text: 'Customer submitted all salary slips for last 6 months.', by: 'Neha Jain', date: '2026-04-12T14:00:00' },
        ],
        12: [
            { id: 1, text: 'Case closed. All settlements paid. Letters received from both lenders.', by: 'Amit Sharma', date: '2026-04-15T16:00:00' },
            { id: 2, text: 'Final settlement payment of ₹3.2L made to HDFC.', by: 'Karan Singh', date: '2026-04-10T11:00:00' },
            { id: 3, text: 'SBI settlement completed. NOC received.', by: 'Amit Sharma', date: '2026-04-02T09:00:00' },
        ],
    }

    return noteSets[caseId] ?? [
        { id: 1, text: 'Case created and initial assessment in progress.', by: 'System', date: mockCases.find((c) => c.id === caseId)?.createdAt ?? '' },
    ]
}

export function getCaseDocuments(caseId: number): CaseDocument[] {
    const c = mockCases.find((x) => x.id === caseId)
    if (!c) return []

    const stageIndex = caseStages.indexOf(c.stage)

    const docs: CaseDocument[] = [
        { id: 1, name: 'ID Proof (Aadhaar/PAN)', status: stageIndex >= 1 ? 'Verified' : 'Pending' },
        { id: 2, name: 'Salary Slips (6 months)', status: stageIndex >= 1 ? 'Uploaded' : 'Pending' },
        { id: 3, name: 'Bank Statements (6 months)', status: stageIndex >= 2 ? 'Verified' : stageIndex >= 1 ? 'Uploaded' : 'Pending' },
        { id: 4, name: 'Loan Statements', status: stageIndex >= 2 ? 'Verified' : 'Pending' },
        { id: 5, name: 'Settlement Letter', status: stageIndex >= 4 ? 'Uploaded' : 'Pending' },
    ]

    return docs
}

export function getCaseActivity(caseId: number): CaseActivity[] {
    const c = mockCases.find((x) => x.id === caseId)
    if (!c) return []

    const base = new Date(c.createdAt).getTime()
    const activities: CaseActivity[] = [
        { id: 1, action: 'Case created', by: 'System', date: c.createdAt },
        { id: 2, action: `Assigned to ${c.counsellor}`, by: 'Admin', date: new Date(base + 1800000).toISOString() },
    ]

    const stageIndex = caseStages.indexOf(c.stage)
    if (stageIndex >= 1) {
        activities.push({ id: 3, action: 'Moved to Document Collection', by: c.counsellor, date: new Date(base + 86400000).toISOString() })
    }
    if (stageIndex >= 2) {
        activities.push({ id: 4, action: 'Moved to Analysis', by: c.counsellor, date: new Date(base + 4 * 86400000).toISOString() })
    }
    if (stageIndex >= 3) {
        activities.push({ id: 5, action: 'Moved to Negotiation', by: c.counsellor, date: new Date(base + 10 * 86400000).toISOString() })
    }
    if (stageIndex >= 4) {
        activities.push({ id: 6, action: 'Settlement offer sent to lender', by: c.counsellor, date: new Date(base + 20 * 86400000).toISOString() })
    }
    if (stageIndex >= 5) {
        activities.push({ id: 7, action: 'Case closed — settlement completed', by: c.counsellor, date: new Date(base + 30 * 86400000).toISOString() })
    }

    if (c.opsAssigned) {
        activities.push({ id: 8, action: `Ops assigned: ${c.opsAssigned}`, by: 'Admin', date: new Date(base + 2 * 86400000).toISOString() })
    }

    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
