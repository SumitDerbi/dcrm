import { Bell, CheckCircle2, CreditCard, FileCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDateTime, portalNotifications } from '../data/mock-portal'

function notificationIcon(type: string) {
    if (type === 'document') return <FileCheck className="size-4 text-blue-600" />
    if (type === 'payment') return <CreditCard className="size-4 text-green-600" />
    if (type === 'case') return <CheckCircle2 className="size-4 text-orange-600" />
    return <Bell className="size-4 text-muted-foreground" />
}

export default function PortalNotificationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Notifications</h1>
                <p className="text-muted-foreground">Recent alerts about your documents, payments, and case progress.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Latest Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {portalNotifications.map((notification) => (
                        <div key={notification.id} className="flex items-start justify-between gap-3 rounded-lg border p-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">{notificationIcon(notification.type)}</div>
                                <div>
                                    <p className="text-sm font-medium">{notification.message}</p>
                                    <p className="text-xs text-muted-foreground">{formatDateTime(notification.timestamp)}</p>
                                </div>
                            </div>
                            <Badge variant={notification.read ? 'outline' : 'default'}>
                                {notification.read ? 'Read' : 'Unread'}
                            </Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}