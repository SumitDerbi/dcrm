import { Link } from 'react-router-dom'
import {
    Briefcase,
    IndianRupee,
    TrendingUp,
    CreditCard,
    FileText,
    Upload,
    Bell,
    Clock,
} from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
    formatCurrency,
    formatDateTime,
    getPortalCases,
    getPortalCustomer,
    getPortalRecentUpdates,
    getPortalSummary,
} from '../data/mock-portal'

export default function PortalDashboardPage() {
    const customer = getPortalCustomer()
    const cases = getPortalCases()
    const summary = getPortalSummary()
    const recentUpdates = getPortalRecentUpdates()
    const portalStats = [
        { title: 'My Cases', value: String(cases.length), icon: Briefcase },
        { title: 'Total Debt', value: formatCurrency(summary.totalDebt), icon: IndianRupee },
        {
            title: 'Settlement Progress',
            value: `${Math.round(summary.settlementProgress)}%`,
            icon: TrendingUp,
            change: 10,
            changeLabel: 'this month',
        },
        {
            title: 'Fees Paid / Pending',
            value: `${formatCurrency(summary.totalPaid)} / ${formatCurrency(summary.totalPending)}`,
            icon: CreditCard,
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Hi, {customer?.name.split(' ')[0] ?? 'Customer'} 👋</h1>
                <p className="text-muted-foreground">Here is your case overview and latest updates.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {portalStats.map((s) => (
                    <StatCard key={s.title} {...s} />
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <Link to="/portal/cases" className={cn(buttonVariants({ variant: 'outline' }), 'h-auto flex-col gap-1 py-4')}>
                                <Briefcase className="h-5 w-5" />
                                My Cases
                            </Link>
                            <Link to="/portal/payments" className={cn(buttonVariants({ variant: 'outline' }), 'h-auto flex-col gap-1 py-4')}>
                                <CreditCard className="h-5 w-5" />
                                Payment History
                            </Link>
                            <Link to="/portal/documents" className={cn(buttonVariants({ variant: 'outline' }), 'h-auto flex-col gap-1 py-4')}>
                                <Upload className="h-5 w-5" />
                                Upload Document
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Profile Snapshot</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Phone:</span> {customer?.phone}</p>
                        <p><span className="text-muted-foreground">Email:</span> {customer?.email}</p>
                        <p><span className="text-muted-foreground">City:</span> {customer?.city}</p>
                        <Link to="/portal/profile" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-2')}>
                            View Profile
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Recent Updates</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {recentUpdates.map((u) => (
                            <li key={u.id} className="flex items-start gap-3 text-sm">
                                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                <div className="flex-1">
                                    <p>{u.text}</p>
                                    <p className="text-xs text-muted-foreground">{formatDateTime(u.time)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <div className="grid gap-3 sm:grid-cols-3">
                <Link to="/portal/documents" className={cn(buttonVariants({ variant: 'outline' }), 'h-auto flex-col gap-1 py-4')}>
                    <FileText className="h-5 w-5" />
                    View Documents
                </Link>
                <Link to="/portal/payments" className={cn(buttonVariants({ variant: 'outline' }), 'h-auto flex-col gap-1 py-4')}>
                    <CreditCard className="h-5 w-5" />
                    Payment History
                </Link>
                <Link to="/portal/notifications" className={cn(buttonVariants({ variant: 'outline' }), 'h-auto flex-col gap-1 py-4')}>
                    <Bell className="h-5 w-5" />
                    Notifications
                </Link>
            </div>
        </div>
    )
}
