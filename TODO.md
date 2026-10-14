# 🏛️ Vikramaditya Vedic Clock — Master Implementation Plan & To-Do List

> **Last Updated:** October 2026  
> **Status:** Active Development · Core Foundation Live · Pre-Launch Enhancements  
> **Repository:** `vedic_ghadi_web`

---

## 📊 High-Level Project Status

| Area | Status | Progress | Notes |
| :--- | :---: | :---: | :--- |
| **Home Page (`/`)** | ✅ Complete | 100% | Interactive 3D/2D clock dial, features, process, patrons |
| **Heritage Page (`/heritage`)** | ✅ Complete | 100% | Pinned Hyperiux scroll + Rail cards, light/dark images |
| **Panchang Guide (`/guide`)** | ✅ Complete | 100% | Deep dive into Tithi, Nakshatra, Yoga, Karana, Rashi |
| **Panchang Table (`/panchang`)** | ✅ Complete | 100% | Daily astronomical breakdown |
| **Digital Catalogue (`/catalogue`)** | ✅ Complete | 100% | Brochure preview & direct download |
| **Contact & Enquiries (`/contact`)** | ✅ Complete | 100% | Resend API live with verified `@thevedicghadi.in` domain |
| **The Dedicated Clock Page (`/clock`)** | ⏳ Pending | 10% | Currently a redirect stub; needs dedicated fullscreen instrument |
| **Editorial & Blog Platform (`/blog`)** | ✅ Complete | 100% | Full listing with search, category filters, LazyImage, and /blog/[slug] reader |
| **SEO, Sitemap & Robots (`/sitemap.xml`)** | ⏳ Pending | 20% | Dynamic sitemap, canonicals, and per-page meta tags needed |
| **AEO (AI Answer Engine Optimization)** | ⏳ Pending | 10% | JSON-LD schema (Org, Product, FAQ, Breadcrumbs) needed |
| **Open Graph (OG) & Social Sharing** | ⏳ Pending | 20% | 1200x630 share card & Twitter preview metadata needed |
| **Favicons, App Icons & Web Manifest** | ⏳ Pending | 30% | PWA manifest, Apple touch icon, and multi-res favicons needed |
| **Performance, Alt Text & Image Polish** | ⏳ Pending | 60% | Alt text audit, CLS checks, and LCP preloading |

---

## 📌 Phase 1: The Dedicated Clock Page (`/clock`)

*Transform the `/clock` redirect into a standalone, immersive horological instrument.*

- [ ] **1.1 Core Architecture & Layout**
  - [ ] Replace redirect in `src/app/clock/page.tsx` with a dedicated fullscreen page.
  - [ ] Header integration with minimal zen mode toggle (collapse navbar for distraction-free viewing).
  - [ ] Theme persistence (Cosmic Dark default with warm Parchment support).
- [ ] **1.2 Real-Time Vedic Time Display**
  - [ ] Large, prominent Ghati, Pala, and Vipala live digital counter ($1\text{ Ghati} = 24\text{ mins}$, $60\text{ Palas} = 1\text{ Ghati}$, $60\text{ Vipalas} = 1\text{ Pala}$).
  - [ ] Current Muhurta indicator (1 of 30 Muhurtas) with Sanskrit name, deity/attribute, and exact start/end timestamps.
  - [ ] Sunrise-to-sunset daytime progress arc vs night progress arc.
- [ ] **1.3 Interactive Controls & Location Switching**
  - [ ] Primary baseline: **Ujjain $0^\circ$ Prime Meridian** ($23.1765^\circ\text{ N}, 75.7885^\circ\text{ E}$).
  - [ ] "Use My Location" GPS toggle for localized sunrise calibration.
  - [ ] Major sacred city presets: Ujjain, Varanasi, Ayodhya, Haridwar, New Delhi, Bengaluru, London, New York.
- [ ] **1.4 Audio & Ambient Experience**
  - [ ] Optional subtle sound toggle: Temple bell chime at the transition of each Muhurta / Ghati.
  - [ ] Fullscreen toggle (F11 / native browser Fullscreen API).

