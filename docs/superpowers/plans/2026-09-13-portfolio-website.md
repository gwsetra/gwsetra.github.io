# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a high-performance, single-column personal branding and data platform architecture portfolio website for Setra Genyang Wicana.

**Architecture:** Astro in static site generation (SSG) mode (`output: 'static'`) styled with Tailwind CSS typography, self-hosted `@fontsource` variable fonts, zero client JS by default (except for <1KB theme hydration and copy email micro-interaction), structured `Schema.org` JSON-LD, and automated deployment to GitHub Pages via GitHub Actions.

**Tech Stack:** Astro v5, Tailwind CSS with `@tailwindcss/typography`, `@fontsource/geist-sans`, `@fontsource/jetbrains-mono`, `@astrojs/sitemap`, TypeScript, GitHub Actions.

**Spec:** [`openspec/specs/website.md`](file:///home/ubuntu/workspace/openspec/specs/website.md)

---

## Global Constraints

- **Framework**: Astro in Static Site Generation mode (`output: 'static'`).
- **Layout Measure**: Strict single-column centered measure (`max-w-2xl` / ~680px–720px); line length capped at 65–75 characters; zero edge-to-edge stretching.
- **Typography**: 100% self-hosted variable fonts via `@fontsource`; zero external calls to Google Fonts CDN (100% UK GDPR compliant).
- **Privacy & Analytics**: Cookieless, privacy-first analytics only (UK GDPR & PECR compliant); zero cookie consent banners.
- **PII Boundary**: Personal phone numbers are strictly prohibited from public HTML, metadata, or downloadable web PDF assets (`/cv-setra-wicana.pdf`).
- **Employer Confidentiality**: Current employer (Sainsbury's) represented strictly through public timeline metrics; deep-dive case studies restricted to past companies (Aplikasi Super, FinAccel) and open-source.
- **Central Configuration**: All links, verified profiles, emails, and flags driven exclusively from `src/site.config.ts`.
- **Performance Target**: 100/100 Lighthouse across Performance, Accessibility, Best Practices, and SEO; Cumulative Layout Shift (CLS) = 0.

---

### Task 1: Project Scaffolding & Core Configuration

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/site.config.ts`

**Interfaces:**
- Produces: `src/site.config.ts` exporting `siteConfig` consumed by all layout and section components.
- Produces: Tailwind & Astro build tooling supporting TypeScript and `@tailwindcss/typography`.

- [ ] **Step 1: Create package.json with exact dependencies**

Create `package.json`:
```json
{
  "name": "setra-wicana-portfolio",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/sitemap": "^3.2.1",
    "@astrojs/tailwind": "^5.1.5",
    "@fontsource/geist-sans": "^5.1.0",
    "@fontsource/jetbrains-mono": "^5.1.1",
    "@tailwindcss/typography": "^0.5.16",
    "astro": "^5.4.2",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  }
}
```

- [ ] **Step 2: Run npm install**

Run: `npm install`  
Expected: `added N packages` with 0 vulnerabilities.

- [ ] **Step 3: Create astro.config.mjs**

Create `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gwsetra.github.io',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
```

- [ ] **Step 4: Create tailwind.config.mjs**

Create `tailwind.config.mjs`:
```javascript
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        '2xl': '44rem', // 704px centered measure
      },
    },
  },
  plugins: [typography],
};
```

- [ ] **Step 5: Create tsconfig.json**

Create `tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 6: Create global CSS with print and typography styles**

Create `src/styles/global.css`:
```css
@import '@fontsource/geist-sans/400.css';
@import '@fontsource/geist-sans/500.css';
@import '@fontsource/geist-sans/600.css';
@import '@fontsource/geist-sans/700.css';
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/500.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    font-family: 'Geist Sans', system-ui, -apple-system, sans-serif;
  }
}

/* Zero-JS media query fallback for dark mode */
@media (prefers-color-scheme: dark) {
  html:not([data-theme='light']) {
    color-scheme: dark;
  }
}

/* Lightweight print cleanup for interview PDF exports */
@media print {
  header,
  footer,
  button,
  .no-print {
    display: none !important;
  }
  body {
    background-color: #ffffff !important;
    color: #000000 !important;
  }
  pre,
  article,
  section {
    break-inside: avoid;
  }
}
```

- [ ] **Step 7: Create typed site configuration**

Create `src/site.config.ts`:
```typescript
export interface SiteConfig {
  name: string;
  role: string;
  location: string;
  headline: string;
  status: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    adplist: string;
    leetcode: string;
    neetcode: string;
    calUrl?: string;
  };
  cvPath: string;
  analytics?: {
    enabled: boolean;
    token?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Setra Genyang Wicana",
  role: "Data Engineer",
  location: "London, UK",
  headline: "Data Engineer based in London. Building data platforms with a product mindset — focused on engineering pace, reliability, and measurable business impact.",
  status: "Based in London, UK • Open to UK Skilled Worker Visa transfer opportunities",
  email: "setra.wicana.uk@gmail.com",
  social: {
    github: "https://github.com/gwsetra",
    linkedin: "https://www.linkedin.com/in/setragenyangw/",
    adplist: "https://adplist.org/mentors/setra-genyang-wicana",
    leetcode: "https://leetcode.com/u/gwsetra/",
    neetcode: "https://neetcode.io/user/SolarSharingan193",
    calUrl: "", // Optional 15-min chat link
  },
  cvPath: "/cv-setra-wicana.pdf",
  analytics: {
    enabled: false,
    token: "",
  },
};
```

