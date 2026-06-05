# Consequence Architecture Audit

**Date:** 2026-06-05  
**Auditor role:** Principal Software Architect  
**Repository:** `Consequence-3` (HBM & Company)  
**Scope:** Full read of all 78 tracked source files before any implementation work.

---

## Executive Summary

The repository is a **Next.js 14 marketing and product-surface website** for Consequence — not a digital audio workstation (DAW) application. It presents Shop (marketplace), Treasury (ledger/engine narrative), Trending (listener surface), collaboration feature pages, Session Protocol documentation, and a client login/signup flow. Authentication is a **browser-local demo** that persists users in `localStorage` and redirects to `/shop` after login.

**None of the post-login DAW workspace infrastructure described in the product vision exists today.** There is no `/workspace` route, no Zustand state, no WebSocket server, no WebRTC, no Canvas piano roll, no Tauri/Rust/Python/C++/PostgreSQL stack, and no real MIDI or audio engine. Piano roll, video tiles, and DAW layouts appear only as **static SVG/CSS marketing illustrations**.

The gap between current state and the target architecture is effectively a **greenfield build** of the workspace layer on top of an existing Next.js frontend shell and demo auth.

---

## Repository Structure

```
Consequence-3/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (nav, footer, fonts, analytics)
│   ├── globals.css               # Global styles (light "paper" theme)
│   ├── page.tsx                  # Homepage
│   ├── login/page.tsx            # Client login
│   ├── signup/page.tsx           # Sign up
│   ├── shop/                     # Marketplace surface (post-login destination today)
│   ├── treasury/                 # Engine/ledger narrative
│   ├── trending/                 # For You / Radio surface
│   ├── collaboration/            # Marketing pages (live-session, shared-workspace, split-proposals)
│   ├── session-protocol/         # Royalty/settlement documentation
│   ├── how-the-rails-connect/    # Redirects → session-protocol
│   ├── software/                 # Redirects → treasury
│   ├── cc/                       # Redirects → shop
│   ├── contact/, docs/, earnings/, faq/settlement/  # Stub/index pages
├── components/
│   ├── auth/                     # Auth shell, form, session banner
│   ├── cc/                       # Shop feed, marketplace, wallet, spotlight
│   ├── collaboration/            # Collaboration feature marketing views
│   ├── hero/, immersive/, manifesto/, session-protocol/, trending/
│   ├── how-rails-connect/        # Long-form architecture article + code samples
│   ├── illustrations/            # SVG mockups (piano roll, IDE, chat)
│   ├── surface-cards/            # Three.js visualizer, playback illustration
│   ├── sw/                       # Software/engine marketing sections
│   ├── site-nav.tsx, site-footer.tsx, ui.tsx, mark.tsx
├── hooks/                        # use-scroll-hide-header, use-in-view-once
├── lib/
│   ├── auth-session.ts           # localStorage auth (demo)
│   ├── collaboration-features.ts # Static content for collaboration pages
│   └── rails-code-samples.ts     # Illustrative TypeScript for docs
├── docs/                         # Created by this audit
├── package.json, tsconfig.json, tailwind.config.ts, next.config.mjs
└── (no README, no tests, no CI config, no backend crates)
```

**Total source files:** 78 (excluding `node_modules`, `.next`).

---

## Technology Stack (Actual vs. Target)

| Layer | Target (Product Vision) | Current Repository |
|-------|-------------------------|-------------------|
| Frontend | React, TypeScript, Tailwind | ✅ React 18, TypeScript 5.6, Tailwind 3.4 |
| Desktop | Tauri | ❌ Not present |
| Backend | Rust | ❌ Not present |
| Music Theory | Python (Monte Carlo sidecar) | ❌ Not present |
| Audio Engine | C++ / JUCE | ❌ Not present |
| Database | PostgreSQL | ❌ Not present |
| Realtime | WebSockets + CRDT | ❌ Not present |
| Video | WebRTC via WS signaling | ❌ Not present (static HTML/CSS tiles only) |
| State | Zustand | ❌ Not present (`useState` / `useEffect` only) |
| Build | Next.js + (implied) Tauri | Next.js 14 only |

### Dependencies (`package.json`)

**Runtime:** `next@14.2.18`, `react@18.3.1`, `react-dom@18.3.1`, `tailwindcss`, `clsx`, `framer-motion`, `lucide-react`, `three`, `@vercel/analytics`

