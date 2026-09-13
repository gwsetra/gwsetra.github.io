# Security, PII & Compliance Specialist — Formal Audit Report

**To**: Review Board Supervisor (`cf6748ba-d5ec-4785-babf-d6e826d05afe`)  
**From**: Security, PII & Compliance Specialist (`590853cf-ef4d-4910-b982-2eb6052561e9`)  
**Project**: Setra Genyang Wicana — Personal Branding & Data Platform Architecture Portfolio  
**Audit Status**: **PASS WITH REQUIRED SECURITY REVISIONS**

---

### Executive Summary

A comprehensive security, privacy, and compliance audit was performed across:
- **Plan**: `docs/superpowers/plans/2026-09-13-portfolio-website.md`
- **Spec**: `openspec/specs/website.md`
- **Governance**: `.specify/constitution.md`
- **Repository Assets & Git History**: Live files, commits, and binary attachments.

The overall architecture demonstrates commendable security hygiene: static Astro SSG mode, zero client runtime JavaScript by default, self-hosted `@fontsource` fonts, and cookieless UK GDPR/PECR compliance.

However, the audit identified **one CRITICAL PII vulnerability already present in the git repository**, **three vulnerabilities in the automated CI PII assertion gate**, and **two necessary hardening enhancements for employer discretion and script injection defense**.

---

### 1. PII Redaction & Leakage Prevention

#### 🚨 CRITICAL FINDING: Active PII Discovered in Repository
- **Location**: `docs/brainstorm/01-persona/Revised [UK CV Aug 2024] Setra Genyang Wicana.pdf` (committed in `e025a53`).
- **Discovery**: Decoding the embedded PDF content streams via ToUnicode CMap revealed Setra's actual personal UK mobile number:
  ```text
  Setra Genyang Wicana | setra.wicana.uk@gmail.com | +447445898217 | https://linkedin.com/in/setragenyangw
  ```
- **Severity**: **HIGH / BLOCKER**. If this repository is pushed to a public remote on GitHub, Setra's personal phone number will be permanently indexed in git history.
- **Remediation**:
  1. Purge `Revised [UK CV Aug 2024] Setra Genyang Wicana.pdf` from git index and history (or sanitize the commit history prior to publishing to GitHub).
  2. Add `docs/brainstorm/**/*.pdf` to `.gitignore`.

#### ⚠️ Flaws in the Proposed CI Grep Assertion Gate (Task 9)
The proposed CI assertion:
```bash
! grep -rE "(\+44|\+62|07[0-9]{9})" dist/ public/
```
suffers from three critical limitations:
1. **Compressed Binary PDF Blind Spot**: Modern PDFs (including `public/cv-setra-wicana.pdf`) use Flate/zlib compression for text streams and font CMap encoding. Standard `grep -rE` does **not** decompress or parse PDF streams. It will return exit code 1 (no match), inverted to 0 by `!`, giving a **false sense of security** while leaking phone numbers in binary PDF downloads.
2. **Formatting Evasions**: The regex `07[0-9]{9}` requires 9 consecutive digits with zero whitespace. Standard UK formats (`07445 898 217`, `+44 7445 898217`, `+44 (0)7...`) or Indonesian domestic numbers (`0812...`) completely bypass this check.
3. **Restricted Scope**: The check only scans `dist/` and `public/`, ignoring `src/`, `docs/`, and configuration files where leaks often originate.
4. **Missing Postcode / Address Check**: While `BaseLayout.astro` safely restricts address metadata to locality ("London") and country ("UK"), the gate has zero pattern checks for UK residential postcodes (`[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}`).

**Required Remediation**:
Replace the raw one-line grep in Task 9 with a dedicated pre-flight verification script (`scripts/verify-pii.py` or `.sh`) in CI that:
- Scans all files across `src/`, `public/`, and `dist/`.
- Validates against formatted phone regexes: `(\+44|\+62|0044|0062|07\d{3}|08\d{2})[\s.-]?\d{3,4}[\s.-]?\d{3,4}`.
- Decompresses and extracts text from any `.pdf` located in `public/` or `dist/` before asserting zero phone numbers.
- Asserts absence of UK residential postcodes.

---

### 2. Employer Confidentiality & Intellectual Property

