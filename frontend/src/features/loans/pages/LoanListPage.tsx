import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ChevronLeft, ChevronRight, Plus, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    mockLoans,
    loanStatusColors,
    loanTypes,
    loanStatuses,
    uniqueLenders,
    type LoanType,
    type LoanStatus,
} from '../data/mock-loans'

const PAGE_SIZE = 10

function formatCurrency(n: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

export default function LoanListPage() {
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState<LoanType | 'all'>('all')
    const [statusFilter, setStatusFilter] = useState<LoanStatus | 'all'>('all')
    const [lenderFilter, setLenderFilter] = useState<string>('all')
    const [overdueFilter, setOverdueFilter] = useState<'all' | 'yes' | 'no'>('all')
    const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
        let result = [...mockLoans]

        if (search) {
            const q = search.toLowerCase()
            result = result.filter(
                (l) =>
                    l.customerName.toLowerCase().includes(q) ||
                    l.lenderName.toLowerCase().includes(q),
            )
        }
        if (typeFilter !== 'all') result = result.filter((l) => l.loanType === typeFilter)
        if (statusFilter !== 'all') result = result.filter((l) => l.status === statusFilter)
        if (lenderFilter !== 'all') result = result.filter((l) => l.lenderName === lenderFilter)
        if (overdueFilter === 'yes') result = result.filter((l) => l.overdueMonths > 0)
        if (overdueFilter === 'no') result = result.filter((l) => l.overdueMonths === 0)

        return result
    }, [search, typeFilter, statusFilter, lenderFilter, overdueFilter])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

    const hasFilters = search || typeFilter !== 'all' || statusFilter !== 'all' || lenderFilter !== 'all' || overdueFilter !== 'all'

    function clearFilters() {
        setSearch('')
        setTypeFilter('all')
        setStatusFilter('all')
        setLenderFilter('all')
        setOverdueFilter('all')
        setPage(1)
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Loans</h1>
                    <p className="text-sm text-muted-foreground">{filtered.length} loan{filtered.length !== 1 ? 's' : ''} found</p>
                </div>
                <Link to="/loans/new" className={cn(buttonVariants({ size: 'sm' }), 'gap-1')}>
                    <Plus className="size-3.5" /> Add Loan
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search customer, lender…"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                        className="pl-8"
                    />
                </div>

                <Select value={typeFilter} onValueChange={(v) => { setTypeFilter((v ?? 'all') as LoanType | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Loan Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {loanTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter((v ?? 'all') as LoanStatus | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {loanStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select value={lenderFilter} onValueChange={(v) => { setLenderFilter(v ?? 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Lender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Lenders</SelectItem>
                        {uniqueLenders.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select value={overdueFilter} onValueChange={(v) => { setOverdueFilter((v ?? 'all') as 'all' | 'yes' | 'no'); setPage(1) }}>
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Overdue" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="yes">Overdue</SelectItem>
                        <SelectItem value="no">Current</SelectItem>
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
                            <TableHead>Lender</TableHead>
                            <TableHead className="hidden sm:table-cell">Type</TableHead>
                            <TableHead>Outstanding</TableHead>
                            <TableHead className="hidden md:table-cell">EMI</TableHead>
                            <TableHead className="hidden lg:table-cell">Interest</TableHead>
                            <TableHead>Overdue</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                    No loans found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((loan) => (
                                <TableRow key={loan.id}>
                                    <TableCell className="font-medium">{loan.customerName}</TableCell>
                                    <TableCell>{loan.lenderName}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{loan.loanType}</TableCell>
                                    <TableCell>{formatCurrency(loan.outstandingAmount)}</TableCell>
                                    <TableCell className="hidden md:table-cell">{formatCurrency(loan.emi)}</TableCell>
                                    <TableCell className="hidden lg:table-cell">{loan.interestRate}%</TableCell>
                                    <TableCell>
                                        {loan.overdueMonths > 0 ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400">
                                                <AlertTriangle className="size-3" /> {loan.overdueMonths} mo
                                            </span>
                                        ) : (
                                            <span className="text-xs text-green-600 dark:text-green-400">Current</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', loanStatusColors[loan.status])}>
                                            {loan.status}
                                        </span>
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
        </div>
    )
}