**Not installed:** `zustand`, `@tauri-apps/api`, any WebSocket client library, any WebRTC wrapper, any audio/MIDI library (e.g. Tone.js, Web MIDI API wrappers), PostgreSQL client, testing frameworks.

### Build System

- **Scripts:** `dev`, `build`, `start`, `lint` (standard Next.js)
- **TypeScript:** `strict: true`, path alias `@/*` → project root
- **PostCSS:** Tailwind + Autoprefixer
- **ESLint:** `next/core-web-vitals` only

---

## Routing System

**Framework:** Next.js App Router (`app/` directory).

### Active Routes

| Route | Purpose | Notes |
|-------|---------|-------|
| `/` | Marketing homepage | Hero, manifesto, WorkSpace *narrative*, engine deep-dive |
| `/login` | Client login | `AuthShell` + `AuthForm` |
| `/signup` | Account creation | Same auth components |
| `/shop` | Marketplace surface | **Current post-login destination** |
| `/treasury` | Ledger/engine narrative | `EngineDeepDive` |
| `/trending` | For You / Radio marketing | `TrendingView` |
| `/collaboration/live-session` | Marketing | Static video-tile illustration |
| `/collaboration/shared-workspace` | Marketing | Static piano-roll SVG |
| `/collaboration/split-proposals` | Marketing | Split proposal illustration |
| `/session-protocol` | Settlement documentation | Long-form view |
| `/contact`, `/docs`, `/docs/platform`, `/earnings`, `/faq/settlement` | Stub pages | Minimal content + links |

### Redirects (`next.config.mjs`)

- `/cc` → `/shop` (permanent)
- `/software` → `/treasury` (permanent)
- `/how-the-rails-connect` → `/session-protocol` (permanent)

### Missing Routes (Required by Vision)

- `/workspace` — **does not exist**
- Session browser, theory panel routes — **do not exist**
- API routes (`app/api/*`) — **none**
- WebSocket endpoint — **none**

### Layout Behavior

Root `app/layout.tsx` wraps **every page** with `SiteNav`, `SiteFooter`, `HashScroll`, and Vercel Analytics. A full-viewport DAW workspace will need either a **route group with a dedicated layout** (no marketing nav/footer) or conditional layout logic.

---

## Authentication Flow

### Implementation (`lib/auth-session.ts`)

- **Storage:** `localStorage` keys `consequence_session`, `consequence_users`, `consequence_pw_{email}`
- **No server validation**, no JWT verification, no HTTP-only cookies, no OAuth
- **User model:** `{ email, name, createdAt }` + session `token` (client-generated string)
- **Password:** Stored in plaintext in localStorage (demo only)

### Login UI (`components/auth/auth-form.tsx`)

Fields: work email, password; button: "Client login"; link to sign up. Signup adds name + confirm password.

### Post-Login Behavior (Current)

```typescript
// auth-form.tsx — both login and signup:
setSession(result.user);
router.push("/shop");
router.refresh();
```

**Gap:** Vision requires immediate navigation to `/workspace` with a default empty session initialized — no intermediate screens. Today users land on the Shop marketplace.

### Session Consumption

- `SessionBanner` on `/shop` reads `getSession()` and shows signed-in state or guest links
- `SiteNav` does not reflect auth state (always shows login/signup CTAs)
- No route guards: `/shop` and all routes are publicly accessible regardless of session

---

## State Management

**Current:** No global state library. Local component state via React hooks.

| Area | Current Approach |
|------|------------------|
| Auth | `localStorage` + `useState` in `SessionBanner`, `AuthForm` |
| UI scroll | Custom hooks (`useScrollHideHeader`, `useInViewOnce`) |
| Shop/marketing | Static const arrays in component files |
| Collaboration content | `COLLABORATION_FEATURES` record in `lib/collaboration-features.ts` |

**Required (Vision):** Zustand slices for session, tracks, regions, notes, UI, collaboration — **entirely absent**.

---

## WebSocket and Real-Time Infrastructure

**Status:** None.

- No Rust WebSocket server
- No client WebSocket connection code
- No event types, Lamport timestamps, or CRDT reconciliation
- No cursor broadcast, transport sync, or chat over sockets

**Marketing references only:** `lib/collaboration-features.ts` and `components/sw/engine-sections.tsx` describe sub-second CRDT sync and bus events in prose. `components/live-ticker.tsx` shows fake animated metrics.

