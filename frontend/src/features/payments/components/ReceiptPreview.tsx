import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'
import { formatCurrency, numberToWords, type Payment } from '../data/mock-payments'

interface ReceiptPreviewProps {
    payment: Payment | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function ReceiptPreview({ payment, open, onOpenChange }: ReceiptPreviewProps) {
    if (!payment) return null

    function handlePrint() {
        window.print()
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Payment Receipt</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6 print:m-0">
                    {/* Receipt content */}
                    <div className="rounded-lg border p-6 space-y-5 bg-white dark:bg-card print:border-none print:shadow-none">
                        {/* Company header */}
                        <div className="text-center border-b pb-4">
                            <h2 className="text-xl font-bold text-primary">DCRM Financial Services</h2>
                            <p className="text-xs text-muted-foreground mt-1">
                                Debt Counselling & Resolution Management
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Mumbai, Maharashtra — contact@dcrm.in
                            </p>
                        </div>

                        {/* Receipt meta */}
                        <div className="flex justify-between text-sm">
                            <div>
                                <p className="font-semibold">Receipt No:</p>
                                <p className="text-lg font-bold">{payment.receiptNumber}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-muted-foreground">Date</p>
                                <p className="font-medium">{formatDate(payment.paymentDate)}</p>
                            </div>
                        </div>

                        {/* Customer */}
                        <div className="text-sm border-t pt-3">
                            <p className="text-muted-foreground">Received from:</p>
                            <p className="font-semibold text-base">{payment.customerName}</p>
                            <p className="text-muted-foreground">Case: {payment.caseNumber}</p>
                        </div>

                        {/* Amount */}
                        <div className="rounded-md bg-muted/50 p-4 text-center border">
                            <p className="text-sm text-muted-foreground">Amount Received</p>
                            <p className="text-2xl font-bold text-primary mt-1">{formatCurrency(payment.amount)}</p>
                            <p className="text-xs text-muted-foreground mt-1 italic">
                                ({numberToWords(payment.amount)})
                            </p>
                        </div>

                        {/* Payment details */}
                        <div className="space-y-2 text-sm border-t pt-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Payment Mode</span>
                                <span className="font-medium">{payment.paymentMode}</span>
                            </div>
                            {payment.referenceNumber && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Reference No.</span>
                                    <span className="font-medium">{payment.referenceNumber}</span>
                                </div>
                            )}
                            {payment.notes && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Notes</span>
                                    <span className="text-right max-w-[200px]">{payment.notes}</span>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="text-center text-xs text-muted-foreground border-t pt-4 space-y-1">
                            <p>Thank you for your payment.</p>
                            <p>This is a computer-generated receipt. No signature required.</p>
                        </div>
                    </div>

                    {/* Print button */}
                    <div className="flex gap-2 print:hidden">
                        <Button onClick={handlePrint} className="gap-1">
                            <Printer className="size-3.5" /> Print / Download
                        </Button>
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
