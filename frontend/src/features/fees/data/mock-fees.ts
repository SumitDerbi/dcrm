export type FeeModel = 'Fixed' | 'Percentage' | 'Hybrid' | 'Milestone'
export type FeeAssignmentStatus = 'Active' | 'Completed' | 'Cancelled'
export type InstallmentStatus = 'Paid' | 'Due' | 'Overdue'

export const feeModelColors: Record<FeeModel, string> = {
    Fixed: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Percentage: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    Hybrid: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    Milestone: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
}

export const assignmentStatusColors: Record<FeeAssignmentStatus, string> = {
    Active: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export interface MilestoneStep {
    stageName: string
    percentage: number
}

export interface FeePlan {
    id: number
    name: string
    feeModel: FeeModel
    fixedAmount: number | null
    percentage: number | null
    milestones: MilestoneStep[]
    description: string
    isActive: boolean
}

export interface Installment {
    id: number
    dueDate: string
    amount: number
    status: InstallmentStatus
    paidDate: string | null
}

export interface FeeAssignment {
    id: number
    customerId: number
    customerName: string
    caseId: number
    caseNumber: string
    feePlanId: number
    feePlanName: string
    totalFee: number
    paidAmount: number
    pendingAmount: number
    installments: Installment[]
    status: FeeAssignmentStatus
    createdAt: string
}

export const mockFeePlans: FeePlan[] = [
    {
        id: 1,
        name: 'Standard Fixed Plan',
        feeModel: 'Fixed',
        fixedAmount: 25000,
        percentage: null,
        milestones: [],
        description: 'Flat fee of ₹25,000 per case regardless of debt amount.',
        isActive: true,
    },
    {
        id: 2,
        name: 'Savings-Based (10%)',
        feeModel: 'Percentage',
        fixedAmount: null,
        percentage: 10,
        milestones: [],
        description: '10% of total savings achieved through settlement.',
        isActive: true,
    },
    {
        id: 3,
        name: 'Premium Hybrid Plan',
        feeModel: 'Hybrid',
        fixedAmount: 15000,
        percentage: 8,
        milestones: [],
        description: '₹15,000 upfront + 8% of savings on settlement.',
        isActive: true,
    },
    {
        id: 4,
        name: 'Milestone-Based Plan',
        feeModel: 'Milestone',
        fixedAmount: null,
        percentage: null,
        milestones: [
            { stageName: 'Case Created', percentage: 10 },
            { stageName: 'Document Collection', percentage: 15 },
            { stageName: 'Analysis', percentage: 15 },
            { stageName: 'Negotiation', percentage: 25 },
            { stageName: 'Settlement Offer', percentage: 25 },
            { stageName: 'Closure', percentage: 10 },
        ],
        description: 'Fee distributed across case milestones, total ₹30,000.',
        isActive: true,
    },
    {
        id: 5,
        name: 'Basic Percentage (5%)',
        feeModel: 'Percentage',
        fixedAmount: null,
        percentage: 5,
        milestones: [],
        description: '5% of total debt under management. For smaller cases.',
        isActive: true,
    },
    {
        id: 6,
        name: 'Legacy Fixed Plan',
        feeModel: 'Fixed',
        fixedAmount: 20000,
        percentage: null,
        milestones: [],
        description: 'Old flat fee plan — no longer offered to new clients.',
        isActive: false,
    },
    {
        id: 7,
        name: 'High-Value Hybrid',
        feeModel: 'Hybrid',
        fixedAmount: 50000,
        percentage: 12,
        milestones: [],
        description: '₹50,000 retainer + 12% of savings. For debts above ₹50L.',
        isActive: true,
    },
]

export const mockFeeAssignments: FeeAssignment[] = [
    {
        id: 1,
        customerId: 3,
        customerName: 'Rajesh Khanna',
        caseId: 1,
        caseNumber: 'CASE-045',
        feePlanId: 3,
        feePlanName: 'Premium Hybrid Plan',
        totalFee: 104600,
        paidAmount: 75000,
        pendingAmount: 29600,
        status: 'Active',
        createdAt: '2026-03-15T11:30:00',
        installments: [
            { id: 1, dueDate: '2026-03-15', amount: 15000, status: 'Paid', paidDate: '2026-03-15' },
            { id: 2, dueDate: '2026-04-01', amount: 30000, status: 'Paid', paidDate: '2026-04-01' },
            { id: 3, dueDate: '2026-04-15', amount: 30000, status: 'Paid', paidDate: '2026-04-14' },
            { id: 4, dueDate: '2026-05-01', amount: 29600, status: 'Due', paidDate: null },
        ],
    },
    {
        id: 2,
        customerId: 3,
        customerName: 'Rajesh Khanna',
        caseId: 2,
        caseNumber: 'CASE-078',
        feePlanId: 1,
        feePlanName: 'Standard Fixed Plan',
        totalFee: 25000,
        paidAmount: 25000,
        pendingAmount: 0,
        status: 'Completed',
        createdAt: '2026-03-20T09:30:00',
        installments: [
            { id: 1, dueDate: '2026-03-20', amount: 12500, status: 'Paid', paidDate: '2026-03-20' },
            { id: 2, dueDate: '2026-04-05', amount: 12500, status: 'Paid', paidDate: '2026-04-04' },
        ],
    },
    {
        id: 3,
        customerId: 1,
        customerName: 'Kavita Joshi',
        caseId: 3,
        caseNumber: 'CASE-087',
        feePlanId: 2,
        feePlanName: 'Savings-Based (10%)',
        totalFee: 52000,
        paidAmount: 20000,
        pendingAmount: 32000,
        status: 'Active',
        createdAt: '2026-04-10T14:00:00',
        installments: [
            { id: 1, dueDate: '2026-04-10', amount: 20000, status: 'Paid', paidDate: '2026-04-10' },
            { id: 2, dueDate: '2026-05-01', amount: 16000, status: 'Due', paidDate: null },
            { id: 3, dueDate: '2026-05-15', amount: 16000, status: 'Due', paidDate: null },
        ],
    },
    {
        id: 4,
        customerId: 2,
        customerName: 'Pooja Sharma',
        caseId: 4,
        caseNumber: 'CASE-092',
        feePlanId: 5,
        feePlanName: 'Basic Percentage (5%)',
        totalFee: 8250,
        paidAmount: 0,
        pendingAmount: 8250,
        status: 'Active',
        createdAt: '2026-04-08T15:00:00',
        installments: [
            { id: 1, dueDate: '2026-04-15', amount: 4125, status: 'Overdue', paidDate: null },
            { id: 2, dueDate: '2026-05-01', amount: 4125, status: 'Due', paidDate: null },
        ],
    },
    {
        id: 5,
        customerId: 6,
        customerName: 'Sunita Devi',
        caseId: 5,
        caseNumber: 'CASE-056',
        feePlanId: 4,
        feePlanName: 'Milestone-Based Plan',
        totalFee: 30000,
        paidAmount: 12000,
        pendingAmount: 18000,
        status: 'Active',
        createdAt: '2026-03-05T15:30:00',
        installments: [
            { id: 1, dueDate: '2026-03-05', amount: 3000, status: 'Paid', paidDate: '2026-03-05' },
            { id: 2, dueDate: '2026-03-12', amount: 4500, status: 'Paid', paidDate: '2026-03-12' },
            { id: 3, dueDate: '2026-03-20', amount: 4500, status: 'Paid', paidDate: '2026-03-21' },
            { id: 4, dueDate: '2026-04-10', amount: 7500, status: 'Overdue', paidDate: null },
            { id: 5, dueDate: '2026-05-01', amount: 7500, status: 'Due', paidDate: null },
            { id: 6, dueDate: '2026-05-15', amount: 3000, status: 'Due', paidDate: null },
        ],
    },
    {
        id: 6,
        customerId: 12,
        customerName: 'Prerna Gupta',
        caseId: 7,
        caseNumber: 'CASE-101',
        feePlanId: 7,
        feePlanName: 'High-Value Hybrid',
        totalFee: 182000,
        paidAmount: 50000,
        pendingAmount: 132000,
        status: 'Active',
        createdAt: '2026-04-05T12:00:00',
        installments: [
            { id: 1, dueDate: '2026-04-05', amount: 50000, status: 'Paid', paidDate: '2026-04-05' },
            { id: 2, dueDate: '2026-05-01', amount: 44000, status: 'Due', paidDate: null },
            { id: 3, dueDate: '2026-05-15', amount: 44000, status: 'Due', paidDate: null },
            { id: 4, dueDate: '2026-06-01', amount: 44000, status: 'Due', paidDate: null },
        ],
    },
    {
        id: 7,
        customerId: 4,
        customerName: 'Meena Kumari',
        caseId: 9,
        caseNumber: 'CASE-034',
        feePlanId: 1,
        feePlanName: 'Standard Fixed Plan',
        totalFee: 25000,
        paidAmount: 12500,
        pendingAmount: 12500,
        status: 'Active',
        createdAt: '2026-03-20T09:30:00',
        installments: [
            { id: 1, dueDate: '2026-03-25', amount: 12500, status: 'Paid', paidDate: '2026-03-25' },
            { id: 2, dueDate: '2026-04-10', amount: 12500, status: 'Overdue', paidDate: null },
        ],
    },
    {
        id: 8,
        customerId: 7,
        customerName: 'Vikram Malhotra',
        caseId: 10,
        caseNumber: 'CASE-112',
        feePlanId: 3,
        feePlanName: 'Premium Hybrid Plan',
        totalFee: 75000,
        paidAmount: 15000,
        pendingAmount: 60000,
        status: 'Active',
        createdAt: '2026-04-14T10:30:00',
        installments: [
            { id: 1, dueDate: '2026-04-14', amount: 15000, status: 'Paid', paidDate: '2026-04-14' },
            { id: 2, dueDate: '2026-05-01', amount: 30000, status: 'Due', paidDate: null },
            { id: 3, dueDate: '2026-05-15', amount: 30000, status: 'Due', paidDate: null },
        ],
    },
    {
        id: 9,
        customerId: 9,
        customerName: 'Deepak Chauhan',
        caseId: 12,
        caseNumber: 'CASE-025',
        feePlanId: 2,
        feePlanName: 'Savings-Based (10%)',
        totalFee: 58000,
        paidAmount: 58000,
        pendingAmount: 0,
        status: 'Completed',
        createdAt: '2026-02-28T09:00:00',
        installments: [
            { id: 1, dueDate: '2026-03-01', amount: 20000, status: 'Paid', paidDate: '2026-03-01' },
            { id: 2, dueDate: '2026-03-15', amount: 19000, status: 'Paid', paidDate: '2026-03-15' },
            { id: 3, dueDate: '2026-04-01', amount: 19000, status: 'Paid', paidDate: '2026-04-01' },
        ],
    },
    {
        id: 10,
        customerId: 8,
        customerName: 'Nisha Agarwal',
        caseId: 11,
        caseNumber: 'CASE-118',
        feePlanId: 1,
        feePlanName: 'Standard Fixed Plan',
        totalFee: 25000,
        paidAmount: 0,
        pendingAmount: 25000,
        status: 'Cancelled',
        createdAt: '2026-04-18T09:30:00',
        installments: [
            { id: 1, dueDate: '2026-04-25', amount: 12500, status: 'Due', paidDate: null },
            { id: 2, dueDate: '2026-05-10', amount: 12500, status: 'Due', paidDate: null },
        ],
    },
]

export function formatCurrency(n: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}
