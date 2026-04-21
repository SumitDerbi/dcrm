import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    ArrowLeft,
    Pencil,
    ChevronRight,
    FileText,
    MessageSquare,
    Clock,
    IndianRupee,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { StageStepper } from '@/components/ui/stage-stepper'
import {
    mockCases,
    caseStages,
    stageColors,
    getCaseTimeline,
    getCaseNotes,
    getCaseDocuments,
    getCaseActivity,
    type CaseNote,
} from '../data/mock-cases'

function formatCurrency(n: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatDateTime(iso: string) {
    return new Date(iso).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export default function CaseDetailPage() {
    const { id } = useParams<{ id: string }>()
    const caseItem = mockCases.find((c) => c.id === Number(id))

    const [notes, setNotes] = useState<CaseNote[]>(() => getCaseNotes(Number(id)))
    const [newNote, setNewNote] = useState('')

    if (!caseItem) {
        return (
            <div className="text-center py-20">
                <h1 className="text-xl font-semibold">Case not found</h1>
                <Link to="/cases" className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>
                    Back to Cases
                </Link>
            </div>
        )
    }

    const timeline = getCaseTimeline(caseItem.id)
    const documents = getCaseDocuments(caseItem.id)
    const activity = getCaseActivity(caseItem.id)

    const currentStageIndex = caseStages.indexOf(caseItem.stage)
    const nextStage = currentStageIndex < caseStages.length - 1 ? caseStages[currentStageIndex + 1] : null

    function handleAddNote() {
        if (!newNote.trim()) return
        const note: CaseNote = {
            id: notes.length + 1,
            text: newNote.trim(),
            by: 'You',
            date: new Date().toISOString(),
        }
        setNotes([note, ...notes])
        setNewNote('')
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/cases" className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}>
                        <ArrowLeft className="size-4" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold">{caseItem.caseNumber}</h1>
                            <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', stageColors[caseItem.stage])}>
                                {caseItem.stage}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <Link to={`/customers/${caseItem.customerId}`} className="hover:underline">
                                {caseItem.customerName}
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link to={`/cases/${caseItem.id}/edit`} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1')}>
                        <Pencil className="size-3.5" /> Edit
                    </Link>
                    {nextStage && (
                        <Button size="sm" className="gap-1">
                            <ChevronRight className="size-3.5" /> Move to {nextStage}
                        </Button>
                    )}
                </div>
            </div>

            {/* Stage Timeline */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Case Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <StageStepper stages={caseStages} currentStage={caseItem.stage} />
                    {timeline.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                            {timeline.map((t) =>
                                t.completedAt ? (
                                    <span key={t.id}>
                                        {t.stage}: {formatDate(t.completedAt)}
                                    </span>
                                ) : null,
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Info cards row */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-1.5">
                            <IndianRupee className="size-3.5" /> Financial Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Debt</span>
                            <span className="font-medium">{formatCurrency(caseItem.totalDebt)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Settlement</span>
                            <span className="font-medium">{caseItem.settlementAmount ? formatCurrency(caseItem.settlementAmount) : '—'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Savings</span>
                            <span className="font-medium text-green-600">
                                {caseItem.savingsAmount ? formatCurrency(caseItem.savingsAmount) : '—'}
                            </span>
                        </div>
                        {caseItem.savingsAmount && caseItem.totalDebt > 0 && (
                            <div className="flex justify-between border-t pt-2">
                                <span className="text-muted-foreground">Savings %</span>
                                <span className="font-semibold text-green-600">
                                    {((caseItem.savingsAmount / caseItem.totalDebt) * 100).toFixed(1)}%
                                </span>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Case Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Counsellor</span>
                            <span className="font-medium">{caseItem.counsellor}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Ops Assigned</span>
                            <span className="font-medium">{caseItem.opsAssigned ?? '—'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Created</span>
                            <span>{formatDate(caseItem.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Updated</span>
                            <span>{formatDate(caseItem.updatedAt)}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-1.5">
                            <FileText className="size-3.5" /> Documents
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1.5 text-sm">
                        {documents.map((doc) => (
                            <div key={doc.id} className="flex justify-between items-center">
                                <span className="text-muted-foreground truncate mr-2">{doc.name}</span>
                                <Badge
                                    variant={doc.status === 'Verified' ? 'default' : doc.status === 'Uploaded' ? 'secondary' : 'outline'}
                                    className="text-[10px] shrink-0"
                                >
                                    {doc.status}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Linked loans */}
            {caseItem.loanIds.length > 0 && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Linked Loans</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Loan ID</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {caseItem.loanIds.map((loanId) => (
                                    <TableRow key={loanId}>
                                        <TableCell className="font-medium">Loan #{loanId}</TableCell>
                                        <TableCell>
                                            <Link to={`/loans/${loanId}/edit`} className="text-sm text-primary hover:underline">
                                                View
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* Notes */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-1.5">
                        <MessageSquare className="size-4" /> Notes
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Textarea
                            placeholder="Add a note…"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className="min-h-[60px]"
                        />
                        <Button onClick={handleAddNote} disabled={!newNote.trim()} className="self-end">
                            Add
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {notes.map((note) => (
                            <div key={note.id} className="border-l-2 border-primary/30 pl-3 py-1">
                                <p className="text-sm">{note.text}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {note.by} · {formatDateTime(note.date)}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Activity */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-1.5">
                        <Clock className="size-4" /> Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {activity.map((a) => (
                            <div key={a.id} className="flex items-start gap-3">
                                <div className="size-2 rounded-full bg-primary/50 mt-2 shrink-0" />
                                <div>
                                    <p className="text-sm">{a.action}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {a.by} · {formatDateTime(a.date)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
