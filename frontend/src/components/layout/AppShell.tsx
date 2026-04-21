import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { MobileNav } from './MobileNav'

export function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="relative min-h-screen bg-background">
            {/* Desktop/Tablet sidebar */}
            <Sidebar
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed((c) => !c)}
                className="hidden md:flex"
            />

            {/* Mobile slide-out drawer */}
            <MobileNav open={sidebarOpen} onOpenChange={setSidebarOpen} />

            {/* Main content */}
            <div
                className={`transition-all duration-200 ${collapsed ? 'md:ml-16' : 'md:ml-60'
                    }`}
            >
                <TopBar
                    onMenuClick={() => setSidebarOpen(true)}
                    sidebarCollapsed={collapsed}
                />
                <main className="p-4 lg:p-6">{children}</main>
            </div>
        </div>
    )
}
