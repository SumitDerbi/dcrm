import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Menu, LogOut, Bell, User } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useBranding } from '@/lib/branding-context'
import { getPortalCustomer } from '../data/mock-portal'

const navItems = [
    { to: '/portal', label: 'Dashboard', end: true },
    { to: '/portal/cases', label: 'My Cases' },
    { to: '/portal/payments', label: 'Payments' },
    { to: '/portal/documents', label: 'Documents' },
    { to: '/portal/notifications', label: 'Notifications' },
    { to: '/portal/profile', label: 'Profile' },
]

export default function PortalLayout() {
    const { companyName, logoUrl } = useBranding()
    const customer = getPortalCustomer()
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_40%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.45))]">
            <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border p-2 lg:hidden"
                            onClick={() => setMobileOpen((current) => !current)}
                            aria-label="Toggle portal navigation"
                        >
                            <Menu className="size-4" />
                        </button>
                        <div className="flex items-center gap-2">
                            <img
                                src={logoUrl}
                                alt={companyName}
                                className="h-9 w-9 rounded-lg border bg-white object-contain p-1"
                                onError={(event) => {
                                    ; (event.target as HTMLImageElement).style.display = 'none'
                                }}
                            />
                            <div>
                                <p className="text-sm font-semibold">{companyName}</p>
                                <p className="text-xs text-muted-foreground">Customer Portal</p>
                            </div>
                        </div>
                    </div>

                    <nav className="hidden items-center gap-1 lg:flex">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    cn(
                                        'rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground',
                                        isActive && 'bg-primary/10 text-primary',
                                    )
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <div className="hidden items-center gap-2 rounded-full border bg-background px-3 py-1.5 sm:flex">
                            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <User className="size-4" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium">{customer?.name ?? 'Customer'}</p>
                                <p className="text-xs text-muted-foreground">Secure access</p>
                            </div>
                        </div>
                        <NavLink
                            to="/portal/notifications"
                            aria-label="Notifications"
                            className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), 'hidden sm:inline-flex')}
                        >
                            <Bell className="size-4" />
                        </NavLink>
                        <NavLink to="/login" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1')}>
                            <LogOut className="size-3.5" /> Logout
                        </NavLink>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="border-t bg-background lg:hidden">
                        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.end}
                                    onClick={() => setMobileOpen(false)}
                                    className={({ isActive }) =>
                                        cn(
                                            'rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground',
                                            isActive && 'bg-primary/10 text-primary',
                                        )
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            <main className="mx-auto max-w-6xl p-4 lg:p-6">
                <Outlet />
            </main>
        </div>
    )
}