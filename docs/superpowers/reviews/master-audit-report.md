# Review Board Master Audit Report: Personal Branding & Data Platform Architecture Website

**Document Status**: Official Review Board Synthesis & Implementation Directive  
**Date**: 2026-09-13  
**Target Candidate**: Setra Genyang Wicana  
**Target Persona**: Senior Data Engineer & Tech Lead (London, UK)  
**Target URL**: `https://gwsetra.github.io`  
**Review Board Supervisor**: `cf6748ba-d5ec-4785-babf-d6e826d05afe`  
**Participating Specialist Auditors**:
- **Goals & Strategic Positioning**: `3ed6d597-42dd-4997-91f7-06ecda19811e`
- **Technical Architecture & Maintainability**: `5707ff25-b659-4180-a13c-b4da4f5a813f`
- **UX, Accessibility & Visitor Experience**: `7279ef0a-1b96-414c-9117-6515189281c9`
- **Security, PII & Compliance**: `590853cf-ef4d-4910-b982-2eb6052561e9`

---

## 1. Executive Verdict & Core Evaluation

### Official Verdict: **PASS WITH REVISIONS**

The architectural plan (`docs/superpowers/plans/2026-09-13-portfolio-website.md`), canonical specification (`openspec/specs/website.md`), and governance constitution (`.specify/constitution.md`) establish a world-class foundation for Setra's online presence. The static-first Astro architecture, self-hosted typography, single-column reading measure, and data platform case studies position him exceptionally well for £95k–£130k Tech Lead roles in the London tech ecosystem.

However, the audit identified **two critical build/security blockers** and **several high-impact strategic/UX refinements** that must be incorporated into the implementation plan before code execution commences:

1. 🚨 **CRITICAL SECURITY BLOCKER**: An active personal phone number was discovered embedded in `docs/brainstorm/01-persona/Revised [UK CV Aug 2024] Setra Genyang Wicana.pdf` within git history. This file must be purged from the git index and history before pushing to GitHub.
2. 🚨 **CRITICAL BUILD BLOCKER**: The package `"@fontsource-variable/geist-sans": "^5.1.0"` specified in Task 1 `package.json` does not exist on npm (returns 404). It must be corrected to `"@fontsource/geist-sans": "^5.3.0"`.
3. ⚠️ **EMPLOYER DISCRETION RISK**: The OpenGraph social card (`public/og-preview.png`) in Task 8 displays `OPEN TO VISA TRANSFER` in large kicker text, broadcasting Setra's job search to current Sainsbury's colleagues when links are shared on LinkedIn or Slack. This must be sanitized to `SENIOR DATA ENGINEER & TECH LEAD • LONDON, UK`.
4. ⚠️ **SENIORITY OPTICS & MOBILE ERGONOMICS**: Displaying 8–9 buttons in the Hero Action Bar (including LeetCode and NeetCode `SolarSharingan193`) conveys a junior "interview grinder" signal rather than platform leadership, while causing jagged 3-line wrapping on mobile screens. LeetCode and NeetCode must be relocated to the Footer and Toolkit.
5. ⚠️ **CI PII ASSERTION VULNERABILITY**: The proposed `grep -rE` in CI fails on compressed PDF streams (`public/cv-setra-wicana.pdf`) and hyphenated/spaced UK numbers. It must be upgraded to a dedicated text-extraction verification script.

---

## 2. Cross-Cutting Trade-Off Adjudications

### Trade-Off 1: OpenGraph Social Banner vs. Active Employment Discretion
- **The Tension**: Goals positioning wants prominent visa sponsorship signaling; Security & Compliance demands discretion to protect Setra's active team leadership role at Sainsbury's.
- **Board Adjudication**: **UNANIMOUS CONSENSUS**.
  - **Live Website**: Retain the high-conversion status pill above the H1:
    `📍 Based in London, UK • Open to UK Skilled Worker Visa transfer opportunities`.
    This captures high-intent recruiters visiting the site.
  - **OpenGraph Social Banner (`public/og-preview.png`)**: Replace the kicker text with:
    `SENIOR DATA ENGINEER & TECH LEAD • LONDON, UK`.
    This allows Setra to share case studies and articles on LinkedIn, Slack, and Twitter without triggering workplace awkwardness or retaliation.