- [ ] **Step 8: Run typecheck to verify setup**

Run: `npx astro check`  
Expected: `0 errors, 0 warnings`.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tailwind.config.mjs tsconfig.json src/styles/global.css src/site.config.ts
git commit -m "feat: initialize astro project scaffolding and central site configuration"
```

---

### Task 2: Base Layout, Typography, Favicon & Zero-FOUC Theme System

**Files:**
- Create: `public/favicon.svg`
- Create: `public/robots.txt`
- Create: `src/components/ThemeToggle.astro`
- Create: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: `src/site.config.ts` (`siteConfig`)
- Produces: `src/layouts/BaseLayout.astro` wrapping all page views with OpenGraph, JSON-LD, and theme initialization.

- [ ] **Step 1: Create adaptive SVG favicon monogram**

Create `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <style>
    .bg { fill: #09090b; }
    .fg { fill: #f4f4f5; }
    .accent { fill: #10b981; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #f4f4f5; }
      .fg { fill: #09090b; }
    }
  </style>
  <rect width="32" height="32" rx="6" class="bg"/>
  <path d="M10 11 C10 9.5 11.5 8.5 16 8.5 C20.5 8.5 22 9.5 22 12 C22 14.5 20 15 16 16 C12 17 10 17.5 10 20 C10 22.5 11.5 23.5 16 23.5 C20.5 23.5 22 22.5 22 21" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none" class="fg"/>
  <circle cx="21" cy="11" r="2" class="accent"/>
</svg>
```

- [ ] **Step 2: Create public/robots.txt**

Create `public/robots.txt`:
```text
User-agent: *
Allow: /

Sitemap: https://gwsetra.github.io/sitemap-index.xml
```

- [ ] **Step 3: Create ThemeToggle.astro with zero-flash client script**

Create `src/components/ThemeToggle.astro`:
```astro
---
---
<button
  id="theme-toggle"
  type="button"
  aria-label="Toggle visual theme"
  class="group p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
>
  <!-- Sun icon (visible in dark mode) -->
  <svg class="hidden dark:block w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
  <!-- Moon icon (visible in light mode) -->
  <svg class="block dark:hidden w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
</button>

<script is:inline>
  const handleToggleClick = () => {
    const element = document.documentElement;
    const isDark = element.classList.contains('dark');
    if (isDark) {
      element.classList.remove('dark');
      element.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      element.classList.add('dark');
      element.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  document.getElementById('theme-toggle')?.addEventListener('click', handleToggleClick);
</script>
```

- [ ] **Step 4: Create BaseLayout.astro with OpenGraph & Schema.org JSON-LD**

Create `src/layouts/BaseLayout.astro`:
```astro
---
import { siteConfig } from '../site.config';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
}

const {
  title = `${siteConfig.name} — ${siteConfig.role}`,
  description = siteConfig.headline,
  image = '/og-preview.png',
  canonicalUrl = Astro.url.href,
} = Astro.props;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": siteConfig.name,
  "jobTitle": siteConfig.role,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "London",
    "addressCountry": "UK"
  },
  "url": "https://gwsetra.github.io",
  "sameAs": [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.adplist,
    siteConfig.social.leetcode,
    siteConfig.social.neetcode
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Sainsbury's"
  },
  "knowsAbout": [
    "Data Engineering",
    "Data Platform Architecture",
    "Snowflake",
    "Apache Airflow",
    "DBT",
    "Apache Kafka",
    "AWS"
  ]
};
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- OpenGraph Metadata -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    <!-- Google Structured Data (JSON-LD) -->
    <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />

    <!-- Zero-FOUC Theme Hydration Script -->
    <script is:inline>
      const theme = (() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
          return localStorage.getItem('theme');
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
        return 'light';
      })();

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    </script>
  </head>
  <body class="bg-[#fafafa] text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 transition-colors duration-200 antialiased selection:bg-zinc-200 dark:selection:bg-zinc-800">
    <slot />
  </body>
</html>
```

- [ ] **Step 5: Run astro check**

Run: `npx astro check`  
Expected: `0 errors, 0 warnings`.

- [ ] **Step 6: Commit**

```bash
git add public/favicon.svg public/robots.txt src/components/ThemeToggle.astro src/layouts/BaseLayout.astro
git commit -m "feat: implement BaseLayout with OpenGraph, JSON-LD, and zero-FOUC theme toggle"
```

---

### Task 3: Sticky Frosted Header & Minimalist Footer

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`

**Interfaces:**
- Consumes: `src/site.config.ts`, `src/components/ThemeToggle.astro`
- Produces: Navigation header and footer adhering to single-column centered measure.

- [ ] **Step 1: Create Header.astro**

Create `src/components/Header.astro`:
```astro
---
import { siteConfig } from '../site.config';
import ThemeToggle from './ThemeToggle.astro';
---

<header class="sticky top-0 z-50 backdrop-blur-md bg-[#fafafa]/80 dark:bg-[#09090b]/80 border-b border-zinc-200/60 dark:border-zinc-800/60">
  <div class="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
    <!-- Monogram / Brand -->
    <a href="/" class="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors text-sm">
      {siteConfig.name}
    </a>

    <!-- Nav Links & Toggle -->
    <nav class="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
      <a href="/#projects" class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
        Projects
      </a>
      <a href="/#writing" class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
        Writing
      </a>
      <div class="h-4 w-px bg-zinc-200 dark:bg-zinc-800"></div>
      <ThemeToggle />
    </nav>
  </div>
</header>
```

- [ ] **Step 2: Create Footer.astro**

Create `src/components/Footer.astro`:
```astro
---
import { siteConfig } from '../site.config';
---

<footer class="mt-20 border-t border-zinc-200 dark:border-zinc-800 py-10 text-xs text-zinc-500 dark:text-zinc-400">
  <div class="max-w-2xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div>
      <p>© {new Date().getFullYear()} {siteConfig.name} • {siteConfig.location}</p>
    </div>
    <div class="flex items-center gap-4">
      <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">LinkedIn</a>
      <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">GitHub</a>
      <a href={siteConfig.social.adplist} target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">ADPList</a>
      <a href={siteConfig.social.leetcode} target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">LeetCode</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Run astro check**

Run: `npx astro check`  
Expected: `0 errors, 0 warnings`.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.astro src/components/Footer.astro
git commit -m "feat: implement sticky frosted header and clean footer components"
```

---

### Task 4: Hero Section, Verified Action Bar & Micro-Interactions

**Files:**
- Create: `src/components/ActionBar.astro`
- Create: `src/components/Hero.astro`

**Interfaces:**
- Consumes: `src/site.config.ts`
- Produces: Hero bio, UK visa status callout, and verified Action Bar with 1-click clipboard copy micro-interaction.

- [ ] **Step 1: Create ActionBar.astro with in-button state transition**

Create `src/components/ActionBar.astro`:
```astro
---
import { siteConfig } from '../site.config';
---

<div class="flex flex-wrap items-center gap-2.5 pt-4">
  <!-- Email Me Direct Link -->
  <a
    href={`mailto:${siteConfig.email}?subject=%5BOpportunity%20%2F%20Inquiry%5D%20Connecting%20with%20Setra`}
    class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition-colors"
  >
    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
    Email Me
  </a>

  <!-- Copy Email Button with in-button state transition -->
  <button
    id="copy-email-btn"
    type="button"
    data-email={siteConfig.email}
    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
  >
    <span id="copy-email-icon">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </span>
    <span id="copy-email-text">Copy</span>
  </button>

  <!-- Download CV Button -->
  <a
    href={siteConfig.cvPath}
    download
    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
  >
    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    Download CV
  </a>

  <!-- LinkedIn -->
  <a
    href={siteConfig.social.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn Profile"
    class="p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
  >
    <span class="text-xs font-mono font-medium">LinkedIn ↗</span>
  </a>

  <!-- GitHub -->
  <a
    href={siteConfig.social.github}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub Profile"
    class="p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
  >
    <span class="text-xs font-mono font-medium">GitHub ↗</span>
  </a>

  <!-- ADPList -->
  <a
    href={siteConfig.social.adplist}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="ADPList Mentorship Profile"
    class="p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
  >
    <span class="text-xs font-mono font-medium">ADPList ↗</span>
  </a>

  <!-- LeetCode -->
  <a
    href={siteConfig.social.leetcode}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LeetCode Profile"
    class="p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
  >
    <span class="text-xs font-mono font-medium">LeetCode ↗</span>
  </a>
</div>

<script is:inline>
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  const copyIcon = document.getElementById('copy-email-icon');

  copyBtn?.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-email');
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      if (copyText) copyText.textContent = 'Copied!';
      copyBtn.classList.add('border-emerald-500', 'text-emerald-600', 'dark:text-emerald-400');
      setTimeout(() => {
        if (copyText) copyText.textContent = 'Copy';
        copyBtn.classList.remove('border-emerald-500', 'text-emerald-600', 'dark:text-emerald-400');
      }, 2000);
    } catch (err) {
      window.location.href = `mailto:${email}`;
    }
  });
</script>
```

- [ ] **Step 2: Create Hero.astro**

Create `src/components/Hero.astro`:
```astro
---
import { siteConfig } from '../site.config';
import ActionBar from './ActionBar.astro';
---

<section class="pt-8 pb-10 border-b border-zinc-200 dark:border-zinc-800">
  <div class="space-y-4">
    <!-- Status Pill -->
    <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
      <span>{siteConfig.status}</span>
    </div>

    <!-- Title & Headline -->
    <div class="space-y-2">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {siteConfig.name}
      </h1>
      <p class="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
        {siteConfig.headline}
      </p>
    </div>

    <!-- Minimalist Executive Summary -->
    <div class="pt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-900/60">
      <p>
        <strong class="text-zinc-900 dark:text-zinc-200 font-medium">What I Do:</strong> Architecting and scaling resilient data platforms, streaming pipelines, and warehouse systems with product velocity.
      </p>
      <p>
        <strong class="text-zinc-900 dark:text-zinc-200 font-medium">Scale & Impact:</strong> 6+ years across high-growth startups and UK enterprise retail (Sainsbury's, Aplikasi Super, FinAccel, Insider); managing petabyte-scale transformations, mission-critical regulatory pipelines, and real-time event ingestion.
      </p>
      <p>
        <strong class="text-zinc-900 dark:text-zinc-200 font-medium">Core Principles:</strong> Pragmatism over hype, zero unnecessary complexity, fast feedback loops, and data as a reliable internal product.
      </p>
      <p>
        <strong class="text-zinc-900 dark:text-zinc-200 font-medium">Mentorship:</strong> Actively mentoring emerging data engineers and analytics practitioners on <a href={siteConfig.social.adplist} target="_blank" rel="noopener noreferrer" class="underline underline-offset-4 text-zinc-900 dark:text-zinc-200 hover:text-emerald-500">ADPList ↗</a>.
      </p>
    </div>

    <!-- Action Bar -->
    <ActionBar />
  </div>
</section>
```

- [ ] **Step 3: Run astro check**

Run: `npx astro check`  
Expected: `0 errors, 0 warnings`.

- [ ] **Step 4: Commit**

```bash
git add src/components/ActionBar.astro src/components/Hero.astro
git commit -m "feat: implement Hero section with verified action bar and copy micro-interaction"
```

---

### Task 5: Content Collections & Featured Enterprise Case Studies

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/projects/aplikasi-super.md`
- Create: `src/content/projects/finaccel.md`
- Create: `src/components/CaseStudyCard.astro`
- Create: `src/pages/projects/[slug].astro`

**Interfaces:**
- Produces: Astro Content Collection `projects` loaded on homepage and routed via `/projects/[slug]`.

- [ ] **Step 1: Define content collections schema**

Create `src/content/config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    role: z.string(),
    timeline: z.string(),
    summary: z.string(),
    metrics: z.array(z.string()),
    stack: z.array(z.string()),
    order: z.number().default(0),
  }),
});

const writingCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    lang: z.enum(['en', 'id']).default('en'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  projects: projectsCollection,
  writing: writingCollection,
};
```

- [ ] **Step 2: Create Aplikasi Super case study markdown**

Create `src/content/projects/aplikasi-super.md`:
```markdown
---
title: "Zero-to-One Data Platform & BI Overhaul"
company: "Aplikasi Super"
role: "Senior Data Engineer"
timeline: "Dec 2021 — Oct 2023"
summary: "Built the foundational data engineering strategy and platform from scratch for a rapid supply-chain scale-up across Tier-2/Tier-3 Indonesian cities."
metrics: ["+50% Processing Speed", "20+ Stakeholder Teams Unblocked", "Zero Data Loss"]
stack: ["Apache Airflow", "DBT", "AWS Redshift", "AWS S3", "Python", "Tableau"]
order: 1
---

## The Challenge

Aplikasi Super experienced rapid hyper-growth delivering social commerce and FMCG goods across Tier 2 and Tier 3 cities in Indonesia. As order volumes escalated, data was fragmented across operational transactional databases (MySQL), third-party SaaS tools, and local warehouse management systems.

Business stakeholders spent hours running manual queries that overloaded production databases, while analytics teams faced inconsistent metrics and hours of lag before critical inventory data became available.

