import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import {
    IndianRupee,
    TrendingUp,
    Receipt,
    Percent,
    Users,
    BarChart3,
} from 'lucide-react'
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart as RechartsPie,
    Pie,
    Cell,
} from 'recharts'
import {
    monthlyFinancials,
    monthlyExpenseBreakdown,
    leadFunnel,
    filterByPeriod,
    formatCurrency,
    type Period,
} from '../data/mock-reports'

const expenseCategoryColors = [
    '#3b82f6', '#a855f7', '#f97316', '#14b8a6',
    '#ef4444', '#eab308', '#ec4899', '#6b7280',
]

export default function ReportsPage() {
    const [period, setPeriod] = useState<Period>('year')

    const data = useMemo(() => filterByPeriod(monthlyFinancials, period), [period])
    const expData = useMemo(() => filterByPeriod(monthlyExpenseBreakdown, period), [period])

    const totalRevenue = data.reduce((s, d) => s + d.revenue, 0)
    const totalExpenses = data.reduce((s, d) => s + d.expenses, 0)
    const netProfit = totalRevenue - totalExpenses
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0

    // Aggregate expense categories for pie chart
    const categoryKeys = ['Salaries', 'Marketing', 'Rent', 'Software/Tools', 'Legal', 'Travel', 'Office Supplies', 'Other'] as const
    const expensePie = categoryKeys.map((key, i) => ({
        name: key,
        value: expData.reduce((s, d) => s + (d[key] ?? 0), 0),
        color: expenseCategoryColors[i],
    })).filter((e) => e.value > 0)

    const reportLinks = [
        { to: '/reports/revenue', label: 'Revenue Report', icon: IndianRupee, desc: 'Monthly collections & trends' },
        { to: '/reports/expenses', label: 'Expense Report', icon: Receipt, desc: 'Spending breakdown & trends' },
        { to: '/reports/profit', label: 'Profit Report', icon: TrendingUp, desc: 'P&L and case profitability' },
        { to: '/reports/leads', label: 'Lead Conversion', icon: Users, desc: 'Funnel & source analysis' },
        { to: '/reports/employees', label: 'Employee Performance', icon: BarChart3, desc: 'Team rankings & output' },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Reports Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Financial overview & analytics</p>
                </div>
                <Select value={period} onValueChange={(v) => setPeriod((v ?? 'year') as Period)}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Summary cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                            <IndianRupee className="size-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Total Revenue</p>
                            <p className="text-lg font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                            <Receipt className="size-4 text-red-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Total Expenses</p>
                            <p className="text-lg font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className={cn('rounded-full p-2', netProfit >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900')}>
                            <TrendingUp className={cn('size-4', netProfit >= 0 ? 'text-green-600' : 'text-red-600')} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Net Profit</p>
                            <p className={cn('text-lg font-bold', netProfit >= 0 ? 'text-green-600' : 'text-red-600')}>
                                {formatCurrency(netProfit)}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                            <Percent className="size-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Profit Margin</p>
                            <p className="text-lg font-bold text-blue-600">{profitMargin.toFixed(1)}%</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts row 1 — Revenue vs Expenses + Net Profit */}
            <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm font-medium mb-3">Revenue vs Expenses</p>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                                <Legend />
                                <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm font-medium mb-3">Net Profit Trend</p>
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                                <Line type="monotone" dataKey="netProfit" name="Net Profit" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Charts row 2 — Expense Pie + Lead Funnel */}
            <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm font-medium mb-3">Expense Breakdown by Category</p>
                        <ResponsiveContainer width="100%" height={280}>
                            <RechartsPie>
                                <Pie
                                    data={expensePie}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    innerRadius={50}
                                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                    labelLine={{ strokeWidth: 1 }}
                                >
                                    {expensePie.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                            </RechartsPie>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm font-medium mb-3">Lead Conversion Funnel</p>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={leadFunnel} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" tick={{ fontSize: 11 }} />
                                <YAxis type="category" dataKey="stage" tick={{ fontSize: 12 }} width={90} />
                                <Tooltip />
                                <Bar dataKey="count" name="Leads" radius={[0, 4, 4, 0]}>
                                    {leadFunnel.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Report links */}
            <div>
                <h2 className="text-lg font-semibold mb-3">Detailed Reports</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {reportLinks.map((r) => (
                        <Link key={r.to} to={r.to} className="group">
                            <Card className="transition-shadow hover:shadow-md">
                                <CardContent className="flex items-center gap-3 p-4">
                                    <div className="rounded-full bg-muted p-2">
                                        <r.icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-medium group-hover:text-primary transition-colors">{r.label}</p>
                                        <p className="text-xs text-muted-foreground">{r.desc}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
