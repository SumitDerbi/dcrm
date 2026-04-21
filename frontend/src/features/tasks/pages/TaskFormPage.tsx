import { useMemo } from 'react'
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
import { mockLeads } from '@/features/leads/data/mock-leads'
import { mockCustomers } from '@/features/customers/data/mock-customers'
import { mockCases } from '@/features/cases/data/mock-cases'
import {
    mockTasks,
    taskAssignees,
    taskPriorities,
    taskRelatedTypes,
    taskTypes,
    type TaskPriority,
    type TaskRelatedType,
    type TaskType,
} from '../data/mock-tasks'

const taskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string(),
    type: z.enum(['Follow-up', 'Call', 'Document', 'Meeting', 'Other'], { error: 'Type is required' }),
    priority: z.enum(['Low', 'Medium', 'High', 'Urgent'], { error: 'Priority is required' }),
    assignedTo: z.string().min(1, 'Assigned to is required'),
    relatedType: z.union([z.enum(['Lead', 'Customer', 'Case']), z.literal('')]),
    relatedId: z.string(),
    dueDate: z.string().min(1, 'Due date is required'),
    notes: z.string(),
})

type TaskForm = z.infer<typeof taskSchema>

export default function TaskFormPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const task = id ? mockTasks.find((item) => item.id === Number(id)) : null
    const isEdit = !!task

    const defaults: TaskForm = task
        ? {
            title: task.title,
            description: task.description,
            type: task.type,
            priority: task.priority,
            assignedTo: task.assignedTo,
            relatedType: task.relatedType,
            relatedId: task.relatedId ? String(task.relatedId) : '',
            dueDate: task.dueDate,
            notes: task.notes,
        }
        : {
            title: '',
            description: '',
            type: 'Follow-up' as TaskType,
            priority: 'Medium' as TaskPriority,
            assignedTo: '',
            relatedType: '',
            relatedId: '',
            dueDate: '2026-04-21',
            notes: '',
        }

    const form = useForm({
        defaultValues: defaults,
        validators: { onBlur: taskSchema },
        onSubmit: ({ value }) => {
            console.log('Submit task:', value)
            navigate('/tasks')
        },
    })

    const relatedOptions = useMemo(() => {
        const relatedType = form.getFieldValue('relatedType')
        if (relatedType === 'Lead') {
            return mockLeads.map((lead) => ({ id: String(lead.id), label: `${lead.name} - Lead #${lead.id}` }))
        }
        if (relatedType === 'Customer') {
            return mockCustomers.map((customer) => ({ id: String(customer.id), label: `${customer.name} - Customer #${customer.id}` }))
        }
        if (relatedType === 'Case') {
            return mockCases.map((taskCase) => ({ id: String(taskCase.id), label: `${taskCase.caseNumber} - ${taskCase.customerName}` }))
        }
        return []
    }, [form.getFieldValue('relatedType')])

    function fieldError(name: string): string | undefined {
        const field = form.state.fieldMeta[name as keyof typeof form.state.fieldMeta]
        if (!field) return undefined
        const errors = field.errors
        if (errors && errors.length > 0) return String(errors[0])
        return undefined
    }

    if (id && !task) {
        return (
            <div className="space-y-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')}>
                    <ArrowLeft className="mr-1 size-4" /> Back to Tasks
                </Button>
                <p className="text-muted-foreground">Task not found.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon-sm" onClick={() => navigate('/tasks')}>
                    <ArrowLeft className="size-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">{isEdit ? 'Edit Task' : 'Create Task'}</h1>
                    <p className="text-sm text-muted-foreground">
                        {isEdit ? `${task?.title} · #${task?.id}` : 'Create a new follow-up, call, or meeting task'}
                    </p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Task Details</CardTitle>
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
                            <form.Field name="title">
                                {(field) => (
                                    <div className="space-y-1.5 sm:col-span-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder="Enter task title"
                                        />
                                        {fieldError('title') && (
                                            <p className="text-xs text-destructive">{fieldError('title')}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="description">
                                {(field) => (
                                    <div className="space-y-1.5 sm:col-span-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            rows={3}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder="Optional details"
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="type">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Type</Label>
                                        <Select value={field.state.value} onValueChange={(value) => field.handleChange((value ?? 'Follow-up') as TaskType)}>
                                            <SelectTrigger className="w-full" aria-invalid={!!fieldError('type')}>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {taskTypes.map((type) => (
                                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldError('type') && <p className="text-xs text-destructive">{fieldError('type')}</p>}
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="priority">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Priority</Label>
                                        <Select value={field.state.value} onValueChange={(value) => field.handleChange((value ?? 'Medium') as TaskPriority)}>
                                            <SelectTrigger className="w-full" aria-invalid={!!fieldError('priority')}>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {taskPriorities.map((priority) => (
                                                    <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldError('priority') && <p className="text-xs text-destructive">{fieldError('priority')}</p>}
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="assignedTo">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Assigned To</Label>
                                        <Select value={field.state.value} onValueChange={(value) => field.handleChange(value ?? '')}>
                                            <SelectTrigger className="w-full" aria-invalid={!!fieldError('assignedTo')}>
                                                <SelectValue placeholder="Select assignee" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {taskAssignees.map((assignee) => (
                                                    <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldError('assignedTo') && <p className="text-xs text-destructive">{fieldError('assignedTo')}</p>}
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="dueDate">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="dueDate">Due Date</Label>
                                        <Input
                                            id="dueDate"
                                            type="date"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                        {fieldError('dueDate') && <p className="text-xs text-destructive">{fieldError('dueDate')}</p>}
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="relatedType">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Related Type</Label>
                                        <Select
                                            value={field.state.value || 'none'}
                                            onValueChange={(value) => {
                                                const nextValue = value === 'none' ? '' : (value as TaskRelatedType)
                                                field.handleChange(nextValue)
                                                form.setFieldValue('relatedId', '')
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Optional" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">None</SelectItem>
                                                {taskRelatedTypes.map((type) => (
                                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="relatedId">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Related Record</Label>
                                        <Select
                                            value={field.state.value || 'none'}
                                            onValueChange={(value) => field.handleChange(value === 'none' ? '' : value ?? '')}
                                            disabled={relatedOptions.length === 0}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={relatedOptions.length > 0 ? 'Select record' : 'Select related type first'} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">None</SelectItem>
                                                {relatedOptions.map((option) => (
                                                    <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                            placeholder="Optional notes or reminders"
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
                                            {isSubmitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Task'}
                                        </Button>
                                        <Button type="button" variant="outline" onClick={() => navigate('/tasks')}>
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