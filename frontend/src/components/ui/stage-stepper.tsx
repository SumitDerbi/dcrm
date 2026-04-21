import { cn } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'

interface StageStepperProps {
    stages: string[]
    currentStage: string
}

export function StageStepper({ stages, currentStage }: StageStepperProps) {
    const currentIndex = stages.indexOf(currentStage)

    return (
        <>
            {/* Horizontal on md+ */}
            <div className="hidden md:flex items-center">
                {stages.map((stage, i) => {
                    const isCompleted = i < currentIndex
                    const isCurrent = i === currentIndex
                    return (
                        <div key={stage} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-1">
                                <div
                                    className={cn(
                                        'flex size-8 items-center justify-center rounded-full border-2 transition-colors',
                                        isCompleted && 'border-green-500 bg-green-500 text-white',
                                        isCurrent && 'border-primary bg-primary/10',
                                        !isCompleted && !isCurrent && 'border-muted-foreground/30 bg-muted',
                                    )}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 className="size-4" />
                                    ) : isCurrent ? (
                                        <span className="size-2.5 rounded-full bg-primary animate-pulse" />
                                    ) : (
                                        <span className="size-2 rounded-full bg-muted-foreground/40" />
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        'text-[10px] text-center max-w-[80px] leading-tight',
                                        isCurrent && 'font-semibold text-primary',
                                        isCompleted && 'text-green-600 dark:text-green-400',
                                        !isCompleted && !isCurrent && 'text-muted-foreground',
                                    )}
                                >
                                    {stage}
                                </span>
                            </div>
                            {i < stages.length - 1 && (
                                <div
                                    className={cn(
                                        'flex-1 h-0.5 mx-1.5 mt-[-18px]',
                                        i < currentIndex ? 'bg-green-500' : 'bg-muted-foreground/20',
                                    )}
                                />
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Vertical on mobile */}
            <div className="md:hidden space-y-0">
                {stages.map((stage, i) => {
                    const isCompleted = i < currentIndex
                    const isCurrent = i === currentIndex
                    return (
                        <div key={stage} className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                                <div
                                    className={cn(
                                        'flex size-6 items-center justify-center rounded-full border-2 shrink-0',
                                        isCompleted && 'border-green-500 bg-green-500 text-white',
                                        isCurrent && 'border-primary bg-primary/10',
                                        !isCompleted && !isCurrent && 'border-muted-foreground/30 bg-muted',
                                    )}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 className="size-3" />
                                    ) : isCurrent ? (
                                        <span className="size-2 rounded-full bg-primary animate-pulse" />
                                    ) : (
                                        <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                                    )}
                                </div>
                                {i < stages.length - 1 && (
                                    <div
                                        className={cn(
                                            'w-0.5 h-6',
                                            i < currentIndex ? 'bg-green-500' : 'bg-muted-foreground/20',
                                        )}
                                    />
                                )}
                            </div>
                            <span
                                className={cn(
                                    'text-sm pt-0.5',
                                    isCurrent && 'font-semibold text-primary',
                                    isCompleted && 'text-green-600 dark:text-green-400',
                                    !isCompleted && !isCurrent && 'text-muted-foreground',
                                )}
                            >
                                {stage}
                            </span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
