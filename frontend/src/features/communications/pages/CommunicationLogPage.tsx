import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MessageSquare, Phone, Search, Send, PhoneCall, ChevronLeft, ChevronRight, X, MessageCircle } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { mockCustomers } from '@/features/customers/data/mock-customers'
import { CallLogForm } from '../components/CallLogForm'
import { SendMessageForm } from '../components/SendMessageForm'
import {
    callOutcomeColors,
    channelColors,
    formatDateTime,
    messageStatusColors,
    mockCallLogs,
    mockMessageLogs,
    type MessageChannel,
} from '../data/mock-communications'

const PAGE_SIZE = 10

type TabValue = 'All' | 'Calls' | 'SMS' | 'Email' | 'WhatsApp'

function channelIcon(channel: TabValue | MessageChannel | 'Call') {
    if (channel === 'Call' || channel === 'Calls') return <Phone className="size-4" />
    if (channel === 'SMS') return <MessageSquare className="size-4" />
    if (channel === 'Email') return <Mail className="size-4" />
    return <MessageCircle className="size-4" />
}

export default function CommunicationLogPage() {
    const [tab, setTab] = useState<TabValue>('All')
    const [search, setSearch] = useState('')
    const [channelFilter, setChannelFilter] = useState<'all' | MessageChannel | 'Call'>('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [customerFilter, setCustomerFilter] = useState('all')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [page, setPage] = useState(1)
    const [callOpen, setCallOpen] = useState(false)
    const [messageOpen, setMessageOpen] = useState(false)

    const rows = useMemo(() => {
        const callRows = mockCallLogs.map((call) => ({
            id: `call-${call.id}`,
            date: call.calledAt,
            customerId: call.customerId,
            customerName: call.customerName,
            channel: 'Call' as const,
            summary: `${call.direction} · ${call.duration} min`,
            status: call.outcome,
            by: call.calledBy,
            content: `${call.customerName} ${call.notes}`.toLowerCase(),
        }))

        const messageRows = mockMessageLogs.map((message) => ({
            id: `msg-${message.id}`,
            date: message.sentAt,
            customerId: message.customerId,
            customerName: message.customerName,
            channel: message.channel,
            summary: message.channel === 'Email' ? message.subject : message.bodySnippet,
            status: message.status,
            by: message.sentBy,
            content: `${message.customerName} ${message.subject} ${message.bodySnippet}`.toLowerCase(),
        }))

        return [...callRows, ...messageRows].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }, [])

    const filtered = useMemo(() => {
        let result = [...rows]
        if (tab === 'Calls') result = result.filter((row) => row.channel === 'Call')
        if (tab === 'SMS') result = result.filter((row) => row.channel === 'SMS')
        if (tab === 'Email') result = result.filter((row) => row.channel === 'Email')
        if (tab === 'WhatsApp') result = result.filter((row) => row.channel === 'WhatsApp')
        if (search) {
            const query = search.toLowerCase()
            result = result.filter((row) => row.content.includes(query))
        }
        if (channelFilter !== 'all') result = result.filter((row) => row.channel === channelFilter)
        if (statusFilter !== 'all') result = result.filter((row) => row.status === statusFilter)
        if (customerFilter !== 'all') result = result.filter((row) => String(row.customerId) === customerFilter)
        if (fromDate) result = result.filter((row) => row.date.slice(0, 10) >= fromDate)
        if (toDate) result = result.filter((row) => row.date.slice(0, 10) <= toDate)
        return result
    }, [channelFilter, customerFilter, fromDate, rows, search, statusFilter, tab, toDate])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
    const hasFilters = !!search || channelFilter !== 'all' || statusFilter !== 'all' || customerFilter !== 'all' || !!fromDate || !!toDate

    function clearFilters() {
        setSearch('')
        setChannelFilter('all')
        setStatusFilter('all')
        setCustomerFilter('all')
        setFromDate('')
        setToDate('')
        setPage(1)
    }

    const tabs: TabValue[] = ['All', 'Calls', 'SMS', 'Email', 'WhatsApp']

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Communications</h1>
                    <p className="text-sm text-muted-foreground">Calls, messages, and templates in one place</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" className="gap-1" onClick={() => setCallOpen(true)}>
                        <PhoneCall className="size-3.5" /> Log Call
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => setMessageOpen(true)}>
                        <Send className="size-3.5" /> Send Message
                    </Button>
                    <Link to="/communications/templates" className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}>
                        Templates
                    </Link>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Logs</p><p className="text-lg font-bold">{rows.length}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Calls</p><p className="text-lg font-bold">{mockCallLogs.length}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Messages</p><p className="text-lg font-bold">{mockMessageLogs.length}</p></CardContent></Card>
            </div>

            <div className="inline-flex flex-wrap rounded-lg border p-1">
                {tabs.map((tabValue) => (
                    <Button
                        key={tabValue}
                        type="button"
                        size="sm"
                        variant={tab === tabValue ? 'default' : 'ghost'}
                        className="gap-1"
                        onClick={() => { setTab(tabValue); setPage(1) }}
                    >
                        {channelIcon(tabValue)} {tabValue}
                    </Button>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-50 max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder="Search customer or content..." className="pl-8" />
                </div>
                <Select value={channelFilter} onValueChange={(value) => { setChannelFilter((value ?? 'all') as 'all' | MessageChannel | 'Call'); setPage(1) }}>
                    <SelectTrigger className="w-35"><SelectValue placeholder="Channel" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Channels</SelectItem>
                        <SelectItem value="Call">Call</SelectItem>
                        <SelectItem value="SMS">SMS</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value ?? 'all'); setPage(1) }}>
                    <SelectTrigger className="w-37.5"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Connected">Connected</SelectItem>
                        <SelectItem value="No Answer">No Answer</SelectItem>
                        <SelectItem value="Busy">Busy</SelectItem>
                        <SelectItem value="Voicemail">Voicemail</SelectItem>
                        <SelectItem value="Sent">Sent</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={customerFilter} onValueChange={(value) => { setCustomerFilter(value ?? 'all'); setPage(1) }}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="Customer" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        {mockCustomers.map((customer) => <SelectItem key={customer.id} value={String(customer.id)}>{customer.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Input type="date" value={fromDate} onChange={(e) => { setFromDate(e.target.value); setPage(1) }} className="w-40" />
                <Input type="date" value={toDate} onChange={(e) => { setToDate(e.target.value); setPage(1) }} className="w-40" />
                {hasFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1"><X className="size-3.5" /> Clear</Button>
                )}
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Channel</TableHead>
                            <TableHead>Direction / Subject</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">By</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow><TableCell colSpan={7} className="h-24 text-center text-muted-foreground">No communication logs found.</TableCell></TableRow>
                        ) : paginated.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="text-sm">{formatDateTime(row.date)}</TableCell>
                                <TableCell className="font-medium">{row.customerName}</TableCell>
                                <TableCell>
                                    {row.channel === 'Call' ? (
                                        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">{channelIcon('Call')} Call</Badge>
                                    ) : (
                                        <Badge className={cn('gap-1 text-xs', channelColors[row.channel])}>{channelIcon(row.channel)} {row.channel}</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="max-w-70 truncate">{row.summary}</TableCell>
                                <TableCell>
                                    <Badge className={cn('text-xs', row.channel === 'Call' ? callOutcomeColors[row.status as keyof typeof callOutcomeColors] : messageStatusColors[row.status as keyof typeof messageStatusColors])}>
                                        {row.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{row.by}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Showing {(safePage - 1) * PAGE_SIZE + 1}-{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}</p>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon-sm" disabled={safePage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}><ChevronLeft className="size-4" /></Button>
                        <Button variant="outline" size="sm" disabled>{safePage} / {totalPages}</Button>
                        <Button variant="outline" size="icon-sm" disabled={safePage >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}><ChevronRight className="size-4" /></Button>
                    </div>
                </div>
            )}

            <Sheet open={callOpen} onOpenChange={setCallOpen}>
                <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
                    <SheetHeader><SheetTitle>Log Call</SheetTitle></SheetHeader>
                    <CallLogForm onClose={() => setCallOpen(false)} />
                </SheetContent>
            </Sheet>

            <Sheet open={messageOpen} onOpenChange={setMessageOpen}>
                <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
                    <SheetHeader><SheetTitle>Send Message</SheetTitle></SheetHeader>
                    <SendMessageForm onClose={() => setMessageOpen(false)} />
                </SheetContent>
            </Sheet>
        </div>
    )
}