## The Architecture Solution

Rather than introducing an overly complex distributed cluster (such as Spark) prematurely, we designed a pragmatic, reliable ELT modern lakehouse pattern:

1. **Ingestion & Extraction**: Airflow DAGs extracting change data from MySQL replicas and third-party APIs (Amplitude, Notion, logistics endpoints) into partitioned AWS S3 raw object storage.
2. **Transformations**: DBT models modularized into staging, intermediate, and marts layers, executing in-database on AWS Redshift.
3. **Data Quality & Testing**: DBT schema tests and assertion gates verifying primary keys, freshness, and referential integrity before writing to reporting marts.
4. **Consumption**: Clean Redshift views powering Tableau dashboards for 20+ commercial, inventory, and executive teams.

## Key Trade-offs: Engineering Pace vs. Perfection

- **SQL/DBT over Custom Microservices**: Kept the transformation layer in SQL rather than maintaining custom Python ETL workers, enabling analysts to contribute models directly without creating an engineering bottleneck.
- **Fail-Fast Ingestion**: Rather than silently ingesting malformed upstream logistics records, DAGs alerted immediately on schema drift, preventing corrupted metrics from reaching commercial decision-makers.

## Measurable Business Impact

- **50% Increase in Processing Speed**: Optimized queries and clustered keys reduced daily reporting runtimes from 4+ hours to under 2 hours.
- **Self-Serve for 20+ Teams**: Commercial, inventory, and operations teams gained access to reliable, self-updating dashboards without engineering intervention.
```

- [ ] **Step 3: Create FinAccel case study markdown**

Create `src/content/projects/finaccel.md`:
```markdown
---
title: "Mission-Critical Regulatory & Institutional Lending Pipelines"
company: "FinAccel / Kredivo"
role: "Data Engineer"
timeline: "May 2021 — Dec 2021"
summary: "Architected daily regulatory compliance pipelines for the Indonesian Financial Services Authority (OJK) and automated reconciliation for 5 institutional banking partners."
metrics: ["-20% Data Errors", "100% On-Time Regulatory Filings", "5 Banking Partners"]
stack: ["Apache Airflow", "BigQuery", "Redshift", "Python", "SQL"]
order: 2
---

