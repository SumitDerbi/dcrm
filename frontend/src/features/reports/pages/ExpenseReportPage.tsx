import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import { ArrowLeft } from 'lucide-react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts'
import {
    monthlyExpenseBreakdown,
    filterByPeriod,
    formatCurrency,
    type Period,
} from '../data/mock-reports'

const categoryKeys = ['Salaries', 'Marketing', 'Rent', 'Software/Tools', 'Legal', 'Travel', 'Office Supplies', 'Other'] as const
const colors = ['#3b82f6', '#a855f7', '#f97316', '#14b8a6', '#ef4444', '#eab308', '#ec4899', '#6b7280']

export default function ExpenseReportPage() {
    const [period, setPeriod] = useState<Period>('year')
    const [catFilter, setCatFilter] = useState<string>('all')
    const data = useMemo(() => filterByPeriod(monthlyExpenseBreakdown, period), [period])
    const totalExpenses = data.reduce((s, d) => s + d.total, 0)

    // Pie data
    const pieData = categoryKeys.map((key, i) => ({
        name: key,
        value: data.reduce((s, d) => s + (d[key] ?? 0), 0),
        color: colors[i],
    })).filter((e) => e.value > 0)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/reports" className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}>
                        <ArrowLeft className="size-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Expense Report</h1>
                        <p className="text-sm text-muted-foreground">Spending breakdown & trends</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Select value={catFilter} onValueChange={(v) => setCatFilter(v ?? 'all')}>
                        <SelectTrigger className="w-[160px]"><SelectValue placeholder="Category" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categoryKeys.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select value={period} onValueChange={(v) => setPeriod((v ?? 'year') as Period)}>
                        <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="quarter">This Quarter</SelectItem>
                            <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Expenses</p><p className="text-lg font-bold text-red-600">{formatCurrency(totalExpenses)}</p></CardContent></Card>

            {/* Charts */}
            <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm font-medium mb-3">Monthly Expense Trend</p>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                                <Legend />
                                {(catFilter === 'all' ? categoryKeys : [catFilter]).map((key, i) => (
                                    <Bar
                                        key={key}
                                        dataKey={key}
                                        stackId="a"
                                        fill={colors[categoryKeys.indexOf(key as typeof categoryKeys[number])]}
                                        name={key}
                                        radius={i === (catFilter === 'all' ? categoryKeys.length - 1 : 0) ? [4, 4, 0, 0] : undefined}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm font-medium mb-3">Category Distribution</p>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50}
                                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={{ strokeWidth: 1 }}>
                                    {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <div className="rounded-lg border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Total</TableHead>
                            {categoryKeys.map((k) => <TableHead key={k} className="hidden lg:table-cell text-xs">{k}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((d) => (
                            <TableRow key={d.month}>
                                <TableCell className="font-medium">{d.label}</TableCell>
                                <TableCell className="font-medium">{formatCurrency(d.total)}</TableCell>
                                {categoryKeys.map((k) => (
                                    <TableCell key={k} className="hidden lg:table-cell text-sm">{formatCurrency(d[k])}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
