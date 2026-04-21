import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockCustomers } from '../data/mock-customers'

const customerSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    phone: z.string().regex(/^\d{10}$/, 'Must be 10 digits'),
    email: z.string().email('Invalid email'),
    city: z.string().min(2, 'City is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    pan: z.string().regex(/^[A-Z]{5}\d{4}[A-Z]$/, 'Invalid PAN format'),
    aadhaar: z.string().regex(/^\d{12}$/, 'Must be 12 digits'),
    monthlyIncome: z.number({ error: 'Enter income' }).positive('Must be positive'),
})

type CustomerForm = z.infer<typeof customerSchema>

export default function CustomerEditPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const customer = mockCustomers.find((c) => c.id === Number(id))

    const defaults: CustomerForm = customer
        ? {
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            city: customer.city,
            dateOfBirth: customer.dateOfBirth,
            pan: customer.pan,
            aadhaar: customer.aadhaar,
            monthlyIncome: customer.monthlyIncome,
        }
        : {
            name: '',
            phone: '',
            email: '',
            city: '',
            dateOfBirth: '',
            pan: '',
            aadhaar: '',
            monthlyIncome: 0,
        }

    const form = useForm({
        defaultValues: defaults,
        onSubmit: ({ value }) => {
            console.log('Submit customer:', value)
            navigate(customer ? `/customers/${customer.id}` : '/customers')
        },
        validators: {
            onBlur: customerSchema,
        },
    })

    function fieldError(name: string): string | undefined {
        const field = form.state.fieldMeta[name as keyof typeof form.state.fieldMeta]
        if (!field) return undefined
        const errs = field.errors
        if (errs && errs.length > 0) return String(errs[0])
        return undefined
    }

    if (!customer) {
        return (
            <div className="space-y-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/customers')}>
                    <ArrowLeft className="size-4 mr-1" /> Back to Customers
                </Button>
                <p className="text-muted-foreground">Customer not found.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon-sm" onClick={() => navigate(`/customers/${customer.id}`)}>
                    <ArrowLeft className="size-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Edit Customer</h1>
                    <p className="text-sm text-muted-foreground">{customer.name} · #{customer.id}</p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Customer Details</CardTitle>
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
                            {/* Name */}
                            <form.Field name="name">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('name') && (
                                            <p className="text-xs text-destructive">{fieldError('name')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Phone */}
                            <form.Field name="phone">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('phone') && (
                                            <p className="text-xs text-destructive">{fieldError('phone')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Email */}
                            <form.Field name="email">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('email') && (
                                            <p className="text-xs text-destructive">{fieldError('email')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* City */}
                            <form.Field name="city">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('city') && (
                                            <p className="text-xs text-destructive">{fieldError('city')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Date of Birth */}
                            <form.Field name="dateOfBirth">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <Input
                                            id="dob"
                                            type="date"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('dateOfBirth') && (
                                            <p className="text-xs text-destructive">{fieldError('dateOfBirth')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* PAN */}
                            <form.Field name="pan">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="pan">PAN</Label>
                                        <Input
                                            id="pan"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value.toUpperCase())}
                                            onBlur={field.handleBlur}
                                            maxLength={10}
                                        />
                                        {fieldError('pan') && (
                                            <p className="text-xs text-destructive">{fieldError('pan')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Aadhaar */}
                            <form.Field name="aadhaar">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="aadhaar">Aadhaar</Label>
                                        <Input
                                            id="aadhaar"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ''))}
                                            onBlur={field.handleBlur}
                                            maxLength={12}
                                        />
                                        {fieldError('aadhaar') && (
                                            <p className="text-xs text-destructive">{fieldError('aadhaar')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* Monthly Income */}
                            <form.Field name="monthlyIncome">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="income">Monthly Income (₹)</Label>
                                        <Input
                                            id="income"
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('monthlyIncome') && (
                                            <p className="text-xs text-destructive">{fieldError('monthlyIncome')}</p>
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
                                            {isSubmitting ? 'Saving…' : 'Save Changes'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => navigate(`/customers/${customer.id}`)}
                                        >
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
