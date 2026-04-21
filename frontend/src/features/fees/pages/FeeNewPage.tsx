import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { mockFeePlans, type FeeModel } from '../data/mock-fees'

function fieldError(errors: unknown[]): string | null {
    if (!errors || errors.length === 0) return null
    return String(errors[0])
}

const feeModels: FeeModel[] = ['Fixed', 'Percentage', 'Hybrid', 'Milestone']

const feePlanSchema = z.object({
    name: z.string().min(1, 'Plan name is required'),
    feeModel: z.enum(['Fixed', 'Percentage', 'Hybrid', 'Milestone'], { error: 'Select a fee model' }),
    fixedAmount: z.number(),
    percentage: z.number(),
    milestones: z.array(z.object({ stageName: z.string(), percentage: z.number() })),
    description: z.string(),
})

export default function FeeNewPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const isEdit = Boolean(id)
    const existing = isEdit ? mockFeePlans.find((p) => p.id === Number(id)) : null

    const [model, setModel] = useState<FeeModel>(existing?.feeModel ?? 'Fixed')

    const form = useForm({
        defaultValues: {
            name: existing?.name ?? '',
            feeModel: existing?.feeModel ?? ('Fixed' as FeeModel),
            fixedAmount: existing?.fixedAmount ?? 0,
            percentage: existing?.percentage ?? 0,
            milestones: existing?.milestones ?? [{ stageName: '', percentage: 0 }],
            description: existing?.description ?? '',
        },
        validators: {
            onSubmit: feePlanSchema,
        },
        onSubmit: ({ value }) => {
            console.log('Fee plan submitted:', value)
            navigate('/fees')
        },
    })

    if (isEdit && !existing) {
        return (
            <div className="text-center py-20">
                <h1 className="text-xl font-semibold">Fee plan not found</h1>
                <Link to="/fees" className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>Back to Plans</Link>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3">
                <Link to="/fees" className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}>
                    <ArrowLeft className="size-4" />
                </Link>
                <h1 className="text-2xl font-bold">{isEdit ? `Edit Plan` : 'Create Fee Plan'}</h1>
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
                        <CardTitle>Plan Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        {/* Name */}
                        <form.Field name="name">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label>Plan Name *</Label>
                                    <Input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="e.g. Standard Fixed Plan"
                                    />
                                    {fieldError(field.state.meta.errors) && (
                                        <p className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {/* Fee Model */}
                        <form.Field name="feeModel">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label>Fee Model *</Label>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(v) => {
                                            const val = (v ?? 'Fixed') as FeeModel
                                            field.handleChange(val)
                                            setModel(val)
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {feeModels.map((m) => (
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

                        {/* Fixed Amount — shown for Fixed and Hybrid */}
                        {(model === 'Fixed' || model === 'Hybrid') && (
                            <form.Field name="fixedAmount">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Fixed Amount (₹) *</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            value={field.state.value || ''}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            placeholder="25000"
                                        />
                                    </div>
                                )}
                            </form.Field>
                        )}

                        {/* Percentage — shown for Percentage and Hybrid */}
                        {(model === 'Percentage' || model === 'Hybrid') && (
                            <form.Field name="percentage">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label>Percentage (%) *</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            step={0.5}
                                            value={field.state.value || ''}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            placeholder="10"
                                        />
                                    </div>
                                )}
                            </form.Field>
                        )}

                        {/* Milestones — shown for Milestone model */}
                        {model === 'Milestone' && (
                            <form.Field name="milestones">
                                {(field) => (
                                    <div className="space-y-3">
                                        <Label>Milestones *</Label>
                                        <div className="space-y-2">
                                            {field.state.value.map((milestone, i) => (
                                                <div key={i} className="flex gap-2 items-center">
                                                    <Input
                                                        className="flex-1"
                                                        placeholder="Stage name"
                                                        value={milestone.stageName}
                                                        onChange={(e) => {
                                                            const updated = [...field.state.value]
                                                            updated[i] = { ...updated[i], stageName: e.target.value }
                                                            field.handleChange(updated)
                                                        }}
                                                    />
                                                    <Input
                                                        className="w-24"
                                                        type="number"
                                                        min={0}
                                                        max={100}
                                                        placeholder="%"
                                                        value={milestone.percentage || ''}
                                                        onChange={(e) => {
                                                            const updated = [...field.state.value]
                                                            updated[i] = { ...updated[i], percentage: Number(e.target.value) }
                                                            field.handleChange(updated)
                                                        }}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        onClick={() => {
                                                            const updated = field.state.value.filter((_, idx) => idx !== i)
                                                            field.handleChange(updated)
                                                        }}
                                                        disabled={field.state.value.length <= 1}
                                                    >
                                                        <Trash2 className="size-3.5 text-destructive" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="gap-1"
                                            onClick={() => {
                                                field.handleChange([...field.state.value, { stageName: '', percentage: 0 }])
                                            }}
                                        >
                                            <Plus className="size-3.5" /> Add Milestone
                                        </Button>
                                        <p className="text-xs text-muted-foreground">
                                            Total: {field.state.value.reduce((s, m) => s + m.percentage, 0)}% (should equal 100%)
                                        </p>
                                    </div>
                                )}
                            </form.Field>
                        )}

                        {/* Description */}
                        <form.Field name="description">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Brief description of this fee plan…"
                                        className="min-h-[70px]"
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <Button type="submit">{isEdit ? 'Save Changes' : 'Create Plan'}</Button>
                            <Link to="/fees" className={cn(buttonVariants({ variant: 'outline' }))}>Cancel</Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
