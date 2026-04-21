import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import {
    mockFeePlans,
    feeModelColors,
    formatCurrency,
    type FeePlan,
} from '../data/mock-fees'

export default function FeeListPage() {
    const [plans, setPlans] = useState<FeePlan[]>(mockFeePlans)

    function toggleActive(id: number) {
        setPlans((prev) =>
            prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)),
        )
    }

    function getAmountDisplay(plan: FeePlan) {
        if (plan.feeModel === 'Fixed') return formatCurrency(plan.fixedAmount ?? 0)
        if (plan.feeModel === 'Percentage') return `${plan.percentage}% of savings`
        if (plan.feeModel === 'Hybrid') return `${formatCurrency(plan.fixedAmount ?? 0)} + ${plan.percentage}%`
        if (plan.feeModel === 'Milestone') return `${plan.milestones.length} stages`
        return '—'
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Fee Plans</h1>
                    <p className="text-sm text-muted-foreground">{plans.length} plan{plans.length !== 1 ? 's' : ''}</p>
                </div>
                <Link to="/fees/new" className={cn(buttonVariants({ size: 'sm' }), 'gap-1')}>
                    <Plus className="size-3.5" /> Create Plan
                </Link>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Plan Name</TableHead>
                            <TableHead>Model</TableHead>
                            <TableHead className="hidden sm:table-cell">Amount / Rate</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead className="hidden md:table-cell">Description</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {plans.map((plan) => (
                            <TableRow key={plan.id}>
                                <TableCell className="font-medium">{plan.name}</TableCell>
                                <TableCell>
                                    <Badge className={cn('text-xs', feeModelColors[plan.feeModel])}>
                                        {plan.feeModel}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{getAmountDisplay(plan)}</TableCell>
                                <TableCell>
                                    <button
                                        type="button"
                                        onClick={() => toggleActive(plan.id)}
                                        className={cn(
                                            'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
                                            plan.isActive ? 'bg-primary' : 'bg-muted-foreground/30',
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'inline-block size-3.5 rounded-full bg-white transition-transform',
                                                plan.isActive ? 'translate-x-[18px]' : 'translate-x-[3px]',
                                            )}
                                        />
                                    </button>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <span className="text-sm text-muted-foreground line-clamp-1">{plan.description}</span>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        to={`/fees/${plan.id}/edit`}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Edit
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Link to assignments */}
            <div className="pt-2">
                <Link to="/fees/assignments" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
                    View Fee Assignments →
                </Link>
            </div>
        </div>
    )
}
