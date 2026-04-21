import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ChevronLeft, ChevronRight, Plus, Eye, Edit } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
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
    mockLenders,
    lenderTypes,
    lenderTypeColors,
    type LenderType,
} from '../data/mock-lenders'

const PAGE_SIZE = 8

export default function LenderListPage() {
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState<LenderType | 'all'>('all')
    const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
        let result = [...mockLenders]
        if (search) {
            const query = search.toLowerCase()
            result = result.filter(
                (lender) =>
                    lender.name.toLowerCase().includes(query) ||
                    lender.contactPerson.toLowerCase().includes(query),
            )
        }
        if (typeFilter !== 'all') {
            result = result.filter((lender) => lender.type === typeFilter)
        }
        return result
    }, [search, typeFilter])

    const totalCases = filtered.reduce((sum, lender) => sum + lender.totalCasesHandled, 0)
    const avgSettlement = filtered.length > 0
        ? filtered.reduce((sum, lender) => sum + lender.avgSettlementRate, 0) / filtered.length
        : 0
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
    const hasFilters = !!search || typeFilter !== 'all'

    function clearFilters() {
        setSearch('')
        setTypeFilter('all')
        setPage(1)
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Lenders</h1>
                    <p className="text-sm text-muted-foreground">
                        {filtered.length} lender{filtered.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <Link to="/lenders/new" className={cn(buttonVariants({ size: 'sm' }), 'gap-1')}>
                    <Plus className="size-3.5" /> Add Lender
                </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">Lender Types</p>
                        <p className="text-lg font-bold">{new Set(filtered.map((item) => item.type)).size}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">Cases Handled</p>
                        <p className="text-lg font-bold">{totalCases}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">Avg Settlement</p>
                        <p className="text-lg font-bold text-green-600">{avgSettlement.toFixed(1)}%</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <div className="relative min-w-55 flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }}
                        placeholder="Search name or contact person..."
                        className="pl-8"
                    />
                </div>

                <Select
                    value={typeFilter}
                    onValueChange={(value) => {
                        setTypeFilter((value ?? 'all') as LenderType | 'all')
                        setPage(1)
                    }}
                >
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {lenderTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasFilters && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1')}
                    >
                        <X className="size-3.5" /> Clear
                    </button>
                )}
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="hidden md:table-cell">Contact Person</TableHead>
                            <TableHead className="hidden lg:table-cell">Phone</TableHead>
                            <TableHead>Cases Handled</TableHead>
                            <TableHead>Avg Settlement %</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-20 text-center text-muted-foreground">
                                    No lenders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((lender) => (
                                <TableRow key={lender.id}>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{lender.name}</p>
                                            <p className="text-xs text-muted-foreground md:hidden">
                                                {lender.contactPerson}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn('text-xs', lenderTypeColors[lender.type])}>
                                            {lender.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{lender.contactPerson}</TableCell>
                                    <TableCell className="hidden lg:table-cell">{lender.contactPhone}</TableCell>
                                    <TableCell>{lender.totalCasesHandled}</TableCell>
                                    <TableCell>
                                        <span className="font-medium text-green-600">
                                            {lender.avgSettlementRate}%
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-1.5">
                                            <Link
                                                to={`/lenders/${lender.id}`}
                                                className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}
                                                aria-label={`View ${lender.name}`}
                                                title="View"
                                            >
                                                <Eye className="size-4" />
                                            </Link>
                                            <Link
                                                to={`/lenders/${lender.id}/edit`}
                                                className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}
                                                aria-label={`Edit ${lender.name}`}
                                                title="Edit"
                                            >
                                                <Edit className="size-4" />
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p>
                    Showing {(safePage - 1) * PAGE_SIZE + (paginated.length > 0 ? 1 : 0)}-
                    {(safePage - 1) * PAGE_SIZE + paginated.length} of {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setPage((current) => Math.max(1, current - 1))}
                        disabled={safePage === 1}
                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1')}
                    >
                        <ChevronLeft className="size-3.5" /> Prev
                    </button>
                    <span>
                        Page {safePage} / {totalPages}
                    </span>
                    <button
                        type="button"
                        onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                        disabled={safePage === totalPages}
                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1')}
                    >
                        Next <ChevronRight className="size-3.5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