### Trade-Off 2: Executive Authority vs. Algorithmic Proof Points
- **The Tension**: Including LeetCode and NeetCode provides objective proof of CS fundamentals, but placing them in the Hero Action Bar creates visual noise and projects a junior persona.
- **Board Adjudication**: **UNANIMOUS CONSENSUS**.
  - **Hero Action Bar**: Streamlined to 6 high-converting executive touchpoints:
    1. `[Email Me]` (Primary filled pill)
    2. `[Copy]` (Secondary clipboard micro-interaction)
    3. `[Download CV]` (Web-safe PDF)
    4. `LinkedIn ↗`
    5. `GitHub ↗`
    6. `ADPList ↗` (Authentic social proof of leadership & mentorship)
  - **Footer & Toolkit**: Relocate LeetCode and NeetCode links here. Interviewers evaluating algorithmic rigor will easily find them without compromising first-impression executive authority.

### Trade-Off 3: Static Root Paths vs. Subpath / Custom Domain Portability
- **The Tension**: Root-relative paths (`/cv-setra-wicana.pdf`, `/favicon.svg`) are simple, but break if the site is hosted on a GitHub Pages project subpath (`gwsetra.github.io/portfolio/`).
- **Board Adjudication**: **APPROVED**.
  - All internal links and public asset references must use Astro's `import.meta.env.BASE_URL` defensively. Canonical URLs will construct using `new URL(path, Astro.site)`.

### Trade-Off 4: Naive CI Grep vs. Decompressed PDF PII Security Gate
- **The Tension**: A one-line shell command is lightweight, but compressed PDF streams (FlateDecode) bypass naive regex grep.
- **Board Adjudication**: **APPROVED**.
  - Replace the naive grep in Task 9 with `scripts/verify-pii.py`, extracting text from PDFs and checking formatted UK mobile patterns (`+44`, `07xxx`), Indonesian formats (`+62`, `08xx`), and UK residential postcodes.

---

## 3. Specialist Domain Audit Summary

```
+---------------------------------------------------------------------------------------------------+
| DOMAIN                      | SPECIALIST FINDING                                  | STATUS        |
+---------------------------------------------------------------------------------------------------+
| 1. Goals & Positioning      | - London in-country transfer advantage highlighted  | PASS WITH     |
|                             | - Prune LeetCode/NeetCode from Hero to Footer       | REVISIONS     |
|                             | - Align role to "Team Lead, Data Platform"          |               |
|                             | - Discretion: Sanitize OG banner kicker text        |               |
+---------------------------------------------------------------------------------------------------+
| 2. Technical & Architecture | - Astro v5 Content Layer API verified sound         | PASS WITH     |
|                             | - FIX: @fontsource/geist-sans package name bug      | REVISIONS     |
|                             | - Use z.coerce.date() for frontmatter dates         |               |
|                             | - Defensive import.meta.env.BASE_URL for assets     |               |
|                             | - CI concurrency cancel-in-progress: true           |               |
+---------------------------------------------------------------------------------------------------+
| 3. UX & Accessibility       | - Constrained measure (max-w-2xl) & CPL approved    | PASS WITH     |
|                             | - Responsive status pill for screens <450px         | REVISIONS     |
|                             | - Dark mode contrast fix: add dark:text-zinc-400    |               |
|                             | - Minimum 44px touch targets on buttons             |               |
|                             | - Add skip-to-content bypass link                   |               |
|                             | - Copy email: add clearTimeout & aria-live region   |               |
|                             | - Print CSS: expand URLs in parentheses for panels  |               |
+---------------------------------------------------------------------------------------------------+
| 4. Security & Compliance    | - CRITICAL: Purge CV PDF in git history             | PASS WITH     |
|                             | - Sanitize public/og-preview.png kicker text        | REVISIONS     |
|                             | - Upgrade CI PII gate for compressed PDF streams    |               |
|                             | - Escape JSON-LD < tags against XSS breakout        |               |
|                             | - Cookieless UK GDPR / PECR analytics verified      |               |
+---------------------------------------------------------------------------------------------------+
```

---

## 4. Specific Plan Amendments (Actionable Task Punch-List)

The implementation plan (`docs/superpowers/plans/2026-09-13-portfolio-website.md`) must be amended with the following exact changes:

### Pre-Implementation Task 0: Git History PII Purge
- [ ] Remove `docs/brainstorm/01-persona/Revised [UK CV Aug 2024] Setra Genyang Wicana.pdf` from git index.
- [ ] Add `docs/brainstorm/**/*.pdf` to `.gitignore`.
- [ ] Ensure local commit history containing the phone number is reset or scrubbed before any remote push.

