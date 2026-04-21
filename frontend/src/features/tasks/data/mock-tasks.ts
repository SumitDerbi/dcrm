export type TaskType = 'Follow-up' | 'Call' | 'Document' | 'Meeting' | 'Other'
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent'
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Overdue'
export type TaskRelatedType = 'Lead' | 'Customer' | 'Case'

export interface Task {
    id: number
    title: string
    description: string
    type: TaskType
    priority: TaskPriority
    status: TaskStatus
    assignedTo: string
    assignedBy: string
    relatedType: TaskRelatedType | ''
    relatedId: number | null
    dueDate: string
    completedAt: string | null
    notes: string
}

export const taskTypes: TaskType[] = ['Follow-up', 'Call', 'Document', 'Meeting', 'Other']
export const taskPriorities: TaskPriority[] = ['Low', 'Medium', 'High', 'Urgent']
export const taskStatuses: TaskStatus[] = ['Pending', 'In Progress', 'Completed', 'Overdue']
export const taskAssignees = [
    'Amit Sharma',
    'Sneha Verma',
    'Rajesh Gupta',
    'Priya Nair',
    'Karan Singh',
    'Neha Jain',
]
export const taskRelatedTypes: TaskRelatedType[] = ['Lead', 'Customer', 'Case']

export const taskPriorityColors: Record<TaskPriority, string> = {
    Low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    Medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    High: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    Urgent: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export const taskStatusColors: Record<TaskStatus, string> = {
    Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Overdue: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export const TODAY = '2026-04-21'

export const mockTasks: Task[] = [
    { id: 1, title: 'Follow up with Ramesh on documents', description: 'Confirm bank statements and salary slips are uploaded.', type: 'Follow-up', priority: 'High', status: 'Pending', assignedTo: 'Amit Sharma', assignedBy: 'Rajesh Gupta', relatedType: 'Lead', relatedId: 1, dueDate: '2026-04-21', completedAt: null, notes: 'Lead asked for a reminder after office hours.' },
    { id: 2, title: 'Call Priya about settlement offer', description: 'Share the revised card settlement range and collect approval.', type: 'Call', priority: 'Urgent', status: 'In Progress', assignedTo: 'Sneha Verma', assignedBy: 'Amit Sharma', relatedType: 'Customer', relatedId: 2, dueDate: '2026-04-21', completedAt: null, notes: 'Needs callback before 3 PM.' },
    { id: 3, title: 'Collect loan statement for CASE-045', description: 'Pending HDFC statement for negotiation deck.', type: 'Document', priority: 'High', status: 'Overdue', assignedTo: 'Karan Singh', assignedBy: 'Amit Sharma', relatedType: 'Case', relatedId: 1, dueDate: '2026-04-19', completedAt: null, notes: 'Escalate to branch if no response.' },
    { id: 4, title: 'Schedule review meeting with Sunita', description: 'Review affordability sheet and plan next lender outreach.', type: 'Meeting', priority: 'Medium', status: 'Pending', assignedTo: 'Priya Nair', assignedBy: 'Sneha Verma', relatedType: 'Customer', relatedId: 6, dueDate: '2026-04-22', completedAt: null, notes: 'Prefer video call.' },
    { id: 5, title: 'Update case notes after lender callback', description: 'Document latest response from Tata Capital.', type: 'Other', priority: 'Low', status: 'Completed', assignedTo: 'Rajesh Gupta', assignedBy: 'Rajesh Gupta', relatedType: 'Case', relatedId: 2, dueDate: '2026-04-18', completedAt: '2026-04-18T16:15:00', notes: 'Done and shared with ops.' },
    { id: 6, title: 'Call Deepa on outstanding EMI status', description: 'Validate the delinquency window before proposal submission.', type: 'Call', priority: 'Medium', status: 'Pending', assignedTo: 'Amit Sharma', assignedBy: 'Priya Nair', relatedType: 'Lead', relatedId: 8, dueDate: '2026-04-23', completedAt: null, notes: 'Use afternoon slot.' },
    { id: 7, title: 'Prepare hardship letter draft', description: 'Draft for Kavita’s personal loan account.', type: 'Document', priority: 'High', status: 'In Progress', assignedTo: 'Neha Jain', assignedBy: 'Amit Sharma', relatedType: 'Case', relatedId: 3, dueDate: '2026-04-21', completedAt: null, notes: 'Need final income note from counsellor.' },
    { id: 8, title: 'Meeting with Prerna for documentation checklist', description: 'Walk through missing KYC and account statements.', type: 'Meeting', priority: 'Medium', status: 'Pending', assignedTo: 'Sneha Verma', assignedBy: 'Rajesh Gupta', relatedType: 'Case', relatedId: 8, dueDate: '2026-04-24', completedAt: null, notes: 'Customer asked for checklist in advance.' },
    { id: 9, title: 'Follow up on Arjun referral source', description: 'Capture attribution details for reporting.', type: 'Follow-up', priority: 'Low', status: 'Completed', assignedTo: 'Priya Nair', assignedBy: 'Rajesh Gupta', relatedType: 'Lead', relatedId: 9, dueDate: '2026-04-17', completedAt: '2026-04-17T13:40:00', notes: 'Source confirmed via partner network.' },
    { id: 10, title: 'Escalate overdue documents for CASE-056', description: 'Reminder to ops and customer for missing salary proof.', type: 'Document', priority: 'Urgent', status: 'Overdue', assignedTo: 'Deepa Rao', assignedBy: 'Sneha Verma', relatedType: 'Case', relatedId: 5, dueDate: '2026-04-20', completedAt: null, notes: 'Critical for analysis completion.' },
    { id: 11, title: 'Call lender SPOC for KreditBee account', description: 'Check whether split payment proposal is acceptable.', type: 'Call', priority: 'High', status: 'In Progress', assignedTo: 'Amit Sharma', assignedBy: 'Priya Nair', relatedType: 'Case', relatedId: 11, dueDate: '2026-04-22', completedAt: null, notes: 'Use latest settlement worksheet.' },
    { id: 12, title: 'Follow-up with Manoj after first contact', description: 'Gauge willingness to proceed with onboarding.', type: 'Follow-up', priority: 'Medium', status: 'Pending', assignedTo: 'Rajesh Gupta', assignedBy: 'Rajesh Gupta', relatedType: 'Lead', relatedId: 7, dueDate: '2026-04-21', completedAt: null, notes: 'Needs soft approach.' },
    { id: 13, title: 'Prepare meeting recap for Rajesh Khanna', description: 'Summarize multi-lender action plan and send to customer.', type: 'Other', priority: 'Medium', status: 'Completed', assignedTo: 'Priya Nair', assignedBy: 'Amit Sharma', relatedType: 'Customer', relatedId: 3, dueDate: '2026-04-16', completedAt: '2026-04-16T18:00:00', notes: 'Shared on WhatsApp and email.' },
    { id: 14, title: 'Review payment delay with Pooja', description: 'Check if fee installment needs rescheduling.', type: 'Call', priority: 'High', status: 'Pending', assignedTo: 'Sneha Verma', assignedBy: 'Amit Sharma', relatedType: 'Customer', relatedId: 2, dueDate: '2026-04-25', completedAt: null, notes: 'Coordinate with fee team.' },
    { id: 15, title: 'Update dashboard reminder copy', description: 'Refine task reminder labels for overdue group.', type: 'Other', priority: 'Low', status: 'Completed', assignedTo: 'Neha Jain', assignedBy: 'Priya Nair', relatedType: '', relatedId: null, dueDate: '2026-04-15', completedAt: '2026-04-15T12:00:00', notes: 'Ready for review.' },
    { id: 16, title: 'Meeting with lender rep for bulk closures', description: 'Discuss closure ratios across current active cases.', type: 'Meeting', priority: 'Urgent', status: 'In Progress', assignedTo: 'Amit Sharma', assignedBy: 'Rajesh Gupta', relatedType: '', relatedId: null, dueDate: '2026-04-23', completedAt: null, notes: 'Need summary sheet before meeting.' },
]

export function formatDate(value: string) {
    return new Date(value).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

export function isTaskDueToday(task: Task) {
    return task.dueDate === TODAY && task.status !== 'Completed'
}

export function isTaskOverdue(task: Task) {
    return task.status === 'Overdue' || (task.status !== 'Completed' && task.dueDate < TODAY)
}

export function getKanbanStatus(task: Task): 'Pending' | 'In Progress' | 'Completed' {
    if (task.status === 'Completed') return 'Completed'
    if (task.status === 'In Progress') return 'In Progress'
    return 'Pending'
}