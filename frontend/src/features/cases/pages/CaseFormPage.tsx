import { useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { mockCustomers } from '@/features/customers/data/mock-customers'
import { mockLoans } from '@/features/loans/data/mock-loans'
import { mockCases, counsellors, opsTeam } from '../data/mock-cases'

function fieldError(errors: unknown[]): string | null {
    if (!errors || errors.length === 0) return null
    return String(errors[0])
}

const caseSchema = z.object({
    customerId: z.number({ error: 'Customer is required' }).min(1, 'Customer is required'),
    loanIds: z.array(z.number()).min(1, 'Select at least one loan'),
    counsellor: z.string().min(1, 'Counsellor is required'),
    opsAssigned: z.string(),
    notes: z.string(),
})

export default function CaseFormPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const isEdit = Boolean(id)
    const existingCase = isEdit ? mockCases.find((c) => c.id === Number(id)) : null

    const [selectedCustomerId, setSelectedCustomerId] = useState<number>(
        existingCase?.customerId ?? 0,
    )

    const customerLoans = useMemo(() => {
        if (!selectedCustomerId) return []
        return mockLoans.filter((l) => l.customerId === selectedCustomerId)
    }, [selectedCustomerId])

    const form = useForm({
        defaultValues: {
            customerId: existingCase?.customerId ?? 0,
            loanIds: existingCase?.loanIds ?? ([] as number[]),
            counsellor: existingCase?.counsellor ?? '',
            opsAssigned: existingCase?.opsAssigned ?? '',
            notes: '',
        },
        validators: {
            onSubmit: caseSchema,
        },
        onSubmit: ({ value }) => {
            console.log('Case form submitted:', value)
            navigate('/cases')
        },
    })

    if (isEdit && !existingCase) {
        return (
            <div className="text-center py-20">
                <h1 className="text-xl font-semibold">Case not found</h1>
                <Link to="/cases" className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>
                    Back to Cases
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link to="/cases" className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}>
                    <ArrowLeft className="size-4" />
                </Link>
                <h1 className="text-2xl font-bold">{isEdit ? `Edit ${existingCase!.caseNumber}` : 'Create Case'}</h1>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Case Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        {/* Customer */}
                        <form.Field name="customerId">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label>Customer *</Label>
                                    <Select
                                        value={field.state.value ? String(field.state.value) : ''}
                                        onValueChange={(v) => {
                                            const numVal = Number(v ?? '0')
                                            field.handleChange(numVal)
                                            setSelectedCustomerId(numVal)
                                            // Reset loan selection when customer changes
                                            form.setFieldValue('loanIds', [])
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select customer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockCustomers.map((c) => (
                                                <SelectItem key={c.id} value={String(c.id)}>
                                                    {c.name} — {c.phone}
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

                        {/* Loans (multi-select via checkboxes) */}
                        <form.Field name="loanIds">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label>Linked Loans *</Label>
                                    {customerLoans.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            {selectedCustomerId ? 'No loans found for this customer.' : 'Select a customer first.'}
                                        </p>
                                    ) : (
                                        <div className="space-y-2 rounded-md border p-3">
                                            {customerLoans.map((loan) => {
                                                const checked = field.state.value.includes(loan.id)
                                                return (
                                                    <label key={loan.id} className="flex items-center gap-2 text-sm cursor-pointer">
                                                        <Checkbox
                                                            checked={checked}
                                                            onCheckedChange={(c) => {
                                                                if (c) {
                                                                    field.handleChange([...field.state.value, loan.id])
                                                                } else {
                                                                    field.handleChange(field.state.value.filter((x) => x !== loan.id))
                                                                }
                                                            }}
                                                        />
                                                        <span>
                                                            Loan #{loan.id} — {loan.loanType} ({loan.lenderName}) — ₹{loan.outstandingAmount.toLocaleString('en-IN')}
                                                        </span>
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    )}
                                    {fieldError(field.state.meta.errors) && (
                                        <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {/* Counsellor */}
                        <form.Field name="counsellor">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label>Assigned Counsellor *</Label>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(v) => field.handleChange(v ?? '')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select counsellor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {counsellors.map((c) => (
                                                <SelectItem key={c} value={c}>{c}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldError(field.state.meta.errors) && (
                                        <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {/* Ops */}
                        <form.Field name="opsAssigned">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label>Ops Assigned</Label>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(v) => field.handleChange(v ?? '')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="None" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">None</SelectItem>
                                            {opsTeam.map((o) => (
                                                <SelectItem key={o} value={o}>{o}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </form.Field>

                        {/* Notes */}
                        <form.Field name="notes">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label>Initial Notes</Label>
                                    <Textarea
                                        placeholder="Optional notes for this case…"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="min-h-[80px]"
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <Button type="submit">{isEdit ? 'Save Changes' : 'Create Case'}</Button>
                            <Link to="/cases" className={cn(buttonVariants({ variant: 'outline' }))}>
                                Cancel
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
