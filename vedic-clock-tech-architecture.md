# Vikramaditya Vedic Clock — Technical Architecture & Build Standards
*Finalized v1 — Mobile-First*

---

## 1. Confirmed Decisions

| Question | Decision |
|---|---|
| Bilingual treatment | **Inline Hindi + English everywhere** (heading + subtitle pattern, as in source docs). No language toggle, no separate routes. |
| Device tiering | **Confirmed.** Full WebGL/drag interactions on capable devices; graceful lighter-weight fallback on low-end/older devices. Never a broken experience, only a simpler one. |
| Content management | **Assumed yes** — lightweight headless CMS for anything non-technical staff may need to edit (institution details, contact info, testimonials). *Confirm or override — this is the one assumption in this doc.* |
| Design discipline | **Mobile-first, site-wide.** Every component is designed and built at 375px first, then scaled up — not designed at desktop and squeezed down. |

---

## 2. Final Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG for content pages, SEO for Panchang Guide |
| 3D/WebGL | **React Three Fiber + drei** | Globe, brass ring, rotary dial — client-only, lazy-loaded |
| Animation | **GSAP + ScrollTrigger** | Scroll-linked arcs, sundial-wipe transitions |
| Drag physics | **@use-gesture/react + react-spring** | Rotary dial inertia + snap; must handle touch as first-class, not mouse-only |
| Astronomy math (illustrative) | **`suncalc`** or **`astronomy-engine`** (client-side) | Terminator line, moon phase widget — marketing-grade, not the product's core Panchang engine |
| Styling | **Tailwind CSS + CSS custom properties** | Design tokens (from master plan) as CSS vars once; Tailwind config references them |
| Fonts | **`next/font`, self-hosted** | Fraunces/Playfair (headers), Inter (body), Noto Sans Devanagari (Hindi) — subset to used glyphs only |
| Long-form content | **MDX** | Panchang Guide, Heritage page copy |
| Structured content | **Sanity (headless CMS)** | Institution cards, contact details, testimonials |
| Forms | **Next.js server action → Resend** | Contact/enquiry form, no separate backend needed |
| Hosting | **Vercel** | Native Next.js support, edge image optimization, preview deploys per PR |
| Analytics | **Plausible** (privacy-friendly) or GA4 | *Not yet decided — see open items* |
| Version control | **GitHub**, Vercel preview per PR | Review each component/page before merge |

---

## 3. Mobile-First Principles

This is the section that changes if we treat mobile as an afterthought — so it's written as hard rules, not preferences.

**Layout & touch**
- Design canvas starts at **375px width**; every component must work there before it's considered done, then scales up to tablet/desktop.
- Minimum touch target: **44×44px** on every interactive element (nav items, dial hit-area, buttons).
- Rotary dial (O2): **touch/drag is the primary input**, mouse-drag is the secondary one built on the same gesture handler — not the other way around. Include a **tap-to-jump** fallback (tap a medallion directly) for accessibility and for anyone who finds drag physics fiddly on a small screen.
- Navigation (O1): hamburger/drawer pattern below the tablet breakpoint, full-screen overlay, no flyout submenus.
- Sticky header on mobile uses a **cheap solid background**, not backdrop-blur — blur is a real GPU cost on mid-range Android and isn't worth it at that screen size where the glass effect barely reads anyway.

**Breakpoints**
| Name | Range |
|---|---|
| Mobile | 375–639px |
| Tablet | 640–1023px |
| Desktop | 1024–1439px |
| Large desktop | 1440px+ |

**Performance budget (mobile, 4G reference)**
- Largest Contentful Paint: target **< 2.5s**
- Total JS shipped to first paint: keep the R3F/Three.js bundle **out of the initial load** entirely (see rendering strategy below)
- Hero should show something meaningful (static globe image or short looping video poster) **before** the WebGL canvas ever downloads

**3D loading strategy on mobile**
- Dynamic-import the R3F canvas with `ssr: false`, and additionally defer its load until the hero section is actually in viewport (`IntersectionObserver`) or the browser is idle (`requestIdleCallback`)
- Show a static day/night-mapped globe image as the poster frame while the real canvas loads underneath — swap in seamlessly once ready, never a blank space or spinner
- On detected low-end devices (rough heuristic: `navigator.deviceMemory < 4` or no WebGL2 support), skip the live canvas entirely and use a pre-rendered looping video of the assembly sequence instead

**Images & fonts**
- All raster images through `next/image`, responsive `srcset`, lazy-loaded below the fold
- Fonts: `font-display: swap`, Devanagari subset built from only the characters actually used in copy — full Devanagari font files are heavy and mostly unused glyphs

**Animation cost on mobile**
- GSAP/ScrollTrigger is lightweight enough to keep everywhere
- Reduce nebula/particle density on mobile via a device-pixel-ratio check — don't render desktop-density starfields on a phone GPU
- Sundial-wipe transitions and arc-fills stay identical across breakpoints — they're cheap. The globe and dial are the only components that get real tiering.

**Testing matrix (minimum, before any page ships)**
- iPhone SE or equivalent (small screen, mid CPU)
- A mid-range Android device (this is where WebGL performance actually gets tested — desktop dev machines lie to you here)
- iPad (tablet breakpoint)
- Desktop: Chrome, Safari, Firefox

---

## 4. Rendering Strategy

- Content pages (Heritage, Panchang Guide, Institutions, Contact) — **SSR/SSG** via Next.js for fast first paint and SEO
- R3F canvas (globe, rotary dial) — **client-only**, dynamically imported, never server-rendered
- Code-splitting by page: the rotary dial bundle only loads on the Product page, not on Home, even though Home also shows a (simpler, non-interactive) globe
- Reduced-motion preference and low-end-device detection both route to the **same fallback path** — one fallback system to build and maintain, not two

---

## 5. Content Architecture

- **MDX** for long-form, rarely-changing content: Panchang Guide tables/explanations, Heritage story copy
- **Sanity** for structured, frequently-edited content: institution segment cards, contact details, testimonials, any future case studies
- Bilingual fields stored as paired `hi` / `en` values directly on each content entry (no i18n routing library needed, since we're not toggling languages — both render together always)

---

## 6. Accessibility

- Full `prefers-reduced-motion` fallback for every signature animation (already specified in the master plan)
- WCAG AA contrast check required for gold-on-navy and gold-on-parchment text combinations specifically — these are the two riskiest pairings in the palette
- Rotary dial must be operable via keyboard (arrow keys rotate, Enter selects) as a parallel path to drag/tap
- All medallions and data plaques get proper screen-reader labels (the visual is decorative status; the underlying data must still be announced)

---

## 7. Deployment

- GitHub repo, single Next.js app (no monorepo needed at this scale)
- Vercel for hosting + preview deployment per pull request
- Environment variables: Sanity project ID/token, Resend API key, analytics ID

---

## 8. Open Items Still Needing Sign-Off

- [ ] **Confirm CMS assumption** — Sanity, or is a developer maintaining all content directly in code?
- [ ] **Analytics choice** — Plausible (privacy-friendly, lighter) vs. GA4 (more common, heavier script)
- [ ] **Domain & hosting account** — who owns the Vercel/domain registration
