export type CallDirection = 'Inbound' | 'Outbound'
export type CallOutcome = 'Connected' | 'No Answer' | 'Busy' | 'Voicemail'
export type MessageChannel = 'SMS' | 'Email' | 'WhatsApp'
export type MessageStatus = 'Sent' | 'Delivered' | 'Failed'

export interface CallLog {
    id: number
    customerId: number
    customerName: string
    phone: string
    direction: CallDirection
    duration: number
    outcome: CallOutcome
    notes: string
    calledBy: string
    calledAt: string
}

export interface MessageLog {
    id: number
    customerId: number
    customerName: string
    channel: MessageChannel
    recipient: string
    subject: string
    bodySnippet: string
    status: MessageStatus
    sentBy: string
    sentAt: string
}

export interface CommunicationTemplate {
    id: number
    name: string
    channel: MessageChannel
    subject: string
    body: string
    isActive: boolean
}

export const callDirections: CallDirection[] = ['Inbound', 'Outbound']
export const callOutcomes: CallOutcome[] = ['Connected', 'No Answer', 'Busy', 'Voicemail']
export const messageChannels: MessageChannel[] = ['SMS', 'Email', 'WhatsApp']
export const messageStatuses: MessageStatus[] = ['Sent', 'Delivered', 'Failed']

export const channelColors: Record<MessageChannel, string> = {
    SMS: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Email: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    WhatsApp: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
}

export const callOutcomeColors: Record<CallOutcome, string> = {
    Connected: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    'No Answer': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    Busy: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    Voicemail: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
}

