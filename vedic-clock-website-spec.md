# Vikramaditya Vedic Clock — Website Master Plan
*Design & Animation Specification — v1*

---

## 1. Design Tokens (reference)

**Color**
| Token | Hex | Use |
|---|---|---|
| `--void-navy` | `#0B0F1E` | Cosmic section background |
| `--deep-indigo` | `#141B33` | Cosmic section gradient stop |
| `--parchment` | `#F3E9D2` | Story/content section background |
| `--ivory` | `#FBF5E7` | Light content background variant |
| `--brass` | `#B8873D` | Primary accent, borders |
| `--antique-gold` | `#D4A65A` | Secondary accent, dividers |
| `--amber-glow` | `#F5A623` | Live data numerals only |
| `--deep-bronze` | `#3D2A1A` | Text on cream, pill headers |
| `--ink-black` | `#2A1B10` | Darkest text |

**Type**
- Display/wordmark: ornate Devanagari-flavored serif (Yatra One-class) + refined English serif pairing
- Section headers: warm serif (Playfair Display / Fraunces)
- Body: humanist sans (Inter / Source Sans)
- Live numerals: slab-serif, amber-lit, tabular-nums

**Motion**
- Easing: orbital slow-in-slow-out (`cubic-bezier(0.45, 0, 0.15, 1)`) or crisp mechanical snap — never elastic/spring overshoot
- Every animation maps to a time/astronomical concept, never generic "scroll = fade"
- Hard rule: full `prefers-reduced-motion` fallback for every signature moment

---

## 2. Component Library (IDs used throughout this doc)

**Atoms**
`A1` gold flourish divider · `A2` bilingual pill badge · `A3` brass button · `A4` icon medallion frame · `A5` glowing data digit · `A6` progress-arc segment · `A7` ornate corner bracket · `A8` section eyebrow label

**Molecules**
`M1` data plaque (time/date/location) · `M2` zodiac/planet medallion (icon+label+arc) · `M3` process-step card (book→compass→chip) · `M4` feature bullet block · `M5` Panchang table row · `M6` annotated-callout node · `M7` institution-type card · `M8` quote/testimonial card · `M9` nav item (underline-draw) · `M10` CTA card

**Organisms**
`O1` header/nav · `O2` live clock centerpiece (Earth + brass ring) · `O3` hero section · `O4` 4-col feature grid · `O5` 3-step process strip · `O6` Panchang data table section · `O7` annotated explainer diagram · `O8` institution segment grid · `O9` footer

---

## 3. Sitemap

1. **Home**
2. **The Clock** (Product)
3. **Heritage / The Idea**
4. **Panchang Guide**
5. **For Institutions**
6. **Enquire / Contact**

---

## 4. Page-by-Page Breakdown

### PAGE 1 — Home
*Purpose: the full pitch in one scroll.*

| Section | Components | Animation |
|---|---|---|
| Hero | O1, O2, O3, A5 | **Assembly sequence**: brass ring + medallions fly in and lock into place on load. **Live terminator globe**: real-time day/night line synced to visitor's local time. Numerals tick live via A5. |
| The Idea (brand intro) | A1, A8, M4 | Sundial-wipe transition into parchment mode as user scrolls past hero |
| Product glance | O4, M2 | Medallions rotate into view individually, staggered, arc (A6) fills as each enters |
| Process strip | O5, M3 | Icons connect via a drawing line (book→compass→chip) that traces itself in on scroll |
| Who it's for | O8, M7 | Cards tilt-in with slight parallax depth, no full 3D |
| CTA | M10, A3 | Button glow pulses gently, synced to a slow "heartbeat" easing, not a generic hover scale |
| Footer | O9, live moon widget | Real current moon-phase medallion, always live |

### PAGE 2 — The Clock (Product)
*Purpose: deep, interactive product showcase.*

| Section | Components | Animation |
|---|---|---|
| Hero variant | O2 (large) | Full-size live globe + ring, same as home but primary focus, higher fidelity |
| **Rotary dial navigation** | O2, M2, A4 | User drags the brass ring to rotate between feature medallions (Sun/Moon/Zodiac/Muhurta) — real drag-rotation physics with momentum + snap-to-medallion. This is the flagship interaction of the whole site. |
| Data readout panel | M1, A5 | As dial rotates, the center plaque cross-fades/re-sets its numerals like a mechanical counter flipping, not a plain fade |
| Spec breakdown | M4, A2 | Static, clean — this section should *not* compete with the dial above it |
| Three dimensions of time | O4 | Vedic / Astronomical / Traditional columns, arc dividers (A6) between them |

