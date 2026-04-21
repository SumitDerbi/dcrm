import {
    LayoutDashboard,
    Users,
    UserPlus,
    Landmark,
    Briefcase,
    FileText,
    IndianRupee,
    CreditCard,
    Receipt,
    BarChart3,
    Building2,
    ListTodo,
    MessageSquare,
    Settings,
    type LucideIcon,
} from 'lucide-react'

export interface NavItem {
    label: string
    href: string
    icon: LucideIcon
    roles?: string[] // if empty, visible to all
}

export interface NavGroup {
    label: string
    items: NavItem[]
}

export const navGroups: NavGroup[] = [
    {
        label: 'Overview',
        items: [
            { label: 'Dashboard', href: '/', icon: LayoutDashboard },
        ],
    },
    {
        label: 'CRM',
        items: [
            { label: 'Leads', href: '/leads', icon: UserPlus },
            { label: 'Customers', href: '/customers', icon: Users },
            { label: 'Loans', href: '/loans', icon: Landmark },
            { label: 'Cases', href: '/cases', icon: Briefcase },
        ],
    },
    {
        label: 'Finance',
        items: [
            { label: 'Fees', href: '/fees', icon: IndianRupee },
            { label: 'Payments', href: '/payments', icon: CreditCard },
            { label: 'Expenses', href: '/expenses', icon: Receipt },
        ],
    },
    {
        label: 'Operations',
        items: [
            { label: 'Documents', href: '/documents', icon: FileText },
            { label: 'Lenders', href: '/lenders', icon: Building2 },
            { label: 'Tasks', href: '/tasks', icon: ListTodo },
            { label: 'Communications', href: '/communications', icon: MessageSquare },
        ],
    },
    {
        label: 'System',
        items: [
            { label: 'Reports', href: '/reports', icon: BarChart3, roles: ['admin', 'manager'] },
            { label: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
        ],
    },
]
