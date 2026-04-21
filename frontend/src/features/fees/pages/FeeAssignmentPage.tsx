import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ChevronLeft, ChevronRight, ArrowLeft, Receipt } from 'lucide-react'
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    mockFeeAssignments,
    mockFeePlans,
    assignmentStatusColors,
    formatCurrency,
    type FeeAssignment,
    type FeeAssignmentStatus,
} from '../data/mock-fees'
import { InvoicePreview } from '../components/InvoicePreview'

const PAGE_SIZE = 10
const statuses: FeeAssignmentStatus[] = ['Active', 'Completed', 'Cancelled']

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

const installmentStatusColors = {
    Paid: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Due: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    Overdue: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export default function FeeAssignmentPage() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<FeeAssignmentStatus | 'all'>('all')
    const [planFilter, setPlanFilter] = useState<string>('all')
    const [page, setPage] = useState(1)
    const [detailOpen, setDetailOpen] = useState(false)
    const [selected, setSelected] = useState<FeeAssignment | null>(null)
    const [invoiceOpen, setInvoiceOpen] = useState(false)
    const [invoiceAssignment, setInvoiceAssignment] = useState<FeeAssignment | null>(null)

    const filtered = useMemo(() => {
        let result = [...mockFeeAssignments]
        if (search) {
            const q = search.toLowerCase()
            result = result.filter(
                (a) =>
                    a.customerName.toLowerCase().includes(q) ||
                    a.caseNumber.toLowerCase().includes(q),
            )
        }
        if (statusFilter !== 'all') result = result.filter((a) => a.status === statusFilter)
        if (planFilter !== 'all') result = result.filter((a) => a.feePlanId === Number(planFilter))
        return result
    }, [search, statusFilter, planFilter])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

    const hasFilters = search || statusFilter !== 'all' || planFilter !== 'all'

    function clearFilters() {
        setSearch('')
        setStatusFilter('all')
        setPlanFilter('all')
        setPage(1)
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/fees" className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}>
                        <ArrowLeft className="size-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Fee Assignments</h1>
                        <p className="text-sm text-muted-foreground">{filtered.length} assignment{filtered.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search customer, case…"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                        className="pl-8"
                    />
                </div>

                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter((v ?? 'all') as FeeAssignmentStatus | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select value={planFilter} onValueChange={(v) => { setPlanFilter(v ?? 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Fee Plan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Plans</SelectItem>
                        {mockFeePlans.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}
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
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden lg:table-cell">Case</TableHead>
                            <TableHead className="hidden md:table-cell">Plan</TableHead>
                            <TableHead>Total Fee</TableHead>
                            <TableHead className="hidden sm:table-cell">Paid</TableHead>
                            <TableHead className="hidden sm:table-cell">Pending</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    No assignments found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((a) => (
                                <TableRow
                                    key={a.id}
                                    className="cursor-pointer"
                                    onClick={() => { setSelected(a); setDetailOpen(true) }}
                                >
                                    <TableCell className="font-medium">{a.customerName}</TableCell>
                                    <TableCell className="hidden lg:table-cell">{a.caseNumber}</TableCell>
                                    <TableCell className="hidden md:table-cell">{a.feePlanName}</TableCell>
                                    <TableCell>{formatCurrency(a.totalFee)}</TableCell>
                                    <TableCell className="hidden sm:table-cell text-green-600">{formatCurrency(a.paidAmount)}</TableCell>
                                    <TableCell className="hidden sm:table-cell text-orange-600">{formatCurrency(a.pendingAmount)}</TableCell>
                                    <TableCell>
                                        <Badge className={cn('text-xs', assignmentStatusColors[a.status])}>
                                            {a.status}
                                        </Badge>
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

            {/* Detail Sheet */}
            <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Fee Assignment Detail</SheetTitle>
                        <SheetDescription>
                            {selected?.customerName} — {selected?.caseNumber}
                        </SheetDescription>
                    </SheetHeader>
                    {selected && (
                        <div className="mt-6 space-y-5">
                            {/* Summary */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Fee Breakdown</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Plan</span>
                                        <span className="font-medium">{selected.feePlanName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Total Fee</span>
                                        <span className="font-medium">{formatCurrency(selected.totalFee)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Paid</span>
                                        <span className="font-medium text-green-600">{formatCurrency(selected.paidAmount)}</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2">
                                        <span className="text-muted-foreground">Pending</span>
                                        <span className="font-semibold text-orange-600">{formatCurrency(selected.pendingAmount)}</span>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="mt-2">
                                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-green-500 transition-all"
                                                style={{ width: `${(selected.paidAmount / selected.totalFee) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {((selected.paidAmount / selected.totalFee) * 100).toFixed(0)}% collected
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Installment schedule */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold">Installment Schedule</h3>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Due Date</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {selected.installments.map((inst) => (
                                                <TableRow key={inst.id}>
                                                    <TableCell className="text-sm">{formatDate(inst.dueDate)}</TableCell>
                                                    <TableCell className="text-sm">{formatCurrency(inst.amount)}</TableCell>
                                                    <TableCell>
                                                        <Badge className={cn('text-[10px]', installmentStatusColors[inst.status])}>
                                                            {inst.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            {/* Invoice button */}
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => {
                                    setInvoiceAssignment(selected)
                                    setInvoiceOpen(true)
                                }}
                            >
                                <Receipt className="size-3.5" /> View Invoice
                            </Button>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* Invoice Preview */}
            <InvoicePreview
                assignment={invoiceAssignment}
                open={invoiceOpen}
                onOpenChange={setInvoiceOpen}
            />
        </div>
    )
}