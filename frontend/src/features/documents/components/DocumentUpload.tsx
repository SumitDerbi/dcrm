import { useState, useRef, useCallback } from 'react'
import { Upload, X, FileText, Image } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { documentTypes, formatFileSize, type DocumentType } from '../data/mock-documents'
import { mockCustomers } from '@/features/customers/data/mock-customers'
import { mockCases } from '@/features/cases/data/mock-cases'

const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
const ACCEPTED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png'
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

interface SelectedFile {
    file: File
    error: string | null
}

interface DocumentUploadProps {
    onClose?: () => void
    initialCustomerId?: number
    hideCustomerSelect?: boolean
}

export function DocumentUpload({ onClose, initialCustomerId, hideCustomerSelect = false }: DocumentUploadProps) {
    const [files, setFiles] = useState<SelectedFile[]>([])
    const [documentType, setDocumentType] = useState<DocumentType | ''>('')
    const [customerId, setCustomerId] = useState<string>(initialCustomerId ? String(initialCustomerId) : '')
    const [caseId, setCaseId] = useState<string>('')
    const [isDragging, setIsDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const customerCases = customerId
        ? mockCases.filter((c) => c.customerId === Number(customerId))
        : []

    function validateFile(file: File): string | null {
        if (!ACCEPTED_TYPES.includes(file.type)) {
            return 'Invalid file type. Accepted: PDF, JPG, PNG.'
        }
        if (file.size > MAX_SIZE) {
            return `File too large (${formatFileSize(file.size)}). Max: 10MB.`
        }
        return null
    }

    const addFiles = useCallback((fileList: FileList | File[]) => {
        const newFiles: SelectedFile[] = Array.from(fileList).map((file) => ({
            file,
            error: validateFile(file),
        }))
        setFiles((prev) => [...prev, ...newFiles])
    }, [])

    function removeFile(index: number) {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files.length) {
            addFiles(e.dataTransfer.files)
        }
    }

    function handleSubmit() {
        const validFiles = files.filter((f) => !f.error)
        if (validFiles.length === 0) return

        console.log('Document upload submitted:', {
            documentType,
            customerId: customerId ? Number(customerId) : null,
            caseId: caseId ? Number(caseId) : null,
            files: validFiles.map((f) => ({ name: f.file.name, size: f.file.size, type: f.file.type })),
        })

        setFiles([])
        setDocumentType('')
        onClose?.()
    }

    const validCount = files.filter((f) => !f.error).length

    function getFileIcon(file: File) {
        if (file.type.startsWith('image/')) return <Image className="size-4 text-blue-500" />
        return <FileText className="size-4 text-red-500" />
    }

    return (
        <div className="space-y-4">
            {/* Document type */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium">Document Type *</label>
                <Select value={documentType} onValueChange={(v) => setDocumentType((v ?? '') as DocumentType | '')}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        {documentTypes.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Customer & Case */}
            <div className="grid gap-3 sm:grid-cols-2">
                {!hideCustomerSelect && (
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Customer *</label>
                        <Select
                            value={customerId}
                            onValueChange={(v) => {
                                setCustomerId(v ?? '')
                                setCaseId('')
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select customer" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockCustomers.map((c) => (
                                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium">Case</label>
                    <Select value={caseId} onValueChange={(v) => setCaseId(v ?? '')}>
                        <SelectTrigger>
                            <SelectValue placeholder={customerId ? 'Select case' : 'Select customer first'} />
                        </SelectTrigger>
                        <SelectContent>
                            {customerCases.length === 0 ? (
                                <SelectItem value="" disabled>No cases</SelectItem>
                            ) : (
                                customerCases.map((c) => (
                                    <SelectItem key={c.id} value={String(c.id)}>{c.caseNumber}</SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Drop zone */}
            <div
                className={cn(
                    'relative rounded-lg border-2 border-dashed p-8 text-center transition-colors',
                    isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50',
                )}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <Upload className="mx-auto size-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                    Drag & drop files here, or{' '}
                    <button
                        type="button"
                        className="font-medium text-primary underline-offset-2 hover:underline"
                        onClick={() => inputRef.current?.click()}
                    >
                        browse
                    </button>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">PDF, JPG, PNG — max 10MB per file</p>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept={ACCEPTED_EXTENSIONS}
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files?.length) addFiles(e.target.files)
                        e.target.value = ''
                    }}
                />
            </div>

            {/* File list */}
            {files.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">{files.length} file{files.length !== 1 ? 's' : ''} selected</p>
                    <div className="max-h-50 overflow-y-auto space-y-1.5">
                        {files.map((f, i) => (
                            <div
                                key={i}
                                className={cn(
                                    'flex items-center gap-2 rounded-md border px-3 py-2 text-sm',
                                    f.error && 'border-destructive/50 bg-destructive/5',
                                )}
                            >
                                {getFileIcon(f.file)}
                                <div className="flex-1 min-w-0">
                                    <p className="truncate font-medium">{f.file.name}</p>
                                    {f.error ? (
                                        <p className="text-xs text-destructive">{f.error}</p>
                                    ) : (
                                        <p className="text-xs text-muted-foreground">{formatFileSize(f.file.size)}</p>
                                    )}
                                </div>
                                <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                                    <X className="size-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
                <Button
                    onClick={handleSubmit}
                    disabled={validCount === 0 || !documentType || !customerId}
                >
                    Upload {validCount > 0 ? `(${validCount} file${validCount !== 1 ? 's' : ''})` : ''}
                </Button>
                {onClose && (
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                )}
            </div>
        </div>
    )
}