### PAGE 3 — Heritage / The Idea
*Purpose: brand story, mostly parchment mode.*

| Section | Components | Animation |
|---|---|---|
| Hero | A1, A8, temple imagery | Slow ken-burns pan on temple/astrolabe photography, no 3D |
| Why sunrise-based time | M4, A7 | Text reveals paired with a small sun-arc that sweeps as you scroll, illustrating sunrise→sunset→sunrise |
| History of Muhurta | M6, O7 | Timeline built from annotated-callout nodes (M6), each drawing in sequentially |
| King Vikramaditya / Ujjain | M8, imagery | Simple parallax image drift, quote card fades in |

### PAGE 4 — Panchang Guide
*Purpose: the educational/SEO engine — most content-dense page.*

| Section | Components | Animation |
|---|---|---|
| Intro | A8, A1 | Static, clean entry |
| Vedic units of time table | O6, M5 | Rows highlight sequentially as scrolled past |
| **The 30 Muhurtas** | O6, A6 | **Scroll-linked arc fill**: the progress-arc genuinely fills 1→30 as user scrolls through the table — this is the signature "comprehension = motion" moment |
| Five Limbs of Panchang | O4, M2 | Tithi/Vara/Nakshatra/Yoga/Karana as five medallions, click-to-expand detail |
| Rashi — Zodiac | O8-variant, M2 | 12-sign wheel, hover reveals meaning (mirrors real product's radial layout) |
| Vikram Samvat | M4 | Static |
| Reading Your Clock | O7 | **Annotated diagram, alive**: red leader-lines draw themselves in on scroll, numbered callouts fade in in sequence (direct lift from your guide PDF's existing pattern) |

### PAGE 5 — For Institutions
*Purpose: segmented B2B pitch.*

| Section | Components | Animation |
|---|---|---|
| Hero | A8, O8 | Four institution cards (Temple/Museum/Educational/Government) arranged around a small static medallion cluster |
| Per-segment deep dive | M7, M4 | Card expands in place on click/tap rather than navigating away — keeps momentum |
| Why choose us | M4, A2 | Simple, confident, minimal motion — this section should read as *credible*, not flashy |
| CTA | M10 | Same heartbeat-glow button as Home for consistency |

### PAGE 6 — Enquire / Contact
*Purpose: conversion.*

| Section | Components | Animation |
|---|---|---|
| Contact form | A3, form fields styled as brass-inset plaques | Field focus = subtle amber glow, matching product's "live data" language |
| Details/map | M1-variant | Static plaque styling for phone/email/website |
| Footer | O9 | Same live moon-phase widget, ties back to Home |

---

## 5. Global Interaction System

- **Nav (O1):** underline-draw on hover (M9), not color-swap
- **Section transitions:** sundial-wipe (diagonal shadow sweep) *only* between navy↔parchment mode changes; plain scroll otherwise
- **Cursor:** default everywhere except O2 (rotary dial), where it becomes a small drag-indicator
- **Loading state:** brief assembly-sequence plays once per session, skippable
- **Reduced motion:** globe becomes a static day/night-mapped image; arcs render pre-filled at current value; dial becomes tap-through instead of drag; all wipes become instant cuts

---

## 6. Build Sequence (order to brief AI models)

1. Design tokens doc (this doc, section 1) → every model gets this first, verbatim
2. Atoms (A1–A8) — one at a time, review, lock
3. Molecules (M1–M10) — built from locked atoms
4. Organisms (O1–O9) — built from locked molecules, **O2 (live globe + rotary dial) gets its own dedicated build pass**, it's the highest-risk/highest-payoff piece
5. Pages, assembled from locked organisms, in order: Home → The Clock → Panchang Guide → Heritage → Institutions → Contact
6. Global choreography pass (transitions, nav, loading state)
7. Responsive pass
8. Reduced-motion / accessibility pass

---

## 7. Open Decisions Still Needed

- [ ] Exact drag-physics feel for the rotary dial (snap-hard vs. loose-momentum) — worth prototyping early since it's the flagship interaction
- [ ] Whether the live-globe uses real geolocation or defaults to a fixed reference city (Ujjain?) with an optional "use my location" toggle
- [ ] Content/copy pass — this doc assumes existing catalogue/guide copy, someone needs to adapt it to web-length
- [ ] Final call on custom vs. licensed Devanagari-flavored display typeface
