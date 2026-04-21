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
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
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
} from 'recharts'
import {
    monthlyFinancials,
    caseProfitData,
    filterByPeriod,
    formatCurrency,
    type Period,
} from '../data/mock-reports'

export default function ProfitReportPage() {
    const [period, setPeriod] = useState<Period>('year')
    const data = useMemo(() => filterByPeriod(monthlyFinancials, period), [period])

    const totalRevenue = data.reduce((s, d) => s + d.revenue, 0)
    const totalExpenses = data.reduce((s, d) => s + d.expenses, 0)
    const netProfit = totalRevenue - totalExpenses
    const margin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/reports" className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}>
                        <ArrowLeft className="size-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Profit Report</h1>
                        <p className="text-sm text-muted-foreground">Profit & Loss and case profitability</p>
                    </div>
                </div>
                <Select value={period} onValueChange={(v) => setPeriod((v ?? 'year') as Period)}>
                    <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Summary */}
            <div className="grid gap-3 sm:grid-cols-4">
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Revenue</p><p className="text-lg font-bold text-green-600">{formatCurrency(totalRevenue)}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Expenses</p><p className="text-lg font-bold text-red-600">{formatCurrency(totalExpenses)}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Net Profit</p><p className={cn('text-lg font-bold', netProfit >= 0 ? 'text-green-600' : 'text-red-600')}>{formatCurrency(netProfit)}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Margin</p><p className="text-lg font-bold text-blue-600">{margin.toFixed(1)}%</p></CardContent></Card>
            </div>

            {/* Monthly P&L chart */}
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm font-medium mb-3">Monthly Profit Trend</p>
                    <ResponsiveContainer width="100%" height={300}>
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

            {/* Profit margin line */}
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm font-medium mb-3">Net Profit by Month</p>
                    <ResponsiveContainer width="100%" height={250}>
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

            {/* Monthly P&L Table */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Monthly P&L</h2>
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Expenses</TableHead>
                                <TableHead>Net Profit</TableHead>
                                <TableHead>Margin %</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((d) => {
                                const m = d.revenue > 0 ? ((d.netProfit / d.revenue) * 100) : 0
                                return (
                                    <TableRow key={d.month}>
                                        <TableCell className="font-medium">{d.label}</TableCell>
                                        <TableCell>{formatCurrency(d.revenue)}</TableCell>
                                        <TableCell>{formatCurrency(d.expenses)}</TableCell>
                                        <TableCell className={cn('font-medium', d.netProfit >= 0 ? 'text-green-600' : 'text-red-600')}>
                                            {formatCurrency(d.netProfit)}
                                        </TableCell>
                                        <TableCell>{m.toFixed(1)}%</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Case-level profitability */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Case Profitability</h2>
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Case #</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Total Fee</TableHead>
                                <TableHead>Expenses</TableHead>
                                <TableHead>Profit</TableHead>
                                <TableHead>Margin</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {caseProfitData.map((c) => (
                                <TableRow key={c.caseNumber}>
                                    <TableCell className="font-medium">{c.caseNumber}</TableCell>
                                    <TableCell>{c.customerName}</TableCell>
                                    <TableCell>{formatCurrency(c.totalFee)}</TableCell>
                                    <TableCell>{formatCurrency(c.expenses)}</TableCell>
                                    <TableCell className="font-medium text-green-600">{formatCurrency(c.profit)}</TableCell>
                                    <TableCell>
                                        <Badge className={cn('text-xs', c.marginPct >= 85 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>
                                            {c.marginPct.toFixed(1)}%
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
