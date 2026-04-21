import { useMemo } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { mockCustomers } from '@/features/customers/data/mock-customers'
import { callDirections, callOutcomes, type CallDirection, type CallOutcome } from '../data/mock-communications'

const callLogSchema = z.object({
    customerId: z.number({ error: 'Customer is required' }).min(1, 'Customer is required'),
    phone: z.string().min(10, 'Phone is required'),
    direction: z.enum(['Inbound', 'Outbound'], { error: 'Direction is required' }),
    duration: z.number({ error: 'Duration is required' }).min(0, 'Must be 0 or more'),
    outcome: z.enum(['Connected', 'No Answer', 'Busy', 'Voicemail'], { error: 'Outcome is required' }),
    notes: z.string(),
})

interface CallLogFormProps {
    onClose: () => void
}

export function CallLogForm({ onClose }: CallLogFormProps) {
    const form = useForm({
        defaultValues: {
            customerId: 0,
            phone: '',
            direction: 'Outbound' as CallDirection,
            duration: 0,
            outcome: 'Connected' as CallOutcome,
            notes: '',
        },
        validators: { onSubmit: callLogSchema },
        onSubmit: ({ value }) => {
            console.log('Log call:', value)
            onClose()
        },
    })

    const selectedCustomer = useMemo(() => {
        const customerId = form.getFieldValue('customerId')
        return mockCustomers.find((customer) => customer.id === customerId) ?? null
    }, [form.getFieldValue('customerId')])

    function fieldError(errors: unknown[]): string | null {
        if (!errors || errors.length === 0) return null
        return String(errors[0])
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                form.handleSubmit()
            }}
            className="space-y-4 p-4"
        >
            <form.Field name="customerId">
                {(field) => (
                    <div className="space-y-1.5">
                        <Label>Customer</Label>
                        <Select
                            value={field.state.value ? String(field.state.value) : ''}
                            onValueChange={(value) => {
                                const customerId = Number(value ?? '0')
                                field.handleChange(customerId)
                                const customer = mockCustomers.find((item) => item.id === customerId)
                                form.setFieldValue('phone', customer?.phone ?? '')
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select customer" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockCustomers.map((customer) => (
                                    <SelectItem key={customer.id} value={String(customer.id)}>
                                        {customer.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {fieldError(field.state.meta.errors) && <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>}
                    </div>
                )}
            </form.Field>

            <div className="grid gap-4 sm:grid-cols-2">
                <form.Field name="phone">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Phone</Label>
                            <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                        </div>
                    )}
                </form.Field>
                <form.Field name="duration">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Duration (minutes)</Label>
                            <Input type="number" min={0} value={field.state.value || ''} onChange={(e) => field.handleChange(Number(e.target.value) || 0)} />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <form.Field name="direction">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Direction</Label>
                            <Select value={field.state.value} onValueChange={(value) => field.handleChange((value ?? 'Outbound') as CallDirection)}>
                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {callDirections.map((direction) => <SelectItem key={direction} value={direction}>{direction}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </form.Field>
                <form.Field name="outcome">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Outcome</Label>
                            <Select value={field.state.value} onValueChange={(value) => field.handleChange((value ?? 'Connected') as CallOutcome)}>
                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {callOutcomes.map((outcome) => <SelectItem key={outcome} value={outcome}>{outcome}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </form.Field>
            </div>

            <form.Field name="notes">
                {(field) => (
                    <div className="space-y-1.5">
                        <Label>Notes</Label>
                        <Textarea
                            rows={4}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder={selectedCustomer ? `Notes for ${selectedCustomer.name}` : 'Call notes'}
                        />
                    </div>
                )}
            </form.Field>

            <div className="flex gap-2 pt-2">
                <Button type="submit">Save Call Log</Button>
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            </div>
        </form>
    )
}