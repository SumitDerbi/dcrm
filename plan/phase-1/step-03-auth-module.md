# Phase 1, Step 3 — User & Authentication Module

> Custom user model, JWT auth, OTP flow, roles, login wiring

## Tasks

### 3.1 Custom user model

- [ ] Create `accounts/models.py`:
  ```python
  class User(AbstractBaseUser, PermissionsMixin):
      email = models.EmailField(unique=True)
      phone = models.CharField(max_length=15, unique=True)
      first_name = models.CharField(max_length=50)
      last_name = models.CharField(max_length=50)
      role = models.CharField(choices=ROLE_CHOICES)  # Admin, Manager, Telecaller, Fieldworker, Customer
      is_active = models.BooleanField(default=True)
      is_staff = models.BooleanField(default=False)
      date_joined = models.DateTimeField(auto_now_add=True)
  ```

  - `ROLE_CHOICES`: Admin, Manager, Telecaller, Field Worker, Customer
  - Custom manager: `UserManager` with `create_user`, `create_superuser`
  - `USERNAME_FIELD = 'email'`, `REQUIRED_FIELDS = ['phone', 'first_name']`
- [ ] Migration + migrate

### 3.2 OTP model

- [ ] `accounts/models.py`:
  ```python
  class OTP(models.Model):
      phone = models.CharField(max_length=15)
      code = models.CharField(max_length=6)
      created_at = models.DateTimeField(auto_now_add=True)
      is_used = models.BooleanField(default=False)
  ```

  - Auto-expire after 5 minutes (check in view logic)

### 3.3 JWT endpoints

- [ ] `accounts/serializers.py`:
  - `LoginSerializer`: email + password → validate → return JWT pair
  - `OTPRequestSerializer`: phone → send OTP
  - `OTPVerifySerializer`: phone + code → validate → return JWT pair
  - `PasswordResetRequestSerializer`: email → send reset link
  - `PasswordResetConfirmSerializer`: token + new password
  - `UserProfileSerializer`: read user info
- [ ] `accounts/views.py`:
  - `LoginView` → POST, return access + refresh tokens
  - `OTPRequestView` → POST, generate 6-digit code, save to OTP model, send SMS (stub)
  - `OTPVerifyView` → POST, verify code, return JWT pair
  - `PasswordResetRequestView` → POST, send email (stub with ZeptoMail)
  - `PasswordResetConfirmView` → POST
  - `ProfileView` → GET (current user)
  - `TokenRefreshView` → use simplejwt built-in

### 3.4 URL routes

- [ ] `accounts/urls.py`:
  - `POST /api/auth/login/`
  - `POST /api/auth/otp/request/`
  - `POST /api/auth/otp/verify/`
  - `POST /api/auth/password/reset/`
  - `POST /api/auth/password/reset/confirm/`
  - `POST /api/auth/token/refresh/`
  - `GET  /api/auth/profile/`

### 3.5 Django Admin registration

- [ ] Register `User` in admin with search, filter by role, list display
- [ ] Register `OTP` in admin (read-only, for debugging)

### 3.6 Wire frontend login

- [ ] Create `frontend/src/lib/api.ts`: axios instance with baseURL `/api/`, interceptors for JWT token refresh
- [ ] Create `frontend/src/features/auth/api/auth-api.ts`: `login()`, `requestOTP()`, `verifyOTP()`, `resetPassword()`
- [ ] Update `frontend/src/lib/auth-context.tsx`:
  - Store tokens in `localStorage`
  - `login()` → call API, store tokens, decode user from JWT
  - `logout()` → clear tokens, redirect to login
  - `isAuthenticated` → check token expiry
  - `user` → decoded from JWT (role, name, email)
- [ ] Wire login page: replace `console.log` with real API call
- [ ] Wire OTP page: request → verify → redirect to dashboard
- [ ] Wire forgot password page: request → confirm flow

### 3.7 Auth guards

- [ ] `PrivateRoute` component: check token, redirect to `/login` if missing
- [ ] `RoleGuard` component: check user role, show 403 if unauthorized
- [ ] Admin routes: Admin, Manager roles
- [ ] Portal routes: Customer role

### 3.8 Tests

- [ ] Unit test: User model create, custom manager
- [ ] API test: login with valid credentials → 200 + tokens
- [ ] API test: login with invalid credentials → 401
- [ ] API test: OTP request → 200, OTP record created
- [ ] API test: OTP verify with correct code → 200 + tokens
- [ ] API test: OTP verify with expired/wrong code → 400
- [ ] API test: profile endpoint returns current user

## Verification Checklist

- [ ] `python manage.py createsuperuser` works with email/phone
- [ ] Login via admin works with custom user
- [ ] `POST /api/auth/login/` with valid creds returns JWT tokens
- [ ] Tokens work for authenticated requests (`Authorization: Bearer <token>`)
- [ ] Token refresh works
- [ ] Frontend login form → API → stores tokens → redirects to dashboard
- [ ] Unauthorized access to `/dashboard` redirects to login
- [ ] Customer role user redirected to portal
- [ ] OTP flow works end-to-end (with stub SMS)
- [ ] All tests pass
- [ ] Git commit: `feat: auth module — custom user, JWT, OTP, login wiring`
