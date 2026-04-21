import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
    formatDate,
    getKanbanStatus,
    isTaskOverdue,
    taskPriorityColors,
    taskStatusColors,
    type Task,
} from '../data/mock-tasks'

interface TaskKanbanProps {
    tasks: Task[]
    onMoveTask: (taskId: number, nextStatus: 'Pending' | 'In Progress' | 'Completed') => void
}

const columns: Array<'Pending' | 'In Progress' | 'Completed'> = ['Pending', 'In Progress', 'Completed']

export function TaskKanban({ tasks, onMoveTask }: TaskKanbanProps) {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            {columns.map((column) => {
                const columnTasks = tasks.filter((task) => getKanbanStatus(task) === column)

                return (
                    <Card key={column}>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center justify-between text-base">
                                <span>{column}</span>
                                <Badge className={cn('text-xs', taskStatusColors[column])}>
                                    {columnTasks.length}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {columnTasks.length === 0 ? (
                                <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                                    No tasks in this column.
                                </div>
                            ) : (
                                columnTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className={cn(
                                            'space-y-3 rounded-lg border p-3',
                                            isTaskOverdue(task) && 'border-red-300 bg-red-50/70 dark:border-red-900 dark:bg-red-950/20',
                                        )}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="font-medium leading-snug">{task.title}</p>
                                                <p className="text-xs text-muted-foreground">{task.assignedTo}</p>
                                            </div>
                                            <Badge className={cn('text-xs', taskPriorityColors[task.priority])}>
                                                {task.priority}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>{task.type}</span>
                                            <span>Due {formatDate(task.dueDate)}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {column !== 'Pending' && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onMoveTask(task.id, column === 'Completed' ? 'In Progress' : 'Pending')}
                                                >
                                                    Move Back
                                                </Button>
                                            )}
                                            {column !== 'Completed' && (
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={() => onMoveTask(task.id, column === 'Pending' ? 'In Progress' : 'Completed')}
                                                >
                                                    {column === 'Pending' ? 'Start' : 'Complete'}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}