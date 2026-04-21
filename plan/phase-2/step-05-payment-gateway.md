# Phase 2, Step 5 — Payment Gateway Integration

> Online payment collection via Razorpay/Cashfree

## Tasks

### 5.1 Payment gateway setup

- [ ] Choose provider: Razorpay (most common in India) or Cashfree
- [ ] Install SDK: `razorpay` package
- [ ] `payments/gateway.py`:
  - `create_order(amount, receipt_number, customer_info)` → returns order_id
  - `verify_payment(order_id, payment_id, signature)` → verify HMAC
  - Webhook handler for payment confirmation

### 5.2 API endpoints

- [ ] `POST /api/payments/create-order/` — create Razorpay order (customer initiates payment)
- [ ] `POST /api/payments/verify-payment/` — frontend sends payment confirmation
- [ ] `POST /api/payments/gateway-webhook/` — Razorpay server-to-server callback

### 5.3 Payment flow

- [ ] Customer portal: "Pay Now" button on pending fee
- [ ] Frontend loads Razorpay checkout (JS SDK)
- [ ] On success: frontend calls verify endpoint → creates Payment record
- [ ] Webhook as fallback: creates Payment record if frontend callback missed

### 5.4 Frontend integration

- [ ] "Pay Online" button on portal payment page
- [ ] Razorpay checkout popup integration
- [ ] Success/failure handling
- [ ] Payment confirmation page

### 5.5 Security

- [ ] Verify Razorpay signature server-side (HMAC SHA256)
- [ ] Never trust client-side payment confirmation alone
- [ ] Webhook signature verification
- [ ] Idempotency: don't create duplicate Payment records

### 5.6 Tests

- [ ] Order creation
- [ ] Payment verification (mock Razorpay response)
- [ ] Webhook handling
- [ ] Duplicate prevention

## Verification Checklist

- [ ] Razorpay test mode: full payment flow works
- [ ] Payment recorded in system after successful payment
- [ ] Fee assignment updated (paid_amount, status)
- [ ] Receipt generated for online payment
- [ ] Webhook handles missed frontend callbacks
- [ ] No duplicate payments
- [ ] Git commit: `feat: payment gateway — Razorpay online payments`
- [ ] Git tag: `v2.0.0-full`

---

## Phase 2 Complete — Final Verification

After all 5 steps:

- [ ] WhatsApp messages send and deliver
- [ ] Chat works internally and via portal
- [ ] Reports export to PDF and Excel
- [ ] e-Sign flow works end-to-end
- [ ] Online payments work via Razorpay
- [ ] Full regression test: all Phase 0 + Phase 1 features still work
- [ ] Performance acceptable with real data volume
- [ ] Security audit: OWASP top 10 check
- [ ] **Production deployment and go-live**