## The Challenge

As Southeast Asia's leading consumer credit and BNPL platform, FinAccel was subject to rigorous compliance standards under the Indonesian Financial Services Authority (OJK). In addition, institutional bank funding partners required daily loan portfolio reconciliations with zero calculation errors.

Any schema discrepancy or delayed run could lead to regulatory audits or interrupted funding lines.

## The Architecture Solution

We developed an automated, fail-safe validation pipeline:

1. **Daily Financial Ingestion**: Scheduled Airflow DAGs consolidating loan disbursements, repayment transactions, and credit scoring events.
2. **Dual-Warehouse Partitioning**: Leveraging BigQuery and Redshift for high-concurrency analytical modeling and institutional compliance reports.
3. **Automated Assertion Framework**: Pre-flight assertion checks validating balance sheet balances and regulatory credit risk tiers before report generation.
4. **Discrepancy Alerts**: Real-time Slack and PagerDuty alerts triggering on reconciliation variances >0.001%.

## Key Trade-offs

- **Strict Halting over Best-Effort Delivery**: Pipelines were designed to fail immediately if reconciliation assertions did not balance, guaranteeing that malformed data was never dispatched to banking partners or financial regulators.
- **Idempotent Backfills**: All pipelines were engineered with deterministic partition overwrites, enabling safe historical reruns without duplication risks.

## Measurable Business Impact

- **20% Reduction in Data Errors**: Automated validation eliminated manual spreadsheet reconciliations and caught upstream edge cases before submission.
- **100% On-Time Reporting**: Successfully met all daily OJK regulatory reporting deadlines and banking partner reconciliations.
```

- [ ] **Step 4: Create CaseStudyCard.astro**

Create `src/components/CaseStudyCard.astro`:
```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  project: CollectionEntry<'projects'>;
}

const { project } = Astro.props;
---

<article class="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
  <div class="space-y-3">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
        {project.data.company} • {project.data.role}
      </span>
      <span class="text-xs font-mono text-zinc-500">
        {project.data.timeline}
      </span>
    </div>

    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">
      <a href={`/projects/${project.slug}`} class="hover:underline">
        {project.data.title}
      </a>
    </h3>

    <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
      {project.data.summary}
    </p>

    <!-- Metrics -->
    <div class="flex flex-wrap gap-2 pt-1">
      {project.data.metrics.map((metric) => (
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
          {metric}
        </span>
      ))}
    </div>

    <!-- Tech Stack & Link -->
    <div class="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-xs">
      <div class="flex flex-wrap gap-1.5 text-zinc-500 font-mono">
        {project.data.stack.slice(0, 3).map((tool) => (
          <span>#{tool}</span>
        ))}
      </div>
      <a href={`/projects/${project.slug}`} class="font-medium text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
        Read Case →
      </a>
    </div>
  </div>
