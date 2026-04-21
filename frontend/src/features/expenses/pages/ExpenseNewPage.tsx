import { useNavigate } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { ArrowLeft, Save } from 'lucide-react'
import { mockCases } from '@/features/cases/data/mock-cases'
import { expenseCategories, expensePaymentModes } from '../data/mock-expenses'

function fieldError(errors: unknown[]): string | null {
    if (!errors || errors.length === 0) return null
    return String(errors[0])
}

const expenseSchema = z.object({
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(1, 'Description is required'),
    amount: z.number({ error: 'Amount is required' }).min(1, 'Amount must be greater than 0'),
    paymentMode: z.string().min(1, 'Payment mode is required'),
    date: z.string().min(1, 'Date is required'),
    caseId: z.number(),
    receiptAttached: z.boolean(),
    notes: z.string(),
})

export default function ExpenseNewPage() {
    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            category: '',
            description: '',
            amount: 0,
            paymentMode: '',
            date: new Date().toISOString().slice(0, 10),
            caseId: 0,
            receiptAttached: false,
            notes: '',
        },
        validators: { onSubmit: expenseSchema },
        onSubmit: ({ value }) => {
            console.log('Recording expense:', value)
            navigate('/expenses')
        },
    })

    return (
        <div className="max-w-2xl space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon-sm" onClick={() => navigate('/expenses')}>
                    <ArrowLeft className="size-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Add Expense</h1>
                    <p className="text-sm text-muted-foreground">Record a new business expense</p>
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
                {/* Category */}
                <form.Field name="category">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Category *</Label>
                            <Select
                                value={field.state.value}
                                onValueChange={(v) => field.handleChange(v ?? '')}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {expenseCategories.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldError(field.state.meta.errors) && (
                                <p className="text-sm text-destructive">
                                    {fieldError(field.state.meta.errors)}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Description */}
                <form.Field name="description">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Description *</Label>
                            <Input
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="What was this expense for?"
                            />
                            {fieldError(field.state.meta.errors) && (
                                <p className="text-sm text-destructive">
                                    {fieldError(field.state.meta.errors)}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

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
                                <p className="text-sm text-destructive">
                                    {fieldError(field.state.meta.errors)}
                                </p>
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
                                    {expensePaymentModes.map((m) => (
                                        <SelectItem key={m} value={m}>
                                            {m}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldError(field.state.meta.errors) && (
                                <p className="text-sm text-destructive">
                                    {fieldError(field.state.meta.errors)}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Date */}
                <form.Field name="date">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Date *</Label>
                            <Input
                                type="date"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {fieldError(field.state.meta.errors) && (
                                <p className="text-sm text-destructive">
                                    {fieldError(field.state.meta.errors)}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Case (optional) */}
                <form.Field name="caseId">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Linked Case</Label>
                            <Select
                                value={field.state.value ? String(field.state.value) : '0'}
                                onValueChange={(v) => field.handleChange(Number(v ?? '0'))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="None (general expense)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">None (general expense)</SelectItem>
                                    {mockCases.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>
                                            {c.caseNumber} — {c.customerName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </form.Field>

                {/* Receipt Attached */}
                <form.Field name="receiptAttached">
                    {(field) => (
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={field.state.value}
                                onCheckedChange={(checked) => field.handleChange(!!checked)}
                            />
                            <Label className="cursor-pointer">Receipt attached</Label>
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
                        <Save className="size-3.5" /> Save Expense
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate('/expenses')}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}
