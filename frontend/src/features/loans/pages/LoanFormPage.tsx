import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockLoans, loanTypes, uniqueLenders, type LoanType } from '../data/mock-loans'
import { mockCustomers } from '@/features/customers/data/mock-customers'

const loanSchema = z.object({
    customerId: z.string().min(1, 'Customer is required'),
    lenderName: z.string().min(1, 'Lender is required'),
    loanType: z.enum(['Personal', 'Home', 'Business', 'Vehicle', 'Credit Card'], { error: 'Loan type is required' }),
    originalAmount: z.number({ error: 'Original amount is required' }).positive('Must be greater than 0'),
    outstandingAmount: z.number({ error: 'Outstanding amount is required' }).positive('Must be greater than 0'),
    emi: z.number({ error: 'EMI is required' }).positive('Must be greater than 0'),
    interestRate: z.number({ error: 'Interest rate is required' }).min(0, 'Min 0').max(100, 'Max 100'),
    overdueAmount: z.number({ error: 'Overdue amount is required' }).nonnegative('Cannot be negative'),
    overdueMonths: z.number({ error: 'Overdue months is required' }).nonnegative('Cannot be negative').int('Must be whole number'),
    startDate: z.string().min(1, 'Start date is required'),
})

type LoanForm = z.infer<typeof loanSchema>

export default function LoanFormPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const existingLoan = id ? mockLoans.find((l) => l.id === Number(id)) : null
    const isEdit = !!existingLoan

    const defaults: LoanForm = existingLoan
        ? {
            customerId: String(existingLoan.customerId),
            lenderName: existingLoan.lenderName,
            loanType: existingLoan.loanType,
            originalAmount: existingLoan.originalAmount,
            outstandingAmount: existingLoan.outstandingAmount,
            emi: existingLoan.emi,
            interestRate: existingLoan.interestRate,
            overdueAmount: existingLoan.overdueAmount,
            overdueMonths: existingLoan.overdueMonths,
            startDate: existingLoan.startDate,
        }
        : {
            customerId: '',
            lenderName: '',
            loanType: 'Personal' as LoanType,
            originalAmount: 0,
            outstandingAmount: 0,
            emi: 0,
            interestRate: 0,
            overdueAmount: 0,
            overdueMonths: 0,
            startDate: '',
        }

    const form = useForm({
        defaultValues: defaults,
        onSubmit: ({ value }) => {
            console.log('Submit loan:', value)
            navigate('/loans')
        },
        validators: {
            onBlur: loanSchema,
        },
    })

    function fieldError(name: string): string | undefined {
        const field = form.state.fieldMeta[name as keyof typeof form.state.fieldMeta]
        if (!field) return undefined
        const errs = field.errors
        if (errs && errs.length > 0) return String(errs[0])
        return undefined
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon-sm" onClick={() => navigate('/loans')}>
                    <ArrowLeft className="size-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">{isEdit ? 'Edit Loan' : 'Add Loan'}</h1>
                    {isEdit && (
                        <p className="text-sm text-muted-foreground">
                            {existingLoan.customerName} — {existingLoan.lenderName}
                        </p>
                    )}
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Loan Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                        className="space-y-5"
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Customer */}
                            <form.Field name="customerId">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Customer</Label>
                                        <Select
                                            value={field.state.value}
                                            onValueChange={(v) => field.handleChange(v ?? '')}
                                        >
                                            <SelectTrigger className="w-full" aria-invalid={!!fieldError('customerId')}>
                                                <SelectValue placeholder="Select customer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockCustomers.map((c) => (
                                                    <SelectItem key={c.id} value={String(c.id)}>
                                                        {c.name} — {c.city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldError('customerId') && (
                                            <p className="text-xs text-destructive">{fieldError('customerId')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Lender */}
                            <form.Field name="lenderName">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Lender</Label>
                                        <Select
                                            value={field.state.value}
                                            onValueChange={(v) => field.handleChange(v ?? '')}
                                        >
                                            <SelectTrigger className="w-full" aria-invalid={!!fieldError('lenderName')}>
                                                <SelectValue placeholder="Select lender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {uniqueLenders.map((l) => (
                                                    <SelectItem key={l} value={l}>{l}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldError('lenderName') && (
                                            <p className="text-xs text-destructive">{fieldError('lenderName')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Loan Type */}
                            <form.Field name="loanType">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Loan Type</Label>
                                        <Select
                                            value={field.state.value}
                                            onValueChange={(v) => field.handleChange((v ?? 'Personal') as LoanType)}
                                        >
                                            <SelectTrigger className="w-full" aria-invalid={!!fieldError('loanType')}>
                                                <SelectValue placeholder="Select type" />
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

                            {/* Start Date */}
                            <form.Field name="startDate">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="startDate">Start Date</Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('startDate') && (
                                            <p className="text-xs text-destructive">{fieldError('startDate')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Original Amount */}
                            <form.Field name="originalAmount">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="originalAmount">Original Amount (₹)</Label>
                                        <Input
                                            id="originalAmount"
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('originalAmount') && (
                                            <p className="text-xs text-destructive">{fieldError('originalAmount')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Outstanding Amount */}
                            <form.Field name="outstandingAmount">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="outstandingAmount">Outstanding Amount (₹)</Label>
                                        <Input
                                            id="outstandingAmount"
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('outstandingAmount') && (
                                            <p className="text-xs text-destructive">{fieldError('outstandingAmount')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* EMI */}
                            <form.Field name="emi">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="emi">EMI (₹)</Label>
                                        <Input
                                            id="emi"
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('emi') && (
                                            <p className="text-xs text-destructive">{fieldError('emi')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Interest Rate */}
                            <form.Field name="interestRate">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="interestRate">Interest Rate (%)</Label>
                                        <Input
                                            id="interestRate"
                                            type="number"
                                            step="0.1"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('interestRate') && (
                                            <p className="text-xs text-destructive">{fieldError('interestRate')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Overdue Amount */}
                            <form.Field name="overdueAmount">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="overdueAmount">Overdue Amount (₹)</Label>
                                        <Input
                                            id="overdueAmount"
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('overdueAmount') && (
                                            <p className="text-xs text-destructive">{fieldError('overdueAmount')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Overdue Months */}
                            <form.Field name="overdueMonths">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="overdueMonths">Overdue Months</Label>
                                        <Input
                                            id="overdueMonths"
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('overdueMonths') && (
                                            <p className="text-xs text-destructive">{fieldError('overdueMonths')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                                {([canSubmit, isSubmitting]) => (
                                    <>
                                        <Button type="submit" disabled={!canSubmit}>
                                            {isSubmitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Loan'}
                                        </Button>
                                        <Button type="button" variant="outline" onClick={() => navigate('/loans')}>
                                            Cancel
                                        </Button>
                                    </>
                                )}
                            </form.Subscribe>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
