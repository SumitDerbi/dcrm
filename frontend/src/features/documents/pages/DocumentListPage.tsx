import { useState, useMemo } from 'react'
import { Search, X, ChevronLeft, ChevronRight, Upload, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import {
    mockDocuments,
    documentTypes,
    statusColors,
    formatFileSize,
    type Document,
    type DocumentType,
    type VerificationStatus,
} from '../data/mock-documents'
import { DocumentUpload } from '../components/DocumentUpload'
import { DocumentDetailPanel } from '../components/DocumentDetailPanel'

const PAGE_SIZE = 10
const statuses: VerificationStatus[] = ['Pending', 'Verified', 'Rejected']

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function DocumentListPage() {
    const [documents, setDocuments] = useState<Document[]>(mockDocuments)
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState<DocumentType | 'all'>('all')
    const [statusFilter, setStatusFilter] = useState<VerificationStatus | 'all'>('all')
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState<Set<number>>(new Set())
    const [uploadOpen, setUploadOpen] = useState(false)
    const [detailDoc, setDetailDoc] = useState<Document | null>(null)
    const [detailOpen, setDetailOpen] = useState(false)

    const filtered = useMemo(() => {
        let result = [...documents]

        if (search) {
            const q = search.toLowerCase()
            result = result.filter(
                (d) =>
                    d.customerName.toLowerCase().includes(q) ||
                    d.fileName.toLowerCase().includes(q),
            )
        }
        if (typeFilter !== 'all') result = result.filter((d) => d.documentType === typeFilter)
        if (statusFilter !== 'all') result = result.filter((d) => d.verificationStatus === statusFilter)

        return result
    }, [documents, search, typeFilter, statusFilter])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

    const hasFilters = search || typeFilter !== 'all' || statusFilter !== 'all'

    function clearFilters() {
        setSearch('')
        setTypeFilter('all')
        setStatusFilter('all')
        setPage(1)
    }

    function toggleSelect(id: number) {
        setSelected((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    function toggleSelectAll() {
        if (selected.size === paginated.length) {
            setSelected(new Set())
        } else {
            setSelected(new Set(paginated.map((d) => d.id)))
        }
    }

    function bulkUpdateStatus(status: VerificationStatus) {
        setDocuments((prev) =>
            prev.map((d) =>
                selected.has(d.id)
                    ? { ...d, verificationStatus: status, rejectionReason: status === 'Rejected' ? 'Bulk rejected' : null }
                    : d,
            ),
        )
        setSelected(new Set())
    }

    function handleStatusChange(docId: number, status: VerificationStatus, reason?: string) {
        setDocuments((prev) =>
            prev.map((d) =>
                d.id === docId
                    ? { ...d, verificationStatus: status, rejectionReason: status === 'Rejected' ? (reason ?? null) : null }
                    : d,
            ),
        )
        // Update detail doc reference
        setDetailDoc((prev) =>
            prev && prev.id === docId
                ? { ...prev, verificationStatus: status, rejectionReason: status === 'Rejected' ? (reason ?? null) : null }
                : prev,
        )
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Documents</h1>
                    <p className="text-sm text-muted-foreground">{filtered.length} document{filtered.length !== 1 ? 's' : ''}</p>
                </div>
                <Button size="sm" className="gap-1" onClick={() => setUploadOpen(true)}>
                    <Upload className="size-3.5" /> Upload
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search customer, file name…"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                        className="pl-8"
                    />
                </div>

                <Select value={typeFilter} onValueChange={(v) => { setTypeFilter((v ?? 'all') as DocumentType | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {documentTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter((v ?? 'all') as VerificationStatus | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>

                {hasFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                        <X className="size-3.5" /> Clear
                    </Button>
                )}
            </div>

            {/* Bulk actions */}
            {selected.size > 0 && (
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                    <span className="text-sm font-medium">{selected.size} selected</span>
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => bulkUpdateStatus('Verified')}>
                        <CheckCircle2 className="size-3.5" /> Verify
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1 text-destructive" onClick={() => bulkUpdateStatus('Rejected')}>
                        <XCircle className="size-3.5" /> Reject
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>
                        Clear
                    </Button>
                </div>
            )}

            {/* Table */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-10">
                                <Checkbox
                                    checked={paginated.length > 0 && selected.size === paginated.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden lg:table-cell">Case</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="hidden md:table-cell">File</TableHead>
                            <TableHead className="hidden sm:table-cell">Uploaded</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    No documents found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((d) => (
                                <TableRow key={d.id} className="cursor-pointer">
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={selected.has(d.id)}
                                            onCheckedChange={() => toggleSelect(d.id)}
                                        />
                                    </TableCell>
                                    <TableCell
                                        onClick={() => { setDetailDoc(d); setDetailOpen(true) }}
                                    >
                                        {d.customerName}
                                    </TableCell>
                                    <TableCell
                                        className="hidden lg:table-cell"
                                        onClick={() => { setDetailDoc(d); setDetailOpen(true) }}
                                    >
                                        {d.caseNumber ?? '—'}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => { setDetailDoc(d); setDetailOpen(true) }}
                                    >
                                        {d.documentType}
                                    </TableCell>
                                    <TableCell
                                        className="hidden md:table-cell"
                                        onClick={() => { setDetailDoc(d); setDetailOpen(true) }}
                                    >
                                        <div className="max-w-[180px]">
                                            <p className="truncate text-sm">{d.fileName}</p>
                                            <p className="text-xs text-muted-foreground">{formatFileSize(d.fileSize)}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        className="hidden sm:table-cell"
                                        onClick={() => { setDetailDoc(d); setDetailOpen(true) }}
                                    >
                                        {formatDate(d.uploadedAt)}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => { setDetailDoc(d); setDetailOpen(true) }}
                                    >
                                        <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', statusColors[d.verificationStatus])}>
                                            {d.verificationStatus}
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

            {/* Upload Sheet */}
            <Sheet open={uploadOpen} onOpenChange={setUploadOpen}>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Upload Documents</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                        <DocumentUpload onClose={() => setUploadOpen(false)} />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Detail Panel */}
            <DocumentDetailPanel
                document={detailDoc}
                open={detailOpen}
                onOpenChange={setDetailOpen}
                onStatusChange={handleStatusChange}
            />
        </div>
    )
}
