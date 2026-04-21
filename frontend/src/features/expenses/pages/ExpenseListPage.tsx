import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
    Search,
    X,
    ChevronLeft,
    ChevronRight,
    Plus,
    IndianRupee,
    TrendingUp,
    TrendingDown,
    Paperclip,
} from 'lucide-react'
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
    mockExpenses,
    expenseCategories,
    expensePaymentModes,
    categoryColors,
    formatCurrency,
    formatDate,
    type ExpenseCategory,
    type ExpensePaymentMode,
} from '../data/mock-expenses'
import { CategoryBreakdown } from '../components/CategoryBreakdown'

const PAGE_SIZE = 10

export default function ExpenseListPage() {
    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState<ExpenseCategory | 'all'>('all')
    const [modeFilter, setModeFilter] = useState<ExpensePaymentMode | 'all'>('all')
    const [caseLinkedFilter, setCaseLinkedFilter] = useState<'all' | 'yes' | 'no'>('all')
    const [page, setPage] = useState(1)
    const [breakdownCategory, setBreakdownCategory] = useState<ExpenseCategory | null>(null)

    // Active category from either dropdown filter or breakdown click
    const activeCategory = breakdownCategory ?? (categoryFilter !== 'all' ? categoryFilter : null)

    const filtered = useMemo(() => {
        let result = [...mockExpenses]
        if (search) {
            const q = search.toLowerCase()
            result = result.filter((e) => e.description.toLowerCase().includes(q))
        }
        if (activeCategory) result = result.filter((e) => e.category === activeCategory)
        if (modeFilter !== 'all') result = result.filter((e) => e.paymentMode === modeFilter)
        if (caseLinkedFilter === 'yes') result = result.filter((e) => e.caseId !== null)
        if (caseLinkedFilter === 'no') result = result.filter((e) => e.caseId === null)
        return result
    }, [search, activeCategory, modeFilter, caseLinkedFilter])

    // Summary: this month (April 2026)
    const thisMonthExpenses = mockExpenses.filter((e) => e.date.startsWith('2026-04'))
    const lastMonthExpenses = mockExpenses.filter((e) => e.date.startsWith('2026-03'))
    const totalThisMonth = thisMonthExpenses.reduce((s, e) => s + e.amount, 0)
    const totalLastMonth = lastMonthExpenses.reduce((s, e) => s + e.amount, 0)
    const momChange = totalLastMonth > 0 ? ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100 : 0

    // Top 3 categories this month
    const top3 = useMemo(() => {
        const map = new Map<ExpenseCategory, number>()
        for (const e of thisMonthExpenses) {
            map.set(e.category, (map.get(e.category) ?? 0) + e.amount)
        }
        return Array.from(map.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
    }, [])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

    const hasFilters =
        search ||
        categoryFilter !== 'all' ||
        modeFilter !== 'all' ||
        caseLinkedFilter !== 'all' ||
        breakdownCategory !== null

    function clearFilters() {
        setSearch('')
        setCategoryFilter('all')
        setModeFilter('all')
        setCaseLinkedFilter('all')
        setBreakdownCategory(null)
        setPage(1)
    }

    function handleBreakdownClick(cat: ExpenseCategory | null) {
        setBreakdownCategory(cat)
        setCategoryFilter('all') // reset dropdown when using breakdown
        setPage(1)
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Expenses</h1>
                    <p className="text-sm text-muted-foreground">
                        {filtered.length} expense{filtered.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <Link to="/expenses/new" className={cn(buttonVariants({ size: 'sm' }), 'gap-1')}>
                    <Plus className="size-3.5" /> Add Expense
                </Link>
            </div>

            {/* Summary cards */}
            <div className="grid gap-3 sm:grid-cols-3">
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                            <IndianRupee className="size-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">This Month</p>
                            <p className="text-lg font-bold">{formatCurrency(totalThisMonth)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="space-y-0.5">
                            <p className="text-xs text-muted-foreground">Top Categories</p>
                            {top3.map(([cat, amt]) => (
                                <p key={cat} className="text-sm">
                                    <span className="font-medium">{cat}</span>{' '}
                                    <span className="text-muted-foreground">{formatCurrency(amt)}</span>
                                </p>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div
                            className={cn(
                                'rounded-full p-2',
                                momChange >= 0
                                    ? 'bg-red-100 dark:bg-red-900'
                                    : 'bg-green-100 dark:bg-green-900',
                            )}
                        >
                            {momChange >= 0 ? (
                                <TrendingUp className="size-4 text-red-600" />
                            ) : (
                                <TrendingDown className="size-4 text-green-600" />
                            )}
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">vs Last Month</p>
                            <p
                                className={cn(
                                    'text-lg font-bold',
                                    momChange >= 0 ? 'text-red-600' : 'text-green-600',
                                )}
                            >
                                {momChange >= 0 ? '+' : ''}
                                {momChange.toFixed(1)}%
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Category breakdown */}
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm font-medium mb-2">Category Breakdown (This Month)</p>
                    <CategoryBreakdown
                        expenses={thisMonthExpenses}
                        activeCategory={breakdownCategory}
                        onCategoryClick={handleBreakdownClick}
                    />
                </CardContent>
            </Card>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search description…"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }}
                        className="pl-8"
                    />
                </div>

                <Select
                    value={categoryFilter}
                    onValueChange={(v) => {
                        setCategoryFilter((v ?? 'all') as ExpenseCategory | 'all')
                        setBreakdownCategory(null)
                        setPage(1)
                    }}
                >
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {expenseCategories.map((c) => (
                            <SelectItem key={c} value={c}>
                                {c}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={modeFilter}
                    onValueChange={(v) => {
                        setModeFilter((v ?? 'all') as ExpensePaymentMode | 'all')
                        setPage(1)
                    }}
                >
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Mode" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Modes</SelectItem>
                        {expensePaymentModes.map((m) => (
                            <SelectItem key={m} value={m}>
                                {m}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={caseLinkedFilter}
                    onValueChange={(v) => {
                        setCaseLinkedFilter((v ?? 'all') as 'all' | 'yes' | 'no')
                        setPage(1)
                    }}
                >
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Case linked" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="yes">Case-linked</SelectItem>
                        <SelectItem value="no">General</SelectItem>
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
                            <TableHead className="hidden sm:table-cell">Date</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="hidden md:table-cell">Mode</TableHead>
                            <TableHead className="hidden lg:table-cell">Case</TableHead>
                            <TableHead className="hidden lg:table-cell">Created By</TableHead>
                            <TableHead className="w-10"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                    No expenses found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((e) => (
                                <TableRow key={e.id}>
                                    <TableCell className="hidden sm:table-cell whitespace-nowrap">
                                        {formatDate(e.date)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn('text-xs', categoryColors[e.category])}>
                                            {e.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-[250px] truncate">{e.description}</TableCell>
                                    <TableCell className="font-medium whitespace-nowrap">
                                        {formatCurrency(e.amount)}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{e.paymentMode}</TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        {e.caseNumber ?? <span className="text-muted-foreground">—</span>}
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">{e.createdBy}</TableCell>
                                    <TableCell>
                                        {e.receiptAttached && (
                                            <span title="Receipt attached">
                                                <Paperclip className="size-3.5 text-muted-foreground" />
                                            </span>
                                        )}
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
                        Showing {(safePage - 1) * PAGE_SIZE + 1}–
                        {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}
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
