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
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import {
    monthlyFinancials,
    filterByPeriod,
    formatCurrency,
    type Period,
} from '../data/mock-reports'

export default function RevenueReportPage() {
    const [period, setPeriod] = useState<Period>('year')
    const data = useMemo(() => filterByPeriod(monthlyFinancials, period), [period])
    const total = data.reduce((s, d) => s + d.revenue, 0)
    const totalPayments = data.reduce((s, d) => s + d.paymentsCount, 0)
    const avgPayment = totalPayments > 0 ? total / totalPayments : 0

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/reports" className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}>
                        <ArrowLeft className="size-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Revenue Report</h1>
                        <p className="text-sm text-muted-foreground">Monthly collections & trends</p>
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
            <div className="grid gap-3 sm:grid-cols-3">
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Revenue</p><p className="text-lg font-bold text-green-600">{formatCurrency(total)}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Payments</p><p className="text-lg font-bold">{totalPayments}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Average Payment</p><p className="text-lg font-bold">{formatCurrency(avgPayment)}</p></CardContent></Card>
            </div>

            {/* Chart */}
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm font-medium mb-3">Monthly Revenue Trend</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Table */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Fees Collected</TableHead>
                            <TableHead># Payments</TableHead>
                            <TableHead>Avg Payment</TableHead>
                            <TableHead className="hidden sm:table-cell">Top Customer</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((d) => (
                            <TableRow key={d.month}>
                                <TableCell className="font-medium">{d.label}</TableCell>
                                <TableCell>{formatCurrency(d.revenue)}</TableCell>
                                <TableCell>{d.paymentsCount}</TableCell>
                                <TableCell>{formatCurrency(d.paymentsCount > 0 ? d.revenue / d.paymentsCount : 0)}</TableCell>
                                <TableCell className="hidden sm:table-cell">{d.topCustomer}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