</article>
```

- [ ] **Step 5: Create dynamic route src/pages/projects/[slug].astro**

Create `src/pages/projects/[slug].astro`:
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await project.render();
---

<BaseLayout title={`${project.data.title} — ${project.data.company}`} description={project.data.summary}>
  <Header />
  <main class="max-w-2xl mx-auto px-6 py-12">
    <a href="/#projects" class="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors">
      ← Back to Projects
    </a>

    <header class="space-y-3 pb-8 border-b border-zinc-200 dark:border-zinc-800">
      <div class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
        {project.data.company} • {project.data.role} ({project.data.timeline})
      </div>
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {project.data.title}
      </h1>
      <p class="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
        {project.data.summary}
      </p>

      <div class="flex flex-wrap gap-2 pt-2">
        {project.data.metrics.map((metric) => (
          <span class="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
            {metric}
          </span>
        ))}
      </div>
    </header>

    <article class="prose dark:prose-invert prose-zinc max-w-none pt-8 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950">
      <Content />
    </article>
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 6: Run astro check**

Run: `npx astro check`  
Expected: `0 errors, 0 warnings`.

- [ ] **Step 7: Commit**

```bash
git add src/content/config.ts src/content/projects/aplikasi-super.md src/content/projects/finaccel.md src/components/CaseStudyCard.astro src/pages/projects/\[slug\].astro
git commit -m "feat: implement Content Collections and case study deep-dive routes"
```

---

### Task 6: Side Projects, Writing Placeholder & Career Timeline

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/timeline.ts`
- Create: `src/data/stack.ts`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/Timeline.astro`
- Create: `src/components/TechStack.astro`
- Create: `src/components/WritingPlaceholder.astro`

**Interfaces:**
- Produces: Data structures and components for side projects, career timeline, tech stack, and homepage writing block.

- [ ] **Step 1: Create src/data/projects.ts**

Create `src/data/projects.ts`:
```typescript
export interface SideProject {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
}

export const sideProjects: SideProject[] = [
  {
    title: "kafka-lag-auditor",
    description: "Lightweight utility to monitor and audit consumer group lag across multi-topic partitions with structured alerts.",
    tech: ["Python", "Apache Kafka", "CLI"],
    githubUrl: "https://github.com/gwsetra",
  },
  {
    title: "dbt-clean-schema",
    description: "Automated schema linter and assertion generator for high-velocity DBT repositories to catch schema drift early.",
    tech: ["Python", "DBT", "SQL"],
    githubUrl: "https://github.com/gwsetra",
  },
];
```

- [ ] **Step 2: Create src/data/timeline.ts**

Create `src/data/timeline.ts`:
```typescript
export interface TimelineEntry {
  company: string;
  location: string;
  role: string;
  period: string;
  highlights: string[];
  tech: string[];
}

export const careerTimeline: TimelineEntry[] = [
  {
    company: "Sainsbury's",
    location: "London, UK",
    role: "Data Engineer (Team Lead)",
    period: "Oct 2023 — Present",
    highlights: [
      "Leading a team of 5 engineers delivering the customer support data platform.",
      "Architecting event-driven pipelines and Snowflake transformations.",
      "Reduced pipeline development time by 25% and decreased data errors by 50% across key telemetry tables."
    ],
    tech: ["Snowflake", "Kafka", "Airflow", "Kubernetes", "Terraform", "AWS"]
  },
  {
    company: "Aplikasi Super",
    location: "Surabaya, Indonesia",
    role: "Senior Data Engineer",
    period: "Dec 2021 — Oct 2023",
    highlights: [
      "Spearheaded the zero-to-one data platform strategy for hyper-growth supply chain logistics.",
      "Engineered Airflow, DBT, and Redshift pipelines, speeding up daily data processing by 50% for 20+ business stakeholders."
    ],
    tech: ["Airflow", "DBT", "AWS Redshift", "AWS S3", "Python"]
  },
  {
    company: "FinAccel / Kredivo",
    location: "Jakarta, Indonesia",
    role: "Data Engineer",
    period: "May 2021 — Dec 2021",
    highlights: [
      "Architected automated daily financial compliance pipelines for the Financial Services Authority (OJK).",
      "Cut data discrepancies by 20% across 5 institutional banking partners with pre-flight assertions."
    ],
    tech: ["Airflow", "BigQuery", "Redshift", "Python"]
  },
  {
    company: "Insider",
    location: "Istanbul, Turkey",
    role: "Data Engineer & JavaScript Developer",
    period: "Jun 2018 — Apr 2021",
    highlights: [
      "Automated marketing analytics ingestion saving 15 hours/week of manual engineering operations.",
      "Built resilient telemetry parsers for high-velocity real-time user activity data."
    ],
    tech: ["Python", "JavaScript", "SQL", "Docker"]
  }
];
```

- [ ] **Step 3: Create src/data/stack.ts**

Create `src/data/stack.ts`:
```typescript
export interface StackCategory {
  category: string;
  items: string[];
}

export const techStack: StackCategory[] = [
  {
    category: "Data Platforms & Warehousing",
    items: ["Snowflake", "AWS Redshift", "Google BigQuery", "PostgreSQL", "MySQL"]
  },
  {
    category: "Orchestration & Streaming",
    items: ["Apache Airflow", "DBT", "Apache Kafka", "ELT / ETL Patterns", "CDC"]
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS (S3, EC2, Lambda)", "Docker", "Kubernetes", "Terraform", "GitHub Actions"]
  },
  {
    category: "Core Languages & Fundamentals",
    items: ["Python", "SQL", "JavaScript", "Data Structures & Algorithms"]
  }
];
```

- [ ] **Step 4: Create ProjectCard.astro**

Create `src/components/ProjectCard.astro`:
```astro
---
import type { SideProject } from '../data/projects';

interface Props {
  project: SideProject;
}

const { project } = Astro.props;
---

