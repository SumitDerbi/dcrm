import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StageStepper } from '@/components/ui/stage-stepper'
import { caseStages, getCaseActivity } from '@/features/cases/data/mock-cases'
import { statusColors } from '@/features/documents/data/mock-documents'
import {
    formatCurrency,
    formatDateTime,
    getPortalCase,
    getPortalDocumentsByCase,
    getPortalFeeAssignment,
} from '../data/mock-portal'

export default function PortalCaseDetailPage() {
    const { id } = useParams<{ id: string }>()
    const taskCase = getPortalCase(Number(id))

    if (!taskCase) {
        return <p className="text-muted-foreground">Case not found.</p>
    }

    const documents = getPortalDocumentsByCase(taskCase.id)
    const feeAssignment = getPortalFeeAssignment(taskCase.id)
    const activity = getCaseActivity(taskCase.id)

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">{taskCase.caseNumber}</h1>
                <p className="text-muted-foreground">Read-only case tracker and financial summary.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Stage Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <StageStepper stages={caseStages} currentStage={taskCase.stage} />
                </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-3">
                <Card>
                    <CardHeader><CardTitle className="text-base">Debt Summary</CardTitle></CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div><p className="text-muted-foreground">Original Debt</p><p className="font-semibold">{formatCurrency(taskCase.totalDebt)}</p></div>
                        <div><p className="text-muted-foreground">Settlement Amount</p><p className="font-semibold">{taskCase.settlementAmount ? formatCurrency(taskCase.settlementAmount) : 'Awaiting offer'}</p></div>
                        <div><p className="text-muted-foreground">Savings</p><p className="font-semibold text-green-600">{taskCase.savingsAmount ? formatCurrency(taskCase.savingsAmount) : 'Not available yet'}</p></div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="text-base">Fee Summary</CardTitle></CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div><p className="text-muted-foreground">Plan</p><p className="font-semibold">{feeAssignment?.feePlanName ?? '—'}</p></div>
                        <div><p className="text-muted-foreground">Total Fee</p><p className="font-semibold">{feeAssignment ? formatCurrency(feeAssignment.totalFee) : '—'}</p></div>
                        <div><p className="text-muted-foreground">Paid / Pending</p><p className="font-semibold">{feeAssignment ? `${formatCurrency(feeAssignment.paidAmount)} / ${formatCurrency(feeAssignment.pendingAmount)}` : '—'}</p></div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="text-base">Assigned Team</CardTitle></CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div><p className="text-muted-foreground">Counsellor</p><p className="font-semibold">{taskCase.counsellor}</p></div>
                        <div><p className="text-muted-foreground">Operations</p><p className="font-semibold">{taskCase.opsAssigned ?? 'Pending assignment'}</p></div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <Card>
                    <CardHeader><CardTitle className="text-base">Linked Documents</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {documents.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No documents linked to this case yet.</p>
                        ) : (
                            documents.map((document) => (
                                <div key={document.id} className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm">
                                    <div>
                                        <p className="font-medium">{document.fileName}</p>
                                        <p className="text-muted-foreground">{document.documentType}</p>
                                    </div>
                                    <Badge className={statusColors[document.verificationStatus]}>{document.verificationStatus}</Badge>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="text-base">Recent Updates</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {activity.map((item) => (
                                <li key={item.id} className="border-l-2 border-primary/30 pl-4 text-sm">
                                    <p className="font-medium">{item.action}</p>
                                    <p className="text-muted-foreground">{item.by} · {formatDateTime(item.date)}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}