### Task 1 Amendments: Scaffolding & Typography
- [ ] In `package.json`, replace `"@fontsource-variable/geist-sans": "^5.1.0"` with `"@fontsource/geist-sans": "^5.3.0"`.
- [ ] In `src/styles/global.css`, replace `@import '@fontsource-variable/geist-sans';` with `@import '@fontsource/geist-sans';`.
- [ ] In `src/styles/global.css`, add vestibular motion protection:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- [ ] In `src/styles/global.css`, enrich `@media print` with URL expansion:
  ```css
  @media print {
    header, footer, button, .no-print { display: none !important; }
    body { background-color: #ffffff !important; color: #000000 !important; }
    pre, article, section { break-inside: avoid; }
    a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.75em; color: #52525b; }
    a[href^="mailto:"]::after { content: " (" attr(href) ")"; font-size: 0.75em; color: #52525b; }
  }
  ```

### Task 2 Amendments: BaseLayout & Security
- [ ] In `src/layouts/BaseLayout.astro`, add Skip-to-content link immediately after `<body>`:
  ```astro
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-zinc-900 focus:text-zinc-100 focus:rounded-md focus:shadow-lg">
    Skip to main content
  </a>
  ```
- [ ] In `src/layouts/BaseLayout.astro`, escape JSON-LD script against injection:
  ```astro
  <script type="application/ld+json" set:html={JSON.stringify(structuredData).replace(/</g, '\\u003c')} />
  ```
- [ ] In `src/layouts/BaseLayout.astro`, use `new URL(image, Astro.site)` for absolute OpenGraph URLs.

### Task 3 Amendments: Header & Theme Toggle
- [ ] In `src/components/ThemeToggle.astro`, ensure minimum 44×44px touch target: `w-11 h-11 inline-flex items-center justify-center`.
- [ ] Add `focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100` for clear keyboard focus rings.

### Task 4 Amendments: Hero Section & Action Bar
- [ ] In `src/components/Hero.astro`, make the status pill mobile-responsive without horizontal clipping:
  ```astro
  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl sm:rounded-full text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 max-w-full">
    <span class="w-2 h-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
    <span class="sr-only">Current Status: </span>
    <span class="sm:hidden font-medium">London, UK • Open to Visa Transfer</span>
    <span class="hidden sm:inline">{siteConfig.status}</span>
  </div>
  ```
- [ ] In `src/components/ActionBar.astro`:
  - Prune `LeetCode` and `NeetCode` links from the Hero Action Bar.
  - Set minimum touch target height: `min-h-[44px]`.
  - Add `aria-live="polite"` and clear existing timeouts in the copy email micro-interaction script.
  - Wrap visual arrows `↗` in `<span aria-hidden="true">↗</span>` and append `<span class="sr-only">(opens in new tab)</span>`.

### Task 5 Amendments: Content Collections
- [ ] In `src/content.config.ts`, update date schema to `pubDate: z.coerce.date()`.

### Task 6 Amendments: Timeline & Toolkit
- [ ] In `src/data/timeline.ts`, standardize Sainsbury's role to `role: "Team Lead, Data Platform"`.
- [ ] In `src/components/Timeline.astro` and `src/components/TechStack.astro`, ensure all metadata tags use `text-zinc-500 dark:text-zinc-400` to satisfy WCAG AA/AAA contrast ratios in dark mode.
- [ ] In `src/components/TechStack.astro` under "Core Languages & Fundamentals", add subtle external links to LeetCode and NeetCode.
- [ ] In `src/components/Footer.astro`, maintain clean icon links to LinkedIn, GitHub, ADPList, LeetCode, and NeetCode.

### Task 8 Amendments: OpenGraph Social Preview Banner
- [ ] In `public/og-preview.png` generation script, replace `LONDON, UK • OPEN TO VISA TRANSFER` with:
  `SENIOR DATA ENGINEER & TECH LEAD • LONDON, UK`.

### Task 9 Amendments: Hardened Verification & CI Gate
- [ ] Create `scripts/verify-pii.py` to:
  1. Scan all files in `src/`, `public/`, and `dist/`.
  2. Extract text streams from all `.pdf` assets (including compressed streams).
  3. Assert 0 occurrences of UK mobile numbers (`(\+44|07\d{3})`), Indonesian numbers (`(\+62|08\d{2})`), and UK residential postcodes.
- [ ] Update `.github/workflows/deploy.yml` with `concurrency: { group: 'pages', cancel-in-progress: true }`.

---

## 5. Master Audit Conclusion & Next Steps

The Review Board finds the personal branding and architecture website project to be of **exceptional quality, clarity, and technical integrity**. By addressing the specific amendments detailed above, the engineering execution will proceed smoothly with **zero broken builds, zero PII leakage, zero workplace friction, 100/100 Lighthouse performance, and maximum conversion** for high-value London Tech Lead opportunities.

**Next Steps**:
1. Proceed with updating the plan (`docs/superpowers/plans/2026-09-13-portfolio-website.md`) with the ratified amendments.
2. Begin implementation execution under `subagent-driven-development`.
