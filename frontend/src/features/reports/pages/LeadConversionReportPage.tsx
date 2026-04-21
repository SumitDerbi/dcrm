import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
    leadFunnel,
    monthlyLeadConversions,
    leadSourceConversions,
} from '../data/mock-reports'

export default function LeadConversionReportPage() {
    const totalLeads = leadFunnel[0]?.count ?? 0
    const totalConverted = leadFunnel.find((f) => f.stage === 'Converted')?.count ?? 0
    const overallRate = totalLeads > 0 ? (totalConverted / totalLeads) * 100 : 0

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Link to="/reports" className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}>
                    <ArrowLeft className="size-4" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">Lead Conversion Report</h1>
                    <p className="text-sm text-muted-foreground">Funnel analysis & source performance</p>
                </div>
            </div>

            {/* Summary */}
            <div className="grid gap-3 sm:grid-cols-3">
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Leads</p><p className="text-lg font-bold">{totalLeads}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Converted</p><p className="text-lg font-bold text-green-600">{totalConverted}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Overall Conversion</p><p className="text-lg font-bold text-blue-600">{overallRate.toFixed(1)}%</p></CardContent></Card>
            </div>

            {/* Funnel */}
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm font-medium mb-3">Lead Conversion Funnel</p>
                    <div className="space-y-2">
                        {leadFunnel.map((f) => {
                            const pct = totalLeads > 0 ? (f.count / totalLeads) * 100 : 0
                            return (
                                <div key={f.stage} className="flex items-center gap-3">
                                    <span className="w-24 text-sm font-medium text-right">{f.stage}</span>
                                    <div className="flex-1 h-8 bg-muted rounded overflow-hidden relative">
                                        <div
                                            className="h-full rounded transition-all"
                                            style={{ width: `${pct}%`, backgroundColor: f.color }}
                                        />
                                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                                            {f.count} ({pct.toFixed(1)}%)
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Monthly conversion rate chart */}
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm font-medium mb-3">Monthly Conversion Rate</p>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={monthlyLeadConversions}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} unit="%" />
                            <Tooltip formatter={(v) => `${v}%`} />
                            <Legend />
                            <Line type="monotone" dataKey="conversionRate" name="Conversion %" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Monthly leads table */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Monthly Breakdown</h2>
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead>Leads Added</TableHead>
                                <TableHead>Converted</TableHead>
                                <TableHead>Conversion Rate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {monthlyLeadConversions.map((d) => (
                                <TableRow key={d.month}>
                                    <TableCell className="font-medium">{d.label}</TableCell>
                                    <TableCell>{d.leadsAdded}</TableCell>
                                    <TableCell>{d.converted}</TableCell>
                                    <TableCell>
                                        <Badge className={cn('text-xs', d.conversionRate >= 30 ? 'bg-green-100 text-green-700' : d.conversionRate >= 25 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700')}>
                                            {d.conversionRate.toFixed(1)}%
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Source performance */}
            <div>
                <h2 className="text-lg font-semibold mb-2">By Lead Source</h2>
                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardContent className="p-4">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={leadSourceConversions}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="source" tick={{ fontSize: 11 }} />
                                    <YAxis tick={{ fontSize: 11 }} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="totalLeads" name="Total Leads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="converted" name="Converted" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Leads</TableHead>
                                    <TableHead>Converted</TableHead>
                                    <TableHead>Rate</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leadSourceConversions.map((s) => (
                                    <TableRow key={s.source}>
                                        <TableCell className="font-medium">{s.source}</TableCell>
                                        <TableCell>{s.totalLeads}</TableCell>
                                        <TableCell>{s.converted}</TableCell>
                                        <TableCell>
                                            <Badge className={cn('text-xs', s.conversionRate >= 30 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>
                                                {s.conversionRate.toFixed(1)}%
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
