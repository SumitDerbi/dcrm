import { Link } from 'react-router-dom'
import {
    UserPlus,
    Briefcase,
    IndianRupee,
    CreditCard,
    AlertTriangle,
    TrendingUp,
    Plus,
} from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { ChartPlaceholder } from '@/components/ui/chart-placeholder'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TodayReminders } from '@/features/tasks/components/TodayReminders'

const stats = [
    { title: 'Total Leads', value: '248', icon: UserPlus, change: 12, changeLabel: 'vs last month' },
    { title: 'Active Cases', value: '64', icon: Briefcase, change: 8, changeLabel: 'vs last month' },
    { title: 'Revenue This Month', value: '₹4,52,000', icon: IndianRupee, change: 15, changeLabel: 'vs last month' },
    { title: 'Pending Payments', value: '₹1,28,000', icon: CreditCard, change: -5, changeLabel: 'vs last month' },
    { title: 'Overdue Payments', value: '₹38,500', icon: AlertTriangle, change: -12, changeLabel: 'vs last month' },
    { title: 'Net Profit', value: '₹2,84,000', icon: TrendingUp, change: 18, changeLabel: 'vs last month' },
]

const recentActivity = [
    { id: 1, text: 'New lead created — Ramesh Kumar', time: '5 min ago' },
    { id: 2, text: 'Payment received — ₹25,000 from Suresh Patel', time: '32 min ago' },
    { id: 3, text: 'Case #142 moved to Settlement stage', time: '1 hr ago' },
    { id: 4, text: 'Document uploaded — Loan Statement for Priya Sharma', time: '2 hrs ago' },
    { id: 5, text: 'Fee invoice generated — ₹5,000 for Case #138', time: '3 hrs ago' },
]

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="flex gap-2">
                    <Link to="/leads/new" className={cn(buttonVariants({ size: 'sm' }))}>
                        <Plus className="mr-1 h-4 w-4" />
                        Add Lead
                    </Link>
                    <Link to="/cases" className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}>
                        Create Case
                    </Link>
                    <Link to="/payments/new" className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}>
                        Record Payment
                    </Link>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((s) => (
                    <StatCard key={s.title} {...s} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Lead Conversion Funnel</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartPlaceholder title="Lead Conversion Funnel" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Revenue vs Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartPlaceholder title="Revenue vs Expenses (Bar)" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Case Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartPlaceholder title="Case Status (Pie)" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Monthly Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartPlaceholder title="Monthly Trend (Line)" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {recentActivity.map((a) => (
                                <li key={a.id} className="flex items-center justify-between text-sm">
                                    <span>{a.text}</span>
                                    <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <TodayReminders />
            </div>
        </div>
    )
}
