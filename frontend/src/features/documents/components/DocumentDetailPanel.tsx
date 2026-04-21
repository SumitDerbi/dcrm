import { useState } from 'react'
import { FileText, Image, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet'
import {
    statusColors,
    formatFileSize,
    type Document,
    type VerificationStatus,
} from '../data/mock-documents'

interface DocumentDetailPanelProps {
    document: Document | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onStatusChange?: (docId: number, status: VerificationStatus, reason?: string) => void
}

export function DocumentDetailPanel({
    document: doc,
    open,
    onOpenChange,
    onStatusChange,
}: DocumentDetailPanelProps) {
    const [rejectionReason, setRejectionReason] = useState('')
    const [showRejectForm, setShowRejectForm] = useState(false)

    if (!doc) return null

    const isImage = doc.fileName.match(/\.(jpg|jpeg|png)$/i)

    function handleVerify() {
        onStatusChange?.(doc!.id, 'Verified')
        setShowRejectForm(false)
        setRejectionReason('')
    }

    function handleReject() {
        if (!rejectionReason.trim()) return
        onStatusChange?.(doc!.id, 'Rejected', rejectionReason.trim())
        setShowRejectForm(false)
        setRejectionReason('')
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

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="truncate">{doc.fileName}</SheetTitle>
                    <SheetDescription>Document details and verification</SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* File preview placeholder */}
                    <div className="flex items-center justify-center rounded-lg border bg-muted/50 p-8">
                        {isImage ? (
                            <div className="text-center">
                                <Image className="mx-auto size-12 text-blue-500" />
                                <p className="mt-2 text-xs text-muted-foreground">Image preview</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <FileText className="mx-auto size-12 text-red-500" />
                                <p className="mt-2 text-xs text-muted-foreground">PDF document</p>
                            </div>
                        )}
                    </div>

                    {/* File info */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold">File Information</h3>
                        <div className="grid gap-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Type</span>
                                <span className="font-medium">{doc.documentType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Size</span>
                                <span>{formatFileSize(doc.fileSize)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Uploaded</span>
                                <span>{formatDateTime(doc.uploadedAt)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Uploaded By</span>
                                <span>{doc.uploadedBy}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Customer</span>
                                <span>{doc.customerName}</span>
                            </div>
                            {doc.caseNumber && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Case</span>
                                    <span>{doc.caseNumber}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Verification status */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Verification Status</h3>
                        <div className="flex items-center gap-2">
                            {doc.verificationStatus === 'Verified' && <CheckCircle2 className="size-4 text-green-600" />}
                            {doc.verificationStatus === 'Rejected' && <XCircle className="size-4 text-red-600" />}
                            {doc.verificationStatus === 'Pending' && <Clock className="size-4 text-yellow-600" />}
                            <Badge className={cn('text-xs', statusColors[doc.verificationStatus])}>
                                {doc.verificationStatus}
                            </Badge>
                        </div>
                        {doc.rejectionReason && (
                            <div className="rounded-md bg-destructive/10 p-3 text-sm">
                                <p className="font-medium text-destructive">Rejection Reason:</p>
                                <p className="mt-1 text-destructive/80">{doc.rejectionReason}</p>
                            </div>
                        )}
                    </div>

                    {/* Notes */}
                    {doc.notes && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold">Notes</h3>
                            <p className="text-sm text-muted-foreground">{doc.notes}</p>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="space-y-3 border-t pt-4">
                        <h3 className="text-sm font-semibold">Actions</h3>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                onClick={handleVerify}
                                disabled={doc.verificationStatus === 'Verified'}
                                className="gap-1"
                            >
                                <CheckCircle2 className="size-3.5" /> Verify
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setShowRejectForm(true)}
                                disabled={doc.verificationStatus === 'Rejected'}
                                className="gap-1"
                            >
                                <XCircle className="size-3.5" /> Reject
                            </Button>
                        </div>

                        {showRejectForm && (
                            <div className="space-y-2 rounded-md border p-3">
                                <Label>Rejection Reason *</Label>
                                <Textarea
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="Explain why this document is rejected…"
                                    className="min-h-[60px]"
                                />
                                <div className="flex gap-2">
                                    <Button size="sm" variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
                                        Confirm Reject
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => { setShowRejectForm(false); setRejectionReason('') }}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
