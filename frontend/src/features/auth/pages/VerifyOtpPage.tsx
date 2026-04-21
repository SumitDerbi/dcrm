import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { z } from 'zod'
import { AuthLayout } from '../components/AuthLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'

const otpSchema = z.object({
    otp: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit OTP'),
})

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const [verified, setVerified] = useState(false)
    const [countdown, setCountdown] = useState(30)

    useEffect(() => {
        if (countdown <= 0) return
        const timer = setTimeout(() => setCountdown((value) => value - 1), 1000)
        return () => clearTimeout(timer)
    }, [countdown])

    function handleVerify() {
        const result = otpSchema.safeParse({ otp })
        if (!result.success) {
            setError(result.error.issues[0].message)
            return
        }
        setError('')
        setVerified(true)
        console.log('Verify OTP submit:', result.data)
    }

    function handleResend() {
        setCountdown(30)
        setOtp('')
        setError('')
        console.log('Resend verification OTP')
    }

    return (
        <AuthLayout>
            <Card>
                {verified ? (
                    <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
                        <ShieldCheck className="h-12 w-12 text-primary" />
                        <h2 className="text-lg font-semibold">OTP verified</h2>
                        <p className="text-sm text-muted-foreground">Authentication completed successfully. Continue to the dashboard or return to login.</p>
                        <div className="flex gap-2 pt-2">
                            <Link to="/" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">Go to Dashboard</Link>
                            <Link to="/login" className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium">Back to Login</Link>
                        </div>
                    </CardContent>
                ) : (
                    <>
                        <CardContent className="space-y-4 pt-6">
                            <div className="space-y-1 text-center">
                                <h2 className="text-lg font-semibold">Verify OTP</h2>
                                <p className="text-sm text-muted-foreground">Enter the 6-digit verification code sent to your registered device.</p>
                            </div>
                            <div className="flex justify-center">
                                <InputOTP maxLength={6} value={otp} onChange={(value) => { setOtp(value); setError('') }}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            {error && <p className="text-center text-sm text-destructive">{error}</p>}
                            <div className="text-center text-sm">
                                {countdown > 0 ? (
                                    <span className="text-muted-foreground">Resend code in {countdown}s</span>
                                ) : (
                                    <button type="button" onClick={handleResend} className="text-primary hover:underline">Resend verification code</button>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <Button className="w-full" onClick={handleVerify}>Verify OTP</Button>
                            <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">Back to login</Link>
                        </CardFooter>
                    </>
                )}
            </Card>
        </AuthLayout>
    )
}
