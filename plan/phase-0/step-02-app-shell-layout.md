# Phase 0, Step 2 — App Shell & Layout

> Sidebar nav, top bar, responsive shell, role-based menu structure, branding context

## Tasks

### 2.1 Branding context (mock)

- [ ] Create `frontend/src/lib/branding-context.tsx`
- [ ] Define `BrandingData` type: `{ companyName, logoUrl, favicon, primaryColor, secondaryColor, tagline }`
- [ ] Create `BrandingProvider` with hardcoded mock data for now
- [ ] Export `useBranding()` hook
- [ ] Wrap app in `BrandingProvider` in `main.tsx`

### 2.2 Theme setup (dynamic colours)

- [ ] In `BrandingProvider`, set CSS variables `--primary` and `--secondary` on `document.documentElement` from branding data
- [ ] Configure Tailwind/shadcn to use these CSS variables for primary/secondary colours
- [ ] Verify: changing mock `primaryColor` hex → UI theme colour changes

### 2.3 Layout components

- [ ] Create `frontend/src/components/layout/AppShell.tsx` — main layout wrapper
- [ ] Create `frontend/src/components/layout/Sidebar.tsx`
  - Collapsible sidebar (hamburger on mobile)
  - Company logo + name from `useBranding()` at the top
  - Navigation links grouped by module
  - Role-based menu items (use a mock `currentRole` for now)
  - Menu items: Dashboard, Leads, Customers, Loans, Cases, Documents, Fees, Payments, Expenses, Reports, Lenders, Tasks, Communications, Settings
- [ ] Create `frontend/src/components/layout/TopBar.tsx`
  - Company name from branding (mobile view)
  - User avatar / name placeholder
  - Notification bell icon
  - Logout button
- [ ] Create `frontend/src/components/layout/MobileNav.tsx` — bottom nav or slide-out drawer for mobile

### 2.4 Routing structure

- [ ] Update `src/lib/router.tsx` with routes:
  - `/` → Dashboard
  - `/leads`, `/leads/new`, `/leads/:id`
  - `/customers`, `/customers/:id`
  - `/loans`
  - `/cases`, `/cases/:id`
  - `/documents`
  - `/fees`, `/fees/new`
  - `/payments`, `/payments/new`
  - `/expenses`, `/expenses/new`
  - `/reports`
  - `/lenders`, `/lenders/:id`
  - `/tasks`, `/tasks/new`
  - `/communications`
  - `/settings`
  - `/portal/*` (customer portal routes)
  - `/login`, `/verify-otp`, `/forgot-password`
- [ ] Login/auth routes render WITHOUT the AppShell (no sidebar)
- [ ] All other routes render INSIDE the AppShell

### 2.5 Placeholder pages

- [ ] Create placeholder components for each route: just `<h1>Page Name</h1>` — enough to verify routing
- [ ] Place in `frontend/src/features/<module>/pages/` e.g. `features/leads/pages/LeadListPage.tsx`

### 2.6 Responsive behaviour

- [ ] Desktop (≥1024px): sidebar visible, content area fills rest
- [ ] Tablet (768-1023px): sidebar collapsed to icons, expand on hover
- [ ] Mobile (<768px): sidebar hidden, hamburger in top bar, slide-out overlay

## Verification Checklist

- [ ] App loads with sidebar showing company logo and name from mock branding
- [ ] All nav links navigate to correct placeholder pages
- [ ] Sidebar collapses on tablet, hides on mobile with hamburger toggle
- [ ] Top bar shows user placeholder and notification icon
- [ ] Changing mock `primaryColor` in branding context changes the theme
- [ ] Login route renders without sidebar
- [ ] No console errors
- [ ] Git commit: `feat: app shell — sidebar, top bar, routing, branding context`
