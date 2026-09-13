# Specification: Personal Branding & Data Platform Portfolio Website

**Document Status**: Canonical Ground-Truth Specification  
**Version**: 1.0.0  
**Owner**: Setra Genyang Wicana  
**Target URL**: `https://gwsetra.github.io` (Custom domain ready)

---

## 1. Executive Summary & Persona Positioning

### 1.1 Core Identity
- **Full Name**: Setra Genyang Wicana
- **Professional Role**: Senior Data Engineer & Tech Lead based in London, UK
- **Headline**:
  > "Data Engineer based in London. Building data platforms with a product mindset — focused on engineering pace, reliability, and measurable business impact."
- **Current Position Anchor**:
  - `Currently: Team Lead, Data Platform at Sainsbury's (London, UK)`
- **UK Market & Sponsorship Status**:
  - Prominent in-country advantage indicator:  
    `📍 Based in London, UK • Open to UK Skilled Worker Visa transfer opportunities`
- **Positioning Philosophy**:
  - *Show, Don't Tell*: Pragmatism demonstrated through business outcomes, engineering pace, and reliability rather than buzzwords.
  - *Full-Lifecycle Platform Focus*: Combining software engineering fundamentals with distributed data systems (Snowflake, Kafka, Airflow, DBT, AWS, Kubernetes).
  - *Leadership & Mentorship*: Highlighting both team leadership at Sainsbury's (team of 5) and active community coaching on ADPList.

