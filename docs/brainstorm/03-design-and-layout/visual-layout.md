# Visual Design, Layout & Writing Architecture

## Design References
- [matklad (Aleksey Kladov)](https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html)
- [Geoff Huntley](https://ghuntley.com/ralph/)
- [lexi-lambda (Alexis King)](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)

## Core Layout Principles
1. **Constrained Single-Column Reading Measure**:
   - **Never stretch edge-to-edge on wide screens.**
   - Strict `max-width` (optimal 680px – 720px / `max-w-2xl`) centered with responsive horizontal padding.
   - Line length capped at 65–75 characters for effortless, fatigue-free reading.
2. **Zero Distraction, Content-First Aesthetic**:
   - No floating sidebars, no sticky widgets, no flashing banners.
   - Clean, elegant typography with generous vertical rhythm.
   - **Sticky Frosted Header**:
     - Fixed to top of viewport with smooth translucent backdrop blur (`sticky top-0 z-50 backdrop-blur-md bg-[#fafafa]/80 dark:bg-[#09090b]/80 border-b border-zinc-200/60 dark:border-zinc-800/60`).
     - Minimalist layout with brand mark/name, text navigation links (Home, Projects, Writing), and Sun/Moon theme toggle.
     - **Mobile Adaptations (<640px)**:
       - Header simplifies to brand monogram/name and Sun/Moon toggle to preserve vertical space.
       - **Streamlined Mobile Action Bar**: Prioritizes `[Email Me]` and `[Download CV]` as primary tap targets, with compact icon buttons for `[LinkedIn]` and `[GitHub]`, preventing awkward vertical stretching.
   - **Theme & Color Mode**:
     - Auto-detects system OS preference (`prefers-color-scheme`) by default.
     - Clean, accessible toggle in the header (Sun/Moon icon) for manual override, persisted in `localStorage`.
     - Zero-FOUC (Flash of Unstyled Content): An inline script in `<head>` executes before rendering to prevent white/dark flashes.
     - **Palette**:
       - *Light Mode*: Editorial crisp paper (`bg-[#fafafa]` / `text-zinc-900`, muted `text-zinc-500`, border `border-zinc-200`).
       - *Dark Mode*: Deep technical zinc (`bg-[#09090b]` / `text-zinc-100`, muted `text-zinc-400`, border `border-zinc-800`).
     - **Zero-JavaScript Resilience**:
       - If JS is disabled or blocked, pure CSS `@media (prefers-color-scheme: dark)` seamlessly applies dark theme rules without any script execution.
       - Manual toggle button is cleanly hidden via `<noscript>` / `.no-js` styles.
       - Email address is displayed in plain text alongside the mailto link so it remains manually selectable and copyable.
3. **Engineering-Grade Code Blocks**:
   - Beautiful, readable syntax highlighting for Python, SQL, YAML, Bash, and Rust.
   - Inline code badges and easy copy-to-clipboard buttons.
4. **Self-Hosted Typography & Font Delivery**:
   - **Primary Sans**: Self-hosted Geist / Inter via `@fontsource` (modern, legible, variable weight).
   - **Technical Monospace**: Self-hosted JetBrains Mono via `@fontsource` for code blocks, badges, and metrics.
   - **Performance & Privacy**: 100% self-hosted within the static bundle (zero third-party Google Fonts requests, 100% GDPR-compliant, zero Cumulative Layout Shift / CLS = 0).
5. **Lightweight Print Cleanup (`@media print`)**:
   - Clean, 10-line CSS utility in `global.css` ensuring crisp PDF exports when recruiters or interviewers save/print a page.
   - Hides interactive chrome (sticky header, theme switch, action buttons, footer).
   - Forces clean black text on pure white paper (`bg-white text-black`), preventing dark-mode ink bleed.
   - Preserves code blocks and case study sections without mid-line page breaks (`break-inside: avoid`).
6. **Adaptive SVG Favicon Monogram (`public/favicon.svg`)**:
   - Modern, geometric `S` monogram with a subtle data platform node accent.
   - Embeds internal CSS `@media (prefers-color-scheme: dark)` so the monogram automatically inverts to remain high-contrast whether the visitor's browser tab bar is light or dark.

## Writing / Publishing Workflow
- **File-Based Markdown Authoring**:
  - Add new writing by simply creating a new `.md` file in `content/writing/<slug>.md`.
  - Simple frontmatter:
    ```yaml
    ---
    title: "Designing Resilient Kafka Pipelines for Enterprise Retail"
    date: "2026-09-15"
    description: "Lessons learned on error reduction, consumer lag, and GDPR compliance."
    lang: "en" # "en" (default/primary) or "id"
    translationKey: "resilient-kafka-pipelines" # optional: links English and Indonesian versions
    tags: ["Data Engineering", "Kafka", "Architecture"]
    ---
    ```
- **Bilingual Experience**:
  - English is the primary default language.
  - If an article has an Indonesian version, a subtle switcher appears under the title: `Available in: [English] • [Bahasa Indonesia]`.
  - Writing index can be viewed all-together or filtered by language.
- **Automated Publishing Features**:
  - Automatic reading time calculation (e.g. "5 min read").
  - Tag filtering and clean chronological archive.
- **Visual Editing (Zero Maintenance)**:
  - The `content/writing/` directory uses standard Markdown, meaning you can optionally open it directly as a vault in **Obsidian** or **Typora** for rich-text visual editing with zero configuration, plugins, or auth setup required. No web CMS to maintain.
