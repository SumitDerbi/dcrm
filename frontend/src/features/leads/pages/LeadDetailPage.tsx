import { useParams, useNavigate, Link } from 'react-router-dom'
import {
    ArrowLeft,
    Edit,
    UserCheck,
    Trash2,
    Phone,
    Mail,
    MapPin,
    Briefcase,
    IndianRupee,
    Calendar,
    User,
    Globe,
    StickyNote,
    Clock,
    CalendarPlus,
    CheckCircle2,
    Circle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    mockLeads,
    leadStatusColors,
    getLeadStatusHistory,
    getLeadFollowUps,
    getLeadActivity,
} from '../data/mock-leads'

function formatCurrency(n: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

function formatDateTime(iso: string) {
    return new Date(iso).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

function relativeTime(iso: string) {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    return `${days}d ago`
}

export default function LeadDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const lead = mockLeads.find((l) => l.id === Number(id))

    if (!lead) {
        return (
            <div className="space-y-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/leads')}>
                    <ArrowLeft className="size-4 mr-1" /> Back to Leads
                </Button>
                <p className="text-muted-foreground">Lead not found.</p>
            </div>
        )
    }

    const statusHistory = getLeadStatusHistory(lead.id)
    const followUps = getLeadFollowUps(lead.id)
    const activity = getLeadActivity(lead.id)

    const infoFields = [
        { icon: Phone, label: 'Phone', value: lead.phone },
        { icon: Mail, label: 'Email', value: lead.email || '—' },
        { icon: MapPin, label: 'City', value: lead.city },
        { icon: Briefcase, label: 'Loan Type', value: lead.loanType },
        { icon: IndianRupee, label: 'Total Debt', value: formatCurrency(lead.totalDebt) },
        { icon: IndianRupee, label: 'Monthly Income', value: lead.monthlyIncome ? formatCurrency(lead.monthlyIncome) : '—' },
        { icon: Globe, label: 'Source', value: lead.source },
        { icon: User, label: 'Assigned To', value: lead.assignedTo },
        { icon: Calendar, label: 'Created', value: formatDateTime(lead.createdAt) },
        { icon: Clock, label: 'Last Follow-up', value: lead.lastFollowUp ? formatDateTime(lead.lastFollowUp) : 'None yet' },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon-sm" onClick={() => navigate('/leads')}>
                        <ArrowLeft className="size-4" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold">{lead.name}</h1>
                            <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', leadStatusColors[lead.status])}>
                                {lead.status}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Lead #{lead.id} · {lead.source}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link to={`/leads/${lead.id}/edit`} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1')}>
                        <Edit className="size-3.5" /> Edit
                    </Link>
                    {lead.status !== 'Converted' && (
                        <Button
                            variant="default"
                            size="sm"
                            className="gap-1"
                            onClick={() => console.log('Convert to customer:', lead.id)}
                        >
                            <UserCheck className="size-3.5" /> Convert to Customer
                        </Button>
                    )}
                    <Button
                        variant="destructive"
                        size="sm"
                        className="gap-1"
                        onClick={() => console.log('Delete lead:', lead.id)}
                    >
                        <Trash2 className="size-3.5" /> Delete
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left column — Info + Notes */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Lead Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {infoFields.map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-2.5">
                                        <Icon className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">{label}</p>
                                            <p className="text-sm font-medium">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {lead.notes && (
                                <>
                                    <Separator className="my-4" />
                                    <div className="flex items-start gap-2.5">
                                        <StickyNote className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Notes</p>
                                            <p className="text-sm">{lead.notes}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Status Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Status Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative space-y-0">
                                {statusHistory.map((entry, i) => {
                                    const isLast = i === statusHistory.length - 1
                                    return (
                                        <div key={i} className="flex gap-3">
                                            <div className="flex flex-col items-center">
                                                {isLast ? (
                                                    <CheckCircle2 className="size-5 text-primary shrink-0" />
                                                ) : (
                                                    <Circle className="size-5 text-muted-foreground shrink-0" />
                                                )}
                                                {!isLast && <div className="w-px flex-1 bg-border" />}
                                            </div>
                                            <div className="pb-6">
                                                <p className="text-sm font-medium">
                                                    {entry.from ? `${entry.from} → ${entry.to}` : `Created as ${entry.to}`}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatDateTime(entry.date)} · by {entry.by}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right column — Follow-ups + Activity */}
                <div className="space-y-6">
                    {/* Follow-ups */}
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <CardTitle>Follow-ups</CardTitle>
                            <Button variant="outline" size="sm" className="gap-1" onClick={() => console.log('Add follow-up')}>
                                <CalendarPlus className="size-3.5" /> Add
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {followUps.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No follow-ups scheduled.</p>
                            ) : (
                                <div className="space-y-3">
                                    {followUps.map((fu) => (
                                        <div key={fu.id} className="rounded-lg border p-3">
                                            <p className="text-sm">{fu.note}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {formatDateTime(fu.date)} · {fu.by}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Activity Log */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {activity.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No activity yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {activity.map((a) => (
                                        <div key={a.id} className="flex items-start gap-2">
                                            <div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                                            <div>
                                                <p className="text-sm">{a.action}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {relativeTime(a.date)} · {a.by}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
