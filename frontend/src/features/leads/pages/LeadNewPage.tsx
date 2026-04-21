import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockLeads, type LoanType, type LeadSource } from '../data/mock-leads'

const loanTypes: LoanType[] = ['Personal', 'Home', 'Business', 'Vehicle', 'Credit Card', 'Other']
const sources: LeadSource[] = ['Website', 'Referral', 'Ad', 'Walk-in', 'Other']

const leadSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
    email: z.string().email('Invalid email').or(z.literal('')).optional(),
    city: z.string().min(1, 'City is required'),
    loanType: z.enum(['Personal', 'Home', 'Business', 'Vehicle', 'Credit Card', 'Other'], { error: 'Loan type is required' }),
    totalDebt: z.number({ error: 'Total debt is required' }).positive('Must be greater than 0'),
    monthlyIncome: z.number().nonnegative().optional(),
    source: z.enum(['Website', 'Referral', 'Ad', 'Walk-in', 'Other'], { error: 'Source is required' }),
    notes: z.string().optional(),
})

export default function LeadFormPage() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const isEdit = Boolean(id)
    const existingLead = isEdit ? mockLeads.find((l) => l.id === Number(id)) : null

    const form = useForm({
        defaultValues: {
            name: existingLead?.name ?? '',
            phone: existingLead?.phone ?? '',
            email: existingLead?.email ?? '',
            city: existingLead?.city ?? '',
            loanType: (existingLead?.loanType ?? '') as LoanType | '',
            totalDebt: existingLead?.totalDebt ?? ('' as unknown as number),
            monthlyIncome: existingLead?.monthlyIncome ?? ('' as unknown as number),
            source: (existingLead?.source ?? '') as LeadSource | '',
            notes: existingLead?.notes ?? '',
        },
        onSubmit: ({ value }) => {
            const parsed = leadSchema.safeParse({
                ...value,
                totalDebt: Number(value.totalDebt) || undefined,
                monthlyIncome: value.monthlyIncome ? Number(value.monthlyIncome) : undefined,
            })
            if (parsed.success) {
                console.log(isEdit ? 'Update lead:' : 'Create lead:', parsed.data)
                navigate('/leads')
            }
        },
    })

    function fieldError(name: string): string | undefined {
        const field = form.state.fieldMeta[name as keyof typeof form.state.fieldMeta]
        if (!field) return undefined
        const errs = field.errors
        if (errs && errs.length > 0) return String(errs[0])
        return undefined
    }

    function validateField(name: string, value: unknown) {
        const shape = leadSchema.shape as Record<string, z.ZodType>
        const fieldSchema = shape[name]
        if (!fieldSchema) return undefined
        const result = fieldSchema.safeParse(value)
        return result.success ? undefined : result.error.issues[0]?.message
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon-sm" onClick={() => navigate('/leads')}>
                    <ArrowLeft className="size-4" />
                </Button>
                <h1 className="text-2xl font-bold">{isEdit ? 'Edit Lead' : 'New Lead'}</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{isEdit ? 'Update lead information' : 'Enter lead information'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit()
                        }}
                        className="space-y-6"
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Name */}
                            <form.Field
                                name="name"
                                validators={{ onBlur: ({ value }) => validateField('name', value) }}
                            >
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="name">Name *</Label>
                                        <Input
                                            id="name"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Full name"
                                            aria-invalid={!!fieldError('name')}
                                        />
                                        {fieldError('name') && (
                                            <p className="text-xs text-destructive">{fieldError('name')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Phone */}
                            <form.Field
                                name="phone"
                                validators={{ onBlur: ({ value }) => validateField('phone', value) }}
                            >
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="phone">Phone *</Label>
                                        <Input
                                            id="phone"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="10-digit number"
                                            aria-invalid={!!fieldError('phone')}
                                        />
                                        {fieldError('phone') && (
                                            <p className="text-xs text-destructive">{fieldError('phone')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Email */}
                            <form.Field
                                name="email"
                                validators={{ onBlur: ({ value }) => validateField('email', value) }}
                            >
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="email@example.com"
                                        />
                                        {fieldError('email') && (
                                            <p className="text-xs text-destructive">{fieldError('email')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* City */}
                            <form.Field
                                name="city"
                                validators={{ onBlur: ({ value }) => validateField('city', value) }}
                            >
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="city">City *</Label>
                                        <Input
                                            id="city"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="City"
                                            aria-invalid={!!fieldError('city')}
                                        />
                                        {fieldError('city') && (
                                            <p className="text-xs text-destructive">{fieldError('city')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Loan Type */}
                            <form.Field
                                name="loanType"
                                validators={{ onBlur: ({ value }) => validateField('loanType', value) }}
                            >
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Loan Type *</Label>
                                        <Select
                                            value={field.state.value || undefined}
                                            onValueChange={(v) => { field.handleChange(v as LoanType); field.handleBlur() }}
                                        >
                                            <SelectTrigger className="w-full" aria-invalid={!!fieldError('loanType')}>
                                                <SelectValue placeholder="Select loan type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {loanTypes.map((t) => (
                                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldError('loanType') && (
                                            <p className="text-xs text-destructive">{fieldError('loanType')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Total Debt */}
                            <form.Field
                                name="totalDebt"
                                validators={{
                                    onBlur: ({ value }) => validateField('totalDebt', Number(value) || undefined),
                                }}
                            >
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="totalDebt">Total Debt (₹) *</Label>
                                        <Input
                                            id="totalDebt"
                                            type="number"
                                            value={field.state.value === ('' as unknown as number) ? '' : field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value === '' ? ('' as unknown as number) : Number(e.target.value))}
                                            placeholder="0"
                                            min={0}
                                            aria-invalid={!!fieldError('totalDebt')}
                                        />
                                        {fieldError('totalDebt') && (
                                            <p className="text-xs text-destructive">{fieldError('totalDebt')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Monthly Income */}
                            <form.Field name="monthlyIncome">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                                        <Input
                                            id="monthlyIncome"
                                            type="number"
                                            value={field.state.value === ('' as unknown as number) ? '' : field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value === '' ? ('' as unknown as number) : Number(e.target.value))}
                                            placeholder="0"
                                            min={0}
                                        />
                                    </div>
                                )}
                            </form.Field>

                            {/* Source */}
                            <form.Field
                                name="source"
                                validators={{ onBlur: ({ value }) => validateField('source', value) }}
                            >
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Source *</Label>
                                        <Select
                                            value={field.state.value || undefined}
                                            onValueChange={(v) => { field.handleChange(v as LeadSource); field.handleBlur() }}
                                        >
                                            <SelectTrigger className="w-full" aria-invalid={!!fieldError('source')}>
                                                <SelectValue placeholder="Select source" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sources.map((s) => (
                                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldError('source') && (
                                            <p className="text-xs text-destructive">{fieldError('source')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        {/* Notes */}
                        <form.Field name="notes">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Any additional notes…"
                                        rows={3}
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Button type="submit">{isEdit ? 'Update Lead' : 'Create Lead'}</Button>
                            <Button type="button" variant="outline" onClick={() => navigate('/leads')}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
