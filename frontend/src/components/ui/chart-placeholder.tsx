import { cn } from '@/lib/utils'
import { BarChart3, LineChart, PieChart, TrendingUp } from 'lucide-react'

interface ChartPlaceholderProps {
    title: string
    className?: string
    height?: string
    type?: 'bar' | 'line' | 'pie' | 'trend'
}

const typeConfig = {
    bar:   { icon: BarChart3,   color: 'text-blue-400',   bg: 'from-blue-50/80 to-blue-100/40 dark:from-blue-950/30 dark:to-blue-900/10' },
    line:  { icon: LineChart,   color: 'text-emerald-400', bg: 'from-emerald-50/80 to-emerald-100/40 dark:from-emerald-950/30 dark:to-emerald-900/10' },
    pie:   { icon: PieChart,    color: 'text-violet-400',  bg: 'from-violet-50/80 to-violet-100/40 dark:from-violet-950/30 dark:to-violet-900/10' },
    trend: { icon: TrendingUp,  color: 'text-amber-400',   bg: 'from-amber-50/80 to-amber-100/40 dark:from-amber-950/30 dark:to-amber-900/10' },
}

export function ChartPlaceholder({
    title,
    className,
    height = 'h-64',
    type = 'bar',
}: ChartPlaceholderProps) {
    const { icon: Icon, color, bg } = typeConfig[type]

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center rounded-xl border border-dashed bg-gradient-to-br',
                bg,
                height,
                className
            )}
        >
            <Icon className={cn('mb-2 h-9 w-9', color)} />
            <p className="text-sm font-semibold text-foreground/70">{title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Chart — coming in Phase 1</p>
        </div>
    )
}
