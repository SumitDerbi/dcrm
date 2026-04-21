import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ChevronLeft, ChevronRight, Plus, IndianRupee, Clock, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import {
    mockPayments,
    paymentModes,
    paymentStatuses,
    paymentModeColors,
    paymentStatusColors,
    formatCurrency,
    type PaymentMode,
    type PaymentStatus,
    type Payment,
} from '../data/mock-payments'
import { ReceiptPreview } from '../components/ReceiptPreview'

const PAGE_SIZE = 10

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function PaymentListPage() {
    const [search, setSearch] = useState('')
    const [modeFilter, setModeFilter] = useState<PaymentMode | 'all'>('all')
    const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all')
    const [page, setPage] = useState(1)
    const [receiptPayment, setReceiptPayment] = useState<Payment | null>(null)
    const [receiptOpen, setReceiptOpen] = useState(false)

    const filtered = useMemo(() => {
        let result = [...mockPayments]
        if (search) {
            const q = search.toLowerCase()
            result = result.filter(
                (p) =>
                    p.customerName.toLowerCase().includes(q) ||
                    p.receiptNumber.toLowerCase().includes(q) ||
                    (p.referenceNumber?.toLowerCase().includes(q) ?? false),
            )
        }
        if (modeFilter !== 'all') result = result.filter((p) => p.paymentMode === modeFilter)
        if (statusFilter !== 'all') result = result.filter((p) => p.status === statusFilter)
        return result
    }, [search, modeFilter, statusFilter])

    // Summary calculations
    const totalCollected = mockPayments.filter((p) => p.status === 'Paid').reduce((s, p) => s + p.amount, 0)
    const totalPending = mockPayments.filter((p) => p.status === 'Pending').reduce((s, p) => s + p.amount, 0)
    const totalOverdue = mockPayments.filter((p) => p.status === 'Overdue').reduce((s, p) => s + p.amount, 0)

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

    const hasFilters = search || modeFilter !== 'all' || statusFilter !== 'all'

    function clearFilters() {
        setSearch('')
        setModeFilter('all')
        setStatusFilter('all')
        setPage(1)
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Payments</h1>
                    <p className="text-sm text-muted-foreground">{filtered.length} payment{filtered.length !== 1 ? 's' : ''}</p>
                </div>
                <Link to="/payments/new" className={cn(buttonVariants({ size: 'sm' }), 'gap-1')}>
                    <Plus className="size-3.5" /> Record Payment
                </Link>
            </div>

            {/* Summary cards */}
            <div className="grid gap-3 sm:grid-cols-3">
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                            <IndianRupee className="size-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Collected</p>
                            <p className="text-lg font-bold text-green-600">{formatCurrency(totalCollected)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                            <Clock className="size-4 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Pending</p>
                            <p className="text-lg font-bold text-yellow-600">{formatCurrency(totalPending)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                            <AlertTriangle className="size-4 text-red-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Overdue</p>
                            <p className="text-lg font-bold text-red-600">{formatCurrency(totalOverdue)}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search customer, receipt #, reference…"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                        className="pl-8"
                    />
                </div>

                <Select value={modeFilter} onValueChange={(v) => { setModeFilter((v ?? 'all') as PaymentMode | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Mode" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Modes</SelectItem>
                        {paymentModes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter((v ?? 'all') as PaymentStatus | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {paymentStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>

                {hasFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                        <X className="size-3.5" /> Clear
                    </Button>
                )}
            </div>

            {/* Table */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Receipt #</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="hidden md:table-cell">Mode</TableHead>
                            <TableHead className="hidden sm:table-cell">Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden lg:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    No payments found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-medium">{p.receiptNumber}</TableCell>
                                    <TableCell>{p.customerName}</TableCell>
                                    <TableCell className="font-medium">{formatCurrency(p.amount)}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge className={cn('text-xs', paymentModeColors[p.paymentMode])}>
                                            {p.paymentMode}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{formatDate(p.paymentDate)}</TableCell>
                                    <TableCell>
                                        <Badge className={cn('text-xs', paymentStatusColors[p.status])}>
                                            {p.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <button
                                            type="button"
                                            className="text-sm text-primary hover:underline"
                                            onClick={() => { setReceiptPayment(p); setReceiptOpen(true) }}
                                        >
                                            Receipt
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}
                    </p>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon-sm" disabled={safePage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                            <ChevronLeft className="size-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Button key={p} variant={p === safePage ? 'default' : 'outline'} size="sm" onClick={() => setPage(p)}>
                                {p}
                            </Button>
                        ))}
                        <Button variant="outline" size="icon-sm" disabled={safePage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Receipt Preview */}
            <ReceiptPreview
                payment={receiptPayment}
                open={receiptOpen}
                onOpenChange={setReceiptOpen}
            />
        </div>
    )
}
