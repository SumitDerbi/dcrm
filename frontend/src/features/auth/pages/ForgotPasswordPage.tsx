import { useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { AuthLayout } from '../components/AuthLayout'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { MailCheck } from 'lucide-react'

const forgotSchema = z.object({
    email: z.string().email('Enter a valid email address'),
})

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [sent, setSent] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const result = forgotSchema.safeParse({ email })
        if (!result.success) {
            setError(result.error.issues[0].message)
            return
        }
        setError('')
        console.log('Send reset link to:', result.data.email)
        setSent(true)
    }

    return (
        <AuthLayout>
            <Card>
                {sent ? (
                    <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
                        <MailCheck className="h-12 w-12 text-primary" />
                        <h2 className="text-lg font-semibold">Check your email</h2>
                        <p className="text-sm text-muted-foreground">
                            We've sent a password reset link to{' '}
                            <span className="font-medium text-foreground">{email}</span>
                        </p>
                        <Link
                            to="/login"
                            className="mt-2 text-sm text-primary hover:underline"
                        >
                            Back to login
                        </Link>
                    </CardContent>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4 pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setError('')
                                    }}
                                />
                                {error && (
                                    <p className="text-sm text-destructive">{error}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <Button type="submit" className="w-full">
                                Send Reset Link
                            </Button>
                            <Link
                                to="/login"
                                className="text-sm text-muted-foreground hover:text-primary"
                            >
                                Back to login
                            </Link>
                        </CardFooter>
                    </form>
                )}
            </Card>
        </AuthLayout>
    )
}
