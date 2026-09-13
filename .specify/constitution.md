# Project Constitution & Governance

**Project**: Setra Genyang Wicana — Personal Branding, Portfolio & Data Platform Architecture Website  
**Domain**: `https://gwsetra.github.io` (Custom domain ready)  
**Methodology**: Superpowers + Spec-Driven Development (Spec-Kit + OpenSpec)

---

## 1. Non-Negotiable Architecture Guardrails

1. **Static-First Execution (Zero Client-JS by Default)**:
   - Built exclusively with **Astro** in Static Site Generation mode (`output: 'static'`).
   - The site must be 100% readable and navigable with JavaScript completely disabled.
   - Client scripts are strictly limited to tiny, isolated micro-interactions:
     - Inline `<script>` in `<head>` (<1KB) for Zero-FOUC theme hydration.
     - In-button clipboard copy toggle for the email action button.

2. **Reading Measure & Visual Restraint**:
   - Strict single-column centered measure (`max-w-2xl` / ~680px–720px) with responsive horizontal padding.
   - Content must **never** stretch edge-to-edge on wide screens (enforcing 65–75 characters per line).
   - No floating banners, sticky widgets, pop-ups, or distracting animations.
   - Sticky frosted header must maintain a subtle translucent backdrop blur without obscuring content.

3. **Self-Hosted Typography & 100% Privacy Compliance**:
   - All fonts must be self-hosted via `@fontsource` (Geist / Inter for sans-serif, JetBrains Mono for monospace).
   - Zero external font CDNs (e.g., Google Fonts).
   - Cookieless, privacy-first analytics only (UK GDPR & PECR compliant). Zero cookie consent banners permitted.

4. **PII Protection & Employer Confidentiality**:
   - Personal phone numbers are strictly prohibited from public HTML, metadata, or downloadable web PDF assets.
   - The downloadable web CV (`public/cv-setra-wicana.pdf`) must remain sanitized of personal phone numbers.
   - Current employer (Sainsbury's) information is strictly restricted to public timeline achievements and CV metrics. In-depth case studies are limited to past companies (Aplikasi Super, FinAccel) and personal open-source projects.

5. **Centralized Configuration**:
   - All external profile links, contact addresses, and feature flags must be driven from a single, strongly-typed configuration file (`src/site.config.ts`).
   - No hardcoded social links, emails, or analytics tokens across individual Astro components.

---

## 2. Performance & Quality Budgets

| Metric | Threshold | Enforcement |
| :--- | :--- | :--- |
| **Lighthouse Performance** | **100 / 100** | Checked on production build |
| **Lighthouse Accessibility** | **100 / 100** | Checked on production build |
| **Lighthouse Best Practices** | **100 / 100** | Checked on production build |
| **Lighthouse SEO** | **100 / 100** | Checked on production build |
| **Cumulative Layout Shift (CLS)** | **0.00** | Self-hosted preloaded fonts & explicit image dimensions |
| **First Contentful Paint (FCP)** | **< 0.8s** | Zero-JS static HTML delivery via GitHub Pages CDN |
| **TypeScript / Astro Check** | **0 errors, 0 warnings** | `npm run check` (Astro diagnostic compiler) |

---

## 3. Testing, Verification & Delivery Rules

1. **Pre-Commit Verification**:
   - Every atomic commit must pass `npm run check` (Astro typecheck) and `npm run build` cleanly before committing.
   - Never commit failing builds, broken links, or unverified changes.

2. **Automated CI/CD Pipeline**:
   - Deployed via `.github/workflows/deploy.yml` to GitHub Pages on every push to `main`.
   - Concurrency groups configured to cancel in-progress runs safely.

3. **Evolutionary Governance**:
   - Any architectural changes, package additions, or governance modifications must be proposed as scoped changes and ratified in this constitution before code implementation.
