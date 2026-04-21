import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
    mockCustomers,
    riskColors,
    statusColors,
    type RiskCategory,
    type CustomerStatus,
} from '../data/mock-customers'

const PAGE_SIZE = 10
const risks: RiskCategory[] = ['Low', 'Medium', 'High']
const statuses: CustomerStatus[] = ['Active', 'Inactive']

function formatCurrency(n: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function CustomerListPage() {
    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [riskFilter, setRiskFilter] = useState<RiskCategory | 'all'>('all')
    const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all')
    const [cityFilter, setCityFilter] = useState('')
    const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
        let result = [...mockCustomers]

        if (search) {
            const q = search.toLowerCase()
            result = result.filter(
                (c) =>
                    c.name.toLowerCase().includes(q) ||
                    c.phone.includes(q) ||
                    c.email.toLowerCase().includes(q),
            )
        }
        if (riskFilter !== 'all') result = result.filter((c) => c.riskCategory === riskFilter)
        if (statusFilter !== 'all') result = result.filter((c) => c.status === statusFilter)
        if (cityFilter) {
            const ci = cityFilter.toLowerCase()
            result = result.filter((c) => c.city.toLowerCase().includes(ci))
        }

        return result
    }, [search, riskFilter, statusFilter, cityFilter])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

    const hasFilters = search || riskFilter !== 'all' || statusFilter !== 'all' || cityFilter

    function clearFilters() {
        setSearch('')
        setRiskFilter('all')
        setStatusFilter('all')
        setCityFilter('')
        setPage(1)
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Customers</h1>
                <p className="text-sm text-muted-foreground">{filtered.length} customer{filtered.length !== 1 ? 's' : ''} found</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search name, phone, email…"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                        className="pl-8"
                    />
                </div>

                <Select value={riskFilter} onValueChange={(v) => { setRiskFilter(v as RiskCategory | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Risk" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Risk</SelectItem>
                        {risks.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as CustomerStatus | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Input
                    placeholder="City…"
                    value={cityFilter}
                    onChange={(e) => { setCityFilter(e.target.value); setPage(1) }}
                    className="w-[120px]"
                />

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
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead className="hidden md:table-cell">City</TableHead>
                            <TableHead>Risk</TableHead>
                            <TableHead className="hidden sm:table-cell">Total Debt</TableHead>
                            <TableHead className="hidden lg:table-cell">Active Cases</TableHead>
                            <TableHead className="hidden lg:table-cell">Status</TableHead>
                            <TableHead className="hidden xl:table-cell">Created</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                    No customers found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((c) => (
                                <TableRow
                                    key={c.id}
                                    className="cursor-pointer"
                                    onClick={() => navigate(`/customers/${c.id}`)}
                                >
                                    <TableCell className="font-medium">{c.name}</TableCell>
                                    <TableCell>{c.phone}</TableCell>
                                    <TableCell className="hidden md:table-cell">{c.city}</TableCell>
                                    <TableCell>
                                        <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', riskColors[c.riskCategory])}>
                                            {c.riskCategory}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{formatCurrency(c.totalDebt)}</TableCell>
                                    <TableCell className="hidden lg:table-cell">{c.activeCases}</TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', statusColors[c.status])}>
                                            {c.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden xl:table-cell">{formatDate(c.createdAt)}</TableCell>
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
