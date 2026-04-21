# Phase 2, Step 2 — Real-time Chat

> Internal chat between staff, customer-staff chat via portal

## Tasks

### 2.1 Chat models

- [ ] `communications/models.py` (extend):

  ```python
  class ChatRoom(models.Model):
      room_type = models.CharField(choices=[('internal', 'Internal'), ('portal', 'Portal')])
      participants = models.ManyToManyField(User)
      customer = models.ForeignKey(Customer, null=True, blank=True, on_delete=CASCADE)
      case = models.ForeignKey('cases.Case', null=True, blank=True, on_delete=SET_NULL)
      created_at = models.DateTimeField(auto_now_add=True)

  class ChatMessage(models.Model):
      room = models.ForeignKey(ChatRoom, on_delete=CASCADE, related_name='messages')
      sender = models.ForeignKey(User, on_delete=SET_NULL, null=True)
      content = models.TextField()
      is_read = models.BooleanField(default=False)
      created_at = models.DateTimeField(auto_now_add=True)
  ```

### 2.2 Chat API (polling-based for cPanel compatibility)

- [ ] No WebSockets (cPanel doesn't support well) — use polling or SSE
- [ ] `GET /api/chat/rooms/` — list rooms
- [ ] `GET /api/chat/rooms/:id/messages/?after=<timestamp>` — get new messages
- [ ] `POST /api/chat/rooms/:id/messages/` — send message
- [ ] `POST /api/chat/rooms/` — create room (internal or portal)
- [ ] Polling interval: 5s for active chat, 30s for background

### 2.3 Wire frontend

- [ ] Chat panel component: room list + message thread
- [ ] Message input with send button
- [ ] Auto-scroll to latest message
- [ ] Polling with React Query (refetchInterval)
- [ ] Unread badge in sidebar

### 2.4 Portal chat

- [ ] Customer can chat with assigned staff about their case
- [ ] Auto-create chat room on first message
- [ ] Staff sees portal chats in their chat panel

### 2.5 Tests

- [ ] Create room, send message, receive message
- [ ] Polling returns only new messages
- [ ] Customer scoped to own rooms

## Verification Checklist

- [ ] Internal chat between staff works
- [ ] Portal chat: customer ↔ staff
- [ ] Messages appear within polling interval
- [ ] Unread badges update
- [ ] Git commit: `feat: real-time chat — internal + portal, polling-based`
