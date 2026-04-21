import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { AuthLayout } from '../components/AuthLayout'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'

const phoneSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
})

const otpSchema = z.object({
    phone: z.string().regex(/^\d{10}$/),
    otp: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit OTP'),
})

export default function OtpLoginPage() {
    const [step, setStep] = useState<'phone' | 'otp'>('phone')
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [countdown, setCountdown] = useState(0)
    const [phoneError, setPhoneError] = useState('')
    const [otpError, setOtpError] = useState('')

    useEffect(() => {
        if (countdown <= 0) return
        const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
        return () => clearTimeout(t)
    }, [countdown])

    const handleSendOtp = useCallback(() => {
        const result = phoneSchema.safeParse({ phone })
        if (!result.success) {
            setPhoneError(result.error.issues[0].message)
            return
        }
        setPhoneError('')
        setStep('otp')
        setCountdown(30)
        console.log('Send OTP to:', phone)
    }, [phone])

    const handleVerify = useCallback(() => {
        const result = otpSchema.safeParse({ phone, otp })
        if (!result.success) {
            const otpIssue = result.error.issues.find((i) => i.path[0] === 'otp')
            setOtpError(otpIssue?.message || 'Invalid OTP')
            return
        }
        setOtpError('')
        console.log('Verify OTP:', result.data)
    }, [phone, otp])

    const handleResend = useCallback(() => {
        setCountdown(30)
        setOtp('')
        console.log('Resend OTP to:', phone)
    }, [phone])

    return (
        <AuthLayout>
            <Card>
                <CardContent className="space-y-4 pt-6">
                    {step === 'phone' ? (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    placeholder="9876543210"
                                    maxLength={10}
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value.replace(/\D/g, ''))
                                        setPhoneError('')
                                    }}
                                />
                                {phoneError && (
                                    <p className="text-sm text-destructive">{phoneError}</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-muted-foreground">
                                OTP sent to <span className="font-medium text-foreground">{phone}</span>
                            </p>
                            <div className="space-y-2">
                                <Label>Enter OTP</Label>
                                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                {otpError && (
                                    <p className="text-sm text-destructive">{otpError}</p>
                                )}
                            </div>
                            <div className="text-sm">
                                {countdown > 0 ? (
                                    <span className="text-muted-foreground">
                                        Resend OTP in {countdown}s
                                    </span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className="text-primary hover:underline"
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                    {step === 'phone' ? (
                        <Button className="w-full" onClick={handleSendOtp}>
                            Send OTP
                        </Button>
                    ) : (
                        <Button className="w-full" onClick={handleVerify}>
                            Verify
                        </Button>
                    )}
                    <Link
                        to="/login"
                        className="text-sm text-muted-foreground hover:text-primary"
                    >
                        Back to login
                    </Link>
                </CardFooter>
            </Card>
        </AuthLayout>
    )
}
