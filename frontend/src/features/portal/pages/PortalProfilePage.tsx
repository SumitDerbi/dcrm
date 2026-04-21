import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPortalCustomer, formatDate } from '../data/mock-portal'

export default function PortalProfilePage() {
    const customer = getPortalCustomer()
    const [requested, setRequested] = useState(false)

    if (!customer) {
        return <p className="text-muted-foreground">Profile not found.</p>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">Read-only profile information linked to your account.</p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-base">Profile Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 text-sm">
                    <div><p className="text-muted-foreground">Name</p><p className="font-medium">{customer.name}</p></div>
                    <div><p className="text-muted-foreground">Phone</p><p className="font-medium">{customer.phone}</p></div>
                    <div><p className="text-muted-foreground">Email</p><p className="font-medium">{customer.email}</p></div>
                    <div><p className="text-muted-foreground">City</p><p className="font-medium">{customer.city}</p></div>
                    <div><p className="text-muted-foreground">Date of Birth</p><p className="font-medium">{formatDate(customer.dateOfBirth)}</p></div>
                    <div><p className="text-muted-foreground">Customer Since</p><p className="font-medium">{formatDate(customer.createdAt)}</p></div>
                </CardContent>
            </Card>

            <div className="space-y-3">
                <Button onClick={() => setRequested(true)}>Request Profile Update</Button>
                {requested && (
                    <p className="text-sm text-green-600">Your profile update request has been noted. Our team will contact you.</p>
                )}
            </div>
        </div>
    )
}