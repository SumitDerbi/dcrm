import { Link } from 'react-router-dom'
import { AlertTriangle, BellRing } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
    formatDate,
    isTaskDueToday,
    isTaskOverdue,
    mockTasks,
    taskPriorityColors,
    type Task,
} from '../data/mock-tasks'

function ReminderRow({ task }: { task: Task }) {
    const overdue = isTaskOverdue(task)

    return (
        <div
            className={cn(
                'rounded-lg border p-3',
                overdue && 'border-red-300 bg-red-50/70 dark:border-red-900 dark:bg-red-950/20',
            )}
        >
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-sm font-medium leading-snug">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                        {task.assignedTo} · Due {formatDate(task.dueDate)}
                    </p>
                </div>
                <Badge className={cn('text-xs', taskPriorityColors[task.priority])}>{task.priority}</Badge>
            </div>
        </div>
    )
}

export function TodayReminders() {
    const reminders = mockTasks.filter((task) => isTaskDueToday(task) || isTaskOverdue(task))
    const overdueCount = reminders.filter((task) => isTaskOverdue(task)).length

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2 text-base">
                    <BellRing className="size-4" /> Today's Reminders
                </CardTitle>
                <Link to="/tasks" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
                    View All
                </Link>
            </CardHeader>
            <CardContent className="space-y-3">
                {overdueCount > 0 && (
                    <div className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-300">
                        <AlertTriangle className="size-4" />
                        {overdueCount} overdue task{overdueCount !== 1 ? 's' : ''} need attention.
                    </div>
                )}
                {reminders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No reminders for today.</p>
                ) : (
                    reminders.slice(0, 5).map((task) => <ReminderRow key={task.id} task={task} />)
                )}
            </CardContent>
        </Card>
    )
}