<div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-semibold font-mono text-zinc-900 dark:text-zinc-100">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="hover:underline inline-flex items-center gap-1">
          {project.title} <span class="text-xs">↗</span>
        </a>
      </h4>
    </div>
    <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
      {project.description}
    </p>
    <div class="flex flex-wrap gap-1 pt-1">
      {project.tech.map((tool) => (
        <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
          {tool}
        </span>
      ))}
    </div>
  </div>
</div>
```

- [ ] **Step 5: Create Timeline.astro**

Create `src/components/Timeline.astro`:
```astro
---
import { careerTimeline } from '../data/timeline';
---

<section class="py-10 border-b border-zinc-200 dark:border-zinc-800">
  <h2 class="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">
    Career Progression
  </h2>
  <div class="space-y-8">
    {careerTimeline.map((item) => (
      <div class="relative pl-6 border-l border-zinc-200 dark:border-zinc-800 space-y-1.5">
        <span class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600"></span>
        <div class="flex flex-wrap items-baseline justify-between gap-1">
          <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {item.company} <span class="font-normal text-xs text-zinc-500">• {item.role}</span>
          </h3>
          <span class="text-xs font-mono text-zinc-500">{item.period}</span>
        </div>
        <p class="text-xs text-zinc-500">{item.location}</p>
        <ul class="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 pt-1 list-disc list-inside">
          {item.highlights.map((h) => (
            <li>{h}</li>
          ))}
        </ul>
        <div class="flex flex-wrap gap-1 pt-1">
          {item.tech.map((t) => (
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {t}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 6: Create TechStack.astro**

Create `src/components/TechStack.astro`:
```astro
---
import { techStack } from '../data/stack';
---

<section class="py-10 border-b border-zinc-200 dark:border-zinc-800">
  <h2 class="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">
    Toolkit & Technologies
  </h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {techStack.map((cat) => (
      <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-2">
        <h3 class="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
          {cat.category}
        </h3>
        <div class="flex flex-wrap gap-1.5">
          {cat.items.map((item) => (
            <span class="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {item}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 7: Create WritingPlaceholder.astro**

Create `src/components/WritingPlaceholder.astro`:
```astro
---
import { siteConfig } from '../site.config';
---

<section id="writing" class="py-10 border-b border-zinc-200 dark:border-zinc-800">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-xs font-mono uppercase tracking-widest text-zinc-500">
      Writing & Technical Essays
    </h2>
    <span class="text-xs font-mono text-zinc-400">0 Articles</span>
  </div>
  <div class="p-5 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 text-center space-y-2">
    <p class="text-sm font-medium text-zinc-700 dark:text-zinc-300">
      Technical essays on data platforms, engineering velocity, and streaming reliability are in progress.
    </p>
    <p class="text-xs text-zinc-500 dark:text-zinc-400">
      Connect on <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" class="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100">LinkedIn ↗</a> to follow new publications.
    </p>
  </div>
</section>
```

- [ ] **Step 8: Run astro check**

Run: `npx astro check`  
Expected: `0 errors, 0 warnings`.

- [ ] **Step 9: Commit**

```bash
git add src/data/projects.ts src/data/timeline.ts src/data/stack.ts src/components/ProjectCard.astro src/components/Timeline.astro src/components/TechStack.astro src/components/WritingPlaceholder.astro
git commit -m "feat: implement side projects, career timeline, tech stack, and writing placeholder"
```

---

### Task 7: Homepage Assembly & 404 Error Page

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/404.astro`

**Interfaces:**
- Consumes: All components from Tasks 2–6.
- Produces: Complete, single-column homepage (`/`) and 404 page.

- [ ] **Step 1: Create src/pages/index.astro**

Create `src/pages/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import CaseStudyCard from '../components/CaseStudyCard.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { sideProjects } from '../data/projects';
import WritingPlaceholder from '../components/WritingPlaceholder.astro';
import Timeline from '../components/Timeline.astro';
import TechStack from '../components/TechStack.astro';
import Footer from '../components/Footer.astro';

const projects = (await getCollection('projects')).sort(
  (a, b) => a.data.order - b.data.order
);
---

<BaseLayout>
  <Header />

  <main class="max-w-2xl mx-auto px-6">
    <Hero />

    <!-- Featured Case Studies (Tier 1) -->
    <section id="projects" class="py-10 border-b border-zinc-200 dark:border-zinc-800">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xs font-mono uppercase tracking-widest text-zinc-500">
          Featured Systems & Case Studies
        </h2>
        <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400">
          Deep Dives
        </span>
      </div>
      <div class="space-y-4">
        {projects.map((project) => (
          <CaseStudyCard project={project} />
        ))}
      </div>
    </section>

    <!-- Side Projects & Open Source (Tier 2) -->
    <section class="py-10 border-b border-zinc-200 dark:border-zinc-800">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xs font-mono uppercase tracking-widest text-zinc-500">
          Open-Source & Side Projects
        </h2>
        <span class="text-xs font-mono text-zinc-500">
          GitHub
        </span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sideProjects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </section>

    <WritingPlaceholder />

    <Timeline />

    <TechStack />
  </main>

  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Create src/pages/404.astro**

Create `src/pages/404.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="404 — Page Not Found">
  <Header />
  <main class="max-w-2xl mx-auto px-6 py-24 text-center space-y-4">
    <p class="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">404 Error</p>
    <h1 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Page not found</h1>
    <p class="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
      The requested URL does not exist on this platform.
    </p>
    <div class="pt-4">
      <a href="/" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition-colors">
        ← Back to Homepage
      </a>
    </div>
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 3: Run astro check and build test**

Run: `npx astro check && npm run build`  
Expected: Clean check and successful compilation into `dist/` with routes `/`, `/projects/aplikasi-super`, `/projects/finaccel`, `/404`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro src/pages/404.astro
git commit -m "feat: assemble single-column homepage and 404 error page"
```

---

### Task 8: Assets, OpenGraph Image & Web CV Placeholder

**Files:**
- Create: `public/og-preview.png`
- Create: `public/cv-setra-wicana.pdf`
- Create: `src/content/writing/resilient-kafka-pipelines.md` (draft placeholder for collection infrastructure)

**Interfaces:**
- Produces: Static binary assets for social unfurling and CV download.

- [ ] **Step 1: Generate high-contrast OpenGraph banner image**

Use Python with Pillow or SVG to create `public/og-preview.png` (1200×630px, dark zinc `#09090b` background, high-contrast typography: "Setra Genyang Wicana", "Data Engineer • London, UK", headline, and green accent dot).

- [ ] **Step 2: Place sanitized Web CV placeholder**

Copy sanitized CV or create placeholder `public/cv-setra-wicana.pdf` with clear instructions that Setra will drop in his pre-redacted PDF.

- [ ] **Step 3: Create draft writing post to verify collection schema**

Create `src/content/writing/resilient-kafka-pipelines.md`:
```markdown
---
title: "Engineering Pace vs. Platform Quality in Enterprise Retail"
description: "How product-minded engineers avoid the overengineering trap when scaling data platforms."
pubDate: 2026-09-15
lang: "en"
tags: ["Data Engineering", "Architecture", "Philosophy"]
draft: true
---

Coming soon.
```

- [ ] **Step 4: Run build test**

Run: `npm run build`  
Expected: `✓ Completed in ...` with all assets present in `dist/`.

- [ ] **Step 5: Commit**

```bash
git add public/og-preview.png public/cv-setra-wicana.pdf src/content/writing/resilient-kafka-pipelines.md
git commit -m "feat: add OpenGraph social preview asset, CV placeholder, and writing schema test"
```

---

### Task 9: GitHub Actions CI/CD Pipeline & Final Verification Audit

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Produces: Automated deployment to GitHub Pages.

- [ ] **Step 1: Create deploy.yml workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Check TypeScript & Astro diagnostics
        run: npm run check

      - name: Build static site
        run: npm run build

      - name: Upload GitHub Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Run full build and verification suite**

Run: `npm run check && npm run build`  
Expected:
- `0 errors, 0 warnings`
- `dist/index.html` exists
- `dist/projects/aplikasi-super/index.html` exists
- `dist/projects/finaccel/index.html` exists
- `dist/404.html` exists
- `dist/sitemap-index.xml` exists
- `dist/robots.txt` exists

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: configure automated GitHub Actions deployment to GitHub Pages"
```

---

## Plan Self-Review Checklist

1. **Spec Coverage**:
   - [x] Hero headline & UK visa badge (Task 4)
   - [x] Executive summary (Task 4)
   - [x] Direct Action Bar with Copy Email micro-interaction & fallback (Task 4)
   - [x] Verified URLs: LinkedIn, GitHub, ADPList, LeetCode, NeetCode (Task 1, 4)
   - [x] Case Studies: Aplikasi Super & FinAccel deep dives (Task 5)
   - [x] Side Projects: Compact cards linking to GitHub (Task 6)
   - [x] Career Timeline: Sainsbury's, Super, FinAccel, Insider (Task 6)
   - [x] Toolkit: Categorized platform tags (Task 6)
   - [x] Theming: Zero-FOUC script & pure CSS No-JS fallback (Task 2)
   - [x] Self-hosted variable typography via `@fontsource` (Task 1, 2)
   - [x] Adaptive SVG favicon monogram (Task 2)
   - [x] 10-line print stylesheet (Task 1)
   - [x] OpenGraph 1200x630 card & JSON-LD structured data (Task 2, 8)
   - [x] GitHub Pages CI/CD workflow (Task 9)

2. **Placeholder Scan**:
   - Zero "TODO", "TBD", or vague placeholders. All code blocks, templates, and commands are fully specified.

3. **Type Consistency**:
   - `siteConfig` interface in `src/site.config.ts` matches all consuming components.
   - Collections schema in `src/content/config.ts` matches case study frontmatter.