---

## 📰 Phase 2: Editorial & Blog Platform (`/blog`)

*Build an authoritative publication hub for Vedic astronomy, history, and horology.*

- [x] **2.1 Blog Architecture & Content Layer**
  - [x] Directory structure: `src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx`.
  - [x] Content model: Structured article registry (`src/data/blog-articles.ts`).
  - [x] Categories: *Astronomy & Math*, *Sacred Horology*, *Historical Heritage*, *Panchang Science*, *Philosophy of Time*.
- [x] **2.2 Blog Listing Page (`/blog`)**
  - [x] Editorial hero header and preserved ambient radial glow aesthetics.
  - [x] Category filter pills (`All`, `Sacred Horology`, `Historical Heritage`, etc.) + live instant search.
  - [x] Article card grid with `LazyImage`, author, read time, date, bilingual titles, and category badge.
- [x] **2.3 Article Reader Page (`/blog/[slug]`)**
  - [x] Full editorial reading experience with author bio, hero cover, and related reading recommendations.
  - [x] Sanskrit shloka callout blocks with authentic translations.
- [x] **2.4 Launch Articles (12 Seed Articles Built & Active)**
  - [x] Complete registry of 12 horological, astronomical, and heritage publications.

---

## 🔍 Phase 3: SEO (Search Engine Optimization)

*Ensure top-tier indexing, ranking, and search discoverability on Google & Bing.*

- [x] **3.1 Global Foundation & Canonical Architecture**
  - [x] Defined `metadataBase: new URL('https://thevedicghadi.in')` in `src/app/layout.tsx`.
  - [x] Global title template (`%s | Vikramaditya Vedic Clock`).
  - [x] Comprehensive bilingual keyword clusters (English & Devanagari Hindi).
  - [x] OpenGraph & Twitter Card high-resolution image configuration (`shastras-to-silicon.jpg`).
- [x] **3.2 Server-Client Decoupling & Per-Route Metadata**
  - [x] Decoupled client views from `src/app/` page files to export distinct server-side metadata:
    - `/` — *"The Living Geometry of Time | Vikramaditya Vedic Clock"*
    - `/heritage` — *"Sacred Meridian of Ujjain & Historical Heritage · Avanti 0°"*
    - `/guide` — *"The Panchang & Muhurta Guide · Astronomy of Vedic Timekeeping"*
    - `/catalogue` — *"Artisan Timepieces & Institutional Commissions · Catalogue"*
    - `/contact` — *"Acquisitions & Institutional Enquiries · Contact Us"*
    - `/blog` — *"Chronicles of Celestial Horology · Research & Publications"*
    - `/blog/[slug]` — Dynamic `generateMetadata` and `generateStaticParams` per article with SSR `BlogPosting` JSON-LD schema.
- [ ] **3.3 Automated XML Sitemap (`src/app/sitemap.ts`)**
  - [ ] Dynamic sitemap returning all canonical routes + 12 dynamic blog posts with proper `priority` and `changeFrequency`.
  - [ ] Accessible at `https://thevedicghadi.in/sitemap.xml`.
- [ ] **3.4 Crawler Directives (`src/app/robots.ts`)**
  - [ ] Set up `robots.txt` declaring allowed paths, disallowing `/api/*`, whitelisting AI bots (GPTBot, PerplexityBot, ClaudeBot), and referencing `/sitemap.xml`.

---

## 🤖 Phase 4: AEO (Answer Engine Optimization for AI Search)

*Format the site so Perplexity, ChatGPT Search, Gemini, and Claude cite Vedic Ghadi directly.*

