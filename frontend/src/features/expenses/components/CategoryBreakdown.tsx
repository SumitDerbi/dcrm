import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import {
    type ExpenseCategory,
    type Expense,
    expenseCategories,
    categoryChartColors,
    formatCurrency,
} from '../data/mock-expenses'

interface CategoryBreakdownProps {
    expenses: Expense[]
    activeCategory: ExpenseCategory | null
    onCategoryClick: (category: ExpenseCategory | null) => void
}

export function CategoryBreakdown({
    expenses,
    activeCategory,
    onCategoryClick,
}: CategoryBreakdownProps) {
    const breakdown = useMemo(() => {
        const totals = new Map<ExpenseCategory, number>()
        for (const e of expenses) {
            totals.set(e.category, (totals.get(e.category) ?? 0) + e.amount)
        }
        const grandTotal = expenses.reduce((s, e) => s + e.amount, 0)
        return expenseCategories
            .map((cat) => ({
                category: cat,
                amount: totals.get(cat) ?? 0,
                pct: grandTotal > 0 ? ((totals.get(cat) ?? 0) / grandTotal) * 100 : 0,
                color: categoryChartColors[cat],
            }))
            .filter((b) => b.amount > 0)
            .sort((a, b) => b.amount - a.amount)
    }, [expenses])

    const grandTotal = expenses.reduce((s, e) => s + e.amount, 0)

    if (breakdown.length === 0) return null

    return (
        <div className="space-y-3">
            {/* Stacked horizontal bar */}
            <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted">
                {breakdown.map((b) => (
                    <button
                        key={b.category}
                        type="button"
                        className={cn(
                            'h-full transition-opacity',
                            activeCategory && activeCategory !== b.category && 'opacity-30',
                        )}
                        style={{ width: `${b.pct}%`, backgroundColor: b.color }}
                        onClick={() =>
                            onCategoryClick(activeCategory === b.category ? null : b.category)
                        }
                        title={`${b.category}: ${formatCurrency(b.amount)} (${b.pct.toFixed(1)}%)`}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                {breakdown.map((b) => (
                    <button
                        key={b.category}
                        type="button"
                        className={cn(
                            'flex items-center gap-1.5 rounded px-1.5 py-0.5 transition-colors hover:bg-muted',
                            activeCategory === b.category && 'bg-muted ring-1 ring-primary',
                            activeCategory && activeCategory !== b.category && 'opacity-50',
                        )}
                        onClick={() =>
                            onCategoryClick(activeCategory === b.category ? null : b.category)
                        }
                    >
                        <span
                            className="inline-block size-2.5 rounded-full"
                            style={{ backgroundColor: b.color }}
                        />
                        <span>{b.category}</span>
                        <span className="text-muted-foreground">
                            {formatCurrency(b.amount)} ({b.pct.toFixed(0)}%)
                        </span>
                    </button>
                ))}
            </div>

            <p className="text-xs text-muted-foreground">
                Total: {formatCurrency(grandTotal)} · Click a category to filter
            </p>
        </div>
    )
}