---

## WebRTC and Video Conferencing

**Status:** None (functional).

- `components/sw/collaboration-session-illustration.tsx` renders **static HTML/CSS** video tiles with initials, mute badges, and Meet-style control buttons — no `getUserMedia`, no `RTCPeerConnection`, no `VideoSessionManager`
- Tile dimensions and layout differ from spec (responsive aspect-ratio cards, not fixed 140×100 integrated tiles)

---

## Audio and MIDI Handling

**Status:** None (functional).

| Asset | Type | Functional? |
|-------|------|-------------|
| `monochrome-audio-visualizer.tsx` | Three.js wireframe globe | Decorative animation only |
| `home-visuals.tsx` → `LlmChatSurfaceIllustration` | SVG piano roll | Static rectangles (`rx="2"`), not interactive bubbles |
| `for-you-playback.tsx` | Playback UI illustration | Marketing mockup |
| `manifesto-stepped.tsx` | Embeds piano roll SVG | Decorative |
| `CCTopBar` | Shows "BPM 92", "Key D♭ minor" | Hardcoded labels |

- No Web Audio API usage
- No MIDI parsing, note data structures, or tick/bar conversion
- No Canvas 2D piano roll renderer
- No transport (play/stop/record) state machine
- No JUCE or native audio bridge

---

## Existing UI Component Library

### Core Primitives (`components/ui.tsx`)

Client components using Framer Motion:

- `Section`, `Container`, `Eyebrow`, `Display`, `Lede`, `HairlineRow`, `Pill`, `Parallax`, `FadeUp`, `Waveform`, `NumberStat`

**Not suitable for DAW:** Editorial/marketing typography (`Instrument Serif` display font), light backgrounds, animation-heavy patterns. Vision requires custom workspace components built from scratch — no external DAW UI libraries (correctly absent).

### Icons

`lucide-react` used throughout marketing surfaces.

### Brand Mark

`components/mark.tsx` — SVG geometric "C" monogram.

---

## Design Tokens (Current vs. Workspace Spec)

### Current Theme (Marketing — Light)

**`tailwind.config.ts` + `globals.css`:**

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#FCFCFA` (`snow`, `--bg`) | Paper texture |
| Ink/text | `#0A0A0A` | Primary text |
| Accent | `#7FD4CC` (`tiff`) | Tiffany teal highlights |
| Gold | `#B89968` | Treasury accent |
| Borders | `rgba(10,10,10,0.08–0.16)` | Hairlines |
| Fonts | Inter (sans), Instrument Serif (display), JetBrains Mono (mono) | |

Effects: glass blur, gradients, paper grain, marquee animations.

### Target Workspace Theme (Dark Monochrome — Not Implemented)

| Token | Spec Value |
|-------|------------|
| Background | `#0A0A0A` |
| Primary surface | `#141414` |
| Elevated | `#1E1E1E` |
| Borders | `#2A2A2A` |
| Muted text | `#6B6B6B` |
| Secondary text | `#A0A0A0` |
| Primary text | `#F0F0F0` |
| Accent | `#FFFFFF` (sparingly) |
| Track palette | 12 muted professional colors |
| Shadow | Single `0 2px 8px rgba(0,0,0,0.4)` on floating elements only |

**Conflict:** Marketing site is light-first; workspace spec is dark-only monochromatic. Workspace will need an isolated design token namespace (e.g. `workspace-*` Tailwind colors or CSS variables scoped to `/workspace` layout).

---

## Pages and Components Inventory

### App Pages (20 route files)

All pages are **presentational/marketing** except auth forms which perform localStorage writes.

### Components by Domain

| Directory | Count (approx.) | Role |
|-----------|-----------------|------|
| `components/auth/` | 3 | Login/signup/session banner |
| `components/cc/` | 5 | Shop marketplace UI |
| `components/sw/` | 12+ | Engine/treasury marketing, architecture diagram |
| `components/illustrations/` | 1 file, many exports | Large SVG visual assets |
| `components/how-rails-connect/` | 3 | Documentation article |
| `components/session-protocol/` | 1 | Long documentation view |
| `components/collaboration/` | 2 | Feature marketing |
| `components/surface-cards/` | 2 | Three.js + playback cards |
| `components/trending/` | 1 | Trending marketing |
| Root components | 6 | Nav, footer, UI kit, ticker, etc. |