- [ ] **4.1 Schema.org Structured Data (JSON-LD)**
  - [ ] **`Organization` Schema**: Shiv Enterprises, official logo, founding info, verified contact details.
  - [ ] **`Product` / `Timepiece` Schema**: Specifications of the Vikramaditya Vedic Clock (materials, digital features, astronomical calibration).
  - [ ] **`FAQPage` Schema**: Direct question-and-answer pairs:
    - *"What is the Vikramaditya Vedic Clock?"*
    - *"How does sunrise-based time differ from 24-hour standard time?"*
    - *"What is a Muhurta in Vedic horology?"*
    - *"Why is Ujjain considered the Greenwich of ancient times?"*
  - [ ] **`BreadcrumbList` Schema**: Clear hierarchical pathing for all subpages.
  - [ ] **`Article` Schema**: Applied to all blog posts with author, publisher, and date published.
- [ ] **4.2 Semantic Direct-Answer Modules**
  - [ ] Factual, self-contained summary capsules at the top of informational sections for RAG scrapers.

---

## 📱 Phase 5: Open Graph (OG) & Social Sharing Cards

*Make every shared link look stunning on WhatsApp, X, LinkedIn, Telegram, and Facebook.*

- [ ] **5.1 Open Graph Meta Tags**
  - [ ] `og:type: "website"`
  - [ ] `og:site_name: "Vikramaditya Vedic Clock"`
  - [ ] `og:locale: "en_IN"`
  - [ ] Route-specific `og:title` and `og:description`.
- [ ] **5.2 Dedicated 1200×630px OG Image**
  - [ ] Create/optimize high-resolution social share banner (`public/og-image.webp` / `public/og-image.png`).
  - [ ] Featuring the golden dial, Sanskrit typography, and "Avanti Meridian $0^\circ$".
- [ ] **5.3 Twitter / X Cards**
  - [ ] `twitter:card: "summary_large_image"`
  - [ ] `twitter:title`, `twitter:description`, `twitter:image`.

---

## 🎨 Phase 6: App Icons, PWA Manifest & Brand Assets

*Complete browser tab polish and mobile home screen installation.*

- [ ] **6.1 Multi-Resolution Favicon Suite**
  - [ ] Vector SVG favicon (`src/app/icon.svg` / `public/favicon.svg`) with golden dial motif.
  - [ ] Fallback `favicon.ico` (16×16, 32×32, 48×48).
  - [ ] High-res PNG icon (`icon-192.png`, `icon-512.png`).
- [ ] **6.2 Apple Touch Icon**
  - [ ] `apple-touch-icon.png` ($180 \times 180\text{ px}$) for iOS bookmarks and home screen shortcuts.
- [ ] **6.3 Web App Manifest (`manifest.webmanifest`)**
  - [ ] App name: *"Vikramaditya Vedic Clock"*
  - [ ] Short name: *"Vedic Clock"*
  - [ ] Theme color: `#03060E` (Cosmic Dark)
  - [ ] Background color: `#03060E`
  - [ ] Display mode: `standalone`

---

## ⚡ Phase 7: Performance, Media & Image Quality

*Final pre-launch technical and visual audit.*

- [ ] **7.1 Comprehensive Alt Text Audit**
  - [ ] Review every `<img>` and ensure descriptive, keyword-rich, accessible `alt` text.
- [ ] **7.2 Cumulative Layout Shift (CLS) Guard**
  - [ ] Ensure all images and icons declare explicit width/height or aspect ratios.
- [ ] **7.3 LCP Optimization & Asset Preloading**
  - [ ] Preload above-the-fold hero assets for sub-second First Contentful Paint.
- [ ] **7.4 Production Build Verification**
  - [ ] Run complete `npm run build` to verify 0 errors, clean static generation, and optimal bundle size.

---

## 🎯 Next Recommended Steps
1. **Approve / refine this roadmap.**
2. Choose where to start:
   - **Option A (Interactive)**: Build **Phase 1: The Dedicated Clock Page (`/clock`)**.
   - **Option B (Content & Reach)**: Build **Phase 2: The Blog Platform (`/blog`)**.
   - **Option C (Search & Sharing)**: Build **Phase 3, 4 & 5: SEO, AEO, Dynamic Sitemap, and Open Graph cards**.