### 1.2 Executive Summary (Minimalist & Scan-Friendly)
- **Currently**: Team Lead, Data Platform at Sainsbury's (leading 5 engineers delivering customer support data systems).
- **What I Do**: Architecting and scaling resilient data platforms, streaming pipelines, and warehouse systems with product velocity.
- **Scale & Impact**: 6+ years across high-growth startups and UK enterprise retail (Sainsbury's, Aplikasi Super, FinAccel, Insider); managing petabyte-scale transformations, mission-critical regulatory pipelines, and real-time event ingestion.
- **Core Principles**: Pragmatism over hype, zero unnecessary complexity, fast feedback loops, and data as a reliable internal product.
- **Mentorship & Community**: Mentoring emerging data engineers and analytics practitioners on [ADPList](https://adplist.org/mentors/setra-genyang-wicana).

---

## 2. Inbound Outreach & Verified Profiles

All external touchpoints are strongly typed and centralized in `src/site.config.ts`:

| Channel | Destination / Value | Presentation |
| :--- | :--- | :--- |
| **Email** | `setra.wicana.uk@gmail.com` | Direct `mailto:` with pre-filled subject + 1-click Copy button |
| **Copy Email Feedback** | Micro-interaction | In-button state swap to `[✓ Copied!]` for 2s (fallback to selection) |
| **LinkedIn** | `https://www.linkedin.com/in/setragenyangw/` | High-contrast external link (`↗`) |
| **Personal GitHub** | `https://github.com/gwsetra` | High-contrast external link (`↗`) |
| **ADPList** | `https://adplist.org/mentors/setra-genyang-wicana` | Recognizable ADPList icon link (`↗`) |
| **LeetCode** | `https://leetcode.com/u/gwsetra/` | Clean LeetCode icon link (`↗`) |
| **NeetCode** | `https://neetcode.io/user/SolarSharingan193` | Clean NeetCode icon link (`↗`) |
| **Web-Safe CV** | `/cv-setra-wicana.pdf` | Direct 1-click download (phone number excluded) |
| **Intro Call (Optional)**| Configurable URL (Cal.com / Calendly) | Displayed only when `calUrl` is configured in `site.config.ts` |

*(Note: Work GitHub remains strictly confidential and will not be displayed or linked).*

---

## 3. Visual Design, Layout & Theming

### 3.1 Layout & Reading Measure
- **Constrained Measure**: Single-column centered measure with `max-w-2xl` (~680px–720px) and responsive horizontal padding (`px-6 py-12`). Line length capped at 65–75 characters per line to eliminate reader eye fatigue.
- **Header**: Sticky top with frosted backdrop blur (`sticky top-0 z-50 backdrop-blur-md bg-[#fafafa]/80 dark:bg-[#09090b]/80 border-b border-zinc-200/60 dark:border-zinc-800/60`).
  - Left: Brand monogram / name ("Setra Wicana" linking to `/`).
  - Right: Navigation links (**Projects**, **Writing**) and Sun/Moon theme toggle.
  - Mobile (<640px): Simplifies to brand monogram and theme toggle to preserve vertical screen real estate.
- **Mobile Action Bar**: High-priority tap targets for `[Email Me]` and `[Download CV]`, with compact icon buttons for LinkedIn, GitHub, ADPList, LeetCode, and NeetCode.

### 3.2 Color Tokens & Theming Lifecycle
- **Light Mode**:
  - Background: `#FAFAFA` (Off-white editorial paper)
  - Text Primary: `#18181B` (Zinc-900)
  - Text Muted: `#71717A` (Zinc-500)
  - Borders: `#E4E4E7` (Zinc-200)
- **Dark Mode**:
  - Background: `#09090B` (Deep Zinc-950)
  - Text Primary: `#F4F4F5` (Zinc-100)
  - Text Muted: `#A1A1AA` (Zinc-400)
  - Borders: `#27272A` (Zinc-800)
- **Zero-FOUC Hydration**: Inline `<script>` in `<head>` executes prior to rendering, reading `localStorage.getItem('theme')` or system `matchMedia('(prefers-color-scheme: dark)')` and setting the `.dark` class.
- **Zero-JS Resilience**: Pure CSS `@media (prefers-color-scheme: dark)` handles theme styles natively when JavaScript is disabled or blocked.
- **Favicon**: Adaptive SVG monogram (`public/favicon.svg`) with internal CSS media queries for high contrast in both light and dark browser tabs.
- **Print Stylesheet (`@media print`)**: 10-line CSS utility in `global.css` forcing black text on pure white paper and hiding interactive header/buttons for clean PDF exports by interviewers.

### 3.3 Typography
- **Primary Sans**: Self-hosted Geist / Inter via `@fontsource` (variable weights 400, 500, 600, 700).
- **Monospace**: Self-hosted JetBrains Mono via `@fontsource` (weights 400, 500) for code snippets, badges, and metrics.
- Zero external calls to Google Fonts CDN (100% GDPR compliant, CLS = 0).

---

## 4. Section Architecture & Content Structure

### 4.1 Homepage (`/`)
1. **Header**: Sticky frosted bar with logo, navigation anchors/links, and theme toggle.
2. **Hero Section**: Headline, UK Skilled Worker Visa status badge, minimalist executive summary, and Direct Action Bar.
3. **Featured Systems (Tier 1 Case Studies)**:
   - *Aplikasi Super*: Zero-to-One Data Platform & BI Overhaul (Airflow, DBT, Redshift, AWS S3/EC2/Lambda). Highlights: 50% speed increase, 20+ stakeholders.
   - *FinAccel / Kredivo*: Mission-Critical Regulatory & Institutional Lending Pipeline (Airflow, BigQuery, Redshift). Highlights: 20% error reduction, daily compliance for OJK and 5 lending partners.
   - Teaser cards with tech stack badges and "Read Architecture Deep Dive →" link to `/projects/<slug>`.
4. **Open-Source & Side Projects (Tier 2)**:
   - Compact grid driven by `src/data/projects.ts`.
   - Direct external links to GitHub (`↗`).
5. **Writing Placeholder Block**:
   - Header: `WRITING`
   - Content: *"Technical essays on data platforms, engineering velocity, and streaming reliability are in progress. Connect on [LinkedIn] to follow updates."*
6. **Career Journey / Experience Timeline**:
   - *Sainsbury's* (London, UK) — Oct 2023–Present (Data Engineer / Team Lead)
   - *Aplikasi Super* (Surabaya, Indonesia) — Dec 2021–Oct 2023 (Senior Data Engineer)
   - *FinAccel / Kredivo* (Jakarta, Indonesia) — May 2021–Dec 2021 (Data Engineer)
   - *Insider* (Istanbul, Turkey) — Jun 2018–Apr 2021 (Data Engineer & JS Developer)
7. **Toolkit & Technologies**:
   - Grouped clean tags: Data Platforms & Warehousing, Orchestration & Streaming, Cloud & Infrastructure, Core Languages & Fundamentals.
8. **Footer**:
   - Location stamp: *"Crafted in London, UK • Setra Genyang Wicana"*.
   - Quick icon links to GitHub, LinkedIn, ADPList, LeetCode, and NeetCode.
   - Built with Astro indicator.

### 4.2 Dedicated Case Study Detail Pages (`/projects/[slug]`)
- Template structure:
  1. Header: System Title, Company, Role, Timeline, Impact Badges.
  2. The Context & Challenge.
  3. The Architectural Solution (diagram and tech stack breakdown).
  4. Pragmatic Trade-offs (Engineering pace vs premature complexity).
  5. Business Impact & Measurable Outcomes.
  6. Back navigation (`← Back to Projects`).

### 4.3 Writing Infrastructure (`/writing`, `/writing/[slug]`)
- Infrastructure fully wired using Astro Content Collections (`src/content/writing/`).
- Schema support for bilingual posts (`lang: 'en' | 'id'`, `translationKey`, `tags`, `pubDate`).

### 4.4 404 Error Page (`404.astro`)
- Clean, on-brand single-column layout with a link back to `/`.

---

## 5. SEO, OpenGraph & Distribution Engine

1. **Schema.org Structured Data**:
   - Embedded `Person` and `ProfilePage` JSON-LD script containing verified name, London location, current role at Sainsbury's, education at Sakarya University, and `sameAs` array linking to LinkedIn, GitHub, ADPList, LeetCode, and NeetCode.
2. **OpenGraph & Twitter Cards**:
   - Dedicated 1200×630px card at `public/og-preview.png`.
   - Full `<meta>` tag suite for rich social unfurling in LinkedIn DMs, InMail, Slack, and WhatsApp.
3. **Crawlability & Sitemaps**:
   - Automated `sitemap-index.xml` via `@astrojs/sitemap`.
   - Standard `robots.txt`.
4. **Privacy-First Cookieless Analytics**:
   - Configurable snippet in `src/site.config.ts` (Cloudflare Web Analytics or Umami).
   - Zero cookies, no IP tracking, no cookie banner needed under UK GDPR and PECR.

---

## 6. Build, Deployment & CI/CD Pipeline

- **Build Target**: Static Site Generation (`output: 'static'`).
- **Base Path**: Configurable via `base: process.env.BASE_PATH || '/'` (defaults to root `/`).
- **CI/CD Workflow (`.github/workflows/deploy.yml`)**:
  - Triggers on `push` to `main`.
  - Node.js LTS (v20+ / v24).
  - Steps: `npm ci` $\rightarrow$ `npm run check` $\rightarrow$ `npm run build` $\rightarrow$ `actions/deploy-pages@v4`.
- **Target Host**: GitHub Pages at `https://gwsetra.github.io` (£0 cost, global CDN, auto-SSL).
