# Vodacom Customer Communication Platform

Enterprise internal platform for customer support, live assistance and
AI-powered conversations. This drop contains the **authentication module**
— the first milestone of the full platform (conversations, TOBi AI,
dashboard, customers, reports and settings will follow as separate drops).

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui-style
primitives · Framer Motion · React Hook Form · Zod · Lucide React ·
TanStack Query/Table and ApexCharts are wired into `package.json` ahead of
the dashboard/tables milestone.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/login`.

## Drop 3 — Light / dark theme

A theme toggle (sun/moon, animated) now lives in the topbar and on the
auth screens. Implementation:

- `components/theme-provider.tsx` — a small context (`useTheme()`) that
  toggles a `dark` class on `<html>` and persists the choice to
  `localStorage` (`vodacom-theme`). `ThemeScript` is inlined in
  `app/layout.tsx`'s `<head>` so the correct theme applies before
  React hydrates — no flash of the wrong theme on reload.
- Every color in `app/globals.css` is a CSS variable; `.dark` overrides
  them with a dark palette. Vodacom red (`--primary`) is never
  replaced, only its hover shade shifts slightly for contrast.
- Falls back to the OS `prefers-color-scheme` on first visit if the
  person hasn't chosen yet.

Everything else in the app already uses the token classes
(`bg-card`, `text-foreground`, `border-border`, …), so both new
screens and anything built next inherit dark mode automatically —
no per-component dark: variants needed.

## Drop 2 — App shell + conversations + chat

`/conversations` now renders the full three-pane workspace:

```
components/
  layout/
    icon-rail.tsx        # primary left navigation (icons only)
    topbar.tsx             # global search, notifications, language, profile
  conversations/
    conversation-list.tsx    # search, filters, grouped channel/DM list
    conversation-list-item.tsx
    channel-icon.tsx
    avatar.tsx
    chat-header.tsx           # title, presence, in-chat search, call/video, details toggle
    chat-window.tsx             # message list, date/system separators, typing sim, reply state
    message-bubble.tsx           # text / quick-reply options / file / image / voice / reactions / hover toolbar
    typing-indicator.tsx
    chat-composer.tsx             # emoji picker, attach, voice-note recorder UI, send
    details-panel.tsx             # channel info, notifications, participants, shared files

lib/
  types/conversation.ts    # Conversation / Message / Participant types
  data/conversations.ts     # mock dataset (channels + direct conversations)
```

Only `/login`, `/otp`, `/forgot-password`, `/reset-password`, `/first-login`
and `/conversations` exist so far — the other icon-rail destinations
(dashboard, clients, appels, base de connaissances, rapports, paramètres)
are next in line and will 404 until built.

Chat behavior in this scaffold: sending a message simulates a delivery
tick, a typing indicator, then a reply from the channel's agent/bot after
~1.8s — replace `handleSend` in `chat-window.tsx` with a real API/socket
call when wiring the backend. Everything else (search-in-conversation
highlighting, reactions, pinned banner, reply preview) is fully
interactive against local state.

## What's included in this drop

```
app/
  (auth)/
    layout.tsx          # split-screen auth shell wrapper
    login/page.tsx
    otp/page.tsx
    forgot-password/page.tsx
    reset-password/page.tsx
    first-login/page.tsx
  layout.tsx             # root layout, Inter font
  globals.css            # Vodacom design tokens (CSS variables)
  page.tsx                # redirects "/" -> "/login" for now

components/
  ui/                     # button, input, label, card, checkbox, alert, separator
  auth/
    auth-shell.tsx         # two-column layout (form + brand panel)
    brand-panel.tsx         # right-side branded panel
    network-illustration.tsx# animated connectivity motif
    vodacom-mark.tsx         # original enterprise wordmark (not the trademarked speechmark)
    password-input.tsx       # show/hide toggle
    otp-input.tsx            # 6-digit code input, paste + auto-advance
    password-strength.tsx    # live strength meter
    login-form.tsx
    otp-form.tsx
    forgot-password-form.tsx
    reset-password-form.tsx
    first-login-form.tsx

lib/
  utils.ts                 # cn() class merge helper
  validations/auth.ts       # zod schemas for every auth form
```

## Design tokens

All brand colors live as CSS variables in `app/globals.css` and are mapped
into `tailwind.config.ts` (`bg-primary`, `text-danger`, `bg-surface`, etc.).
Change a hex value once, everywhere updates.

| Token      | Hex       | Usage                        |
|------------|-----------|-------------------------------|
| primary    | `#E60000` | Vodacom red — primary actions only |
| background | `#FFFFFF` | Page background                |
| surface    | `#F8F9FA` | Section backgrounds            |
| border     | `#E5E7EB` | Borders, dividers              |
| foreground | `#111111` | Primary text                   |
| muted-fg   | `#333333`-ish | Secondary text              |
| success    | `#22C55E` |                                |
| warning    | `#F59E0B` |                                |
| danger     | `#DC2626` |                                |

## Notes on this scaffold

- Forms are wired with realistic client-side validation and a simulated
  ~900ms network delay so loading/disabled states are visible. Swap the
  `await new Promise(...)` blocks in each form for real API calls.
- The OTP page accepts any 6-digit code except `111111` (simulated
  failure) — for demoing the error state.
- The brand-panel wordmark is an **original mark** (signal-bars monogram),
  not a reproduction of Vodacom's registered speechmark logo — swap in the
  official asset once you have brand-approved files.
- Next milestone: app shell (sidebar + topbar), conversations list + chat
  window, per your priority order.
