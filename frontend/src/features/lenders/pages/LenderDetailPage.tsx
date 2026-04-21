import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2, Phone, Mail, MapPin, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { mockCases } from '@/features/cases/data/mock-cases'
import {
    mockLenders,
    lenderTypeColors,
    negotiationOutcomeColors,
    getLenderNegotiations,
    getLenderStats,
    formatCurrency,
    formatDate,
} from '../data/mock-lenders'

export default function LenderDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const lender = mockLenders.find((item) => item.id === Number(id))

    if (!lender) {
        return (
            <div className="space-y-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/lenders')}>
                    <ArrowLeft className="mr-1 size-4" /> Back to Lenders
                </Button>
                <p className="text-muted-foreground">Lender not found.</p>
            </div>
        )
    }

    const history = getLenderNegotiations(lender.id)
    const stats = getLenderStats(lender.id)

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon-sm" onClick={() => navigate('/lenders')}>
                        <ArrowLeft className="size-4" />
                    </Button>
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl font-bold">{lender.name}</h1>
                            <Badge className={cn('text-xs', lenderTypeColors[lender.type])}>
                                {lender.type}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Lender #{lender.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        to={`/lenders/${lender.id}/edit`}
                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1')}
                    >
                        <Edit className="size-3.5" /> Edit
                    </Link>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="gap-1"
                        onClick={() => console.log('Delete lender:', lender.id)}
                    >
                        <Trash2 className="size-3.5" /> Delete
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="flex items-start gap-2.5">
                                    <UserRound className="mt-0.5 size-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Contact Person</p>
                                        <p className="text-sm font-medium">{lender.contactPerson}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <Phone className="mt-0.5 size-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Phone</p>
                                        <p className="text-sm font-medium">{lender.contactPhone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <Mail className="mt-0.5 size-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Email</p>
                                        <p className="text-sm font-medium">{lender.contactEmail}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <MapPin className="mt-0.5 size-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Address</p>
                                        <p className="text-sm font-medium">{lender.address}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Negotiation History</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Case</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className="hidden md:table-cell">Original Amount</TableHead>
                                        <TableHead>Negotiated</TableHead>
                                        <TableHead className="hidden sm:table-cell">Discount %</TableHead>
                                        <TableHead>Outcome</TableHead>
                                        <TableHead className="hidden lg:table-cell">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {history.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-20 text-center text-muted-foreground">
                                                No negotiation history yet.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        history.map((entry) => {
                                            const linkedCase = mockCases.find((item) => item.id === entry.caseId)

                                            return (
                                                <TableRow key={entry.id}>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">
                                                                {linkedCase?.caseNumber ?? `CASE-${entry.caseId}`}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground lg:hidden">
                                                                {formatDate(entry.date)}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{entry.customerName}</TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {formatCurrency(entry.originalAmount)}
                                                    </TableCell>
                                                    <TableCell className="font-medium text-green-600">
                                                        {formatCurrency(entry.negotiatedAmount)}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {entry.discountPct}%
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={cn('text-xs', negotiationOutcomeColors[entry.outcome])}>
                                                            {entry.outcome}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden lg:table-cell">
                                                        {formatDate(entry.date)}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Snapshot</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-xs text-muted-foreground">Total Cases</p>
                                <p className="text-xl font-bold">{stats.totalCases}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Avg Settlement Rate</p>
                                <p className="text-xl font-bold text-green-600">
                                    {stats.avgSettlementRate.toFixed(1)}%
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Success Rate</p>
                                <p className="text-xl font-bold">
                                    {stats.successRate.toFixed(1)}%
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Portfolio Summary</p>
                                <p className="text-sm font-medium">
                                    {lender.totalCasesHandled} handled · {formatCurrency(
                                        history.reduce((sum, entry) => sum + entry.originalAmount, 0),
                                    )} negotiated volume
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Notes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">{lender.notes}</p>
                            <div>
                                <p className="text-xs text-muted-foreground">Recent negotiators</p>
                                <p className="text-sm font-medium">
                                    {Array.from(new Set(history.map((entry) => entry.negotiatedBy))).join(', ') || '—'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
