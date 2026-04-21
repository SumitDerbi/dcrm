import { cn } from '@/lib/utils'
import { BarChart3 } from 'lucide-react'

interface ChartPlaceholderProps {
    title: string
    className?: string
    height?: string
}

export function ChartPlaceholder({
    title,
    className,
    height = 'h-64',
}: ChartPlaceholderProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30',
                height,
                className
            )}
        >
            <BarChart3 className="mb-2 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-xs text-muted-foreground/60">Chart coming soon</p>
        </div>
    )
}
