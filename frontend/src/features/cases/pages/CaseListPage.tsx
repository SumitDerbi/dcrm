import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Search, X, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
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
    mockCases,
    caseStages,
    stageColors,
    counsellors,
    type CaseStage,
} from '../data/mock-cases'

const PAGE_SIZE = 10

function formatCurrency(n: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function CaseListPage() {
    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [stageFilter, setStageFilter] = useState<CaseStage | 'all'>('all')
    const [counsellorFilter, setCounsellorFilter] = useState<string>('all')
    const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
        let result = [...mockCases]

        if (search) {
            const q = search.toLowerCase()
            result = result.filter(
                (c) =>
                    c.caseNumber.toLowerCase().includes(q) ||
                    c.customerName.toLowerCase().includes(q),
            )
        }
        if (stageFilter !== 'all') result = result.filter((c) => c.stage === stageFilter)
        if (counsellorFilter !== 'all') result = result.filter((c) => c.counsellor === counsellorFilter)

        return result
    }, [search, stageFilter, counsellorFilter])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

    const hasFilters = search || stageFilter !== 'all' || counsellorFilter !== 'all'

    function clearFilters() {
        setSearch('')
        setStageFilter('all')
        setCounsellorFilter('all')
        setPage(1)
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Cases</h1>
                    <p className="text-sm text-muted-foreground">{filtered.length} case{filtered.length !== 1 ? 's' : ''} found</p>
                </div>
                <Link to="/cases/new" className={cn(buttonVariants({ size: 'sm' }), 'gap-1')}>
                    <Plus className="size-3.5" /> Create Case
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search case #, customer…"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                        className="pl-8"
                    />
                </div>

                <Select value={stageFilter} onValueChange={(v) => { setStageFilter((v ?? 'all') as CaseStage | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[170px]">
                        <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        {caseStages.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select value={counsellorFilter} onValueChange={(v) => { setCounsellorFilter(v ?? 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Counsellor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Counsellors</SelectItem>
                        {counsellors.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
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
                            <TableHead>Case #</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Stage</TableHead>
                            <TableHead className="hidden md:table-cell">Counsellor</TableHead>
                            <TableHead className="hidden sm:table-cell">Total Debt</TableHead>
                            <TableHead className="hidden lg:table-cell">Settlement</TableHead>
                            <TableHead className="hidden xl:table-cell">Created</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    No cases found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((c) => (
                                <TableRow
                                    key={c.id}
                                    className="cursor-pointer"
                                    onClick={() => navigate(`/cases/${c.id}`)}
                                >
                                    <TableCell className="font-medium">{c.caseNumber}</TableCell>
                                    <TableCell>{c.customerName}</TableCell>
                                    <TableCell>
                                        <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', stageColors[c.stage])}>
                                            {c.stage}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{c.counsellor}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{formatCurrency(c.totalDebt)}</TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        {c.settlementAmount ? formatCurrency(c.settlementAmount) : '—'}
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
