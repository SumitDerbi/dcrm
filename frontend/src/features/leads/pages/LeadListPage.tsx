import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Search, X, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
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
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import {
    mockLeads,
    leadStatusColors,
    type LeadStatus,
    type LoanType,
} from '../data/mock-leads'

const PAGE_SIZE = 10
const statuses: LeadStatus[] = ['New', 'Contacted', 'Interested', 'Converted']
const loanTypes: LoanType[] = ['Personal', 'Home', 'Business', 'Vehicle', 'Credit Card', 'Other']
const assignees = [...new Set(mockLeads.map((l) => l.assignedTo))]

function formatCurrency(n: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function LeadListPage() {
    const navigate = useNavigate()

    // Filters
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all')
    const [loanTypeFilter, setLoanTypeFilter] = useState<LoanType | 'all'>('all')
    const [cityFilter, setCityFilter] = useState('')
    const [assignedFilter, setAssignedFilter] = useState<string>('all')

    // Pagination
    const [page, setPage] = useState(1)

    // Bulk selection
    const [selected, setSelected] = useState<Set<number>>(new Set())

    const filtered = useMemo(() => {
        let result = [...mockLeads]

        if (search) {
            const q = search.toLowerCase()
            result = result.filter(
                (l) =>
                    l.name.toLowerCase().includes(q) ||
                    l.phone.includes(q) ||
                    l.email.toLowerCase().includes(q),
            )
        }

        if (statusFilter !== 'all') {
            result = result.filter((l) => l.status === statusFilter)
        }
        if (loanTypeFilter !== 'all') {
            result = result.filter((l) => l.loanType === loanTypeFilter)
        }
        if (cityFilter) {
            const c = cityFilter.toLowerCase()
            result = result.filter((l) => l.city.toLowerCase().includes(c))
        }
        if (assignedFilter !== 'all') {
            result = result.filter((l) => l.assignedTo === assignedFilter)
        }

        return result
    }, [search, statusFilter, loanTypeFilter, cityFilter, assignedFilter])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

    const allOnPageSelected = paginated.length > 0 && paginated.every((l) => selected.has(l.id))

    function toggleAll() {
        if (allOnPageSelected) {
            const next = new Set(selected)
            paginated.forEach((l) => next.delete(l.id))
            setSelected(next)
        } else {
            const next = new Set(selected)
            paginated.forEach((l) => next.add(l.id))
            setSelected(next)
        }
    }

    function toggleOne(id: number) {
        const next = new Set(selected)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        setSelected(next)
    }

    function clearFilters() {
        setSearch('')
        setStatusFilter('all')
        setLoanTypeFilter('all')
        setCityFilter('')
        setAssignedFilter('all')
        setPage(1)
    }

    const hasFilters = search || statusFilter !== 'all' || loanTypeFilter !== 'all' || cityFilter || assignedFilter !== 'all'

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Leads</h1>
                    <p className="text-sm text-muted-foreground">{filtered.length} lead{filtered.length !== 1 ? 's' : ''} found</p>
                </div>
                <Link to="/leads/new" className={cn(buttonVariants({ size: 'default' }), 'gap-1.5')}>
                    <Plus className="size-4" />
                    Add Lead
                </Link>
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

                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as LeadStatus | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {statuses.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={loanTypeFilter} onValueChange={(v) => { setLoanTypeFilter(v as LoanType | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Loan Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Loan Types</SelectItem>
                        {loanTypes.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input
                    placeholder="City…"
                    value={cityFilter}
                    onChange={(e) => { setCityFilter(e.target.value); setPage(1) }}
                    className="w-[120px]"
                />

                <Select value={assignedFilter} onValueChange={(v) => { setAssignedFilter(v ?? 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Assigned To" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Assignees</SelectItem>
                        {assignees.map((a) => (
                            <SelectItem key={a} value={a}>{a}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                        <X className="size-3.5" />
                        Clear
                    </Button>
                )}
            </div>

            {/* Bulk actions */}
            {selected.size > 0 && (
                <div className="flex items-center gap-3 rounded-lg border bg-muted/50 px-3 py-2 text-sm">
                    <span className="font-medium">{selected.size} selected</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" size="sm">Change Status</Button>} />
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Set status to</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {statuses.map((s) => (
                                <DropdownMenuItem
                                    key={s}
                                    onSelect={() => {
                                        console.log('Bulk status change:', [...selected], '→', s)
                                        setSelected(new Set())
                                    }}
                                >
                                    {s}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" size="sm"><Users className="size-3.5 mr-1" />Assign</Button>} />
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Assign to</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {assignees.map((a) => (
                                <DropdownMenuItem
                                    key={a}
                                    onSelect={() => {
                                        console.log('Bulk assign:', [...selected], '→', a)
                                        setSelected(new Set())
                                    }}
                                >
                                    {a}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>
                        Cancel
                    </Button>
                </div>
            )}

            {/* Table */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-10">
                                <Checkbox checked={allOnPageSelected} onCheckedChange={toggleAll} />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead className="hidden md:table-cell">City</TableHead>
                            <TableHead className="hidden lg:table-cell">Loan Type</TableHead>
                            <TableHead className="hidden sm:table-cell">Total Debt</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden xl:table-cell">Assigned To</TableHead>
                            <TableHead className="hidden lg:table-cell">Created</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                                    No leads found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((lead) => (
                                <TableRow
                                    key={lead.id}
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        // Don't navigate when clicking checkbox
                                        if ((e.target as HTMLElement).closest('[data-slot="checkbox"]')) return
                                        navigate(`/leads/${lead.id}`)
                                    }}
                                >
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={selected.has(lead.id)}
                                            onCheckedChange={() => toggleOne(lead.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{lead.name}</TableCell>
                                    <TableCell>{lead.phone}</TableCell>
                                    <TableCell className="hidden md:table-cell">{lead.city}</TableCell>
                                    <TableCell className="hidden lg:table-cell">{lead.loanType}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{formatCurrency(lead.totalDebt)}</TableCell>
                                    <TableCell>
                                        <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', leadStatusColors[lead.status])}>
                                            {lead.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden xl:table-cell">{lead.assignedTo}</TableCell>
                                    <TableCell className="hidden lg:table-cell">{formatDate(lead.createdAt)}</TableCell>
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
                        <Button
                            variant="outline"
                            size="icon-sm"
                            disabled={safePage <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            <ChevronLeft className="size-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Button
                                key={p}
                                variant={p === safePage ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setPage(p)}
                            >
                                {p}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="icon-sm"
                            disabled={safePage >= totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
