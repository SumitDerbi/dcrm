import { useParams, useNavigate, Link } from 'react-router-dom'
import {
    ArrowLeft,
    Edit,
    UserX,
    Phone,
    Mail,
    MapPin,
    Calendar,
    CreditCard,
    Shield,
    IndianRupee,
    Briefcase,
    TrendingUp,
    Wallet,
    FileText,
    AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import {
    mockCustomers,
    riskColors,
    statusColors,
    getLinkedLoans,
    getLinkedCases,
    getFeeSummary,
    getCustomerActivity,
} from '../data/mock-customers'

function formatCurrency(n: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function maskAadhaar(a: string) {
    return 'XXXX XXXX ' + a.slice(-4)
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

export default function CustomerDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const customer = mockCustomers.find((c) => c.id === Number(id))

    if (!customer) {
        return (
            <div className="space-y-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/customers')}>
                    <ArrowLeft className="size-4 mr-1" /> Back to Customers
                </Button>
                <p className="text-muted-foreground">Customer not found.</p>
            </div>
        )
    }

    const loans = getLinkedLoans(customer.id)
    const cases = getLinkedCases(customer.id)
    const fees = getFeeSummary(customer.id)
    const activity = getCustomerActivity(customer.id)
    const dti = customer.monthlyIncome > 0
        ? ((customer.totalDebt / (customer.monthlyIncome * 12)) * 100).toFixed(1)
        : 'N/A'

    const personalInfo = [
        { icon: Phone, label: 'Phone', value: customer.phone },
        { icon: Mail, label: 'Email', value: customer.email },
        { icon: MapPin, label: 'City', value: customer.city },
        { icon: Calendar, label: 'Date of Birth', value: formatDate(customer.dateOfBirth) },
        { icon: CreditCard, label: 'PAN', value: customer.pan },
        { icon: Shield, label: 'Aadhaar', value: maskAadhaar(customer.aadhaar) },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon-sm" onClick={() => navigate('/customers')}>
                        <ArrowLeft className="size-4" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold">{customer.name}</h1>
                            <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', riskColors[customer.riskCategory])}>
                                {customer.riskCategory} Risk
                            </span>
                            <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', statusColors[customer.status])}>
                                {customer.status}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Customer #{customer.id} · Since {formatDate(customer.createdAt)}
                            {customer.convertedFromLeadId && ` · From Lead #${customer.convertedFromLeadId}`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link to={`/customers/${customer.id}/edit`} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1')}>
                        <Edit className="size-3.5" /> Edit
                    </Link>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="gap-1"
                        onClick={() => console.log('Deactivate customer:', customer.id)}
                    >
                        <UserX className="size-3.5" /> Deactivate
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left column */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Personal Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {personalInfo.map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-2.5">
                                        <Icon className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">{label}</p>
                                            <p className="text-sm font-medium">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Financial Snapshot */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Financial Snapshot</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="flex items-start gap-2.5">
                                    <IndianRupee className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Total Debt</p>
                                        <p className="text-sm font-bold">{formatCurrency(customer.totalDebt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <Wallet className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Monthly Income</p>
                                        <p className="text-sm font-bold">{formatCurrency(customer.monthlyIncome)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <TrendingUp className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Debt-to-Income Ratio</p>
                                        <p className="text-sm font-bold">{dti}{dti !== 'N/A' ? '%' : ''}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <Briefcase className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Total Loans</p>
                                        <p className="text-sm font-bold">{customer.totalLoans}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Linked Loans */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Linked Loans</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Lender</TableHead>
                                        <TableHead className="hidden sm:table-cell">Type</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead className="hidden md:table-cell">EMI</TableHead>
                                        <TableHead className="hidden lg:table-cell">Outstanding</TableHead>
                                        <TableHead>Overdue</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loans.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-16 text-center text-muted-foreground">No loans linked.</TableCell>
                                        </TableRow>
                                    ) : (
                                        loans.map((loan) => (
                                            <TableRow key={loan.id} className="cursor-pointer" onClick={() => navigate('/loans')}>
                                                <TableCell className="font-medium">{loan.lender}</TableCell>
                                                <TableCell className="hidden sm:table-cell">{loan.type}</TableCell>
                                                <TableCell>{formatCurrency(loan.amount)}</TableCell>
                                                <TableCell className="hidden md:table-cell">{formatCurrency(loan.emi)}</TableCell>
                                                <TableCell className="hidden lg:table-cell">{formatCurrency(loan.outstanding)}</TableCell>
                                                <TableCell>
                                                    {loan.overdueMonths > 0 ? (
                                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400">
                                                            <AlertTriangle className="size-3" /> {loan.overdueMonths} mo
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-green-600 dark:text-green-400">Current</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Linked Cases */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Linked Cases</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Case #</TableHead>
                                        <TableHead>Stage</TableHead>
                                        <TableHead className="hidden sm:table-cell">Counsellor</TableHead>
                                        <TableHead className="hidden md:table-cell">Created</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cases.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-16 text-center text-muted-foreground">No active cases.</TableCell>
                                        </TableRow>
                                    ) : (
                                        cases.map((c) => (
                                            <TableRow key={c.id} className="cursor-pointer" onClick={() => navigate(`/cases/${c.id}`)}>
                                                <TableCell className="font-medium">{c.caseNumber}</TableCell>
                                                <TableCell>{c.stage}</TableCell>
                                                <TableCell className="hidden sm:table-cell">{c.counsellor}</TableCell>
                                                <TableCell className="hidden md:table-cell">{formatDate(c.createdAt)}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    {/* Fee Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-1.5">
                                <FileText className="size-4" /> Fee Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Total Fees</span>
                                <span className="text-sm font-bold">{formatCurrency(fees.totalFees)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Paid</span>
                                <span className="text-sm font-medium text-green-600 dark:text-green-400">{formatCurrency(fees.paid)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Pending</span>
                                <span className="text-sm font-medium text-red-600 dark:text-red-400">{formatCurrency(fees.pending)}</span>
                            </div>
                            <Separator />
                            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-green-500"
                                    style={{ width: `${fees.totalFees > 0 ? (fees.paid / fees.totalFees) * 100 : 0}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground text-center">
                                {fees.totalFees > 0 ? Math.round((fees.paid / fees.totalFees) * 100) : 0}% collected
                            </p>
                        </CardContent>
                    </Card>

                    {/* Activity Log */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Log</CardTitle>
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
