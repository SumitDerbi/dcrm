import { Card, CardContent } from '@/components/ui/card'
import { ArrowUp, ArrowDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    change?: number // percentage, positive = up, negative = down
    changeLabel?: string
    className?: string
}

export function StatCard({
    title,
    value,
    icon: Icon,
    change,
    changeLabel,
    className,
}: StatCardProps) {
    const isPositive = change !== undefined && change >= 0

    return (
        <Card className={cn('', className)}>
            <CardContent className="flex items-start justify-between pt-6">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                    {change !== undefined && (
                        <div className="flex items-center gap-1 text-xs">
                            {isPositive ? (
                                <ArrowUp className="h-3 w-3 text-emerald-600" />
                            ) : (
                                <ArrowDown className="h-3 w-3 text-destructive" />
                            )}
                            <span
                                className={cn(
                                    'font-medium',
                                    isPositive ? 'text-emerald-600' : 'text-destructive'
                                )}
                            >
                                {Math.abs(change)}%
                            </span>
                            {changeLabel && (
                                <span className="text-muted-foreground">{changeLabel}</span>
                            )}
                        </div>
                    )}
                </div>
                <div className="rounded-lg bg-primary/10 p-2.5">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
            </CardContent>
        </Card>
    )
}
