import { mockCustomers } from '@/features/customers/data/mock-customers'
import { mockCases, getCaseActivity, caseStages } from '@/features/cases/data/mock-cases'
import { mockDocuments } from '@/features/documents/data/mock-documents'
import { mockPayments } from '@/features/payments/data/mock-payments'
import { mockFeeAssignments } from '@/features/fees/data/mock-fees'

export const currentPortalCustomerId = 3

export const portalNotifications = [
    {
        id: 1,
        type: 'document',
        message: 'Your bank statement for CASE-045 was verified.',
        timestamp: '2026-04-20T10:30:00',
        read: false,
    },
    {
        id: 2,
        type: 'payment',
        message: 'Payment received successfully. Receipt RCP-0003 is now available.',
        timestamp: '2026-04-14T18:10:00',
        read: true,
    },
    {
        id: 3,
        type: 'case',
        message: 'CASE-045 moved to Settlement Offer stage.',
        timestamp: '2026-04-18T14:30:00',
        read: false,
    },
    {
        id: 4,
        type: 'document',
        message: 'A new loan agreement was uploaded to your portal.',
        timestamp: '2026-03-22T11:00:00',
        read: true,
    },
]

export function getPortalCustomer() {
    return mockCustomers.find((customer) => customer.id === currentPortalCustomerId) ?? null
}

export function getPortalCases() {
    return mockCases.filter((taskCase) => taskCase.customerId === currentPortalCustomerId)
}

export function getPortalCase(caseId: number) {
    return getPortalCases().find((taskCase) => taskCase.id === caseId) ?? null
}

export function getPortalDocuments() {
    return mockDocuments.filter((document) => document.customerId === currentPortalCustomerId)
}

export function getPortalDocumentsByCase(caseId: number) {
    return getPortalDocuments().filter((document) => document.caseId === caseId)
}

export function getPortalPayments() {
    return mockPayments.filter((payment) => payment.customerId === currentPortalCustomerId)
}

export function getPortalPaymentsByCase(caseId: number) {
    return getPortalPayments().filter((payment) => payment.caseId === caseId)
}

export function getPortalFeeAssignments() {
    return mockFeeAssignments.filter((assignment) => assignment.customerId === currentPortalCustomerId)
}

export function getPortalFeeAssignment(caseId: number) {
    return getPortalFeeAssignments().find((assignment) => assignment.caseId === caseId) ?? null
}

export function getPortalSummary() {
    const cases = getPortalCases()
    const payments = getPortalPayments()
    const feeAssignments = getPortalFeeAssignments()
    const totalDebt = cases.reduce((sum, taskCase) => sum + taskCase.totalDebt, 0)
    const totalPaid = payments.filter((payment) => payment.status === 'Paid').reduce((sum, payment) => sum + payment.amount, 0)
    const totalPending = feeAssignments.reduce((sum, assignment) => sum + assignment.pendingAmount, 0)
    const settledCases = cases.filter((taskCase) => taskCase.settlementAmount !== null).length
    const settlementProgress = cases.length > 0 ? (settledCases / cases.length) * 100 : 0

    return {
        totalDebt,
        totalPaid,
        totalPending,
        settlementProgress,
    }
}

export function getPortalRecentUpdates() {
    return getPortalCases()
        .flatMap((taskCase) =>
            getCaseActivity(taskCase.id).map((activity) => ({
                id: `${taskCase.id}-${activity.id}`,
                text: `${taskCase.caseNumber}: ${activity.action}`,
                time: activity.date,
            })),
        )
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 6)
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

export function formatDateTime(value: string) {
    return new Date(value).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function getPortalStageProgress(stage: string) {
    const currentIndex = caseStages.indexOf(stage as (typeof caseStages)[number])
    return currentIndex >= 0 ? ((currentIndex + 1) / caseStages.length) * 100 : 0
}