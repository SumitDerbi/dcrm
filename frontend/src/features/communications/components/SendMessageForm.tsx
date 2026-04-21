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
import { mockCases } from '@/features/cases/data/mock-cases'
import { messageChannels, mockTemplates, renderTemplate, type MessageChannel } from '../data/mock-communications'

const sendMessageSchema = z.object({
    channel: z.enum(['SMS', 'Email', 'WhatsApp'], { error: 'Channel is required' }),
    customerId: z.number({ error: 'Customer is required' }).min(1, 'Customer is required'),
    recipient: z.string().min(1, 'Recipient is required'),
    templateId: z.number(),
    subject: z.string(),
    body: z.string().min(1, 'Body is required'),
})

interface SendMessageFormProps {
    onClose: () => void
}

export function SendMessageForm({ onClose }: SendMessageFormProps) {
    const form = useForm({
        defaultValues: {
            channel: 'SMS' as MessageChannel,
            customerId: 0,
            recipient: '',
            templateId: 0,
            subject: '',
            body: '',
        },
        validators: { onSubmit: sendMessageSchema },
        onSubmit: ({ value }) => {
            console.log('Send message:', value)
            onClose()
        },
    })

    const selectedCustomer = useMemo(() => {
        const customerId = form.getFieldValue('customerId')
        return mockCustomers.find((customer) => customer.id === customerId) ?? null
    }, [form.getFieldValue('customerId')])

    const availableTemplates = useMemo(() => {
        const channel = form.getFieldValue('channel')
        return mockTemplates.filter((template) => template.channel === channel && template.isActive)
    }, [form.getFieldValue('channel')])

    function fieldError(errors: unknown[]): string | null {
        if (!errors || errors.length === 0) return null
        return String(errors[0])
    }

    function syncRecipient(customerId: number, channel: MessageChannel) {
        const customer = mockCustomers.find((item) => item.id === customerId)
        if (!customer) return ''
        return channel === 'Email' ? customer.email : customer.phone
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                form.handleSubmit()
            }}
            className="space-y-4 p-4"
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <form.Field name="channel">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Channel</Label>
                            <Select
                                value={field.state.value}
                                onValueChange={(value) => {
                                    const channel = (value ?? 'SMS') as MessageChannel
                                    field.handleChange(channel)
                                    form.setFieldValue('recipient', syncRecipient(form.getFieldValue('customerId'), channel))
                                    form.setFieldValue('templateId', 0)
                                }}
                            >
                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {messageChannels.map((channel) => <SelectItem key={channel} value={channel}>{channel}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </form.Field>
                <form.Field name="customerId">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Customer</Label>
                            <Select
                                value={field.state.value ? String(field.state.value) : ''}
                                onValueChange={(value) => {
                                    const customerId = Number(value ?? '0')
                                    field.handleChange(customerId)
                                    form.setFieldValue('recipient', syncRecipient(customerId, form.getFieldValue('channel')))
                                }}
                            >
                                <SelectTrigger className="w-full"><SelectValue placeholder="Select customer" /></SelectTrigger>
                                <SelectContent>
                                    {mockCustomers.map((customer) => <SelectItem key={customer.id} value={String(customer.id)}>{customer.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            {fieldError(field.state.meta.errors) && <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>}
                        </div>
                    )}
                </form.Field>
            </div>

            <form.Field name="recipient">
                {(field) => (
                    <div className="space-y-1.5">
                        <Label>Recipient</Label>
                        <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                    </div>
                )}
            </form.Field>

            <form.Field name="templateId">
                {(field) => (
                    <div className="space-y-1.5">
                        <Label>Template</Label>
                        <Select
                            value={field.state.value ? String(field.state.value) : '0'}
                            onValueChange={(value) => {
                                const templateId = Number(value ?? '0')
                                field.handleChange(templateId)
                                const template = mockTemplates.find((item) => item.id === templateId)
                                if (!template) return
                                const caseNumber = mockCases.find((item) => item.customerId === form.getFieldValue('customerId'))?.caseNumber ?? 'CASE-000'
                                const rendered = renderTemplate(template, {
                                    customer_name: selectedCustomer?.name ?? 'Customer',
                                    case_number: caseNumber,
                                })
                                form.setFieldValue('subject', rendered.subject)
                                form.setFieldValue('body', rendered.body)
                            }}
                        >
                            <SelectTrigger className="w-full"><SelectValue placeholder="Optional template" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">No template</SelectItem>
                                {availableTemplates.map((template) => <SelectItem key={template.id} value={String(template.id)}>{template.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </form.Field>

            {form.getFieldValue('channel') === 'Email' && (
                <form.Field name="subject">
                    {(field) => (
                        <div className="space-y-1.5">
                            <Label>Subject</Label>
                            <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                        </div>
                    )}
                </form.Field>
            )}

            <form.Field name="body">
                {(field) => (
                    <div className="space-y-1.5">
                        <Label>Body</Label>
                        <Textarea rows={7} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Enter message body" />
                        {fieldError(field.state.meta.errors) && <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>}
                    </div>
                )}
            </form.Field>

            <div className="flex gap-2 pt-2">
                <Button type="submit">Send Message</Button>
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            </div>
        </form>
    )
}