1. **Sainsbury's (Current Employer — Team Lead, Data Platform)**:
   - **Compliance**: The representation of Sainsbury's in the Career Timeline and Hero summary is strictly confined to high-level public metrics (team of 5, 25% pipeline development time reduction, 50% error reduction on telemetry tables).
   - **Safe Topology**: No internal database names, IP ranges, VPC configurations, proprietary algorithms, or confidential partner terms are disclosed.
   - **Work GitHub**: The spec explicitly mandates that Setra's corporate GitHub account remains strictly unlinked.
   - **OpenGraph Banner Sensitivity (Adjudicated)**:
     - The OG preview banner in Task 8 originally had `LONDON, UK • OPEN TO VISA TRANSFER` in large kicker text.
     - When unfurled on LinkedIn or Slack, this broadcasts active job hunting to current Sainsbury's colleagues and leadership.
     - **Recommendation**: Approved change to `SENIOR DATA ENGINEER & TECH LEAD • LONDON, UK`, keeping the visa sponsorship line exclusively on-page in the Hero status pill.

2. **Aplikasi Super (Past Employer — Senior Data Engineer)**:
   - Case study details canonical ELT architectures (Airflow, DBT, Redshift, S3).
   - Trade-offs focus on engineering velocity vs premature complexity (SQL over custom microservices).
   - No customer data, vendor commercial agreements, or internal supply chain unit economics are leaked.

3. **FinAccel / Kredivo (Past Employer — Data Engineer)**:
   - Regulatory case study references public regulator (OJK) and generalized "5 institutional banking partners" without naming individual institutions.
   - Reconciliation thresholds (>0.001%) and balance sheet validation frameworks are industry-standard patterns.
   - Zero proprietary credit scoring algorithms or customer financial records exposed.

---

### 3. Web Security & Injection Risks

1. **JSON-LD Script Breakout Defense (`BaseLayout.astro`)**:
   - Code: `<script type="application/ld+json" set:html={JSON.stringify(structuredData)} />`
   - **Risk**: In HTML parsers, any occurrence of `</script>` inside a `<script>` tag terminates the block, enabling raw HTML/script execution. While current values originate from `site.config.ts`, standard OWASP defense-in-depth requires escaping `<`:
     ```astro
     <script type="application/ld+json" set:html={JSON.stringify(structuredData).replace(/</g, '\\u003c')} />
     ```
2. **Markdown Content Rendering**:
   - Managed via Astro v5 Content Collections and `render()`.
   - All content is first-party static markdown. No user-generated content or arbitrary HTML passthrough risks exist.
3. **Theme Toggle & Client Scripts**:
   - `localStorage.getItem('theme')` is strictly evaluated against `'dark'`.
   - The DOM attribute is assigned via static string literals (`'dark'` or `'light'`), never concatenated from untrusted storage. DOM-based XSS is completely mitigated.
4. **Action Bar Interactions & Reverse Tabnabbing**:
   - All external outbound links specify `rel="noopener noreferrer" target="_blank"`, preventing reverse tabnabbing and referrer leakage.
   - Email copy fallback safely assigns `mailto:`.

---

### 4. Compliance & Third-Party Scripts

1. **Cloudflare Web Analytics (UK GDPR & PECR Regulation 6)**:
   - The beacon operates without cookies, without local storage identifiers, and without IP logging or fingerprinting.
   - **Compliance Verdict**: 100% compliant with UK GDPR and PECR Regulation 6. **Zero cookie consent banners are required**.
   - Disabled by default in `site.config.ts` (`enabled: false`), preventing any third-party network requests out of the box.
2. **Self-Hosted Typography**:
   - All fonts (Geist Sans, JetBrains Mono) are packaged via `@fontsource-variable`.
   - Eliminates all external calls to Google Fonts CDN, complying with UK/EU GDPR cross-border IP transfer standards and eliminating Cumulative Layout Shift.
3. **GitHub Pages & CI/CD Pipeline**:
   - GitHub Actions permissions are strictly scoped to least-privilege: `contents: read`, `pages: write`, `id-token: write`.
   - `npm ci` guarantees deterministic, immutable dependency trees.
   - GitHub Pages enforces HTTPS and Let's Encrypt certificates by default.

---

### Final Verdict & Required Action Items

**Verdict**: **PASS WITH REVISIONS**

**Action Items for Implementation Team**:
1. [ ] Purge `docs/brainstorm/01-persona/Revised [UK CV Aug 2024] Setra Genyang Wicana.pdf` from the repository and git history before pushing to GitHub.
2. [ ] Upgrade the CI PII assertion gate in Task 9 to scan `src/`, `public/`, and `dist/`, handle formatted numbers/postcodes, and decompress PDF assets.
3. [ ] Apply `JSON.stringify(structuredData).replace(/</g, '\\u003c')` in `src/layouts/BaseLayout.astro`.
4. [ ] Sanitize the OpenGraph kicker in Task 8 from `OPEN TO VISA TRANSFER` to `SENIOR DATA ENGINEER & TECH LEAD • LONDON, UK`.
