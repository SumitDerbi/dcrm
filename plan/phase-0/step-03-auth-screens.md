# Phase 0, Step 3 — Login / Auth Screens

> Login, OTP verification, forgot password — all with dynamic company branding

## Tasks

### 3.1 Login page

- [ ] Create `frontend/src/features/auth/pages/LoginPage.tsx`
- [ ] Centered card layout on a clean background
- [ ] Company logo + name from `useBranding()` at top of card
- [ ] Tagline below logo (if set)
- [ ] Form fields: Email/Phone, Password (using shadcn Input, Label)
- [ ] "Login" button (shadcn Button)
- [ ] "Forgot password?" link
- [ ] "Login with OTP" alternative link
- [ ] Form uses TanStack Form + Zod schema: `{ identifier: string (required), password: string (min 6) }`
- [ ] On submit: just `console.log` the values (no API)

### 3.2 OTP login page

- [ ] Create `frontend/src/features/auth/pages/OtpLoginPage.tsx`
- [ ] Company logo + name
- [ ] Phone number input → "Send OTP" button
- [ ] After send: show 6-digit OTP input (individual boxes or single field)
- [ ] "Resend OTP" with countdown timer (30s)
- [ ] "Verify" button
- [ ] Zod: `{ phone: string (10 digits), otp: string (6 digits) }`
- [ ] Mock flow: click Send → show OTP input → click Verify → `console.log`

### 3.3 Forgot password page

- [ ] Create `frontend/src/features/auth/pages/ForgotPasswordPage.tsx`
- [ ] Company logo + name
- [ ] Email input → "Send Reset Link" button
- [ ] Success state: "Check your email" message
- [ ] Zod: `{ email: string (email format) }`

### 3.4 Auth layout

- [ ] Create `frontend/src/features/auth/components/AuthLayout.tsx`
- [ ] Full-screen centered layout, no sidebar
- [ ] Company branding at top
- [ ] Wrap all auth pages in this layout
- [ ] Responsive: card fills width on mobile, max-w-md on desktop

## Verification Checklist

- [ ] Login page shows company logo and name from branding context
- [ ] All form fields validate with Zod (show errors on invalid submit)
- [ ] OTP flow: phone input → OTP input → verify (mock)
- [ ] Forgot password shows success state after submit
- [ ] All auth pages are responsive (mobile, tablet, desktop)
- [ ] Navigation: Login ↔ OTP Login ↔ Forgot Password links work
- [ ] No AppShell (sidebar) visible on auth pages
- [ ] Git commit: `feat: auth screens — login, OTP, forgot password`
