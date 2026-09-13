# Technical Architecture & Maintainability Review: Personal Portfolio & Architecture Website

**Reviewer**: Technical Architecture & Maintainability Specialist  
**Target URL**: `https://gwsetra.github.io`  
**Stack**: Astro v5, Tailwind CSS, TypeScript strict, `@astrojs/sitemap`, GitHub Actions  
**Review Status**: **PASS WITH ARCHITECTURAL REVISIONS**

---

## Executive Summary

The proposed architecture in `openspec/specs/website.md` and `docs/superpowers/plans/2026-09-13-portfolio-website.md` provides a modern, static-first engineering foundation. The choice of **Astro v5 in static generation mode (`output: 'static'`)** aligns with high performance, zero client-side JavaScript by default, and minimal operational maintenance overhead.

The audit examined four core dimensions:
1. **Astro v5 Content Layer Architecture**
2. **Dependency Matrix & Build Verification**
3. **Architecture, Maintainability & URL Routing**
4. **CI/CD Pipeline & GitHub Pages Edge Cases**

---

## 1. Astro v5 Content Layer Architecture (VERIFIED & SOUND)

- **Modern Content Layer API**: The implementation plan in Task 5 correctly uses Astro v5's modern Content Layer API:
  - `src/content.config.ts` (located at `src/content.config.ts`, not the legacy v4 `src/content/config.ts`).
  - Utilizes `defineCollection` and `glob({ pattern: '**/*.md', base: './src/content/projects' })` from `astro:content` and `astro/loaders`.
  - Schema definition using `z.object()` provides strict build-time validation for titles, metrics arrays, tech stack badges, and bilingual post frontmatter.
- **Rendering Model**: Detailed case studies (`src/pages/projects/[slug].astro`) use `getStaticPaths()`, fetching entries via `getCollection('projects')` and rendering via `render(entry)`. This complies 100% with Astro v5 standards.

---

## 2. Dependency Matrix & Build Tooling

- **Dependency Selection in `package.json`**:
  - `astro: "^5.4.2"`: Latest stable major release with Content Layer and optimized asset pipelines.
  - `tailwindcss: "^3.4.17"` & `@astrojs/tailwind: "^5.1.5"`: Highly stable combination with mature typography plugin integration (`@tailwindcss/typography: "^0.5.16"`).
  - `@fontsource-variable/geist-sans: "^5.1.0"` & `@fontsource-variable/jetbrains-mono: "^5.1.0"`: Modern self-hosted variable font packages eliminating external CDN dependencies.
  - `sharp: "^0.33.5"`: Recommended image engine for Astro static image processing.
  - `typescript: "^5.7.3"` & `@astrojs/check: "^0.9.4"`: Strict type checking.
- **Node.js LTS Compatibility**: All selected packages run cleanly on Node.js v20 and v22 LTS without native compilation issues on standard Linux / GitHub Actions runner environments.

---

## 3. Architecture, Maintainability & URL Portability (CRITICAL REVISION)

### 3.1 Base URL Portability Gap
- **Issue**: In `astro.config.mjs`, `base: process.env.BASE_PATH || '/'` is specified to support subpath hosting if needed. However, across components in Tasks 2, 3, 4, and 7:
  - Public assets and links are hardcoded with leading slashes (e.g., `image = '/og-preview.png'`, `href="/cv-setra-wicana.pdf"`, `<a href="/">`).
  - If deployed to a project subpath (e.g. `gwsetra.github.io/portfolio/`), these hardcoded root paths will fail to resolve.
- **Architectural Solution**:
  - Use Astro's built-in `import.meta.env.BASE_URL` or an absolute URL constructor for static public assets.
  - In `site.config.ts`, define paths relative to base URL or resolve via helper.
  - In `BaseLayout.astro`, build full canonical URLs using `new URL(image, Astro.site)` which automatically accounts for base path when `Astro.site` is configured.

### 3.2 Centralized State & Separation of Concerns
- `src/site.config.ts`: Strongly typed single source of truth for social links, contact info, headline, and feature flags. This completely prevents hardcoded contact values scattered across components.
- `src/data/timeline.ts` and `src/data/projects.ts`: Clean separation between structured data arrays and UI presentation components.

---

## 4. CI/CD Pipeline & GitHub Pages Configuration

### 4.1 GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Uses standard pinned GitHub Pages actions:
  - `actions/checkout@v4`
  - `actions/setup-node@v4` with Node 20 / 22 and `cache: 'npm'`
  - `actions/upload-pages-artifact@v3`
  - `actions/deploy-pages@v4`
- Concurrency setting: Update `concurrency: { group: 'pages', cancel-in-progress: true }` to avoid build queues and cleanly cancel stale in-progress builds when rapid commits are pushed.

### 4.2 404 Routing on GitHub Pages
- GitHub Pages natively serves `dist/404.html` on HTTP 404 errors.
- The plan includes `src/pages/404.astro`, which compiles cleanly to `dist/404.html`, ensuring seamless unbranded 404 handling.

---

## Final Technical Verdict & Implementation Action Items

**Verdict**: **PASS WITH ARCHITECTURAL REVISIONS**

**Action Items**:
1. [ ] Implement defensive `BASE_URL` handling for assets in `BaseLayout.astro`, `ActionBar.astro`, and `Header.astro`.
2. [ ] Configure `concurrency: { group: 'pages', cancel-in-progress: true }` in `.github/workflows/deploy.yml`.
3. [ ] Verify `npm run check` and `npm run build` as strict pre-deployment gates in CI.
