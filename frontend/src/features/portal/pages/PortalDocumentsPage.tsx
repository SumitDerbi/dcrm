import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { DocumentUpload } from '@/features/documents/components/DocumentUpload'
import { formatFileSize, statusColors } from '@/features/documents/data/mock-documents'
import { currentPortalCustomerId, formatDateTime, getPortalDocuments } from '../data/mock-portal'

export default function PortalDocumentsPage() {
    const documents = getPortalDocuments()
    const [uploadOpen, setUploadOpen] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">My Documents</h1>
                    <p className="text-muted-foreground">Only documents linked to your account are shown here.</p>
                </div>
                <Button onClick={() => setUploadOpen(true)}>Upload Document</Button>
            </div>

            <div className="grid gap-4">
                {documents.map((document) => (
                    <Card key={document.id}>
                        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="font-medium">{document.fileName}</p>
                                <p className="text-sm text-muted-foreground">
                                    {document.documentType} · {formatFileSize(document.fileSize)} · Uploaded {formatDateTime(document.uploadedAt)}
                                </p>
                                {document.caseNumber && (
                                    <p className="text-sm text-muted-foreground">Linked to {document.caseNumber}</p>
                                )}
                            </div>
                            <Badge className={statusColors[document.verificationStatus]}>{document.verificationStatus}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Sheet open={uploadOpen} onOpenChange={setUploadOpen}>
                <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
                    <SheetHeader>
                        <SheetTitle>Upload Document</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                        <DocumentUpload
                            onClose={() => setUploadOpen(false)}
                            initialCustomerId={currentPortalCustomerId}
                            hideCustomerSelect
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}