### Hooks (2)

- `use-scroll-hide-header.ts` — Header hide on scroll (marketing nav)
- `use-in-view-once.ts` — Intersection observer for fade-in animations

### Lib Modules (3)

- `auth-session.ts` — Demo auth
- `collaboration-features.ts` — Static CMS-like content
- `rails-code-samples.ts` — Documentation code strings (Solana, MongoDB, equity)

---

## What Happens After Login Today

1. User submits email/password on `/login` (or signs up on `/signup`)
2. `loginUser` / `registerUser` validates against `localStorage`
3. `setSession` writes `consequence_session` to `localStorage`
4. `router.push("/shop")` — full page navigation to marketplace
5. Shop shows `SessionBanner` with user name; rest of page is static demo content (feed tiles, marketplace cards, wallet)
6. **No DAW loads.** User can browse Shop/Treasury/Trending via marketing nav.

---

## Backend and Persistence

| Concern | Status |
|---------|--------|
| PostgreSQL sessions | ❌ |
| Rust Tauri commands | ❌ |
| Auto-save (30s debounce) | ❌ |
| Session JSONB serialization | ❌ |
| Python theory engine sidecar | ❌ |
| Unix socket / named pipe IPC | ❌ |

---

## Features Required by Vision — Gap Matrix

| # | Feature | Status |
|---|---------|--------|
| 1 | Post-login `/workspace` routing | ❌ Redirects to `/shop` |
| 2 | Five-region workspace shell | ❌ |
| 3 | Transport bar | ❌ |
| 4 | Track list + inspector (280px) | ❌ |
| 5 | Arrangement timeline | ❌ |
| 6 | Piano roll (Canvas bubbles) | ❌ (SVG mockups only) |
| 7 | Collaboration panel (320px) + video tiles | ❌ (static illustration) |
| 8 | WebSocket collaboration (Rust) | ❌ |
| 9 | WebRTC video (VideoSessionManager) | ❌ |
| 10 | Transport playback state | ❌ |
| 11 | Monte Carlo theory engine integration | ❌ |
| 12 | PostgreSQL session persistence | ❌ |
| 13 | Keyboard shortcuts | ❌ |
| 14 | Undo/redo command pattern | ❌ |
| 15 | Context menus | ❌ |
| 16 | Zustand state slices | ❌ |

---

## Reusable Assets from Current Codebase

These can inform or be partially reused when building the workspace:

1. **Fonts already loaded:** Inter + JetBrains Mono in root layout (matches workspace typography spec; drop Instrument Serif from workspace layout)
2. **Auth shell pattern:** `AuthForm` field structure matches login spec (work email, password, client login, sign up link)
3. **Auth session API:** `getSession`, `setSession`, `clearSession` — usable as interim client identity until Rust backend exists
4. **Video tile visual language:** `collaboration-session-illustration.tsx` demonstrates tile stacking, initials fallback, mute/speaking states — layout reference only
5. **Piano roll visual reference:** `LlmChatSurfaceIllustration` in `home-visuals.tsx` — grid, pitch labels, beat ruler (must be reimplemented as interactive Canvas with pill bubbles per spec)
6. **Color `#0A0A0A`:** Already defined as `ink-900` / used in dark stub pages (`contact`, `docs`)
7. **Path alias `@/*`:** Established for clean imports
8. **Strict TypeScript:** Project already enforces `strict: true`

---

## Security and Production Readiness Notes

- Passwords stored in plaintext in `localStorage` — acceptable for demo only
- No CSRF, no rate limiting, no server-side session invalidation
- No environment variables or secrets management (`.env*.local` gitignored but unused)
- No test suite
- No CI/CD configuration in repo
- Vercel Analytics integrated (marketing)

---

## Recommended Implementation Order (Aligned with Product Brief)

The product brief's twelve-step order remains valid. Additional prerequisites inferred from this audit:

**Step 0 (prerequisite):** Add workspace route group with dedicated layout (no `SiteNav`/`SiteFooter`, dark theme scope, full viewport).

**Step 1:** ✅ This audit document.

**Step 2:** Change `auth-form.tsx` redirect from `/shop` to `/workspace`; add auth guard on workspace route.

**Step 3–12:** As specified in product vision (shell → tracks → timeline → piano roll → WS → WebRTC → transport → theory → persistence → shortcuts/undo).

