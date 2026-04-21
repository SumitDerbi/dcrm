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
import { lenderTypes, mockLenders, type LenderType } from '../data/mock-lenders'

const lenderSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    type: z.enum(['Bank', 'NBFC', 'Fintech', 'Other'], { error: 'Type is required' }),
    contactPerson: z.string(),
    contactPhone: z.string(),
    contactEmail: z.union([z.string().email('Invalid email'), z.literal('')]),
    address: z.string(),
    notes: z.string(),
})

type LenderForm = z.infer<typeof lenderSchema>

export default function LenderFormPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const lender = id ? mockLenders.find((item) => item.id === Number(id)) : null
    const isEdit = !!lender

    const defaults: LenderForm = lender
        ? {
            name: lender.name,
            type: lender.type,
            contactPerson: lender.contactPerson,
            contactPhone: lender.contactPhone,
            contactEmail: lender.contactEmail,
            address: lender.address,
            notes: lender.notes,
        }
        : {
            name: '',
            type: 'Bank' as LenderType,
            contactPerson: '',
            contactPhone: '',
            contactEmail: '',
            address: '',
            notes: '',
        }

    const form = useForm({
        defaultValues: defaults,
        onSubmit: ({ value }) => {
            console.log('Submit lender:', value)
            navigate(lender ? `/lenders/${lender.id}` : '/lenders')
        },
        validators: {
            onBlur: lenderSchema,
        },
    })

    function fieldError(name: string): string | undefined {
        const field = form.state.fieldMeta[name as keyof typeof form.state.fieldMeta]
        if (!field) return undefined
        const errors = field.errors
        if (errors && errors.length > 0) return String(errors[0])
        return undefined
    }

    if (id && !lender) {
        return (
            <div className="space-y-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/lenders')}>
                    <ArrowLeft className="mr-1 size-4" /> Back to Lenders
                </Button>
                <p className="text-muted-foreground">Lender not found.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => navigate(lender ? `/lenders/${lender.id}` : '/lenders')}
                >
                    <ArrowLeft className="size-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">{isEdit ? 'Edit Lender' : 'Add Lender'}</h1>
                    <p className="text-sm text-muted-foreground">
                        {isEdit ? `${lender?.name} · #${lender?.id}` : 'Create a new lender profile'}
                    </p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Lender Details</CardTitle>
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
                            <form.Field name="name">
                                {(field) => (
                                    <div className="space-y-1.5 sm:col-span-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder="Enter lender name"
                                        />
                                        {fieldError('name') && (
                                            <p className="text-xs text-destructive">{fieldError('name')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="type">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Type</Label>
                                        <Select
                                            value={field.state.value}
                                            onValueChange={(value) => field.handleChange((value ?? 'Bank') as LenderType)}
                                        >
                                            <SelectTrigger className="w-full" aria-invalid={!!fieldError('type')}>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {lenderTypes.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldError('type') && (
                                            <p className="text-xs text-destructive">{fieldError('type')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="contactPerson">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="contactPerson">Contact Person</Label>
                                        <Input
                                            id="contactPerson"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder="Primary contact name"
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="contactPhone">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="contactPhone">Contact Phone</Label>
                                        <Input
                                            id="contactPhone"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder="Phone number"
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="contactEmail">
                                {(field) => (
                                    <div className="space-y-1.5 sm:col-span-2">
                                        <Label htmlFor="contactEmail">Contact Email</Label>
                                        <Input
                                            id="contactEmail"
                                            type="email"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder="Email address"
                                        />
                                        {fieldError('contactEmail') && (
                                            <p className="text-xs text-destructive">
                                                {fieldError('contactEmail')}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="address">
                                {(field) => (
                                    <div className="space-y-1.5 sm:col-span-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Textarea
                                            id="address"
                                            rows={3}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder="Branch or office address"
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="notes">
                                {(field) => (
                                    <div className="space-y-1.5 sm:col-span-2">
                                        <Label htmlFor="notes">Notes</Label>
                                        <Textarea
                                            id="notes"
                                            rows={4}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder="Negotiation preferences or escalation context"
                                        />
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                                {([canSubmit, isSubmitting]) => (
                                    <>
                                        <Button type="submit" disabled={!canSubmit}>
                                            {isSubmitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Lender'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => navigate(lender ? `/lenders/${lender.id}` : '/lenders')}
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