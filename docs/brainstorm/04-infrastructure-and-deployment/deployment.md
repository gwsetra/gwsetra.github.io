# Hosting, Infrastructure & Deployment Strategy

## Selected Approach: GitHub Pages via GitHub Actions

### Key Rationale
- **Zero Third-Party Accounts**: Everything remains 100% self-contained within Setra's GitHub account and repository.
- **Cost**: £0 forever with no tier limits or unexpected billing.
- **Automation**: Fully automated continuous deployment. Every commit pushed to `main` triggers a GitHub Actions workflow that lints, builds the Astro static output, and deploys it to GitHub Pages.
- **Custom Domain Ready**: Supports a custom domain (`setrawicana.com` or similar) via GitHub Pages CNAME settings, with automatic HTTPS certificate provisioning via Let's Encrypt.

---

## Technical Specifications

### 1. Astro Build Output & URL Routing
- **Target**: Static Site Generation (`output: 'static'` in `astro.config.mjs`).
- **Adapter**: None needed (pure static HTML, CSS, and optimized assets in `dist/`).
- **Base Path Strategy**: Configurable via `base: process.env.BASE_PATH || '/'`.
  - Default: Root path `/` (works seamlessly with `<username>.github.io` or any custom domain like `setrawicana.com`).
  - Subpath fallback: If hosted on a project repo (e.g. `gwsetra/portfolio`), the CI/CD workflow passes `BASE_PATH=/portfolio` with zero code modifications.
- **Custom Domain Ready**: A simple `public/CNAME` file can be added whenever Setra configures a custom domain.

### 2. CI/CD Workflow (`.github/workflows/deploy.yml`)
- **Triggers**:
  - `push` to `main` branch.
  - `workflow_dispatch` (manual trigger).
- **Concurrency**: `group: "pages"`, `cancel-in-progress: false`.
- **Permissions**:
  - `contents: read`
  - `pages: write`
  - `id-token: write`
- **Steps**:
  1. Checkout repository.
  2. Setup Node.js (LTS v20+) with caching.
  3. Install dependencies (`npm ci`).
  4. Run lint and typecheck (`npm run check`).
  5. Build static site (`npm run build`).
  6. Upload artifact (`actions/upload-pages-artifact@v3`).
  7. Deploy to GitHub Pages (`actions/deploy-pages@v4`).

### 3. SEO, Canonical URLs & OpenGraph Metadata
- Configurable `site` property in `astro.config.mjs` (default: `https://gwsetra.github.io`, cleanly overridable with custom domain).
- Automatic generation of `sitemap-index.xml` via `@astrojs/sitemap`.
- Canonical `<link rel="canonical" ...>` injected into every page `<head>`.
- **OpenGraph & Twitter Card Metadata**:
  - Pre-rendered high-contrast 1200×630px social share card located at `public/og-preview.png`.
  - Comprehensive `<meta>` tags for `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card` (`summary_large_image`), and `twitter:title`.
  - Guarantees rich, professional link unfurling when shared in LinkedIn DMs, InMail, Slack, and WhatsApp.

### 4. Privacy-First Cookieless Analytics (UK GDPR & PECR Compliant)
- **Engine**: Lightweight (<2KB) cookieless script (e.g., Cloudflare Web Analytics beacon or Umami / GoatCounter).
- **Compliance**: Zero cookies, no IP logging, no cross-site tracking. 100% compliant with UK GDPR and PECR without requiring an intrusive cookie banner.
- **Config-Driven**: Controlled via `analytics` setting in `site.config.ts`. If omitted or empty, zero analytics scripts or external network calls are rendered.
