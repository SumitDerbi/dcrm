import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ChevronLeft, ChevronRight, Plus, LayoutList, KanbanSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { TaskKanban } from '../components/TaskKanban'
import {
    formatDate,
    isTaskOverdue,
    mockTasks,
    taskAssignees,
    taskPriorities,
    taskPriorityColors,
    taskStatuses,
    taskStatusColors,
    taskTypes,
    type Task,
    type TaskPriority,
    type TaskStatus,
    type TaskType,
} from '../data/mock-tasks'

const PAGE_SIZE = 10

export default function TaskListPage() {
    const [view, setView] = useState<'list' | 'kanban'>('list')
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')
    const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all')
    const [typeFilter, setTypeFilter] = useState<TaskType | 'all'>('all')
    const [assigneeFilter, setAssigneeFilter] = useState<string>('all')
    const [dueFrom, setDueFrom] = useState('')
    const [dueTo, setDueTo] = useState('')
    const [page, setPage] = useState(1)
    const [tasks, setTasks] = useState<Task[]>(mockTasks)

    const filtered = useMemo(() => {
        let result = [...tasks]
        if (search) {
            const query = search.toLowerCase()
            result = result.filter(
                (task) =>
                    task.title.toLowerCase().includes(query) ||
                    task.description.toLowerCase().includes(query),
            )
        }
        if (statusFilter !== 'all') result = result.filter((task) => task.status === statusFilter)
        if (priorityFilter !== 'all') result = result.filter((task) => task.priority === priorityFilter)
        if (typeFilter !== 'all') result = result.filter((task) => task.type === typeFilter)
        if (assigneeFilter !== 'all') result = result.filter((task) => task.assignedTo === assigneeFilter)
        if (dueFrom) result = result.filter((task) => task.dueDate >= dueFrom)
        if (dueTo) result = result.filter((task) => task.dueDate <= dueTo)
        return result
    }, [assigneeFilter, dueFrom, dueTo, priorityFilter, search, statusFilter, tasks, typeFilter])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
    const overdueCount = filtered.filter((task) => isTaskOverdue(task)).length
    const todayCount = filtered.filter((task) => task.dueDate === '2026-04-21' && task.status !== 'Completed').length
    const completedCount = filtered.filter((task) => task.status === 'Completed').length
    const hasFilters =
        !!search ||
        statusFilter !== 'all' ||
        priorityFilter !== 'all' ||
        typeFilter !== 'all' ||
        assigneeFilter !== 'all' ||
        !!dueFrom ||
        !!dueTo

    function clearFilters() {
        setSearch('')
        setStatusFilter('all')
        setPriorityFilter('all')
        setTypeFilter('all')
        setAssigneeFilter('all')
        setDueFrom('')
        setDueTo('')
        setPage(1)
    }

    function moveTask(taskId: number, nextStatus: 'Pending' | 'In Progress' | 'Completed') {
        setTasks((current) =>
            current.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        status: nextStatus,
                        completedAt: nextStatus === 'Completed' ? '2026-04-21T18:00:00' : null,
                    }
                    : task,
            ),
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Tasks</h1>
                    <p className="text-sm text-muted-foreground">
                        {filtered.length} task{filtered.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex rounded-lg border p-1">
                        <Button
                            type="button"
                            size="sm"
                            variant={view === 'list' ? 'default' : 'ghost'}
                            className="gap-1"
                            onClick={() => setView('list')}
                        >
                            <LayoutList className="size-3.5" /> List
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={view === 'kanban' ? 'default' : 'ghost'}
                            className="gap-1"
                            onClick={() => setView('kanban')}
                        >
                            <KanbanSquare className="size-3.5" /> Kanban
                        </Button>
                    </div>
                    <Link to="/tasks/new" className={cn(buttonVariants({ size: 'sm' }), 'gap-1')}>
                        <Plus className="size-3.5" /> Create Task
                    </Link>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">Due Today</p>
                        <p className="text-lg font-bold">{todayCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">Overdue</p>
                        <p className="text-lg font-bold text-red-600">{overdueCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">Completed</p>
                        <p className="text-lg font-bold text-green-600">{completedCount}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-50 max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search title or description..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }}
                        className="pl-8"
                    />
                </div>

                <Select value={statusFilter} onValueChange={(value) => { setStatusFilter((value ?? 'all') as TaskStatus | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-37.5">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {taskStatuses.map((status) => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={(value) => { setPriorityFilter((value ?? 'all') as TaskPriority | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-37.5">
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        {taskPriorities.map((priority) => (
                            <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={(value) => { setTypeFilter((value ?? 'all') as TaskType | 'all'); setPage(1) }}>
                    <SelectTrigger className="w-35">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {taskTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={assigneeFilter} onValueChange={(value) => { setAssigneeFilter(value ?? 'all'); setPage(1) }}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Assigned To" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Assignees</SelectItem>
                        {taskAssignees.map((assignee) => (
                            <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input type="date" value={dueFrom} onChange={(e) => { setDueFrom(e.target.value); setPage(1) }} className="w-40" />
                <Input type="date" value={dueTo} onChange={(e) => { setDueTo(e.target.value); setPage(1) }} className="w-40" />

                {hasFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                        <X className="size-3.5" /> Clear
                    </Button>
                )}
            </div>

            {view === 'kanban' ? (
                <TaskKanban tasks={filtered} onMoveTask={moveTask} />
            ) : (
                <>
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead className="hidden md:table-cell">Type</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead className="hidden lg:table-cell">Assigned To</TableHead>
                                    <TableHead className="hidden lg:table-cell">Related To</TableHead>
                                    <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginated.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                            No tasks found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginated.map((task) => (
                                        <TableRow
                                            key={task.id}
                                            className={cn(
                                                isTaskOverdue(task) && 'bg-red-50/70 dark:bg-red-950/20',
                                            )}
                                        >
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{task.title}</p>
                                                    <p className="text-xs text-muted-foreground">{task.description}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">{task.type}</TableCell>
                                            <TableCell>
                                                <Badge className={cn('text-xs', taskPriorityColors[task.priority])}>
                                                    {task.priority}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">{task.assignedTo}</TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                {task.relatedType && task.relatedId
                                                    ? `${task.relatedType} #${task.relatedId}`
                                                    : '—'}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">{formatDate(task.dueDate)}</TableCell>
                                            <TableCell>
                                                <Badge className={cn('text-xs', taskStatusColors[task.status])}>
                                                    {task.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing {(safePage - 1) * PAGE_SIZE + 1}-{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}
                            </p>
                            <div className="flex items-center gap-1">
                                <Button variant="outline" size="icon-sm" disabled={safePage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
                                    <ChevronLeft className="size-4" />
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    {safePage} / {totalPages}
                                </Button>
                                <Button variant="outline" size="icon-sm" disabled={safePage >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
