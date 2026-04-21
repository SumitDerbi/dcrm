import { NavLink } from 'react-router-dom'
import { useBranding } from '@/lib/branding-context'
import { navGroups } from '@/lib/nav-config'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock current role — will be replaced by auth context later
const currentRole = 'admin'

interface SidebarProps {
    collapsed: boolean
    onToggleCollapse: () => void
    className?: string
}

export function Sidebar({ collapsed, onToggleCollapse, className }: SidebarProps) {
    const { companyName, logoUrl } = useBranding()

    return (
        <aside
            className={cn(
                'fixed inset-y-0 left-0 z-30 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200',
                collapsed ? 'w-16' : 'w-60',
                className
            )}
        >
            {/* Logo / Brand */}
            <div className="flex h-14 items-center gap-2 border-b border-sidebar-border bg-sidebar-accent/30 px-3">
                <img
                    src={logoUrl}
                    alt={companyName}
                    className="h-8 w-8 shrink-0 rounded"
                    onError={(e) => {
                        ; (e.target as HTMLImageElement).style.display = 'none'
                    }}
                />
                {!collapsed && (
                    <span className="truncate text-base font-semibold text-sidebar-foreground tracking-tight">
                        {companyName}
                    </span>
                )}
            </div>

            {/* Nav links */}
            <ScrollArea className="flex-1 py-2">
                {navGroups.map((group) => {
                    const visibleItems = group.items.filter(
                        (item) => !item.roles || item.roles.includes(currentRole)
                    )
                    if (visibleItems.length === 0) return null

                    return (
                        <div key={group.label} className="mb-2">
                            {!collapsed && (
                                <p className="px-4 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    {group.label}
                                </p>
                            )}
                            {collapsed && <Separator className="mx-2 my-1" />}
                            {visibleItems.map((item) => {
                                const Icon = item.icon
                                const link = (
                                    <NavLink
                                        key={item.href}
                                        to={item.href}
                                        end={item.href === '/'}
                                        className={({ isActive }) =>
                                            cn(
                                                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors border-l-2',
                                                collapsed && 'justify-center px-0',
                                                isActive
                                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-sidebar-primary'
                                                    : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground border-l-transparent'
                                            )
                                        }
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        {!collapsed && <span className="truncate">{item.label}</span>}
                                    </NavLink>
                                )

                                if (collapsed) {
                                    return (
                                        <Tooltip key={item.href}>
                                            <TooltipTrigger>
                                                <div className="px-2">{link}</div>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">{item.label}</TooltipContent>
                                        </Tooltip>
                                    )
                                }

                                return (
                                    <div key={item.href} className="px-2">
                                        {link}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </ScrollArea>

            {/* Collapse toggle */}
            <button
                onClick={onToggleCollapse}
                className="flex h-10 items-center justify-center border-t border-sidebar-border text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
                {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            </button>
        </aside>
    )
}
