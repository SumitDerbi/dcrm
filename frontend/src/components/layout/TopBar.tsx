import { useBranding } from '@/lib/branding-context'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Bell, Menu, LogOut } from 'lucide-react'

interface TopBarProps {
    onMenuClick: () => void
    sidebarCollapsed: boolean
}

export function TopBar({ onMenuClick }: TopBarProps) {
    const { companyName } = useBranding()

    return (
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Left: hamburger (mobile) + company name (mobile) */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="md:hidden"
                >
                    <Menu className="h-5 w-5" />
                </Button>
                <span className="text-base font-semibold md:hidden">{companyName}</span>
            </div>

            {/* Right: notifications + user */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
                </Button>

                <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="text-xs">AD</AvatarFallback>
                </Avatar>

                <Button variant="ghost" size="icon">
                    <LogOut className="h-4 w-4" />
                </Button>
            </div>
        </header>
    )
}
