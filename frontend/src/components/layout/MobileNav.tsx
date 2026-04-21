import { NavLink } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useBranding } from '@/lib/branding-context'
import { navGroups } from '@/lib/nav-config'
import { cn } from '@/lib/utils'

const currentRole = 'admin'

interface MobileNavProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
    const { companyName, logoUrl } = useBranding()

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="flex h-14 flex-row items-center gap-2 border-b border-border px-4">
                    <img
                        src={logoUrl}
                        alt={companyName}
                        className="h-8 w-8 rounded"
                        onError={(e) => {
                            ; (e.target as HTMLImageElement).style.display = 'none'
                        }}
                    />
                    <SheetTitle className="text-base font-semibold">{companyName}</SheetTitle>
                </SheetHeader>

                <ScrollArea className="h-[calc(100vh-3.5rem)]">
                    <div className="py-2">
                        {navGroups.map((group) => {
                            const visibleItems = group.items.filter(
                                (item) => !item.roles || item.roles.includes(currentRole)
                            )
                            if (visibleItems.length === 0) return null

                            return (
                                <div key={group.label} className="mb-2">
                                    <p className="px-4 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        {group.label}
                                    </p>
                                    {visibleItems.map((item) => {
                                        const Icon = item.icon
                                        return (
                                            <div key={item.href} className="px-2">
                                                <NavLink
                                                    to={item.href}
                                                    end={item.href === '/'}
                                                    onClick={() => onOpenChange(false)}
                                                    className={({ isActive }) =>
                                                        cn(
                                                            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                                            isActive
                                                                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                                                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                                                        )
                                                    }
                                                >
                                                    <Icon className="h-4 w-4 shrink-0" />
                                                    <span>{item.label}</span>
                                                </NavLink>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