export const messageStatusColors: Record<MessageStatus, string> = {
    Sent: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Delivered: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Failed: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export const mockCallLogs: CallLog[] = [
    { id: 1, customerId: 3, customerName: 'Rajesh Khanna', phone: '9876012345', direction: 'Outbound', duration: 12, outcome: 'Connected', notes: 'Discussed settlement offer follow-up and next payment date.', calledBy: 'Amit Sharma', calledAt: '2026-04-21T10:15:00' },
    { id: 2, customerId: 1, customerName: 'Kavita Joshi', phone: '9654321098', direction: 'Inbound', duration: 6, outcome: 'Connected', notes: 'Customer requested clarification on document rejection.', calledBy: 'Sneha Verma', calledAt: '2026-04-20T16:20:00' },
    { id: 3, customerId: 2, customerName: 'Pooja Sharma', phone: '9098765432', direction: 'Outbound', duration: 2, outcome: 'No Answer', notes: 'Reminder call for overdue installment.', calledBy: 'Amit Sharma', calledAt: '2026-04-20T11:05:00' },
    { id: 4, customerId: 6, customerName: 'Sunita Devi', phone: '9543076501', direction: 'Outbound', duration: 4, outcome: 'Busy', notes: 'Will retry after 5 PM.', calledBy: 'Sneha Verma', calledAt: '2026-04-19T14:45:00' },
    { id: 5, customerId: 4, customerName: 'Meena Kumari', phone: '9765098123', direction: 'Inbound', duration: 9, outcome: 'Connected', notes: 'Customer confirmed cheque replacement on Friday.', calledBy: 'Priya Nair', calledAt: '2026-04-18T13:30:00' },
    { id: 6, customerId: 12, customerName: 'Prerna Gupta', phone: '9845012345', direction: 'Outbound', duration: 7, outcome: 'Voicemail', notes: 'Left message regarding pending bank statements.', calledBy: 'Amit Sharma', calledAt: '2026-04-18T10:10:00' },
    { id: 7, customerId: 7, customerName: 'Vikram Malhotra', phone: '9432065490', direction: 'Outbound', duration: 11, outcome: 'Connected', notes: 'Aligned on next lender document upload.', calledBy: 'Priya Nair', calledAt: '2026-04-17T17:15:00' },
    { id: 8, customerId: 3, customerName: 'Rajesh Khanna', phone: '9876012345', direction: 'Inbound', duration: 5, outcome: 'Connected', notes: 'Confirmed receipt of lender update email.', calledBy: 'Rajesh Gupta', calledAt: '2026-04-17T09:20:00' },
    { id: 9, customerId: 1, customerName: 'Kavita Joshi', phone: '9654321098', direction: 'Outbound', duration: 3, outcome: 'No Answer', notes: 'Attempted after office hours.', calledBy: 'Amit Sharma', calledAt: '2026-04-16T19:10:00' },
    { id: 10, customerId: 6, customerName: 'Sunita Devi', phone: '9543076501', direction: 'Inbound', duration: 8, outcome: 'Connected', notes: 'Asked for milestone fee explanation.', calledBy: 'Sneha Verma', calledAt: '2026-04-15T12:00:00' },
]

export const mockMessageLogs: MessageLog[] = [
    { id: 101, customerId: 3, customerName: 'Rajesh Khanna', channel: 'Email', recipient: 'rajesh.k@email.com', subject: 'Settlement Offer Update for CASE-045', bodySnippet: 'We have received a revised offer from the lender for your review...', status: 'Delivered', sentBy: 'Amit Sharma', sentAt: '2026-04-21T11:00:00' },
    { id: 102, customerId: 1, customerName: 'Kavita Joshi', channel: 'WhatsApp', recipient: '9654321098', subject: '', bodySnippet: 'Please re-upload your Aadhaar in clearer resolution.', status: 'Delivered', sentBy: 'Neha Jain', sentAt: '2026-04-20T17:30:00' },
    { id: 103, customerId: 2, customerName: 'Pooja Sharma', channel: 'SMS', recipient: '9098765432', subject: '', bodySnippet: 'Your installment due on 15 Apr is pending. Please contact support.', status: 'Sent', sentBy: 'Amit Sharma', sentAt: '2026-04-20T09:00:00' },
    { id: 104, customerId: 6, customerName: 'Sunita Devi', channel: 'Email', recipient: 'sunita.d@email.com', subject: 'Milestone Fee Reminder', bodySnippet: 'This is a reminder for the negotiation-stage milestone fee...', status: 'Delivered', sentBy: 'Sneha Verma', sentAt: '2026-04-19T15:10:00' },
    { id: 105, customerId: 4, customerName: 'Meena Kumari', channel: 'WhatsApp', recipient: '9765098123', subject: '', bodySnippet: 'Cheque bounce update received. Please confirm replacement date.', status: 'Delivered', sentBy: 'Priya Nair', sentAt: '2026-04-18T14:00:00' },
    { id: 106, customerId: 12, customerName: 'Prerna Gupta', channel: 'Email', recipient: 'prerna.g@email.com', subject: 'Pending Bank Statements Needed', bodySnippet: 'We still need 2 more months of statements to proceed...', status: 'Failed', sentBy: 'Amit Sharma', sentAt: '2026-04-18T10:30:00' },
    { id: 107, customerId: 7, customerName: 'Vikram Malhotra', channel: 'SMS', recipient: '9432065490', subject: '', bodySnippet: 'Your uploaded property report is under review.', status: 'Delivered', sentBy: 'Priya Nair', sentAt: '2026-04-17T18:10:00' },
    { id: 108, customerId: 3, customerName: 'Rajesh Khanna', channel: 'WhatsApp', recipient: '9876012345', subject: '', bodySnippet: 'Thank you. We have shared the updated settlement note on email.', status: 'Delivered', sentBy: 'Rajesh Gupta', sentAt: '2026-04-17T09:45:00' },
    { id: 109, customerId: 1, customerName: 'Kavita Joshi', channel: 'Email', recipient: 'kavita.j@email.com', subject: 'Document Re-upload Request', bodySnippet: 'Your Aadhaar image is not readable. Please upload a clearer copy.', status: 'Delivered', sentBy: 'Neha Jain', sentAt: '2026-04-16T10:00:00' },
    { id: 110, customerId: 6, customerName: 'Sunita Devi', channel: 'SMS', recipient: '9543076501', subject: '', bodySnippet: 'Your fee milestone is overdue. Please contact us for assistance.', status: 'Sent', sentBy: 'Sneha Verma', sentAt: '2026-04-15T09:30:00' },
]

export const mockTemplates: CommunicationTemplate[] = [
    { id: 1, name: 'Payment Reminder SMS', channel: 'SMS', subject: '', body: 'Hello {{customer_name}}, this is a reminder that your payment for {{case_number}} is due. Please contact us if you need help.', isActive: true },
    { id: 2, name: 'Settlement Update Email', channel: 'Email', subject: 'Update on {{case_number}}', body: 'Dear {{customer_name}},\n\nWe have an update on your case {{case_number}}. Our team will call you shortly with the next steps.\n\nRegards,\nDCRM Team', isActive: true },
    { id: 3, name: 'Document Request WhatsApp', channel: 'WhatsApp', subject: '', body: 'Hi {{customer_name}}, please share the pending documents for {{case_number}} so we can continue processing your case.', isActive: true },
    { id: 4, name: 'Welcome Email', channel: 'Email', subject: 'Welcome to DCRM, {{customer_name}}', body: 'Dear {{customer_name}},\n\nWelcome to DCRM. Your case {{case_number}} has been created successfully.', isActive: true },
    { id: 5, name: 'Call Back SMS', channel: 'SMS', subject: '', body: 'Hello {{customer_name}}, we tried reaching you regarding {{case_number}}. Please call us back when convenient.', isActive: false },
    { id: 6, name: 'Overdue WhatsApp Alert', channel: 'WhatsApp', subject: '', body: 'Hello {{customer_name}}, your pending item for {{case_number}} is overdue. Please reply here for support.', isActive: true },
]

export function formatDateTime(value: string) {
    return new Date(value).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function renderTemplate(template: Pick<CommunicationTemplate, 'subject' | 'body'>, values: Record<string, string>) {
    let subject = template.subject
    let body = template.body
    for (const [key, value] of Object.entries(values)) {
        const token = `{{${key}}}`
        subject = subject.split(token).join(value)
        body = body.split(token).join(value)
    }
    return { subject, body }
}