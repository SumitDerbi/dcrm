import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { AuthLayout } from '../components/AuthLayout'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const loginSchema = z.object({
    identifier: z.string().min(1, 'Email or phone is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function LoginPage() {
    const [submitted, setSubmitted] = useState(false)

    const form = useForm({
        defaultValues: { identifier: '', password: '' },
        onSubmit: ({ value }) => {
            const result = loginSchema.safeParse(value)
            if (result.success) {
                console.log('Login submit:', result.data)
            }
        },
        validators: {
            onSubmit: ({ value }) => {
                const result = loginSchema.safeParse(value)
                if (!result.success) {
                    const fieldErrors: Record<string, string> = {}
                    for (const issue of result.error.issues) {
                        fieldErrors[issue.path[0] as string] = issue.message
                    }
                    return { fields: fieldErrors }
                }
                return undefined
            },
        },
    })

    return (
        <AuthLayout>
            <Card>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        setSubmitted(true)
                        form.handleSubmit()
                    }}
                >
                    <CardContent className="space-y-4 pt-6">
                        <form.Field name="identifier">
                            {(field) => {
                                const error = submitted && field.state.meta.errors?.[0]
                                return (
                                    <div className="space-y-2">
                                        <Label htmlFor="identifier">Email or Phone</Label>
                                        <Input
                                            id="identifier"
                                            placeholder="you@example.com"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                        {error && (
                                            <p className="text-sm text-destructive">{String(error)}</p>
                                        )}
                                    </div>
                                )
                            }}
                        </form.Field>

                        <form.Field name="password">
                            {(field) => {
                                const error = submitted && field.state.meta.errors?.[0]
                                return (
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                        {error && (
                                            <p className="text-sm text-destructive">{String(error)}</p>
                                        )}
                                    </div>
                                )
                            }}
                        </form.Field>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <div className="flex w-full items-center justify-between text-sm">
                            <Link
                                to="/forgot-password"
                                className="text-muted-foreground hover:text-primary"
                            >
                                Forgot password?
                            </Link>
                            <Link
                                to="/otp-login"
                                className="text-muted-foreground hover:text-primary"
                            >
                                Login with OTP
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </AuthLayout>
    )
}
