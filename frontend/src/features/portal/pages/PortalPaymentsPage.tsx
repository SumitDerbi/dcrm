import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { ReceiptPreview } from '@/features/payments/components/ReceiptPreview'
import { paymentModeColors, paymentStatusColors, type Payment } from '@/features/payments/data/mock-payments'
import { formatCurrency, formatDate, getPortalPayments } from '../data/mock-portal'

export default function PortalPaymentsPage() {
    const payments = getPortalPayments()
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
    const [open, setOpen] = useState(false)
    const totalPaid = payments.filter((payment) => payment.status === 'Paid').reduce((sum, payment) => sum + payment.amount, 0)
    const totalPending = payments.filter((payment) => payment.status !== 'Paid').reduce((sum, payment) => sum + payment.amount, 0)

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Payment History</h1>
                <p className="text-muted-foreground">View receipts and track paid versus pending installments.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">Total Paid</p>
                        <p className="text-lg font-bold text-green-600">{formatCurrency(totalPaid)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">Pending</p>
                        <p className="text-lg font-bold text-orange-600">{formatCurrency(totalPending)}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="hidden md:table-cell">Mode</TableHead>
                            <TableHead className="hidden md:table-cell">Receipt #</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                                <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Badge className={cn('text-xs', paymentModeColors[payment.paymentMode])}>{payment.paymentMode}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{payment.receiptNumber}</TableCell>
                                <TableCell>
                                    <Badge className={cn('text-xs', paymentStatusColors[payment.status])}>{payment.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedPayment(payment)
                                            setOpen(true)
                                        }}
                                    >
                                        View Receipt
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <ReceiptPreview payment={selectedPayment} open={open} onOpenChange={setOpen} />
        </div>
    )
}