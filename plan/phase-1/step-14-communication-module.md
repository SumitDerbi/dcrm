# Phase 1, Step 14 — Communication Module Backend + Wiring

> Call logs, message logs, templates, SMS/email stubs, wire frontend

## Tasks

### 14.1 Models

- [ ] `communications/models.py`:

  ```python
  class CallLog(models.Model):
      customer = models.ForeignKey(Customer, on_delete=CASCADE, related_name='call_logs')
      phone = models.CharField(max_length=15)
      direction = models.CharField(choices=[('inbound', 'Inbound'), ('outbound', 'Outbound')])
      duration = models.IntegerField(default=0)  # seconds
      outcome = models.CharField(choices=OUTCOME_CHOICES)  # Connected, No Answer, Busy, Voicemail
      notes = models.TextField(blank=True)
      called_by = models.ForeignKey(User, on_delete=SET_NULL, null=True)
      called_at = models.DateTimeField()

  class MessageLog(models.Model):
      customer = models.ForeignKey(Customer, on_delete=CASCADE, related_name='message_logs')
      channel = models.CharField(choices=CHANNEL_CHOICES)  # SMS, Email, WhatsApp
      recipient = models.CharField(max_length=200)
      subject = models.CharField(max_length=200, blank=True)
      body = models.TextField()
      status = models.CharField(choices=STATUS_CHOICES, default='Sent')  # Sent, Delivered, Failed
      sent_by = models.ForeignKey(User, on_delete=SET_NULL, null=True)
      sent_at = models.DateTimeField(auto_now_add=True)

  class MessageTemplate(models.Model):
      name = models.CharField(max_length=200)
      channel = models.CharField(choices=CHANNEL_CHOICES)
      subject = models.CharField(max_length=200, blank=True)
      body = models.TextField()  # with {{placeholders}}
      is_active = models.BooleanField(default=True)
      created_at = models.DateTimeField(auto_now_add=True)
  ```

- [ ] Migration + migrate

### 14.2 SMS & Email service stubs

- [ ] `communications/services.py`:
  - `send_sms(phone, message)` → log to MessageLog, print to console (stub)
  - `send_email(to, subject, body)` → log to MessageLog, print to console (stub ZeptoMail)
  - `render_template(template, context)` → replace `{{placeholders}}` with context values
- [ ] Easy to swap stubs with real providers later

### 14.3 Serializers & ViewSets

- [ ] `CallLogViewSet`: CRUD + filter (customer, direction, outcome, date range)
- [ ] `MessageLogViewSet`: list + filter (customer, channel, status, date range) — read-only + send action
  - `@action` `send` → validate, render template if selected, call service, create log
- [ ] `MessageTemplateViewSet`: CRUD
- [ ] URLs: `/api/communications/calls/`, `/api/communications/messages/`, `/api/communications/messages/send/`, `/api/communications/templates/`

### 14.4 Admin

- [ ] Register all three models in admin

### 14.5 Wire frontend

- [ ] `communication-api.ts`: all endpoints
- [ ] Wire communication log: real API with tab filtering
- [ ] Wire call log form: submit to API
- [ ] Wire send message form: template select → render preview → send to API
- [ ] Wire template management: CRUD via API

### 14.6 Tests

- [ ] Call log CRUD
- [ ] Send message creates MessageLog
- [ ] Template rendering with placeholders
- [ ] Filter by channel

## Verification Checklist

- [ ] Call log recorded via API
- [ ] Send message: template selected → rendered → logged
- [ ] Template CRUD works
- [ ] Communication log shows all channels with correct icons
- [ ] Frontend fully wired
- [ ] All tests pass
- [ ] Git commit: `feat: communication module — calls, messages, templates, frontend wiring`
