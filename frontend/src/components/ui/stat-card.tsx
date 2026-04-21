import { Card, CardContent } from '@/components/ui/card'
import { ArrowUp, ArrowDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StatCardColor = 'blue' | 'violet' | 'emerald' | 'amber' | 'rose' | 'teal'

const colorVariants: Record<StatCardColor, { topBorder: string; iconBg: string; iconColor: string }> = {
    blue:    { topBorder: 'border-t-2 border-t-blue-500',    iconBg: 'bg-blue-100 dark:bg-blue-900/30',    iconColor: 'text-blue-600 dark:text-blue-400'    },
    violet:  { topBorder: 'border-t-2 border-t-violet-500',  iconBg: 'bg-violet-100 dark:bg-violet-900/30',  iconColor: 'text-violet-600 dark:text-violet-400'  },
    emerald: { topBorder: 'border-t-2 border-t-emerald-500', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400' },
    amber:   { topBorder: 'border-t-2 border-t-amber-500',   iconBg: 'bg-amber-100 dark:bg-amber-900/30',   iconColor: 'text-amber-600 dark:text-amber-400'   },
    rose:    { topBorder: 'border-t-2 border-t-rose-500',    iconBg: 'bg-rose-100 dark:bg-rose-900/30',    iconColor: 'text-rose-600 dark:text-rose-400'    },
    teal:    { topBorder: 'border-t-2 border-t-teal-500',    iconBg: 'bg-teal-100 dark:bg-teal-900/30',    iconColor: 'text-teal-600 dark:text-teal-400'    },
}

interface StatCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    change?: number
    changeLabel?: string
    color?: StatCardColor
    className?: string
}

export function StatCard({
    title,
    value,
    icon: Icon,
    change,
    changeLabel,
    color = 'blue',
    className,
}: StatCardProps) {
    const isPositive = change !== undefined && change >= 0
    const palette = colorVariants[color]

    return (
        <Card className={cn('overflow-hidden', palette.topBorder, className)}>
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
                            <span className={cn('font-medium', isPositive ? 'text-emerald-600' : 'text-destructive')}>
                                {Math.abs(change)}%
                            </span>
                            {changeLabel && <span className="text-muted-foreground">{changeLabel}</span>}
                        </div>
                    )}
                </div>
                <div className={cn('rounded-xl p-3', palette.iconBg)}>
                    <Icon className={cn('h-5 w-5', palette.iconColor)} />
                </div>
            </CardContent>
        </Card>
    )
}
