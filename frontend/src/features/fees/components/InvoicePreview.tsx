import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'
import { formatCurrency, type FeeAssignment } from '../data/mock-fees'

interface InvoicePreviewProps {
    assignment: FeeAssignment | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function InvoicePreview({ assignment, open, onOpenChange }: InvoicePreviewProps) {
    if (!assignment) return null

    const invoiceNumber = `INV-${String(assignment.id).padStart(4, '0')}`
    const invoiceDate = formatDate(new Date().toISOString())

    function handlePrint() {
        window.print()
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Invoice Preview</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6 print:m-0">
                    {/* Invoice content */}
                    <div className="rounded-lg border p-6 space-y-6 bg-white dark:bg-card print:border-none print:shadow-none">
                        {/* Company header */}
                        <div className="text-center border-b pb-4">
                            <h2 className="text-xl font-bold text-primary">DCRM Financial Services</h2>
                            <p className="text-xs text-muted-foreground mt-1">
                                Debt Counselling & Resolution Management
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Mumbai, Maharashtra — contact@dcrm.in — +91 22 4000 1234
                            </p>
                        </div>

                        {/* Invoice meta */}
                        <div className="flex justify-between text-sm">
                            <div>
                                <p className="font-semibold">Bill To:</p>
                                <p>{assignment.customerName}</p>
                                <p className="text-muted-foreground">Case: {assignment.caseNumber}</p>
                            </div>
                            <div className="text-right">
                                <p><span className="text-muted-foreground">Invoice #:</span> {invoiceNumber}</p>
                                <p><span className="text-muted-foreground">Date:</span> {invoiceDate}</p>
                                <p><span className="text-muted-foreground">Plan:</span> {assignment.feePlanName}</p>
                            </div>
                        </div>

                        {/* Line items */}
                        <div className="border rounded-md overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-muted/50">
                                        <th className="text-left p-2 font-medium">Description</th>
                                        <th className="text-right p-2 font-medium">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignment.installments.map((inst, i) => (
                                        <tr key={inst.id} className="border-t">
                                            <td className="p-2">
                                                Installment {i + 1} — Due {formatDate(inst.dueDate)}
                                                {inst.status === 'Paid' && (
                                                    <span className="ml-2 text-xs text-green-600">(Paid)</span>
                                                )}
                                            </td>
                                            <td className="p-2 text-right">{formatCurrency(inst.amount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="space-y-1 text-sm border-t pt-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Fee</span>
                                <span className="font-medium">{formatCurrency(assignment.totalFee)}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Amount Paid</span>
                                <span className="font-medium">- {formatCurrency(assignment.paidAmount)}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 text-base font-bold">
                                <span>Balance Due</span>
                                <span className="text-orange-600">{formatCurrency(assignment.pendingAmount)}</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center text-xs text-muted-foreground border-t pt-4">
                            <p>Thank you for choosing DCRM Financial Services.</p>
                            <p>This is a computer-generated invoice. No signature required.</p>
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
