import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Save } from 'lucide-react'
import { mockFeeAssignments } from '@/features/fees/data/mock-fees'
import { formatCurrency, paymentModes } from '../data/mock-payments'

function fieldError(errors: unknown[]): string | null {
    if (!errors || errors.length === 0) return null
    return String(errors[0])
}

const paymentSchema = z.object({
    customerId: z.number({ error: 'Customer is required' }).min(1, 'Customer is required'),
    caseId: z.number({ error: 'Case is required' }).min(1, 'Case is required'),
    feeAssignmentId: z.number({ error: 'Fee assignment is required' }).min(1, 'Fee assignment is required'),
    amount: z.number({ error: 'Amount is required' }).min(1, 'Amount must be greater than 0'),
    paymentMode: z.string().min(1, 'Payment mode is required'),
    referenceNumber: z.string(),
    paymentDate: z.string().min(1, 'Payment date is required'),
    notes: z.string(),
})

export default function PaymentNewPage() {
    const navigate = useNavigate()

    // Unique customers from fee assignments
    const customers = useMemo(() => {
        const map = new Map<number, string>()
        mockFeeAssignments
            .filter((a) => a.status === 'Active')
            .forEach((a) => map.set(a.customerId, a.customerName))
        return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
    }, [])

    const form = useForm({
        defaultValues: {
            customerId: 0,
            caseId: 0,
            feeAssignmentId: 0,
            amount: 0,
            paymentMode: '',
            referenceNumber: '',
            paymentDate: new Date().toISOString().slice(0, 10),
            notes: '',
        },
        validators: { onSubmit: paymentSchema },
        onSubmit: ({ value }) => {
            console.log('Recording payment:', value)
            navigate('/payments')
        },
    })

    // Cascading: cases filtered by selected customer
    const cases = useMemo(() => {
        const cid = form.getFieldValue('customerId')
        if (!cid) return []
        const map = new Map<number, string>()
        mockFeeAssignments
            .filter((a) => a.customerId === cid && a.status === 'Active')
            .forEach((a) => map.set(a.caseId, a.caseNumber))
        return Array.from(map.entries()).map(([id, number]) => ({ id, number }))
    }, [form.getFieldValue('customerId')])

    // Cascading: fee assignments filtered by selected case
    const feeAssignments = useMemo(() => {
        const caseId = form.getFieldValue('caseId')
        if (!caseId) return []
        return mockFeeAssignments.filter((a) => a.caseId === caseId && a.status === 'Active')
    }, [form.getFieldValue('caseId')])

    // Selected fee assignment to show pending amount
    const selectedAssignment = useMemo(() => {
        const faId = form.getFieldValue('feeAssignmentId')
        if (!faId) return null
        return mockFeeAssignments.find((a) => a.id === faId) ?? null
    }, [form.getFieldValue('feeAssignmentId')])

    // Whether reference is required
    const needsReference = (mode: string) => ['UPI', 'Bank Transfer', 'Cheque'].includes(mode)

    return (
        <div className="max-w-2xl space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon-sm" onClick={() => navigate('/payments')}>
                    <ArrowLeft className="size-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Record Payment</h1>
                    <p className="text-sm text-muted-foreground">Record a new payment against a fee assignment</p>
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="space-y-5"
            >
                {/* Customer Select */}
                <form.Field name="customerId">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Customer *</Label>
                            <Select
                                value={field.state.value ? String(field.state.value) : ''}
                                onValueChange={(v) => {
                                    const id = Number(v ?? '0')
                                    field.handleChange(id)
                                    form.setFieldValue('caseId', 0)
                                    form.setFieldValue('feeAssignmentId', 0)
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select customer" />
                                </SelectTrigger>
                                <SelectContent>
                                    {customers.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldError(field.state.meta.errors) && (
                                <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Case Select */}
                <form.Field name="caseId">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Case *</Label>
                            <Select
                                value={field.state.value ? String(field.state.value) : ''}
                                onValueChange={(v) => {
                                    field.handleChange(Number(v ?? '0'))
                                    form.setFieldValue('feeAssignmentId', 0)
                                }}
                                disabled={cases.length === 0}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={cases.length ? 'Select case' : 'Select customer first'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {cases.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>{c.number}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldError(field.state.meta.errors) && (
                                <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Fee Assignment Select */}
                <form.Field name="feeAssignmentId">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Fee Assignment *</Label>
                            <Select
                                value={field.state.value ? String(field.state.value) : ''}
                                onValueChange={(v) => field.handleChange(Number(v ?? '0'))}
                                disabled={feeAssignments.length === 0}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={feeAssignments.length ? 'Select fee assignment' : 'Select case first'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {feeAssignments.map((fa) => (
                                        <SelectItem key={fa.id} value={String(fa.id)}>
                                            {fa.feePlanName} — Pending: {formatCurrency(fa.pendingAmount)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldError(field.state.meta.errors) && (
                                <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Pending amount info */}
                {selectedAssignment && (
                    <Card className="border-dashed">
                        <CardContent className="p-3 text-sm grid grid-cols-3 gap-3">
                            <div>
                                <p className="text-muted-foreground">Total Fee</p>
                                <p className="font-medium">{formatCurrency(selectedAssignment.totalFee)}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Paid</p>
                                <p className="font-medium text-green-600">{formatCurrency(selectedAssignment.paidAmount)}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Pending</p>
                                <p className="font-medium text-orange-600">{formatCurrency(selectedAssignment.pendingAmount)}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Amount */}
                <form.Field name="amount">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Amount (₹) *</Label>
                            <Input
                                type="number"
                                min={1}
                                value={field.state.value || ''}
                                onChange={(e) => field.handleChange(Number(e.target.value) || 0)}
                                placeholder="Enter amount"
                            />
                            {fieldError(field.state.meta.errors) && (
                                <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Payment Mode */}
                <form.Field name="paymentMode">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Payment Mode *</Label>
                            <Select
                                value={field.state.value}
                                onValueChange={(v) => field.handleChange(v ?? '')}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    {paymentModes.map((m) => (
                                        <SelectItem key={m} value={m}>{m}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldError(field.state.meta.errors) && (
                                <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Reference Number — required for UPI/Bank/Cheque */}
                <form.Field name="referenceNumber">
                    {(field) => {
                        const mode = form.getFieldValue('paymentMode')
                        const required = needsReference(mode)
                        return (
                            <div className="space-y-1.5">
                                <Label>Reference Number {required ? '*' : ''}</Label>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder={required ? 'Required for ' + mode : 'Optional'}
                                />
                                {fieldError(field.state.meta.errors) && (
                                    <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                                )}
                            </div>
                        )
                    }}
                </form.Field>

                {/* Payment Date */}
                <form.Field name="paymentDate">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Payment Date *</Label>
                            <Input
                                type="date"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {fieldError(field.state.meta.errors) && (
                                <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Notes */}
                <form.Field name="notes">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Notes</Label>
                            <Textarea
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="Optional notes"
                                rows={3}
                            />
                        </div>
                    )}
                </form.Field>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                    <Button type="submit" className="gap-1">
                        <Save className="size-3.5" /> Record Payment
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate('/payments')}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}