**Parallel infrastructure tracks** (not in current repo, required for full vision):

- `src-tauri/` + Rust crate with WebSocket server and Tauri commands
- `theory-engine/` Python sidecar
- `audio-engine/` C++/JUCE (can stub initially; transport can run clock-only without audio output)
- PostgreSQL schema + migration tooling
- Add `zustand` dependency

---

## File-by-File Catalog

Every file in the repository was read or reviewed. Summary by path:

### Configuration (7 files)

- `.eslintrc.json`, `.gitignore`, `next.config.mjs`, `package.json`, `package-lock.json`, `postcss.config.mjs`, `tsconfig.json`, `tailwind.config.ts`

### App (22 files)

- `layout.tsx`, `globals.css`, `page.tsx`
- `login/page.tsx`, `signup/page.tsx`
- `shop/page.tsx`, `shop/layout.tsx`
- `treasury/page.tsx`, `treasury/layout.tsx`
- `software/page.tsx`, `software/layout.tsx` (redirect)
- `cc/page.tsx`, `cc/layout.tsx` (redirect)
- `trending/page.tsx`
- `collaboration/*/page.tsx` (3)
- `session-protocol/page.tsx`
- `how-the-rails-connect/page.tsx`
- `contact/page.tsx`, `docs/page.tsx`, `docs/platform/page.tsx`, `earnings/page.tsx`, `faq/settlement/page.tsx`

### Components (40 files)

- `auth/auth-form.tsx`, `auth/auth-shell.tsx`, `auth/session-banner.tsx`
- `cc/for-you.tsx`, `cc/marketplace.tsx`, `cc/spotlight.tsx`, `cc/topbar.tsx`, `cc/wallet.tsx`
- `collaboration/collaboration-feature-view.tsx`, `collaboration/split-proposal-illustration.tsx`
- `hero/hero-consequence-visual.tsx`
- `how-rails-connect/code-block.tsx`, `how-rails-connect/how-rails-connect-view.tsx`, `how-rails-connect/illustrations.tsx`
- `illustrations/home-visuals.tsx`
- `immersive/surface-hero.tsx`
- `manifesto/manifesto-stepped.tsx`
- `session-protocol/session-protocol-view.tsx`
- `surface-cards/for-you-playback.tsx`, `surface-cards/monochrome-audio-visualizer.tsx`
- `sw/architecture.tsx`, `sw/code-monolith.tsx`, `sw/collaboration-session-illustration.tsx`, `sw/digital-twins-dashboard.tsx`, `sw/engine-sections.tsx`, `sw/genesis-synth-cover-illustration.tsx`, `sw/inference-meet-illustration.tsx`, `sw/live-metrics.tsx`, `sw/lyrics-accelerator-illustration.tsx`, `sw/reserve-bank-illustration.tsx`, `sw/royalty-transaction-carousel.tsx`, `sw/royalty-transaction.tsx`, `sw/simulation-mpc-illustration.tsx`
- `trending/trending-view.tsx`
- `hash-scroll.tsx`, `live-ticker.tsx`, `mark.tsx`, `partner-stack-marquee.tsx`, `site-footer.tsx`, `site-nav.tsx`, `ui.tsx`

### Hooks (2 files)

- `use-in-view-once.ts`, `use-scroll-hide-header.ts`

### Lib (3 files)

- `auth-session.ts`, `collaboration-features.ts`, `rails-code-samples.ts`

---

## Conclusion

The Consequence repository is a polished **marketing and documentation frontend** with demo client-side authentication. It successfully communicates the product vision (WorkSpace, collaboration, Monte Carlo, settlement) through narrative content and static illustrations, but **contains zero functional DAW or realtime collaboration code**.

Building the post-login workspace is a large, structured greenfield effort atop the existing Next.js app. The highest-impact first code changes are: (1) workspace route + isolated dark layout, (2) auth redirect to `/workspace`, (3) Zustand store scaffolding, (4) five-panel shell with resize handles — then iterative feature depth per the implementation order.

No `docs/DECISION_LOG.md` entries are required yet; architecture direction is clear from the product brief. Decision log entries should be added when implementation choices arise (e.g. WebSocket hosting model, CRDT library selection, Tauri vs. web-only Phase 1).

---

*End of audit. No application code was modified during this review.*
