# Phase 2, Step 1 — WhatsApp Integration

> WhatsApp Business API integration for customer communication

## Tasks

### 1.1 WhatsApp provider service

- [ ] `communications/providers/whatsapp.py`:
  - Integration with WhatsApp Business API (Meta Cloud API or third-party like Twilio/Gupshup)
  - `send_whatsapp_message(phone, template_name, params)` → send template message
  - `send_whatsapp_text(phone, text)` → send free-form text (within 24h window)
  - Webhook handler for delivery receipts

### 1.2 WhatsApp template management

- [ ] Sync approved templates from WhatsApp Business Manager
- [ ] Map to existing `MessageTemplate` model (add `whatsapp_template_id` field)
- [ ] Admin page for viewing synced templates

### 1.3 Webhook endpoint

- [ ] `POST /api/communications/whatsapp/webhook/` — receive delivery statuses, incoming messages
- [ ] Verify webhook signature
- [ ] Update `MessageLog.status` on delivery receipt
- [ ] Create `MessageLog` for incoming messages

### 1.4 Wire frontend

- [ ] WhatsApp channel option in send message form (already exists, just wire to real API)
- [ ] Show WhatsApp-specific templates when channel = WhatsApp
- [ ] Delivery status updates in message log

### 1.5 Tests

- [ ] Send message creates log with correct channel
- [ ] Webhook updates delivery status
- [ ] Template rendering with WhatsApp params

## Verification Checklist

- [ ] WhatsApp message sends via API (test with sandbox)
- [ ] Delivery receipts update log status
- [ ] Frontend send flow works for WhatsApp
- [ ] Git commit: `feat: WhatsApp integration — send, templates, webhooks`
