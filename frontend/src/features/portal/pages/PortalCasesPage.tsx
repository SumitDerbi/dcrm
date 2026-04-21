import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { StageStepper } from '@/components/ui/stage-stepper'
import { cn } from '@/lib/utils'
import { caseStages } from '@/features/cases/data/mock-cases'
import { getPortalCases, getPortalStageProgress, formatCurrency } from '../data/mock-portal'

export default function PortalCasesPage() {
    const cases = getPortalCases()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">My Cases</h1>
                <p className="text-muted-foreground">Track case progress and settlement updates.</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                {cases.map((taskCase) => (
                    <Card key={taskCase.id} className="overflow-hidden">
                        <CardHeader className="space-y-2">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <CardTitle className="text-base">{taskCase.caseNumber}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{taskCase.stage}</p>
                                </div>
                                <Link to={`/portal/cases/${taskCase.id}`} className={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'gap-1')}>
                                    View <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <StageStepper stages={caseStages} currentStage={taskCase.stage} />
                            <div className="grid gap-3 sm:grid-cols-3 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Total Debt</p>
                                    <p className="font-semibold">{formatCurrency(taskCase.totalDebt)}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Settlement</p>
                                    <p className="font-semibold">
                                        {taskCase.settlementAmount ? formatCurrency(taskCase.settlementAmount) : 'In progress'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Progress</p>
                                    <p className="font-semibold">{Math.round(getPortalStageProgress(taskCase.stage))}%</p>
                                </div>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                <div className="h-full rounded-full bg-primary" style={{ width: `${getPortalStageProgress(taskCase.stage)}%` }} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}