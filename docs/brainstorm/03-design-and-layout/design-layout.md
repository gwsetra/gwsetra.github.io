# Comprehensive Design Layout Specification

## 1. Global Layout Specifications

```text
                                 Screen Width (100%)
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│                      Centered Content Column (Max ~700px)                        │
│                      ────────────────────────────────────                        │
│                      • Max Width: 680px – 720px (max-w-2xl)                      │
│                      • Margin: mx-auto (equal whitespace left/right)             │
│                      • Padding: px-6 py-12 (responsive mobile to desktop)        │
│                      • Measure: 65–75 characters per line for optimal reading    │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Color Palette & Theme Tokens
* **Light Mode:**
  * Background: `#FAFAFA` (Off-white, soft on eyes)
  * Text Primary: `#171717` (Near black)
  * Text Muted: `#737373` (Neutral gray for dates and metadata)
  * Borders / Dividers: `#E5E5E5`
  * Code Block Background: `#F5F5F5`
* **Dark Mode:**
  * Background: `#0A0A0A` (Deep dark, battery-efficient)
  * Text Primary: `#EDEDED` (Soft white, avoids harsh contrast)
  * Text Muted: `#A1A1A1`
  * Borders / Dividers: `#262626`
  * Code Block Background: `#171717`

### Typography Hierarchy
* **Headings:** Inter or Geist (Clean, modern sans-serif with tight tracking `-0.02em`).
* **Body:** Clean sans-serif, 16px font size, 1.75 line-height (`leading-relaxed`) for effortless long-form reading.
* **Code / Technical Details:** JetBrains Mono (14px, crisp monospace with subtle syntax highlighting).

---

## 2. Homepage (`/`) — Section by Section

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Setra Wicana]                                          Writing  Projects  [☼]  │ <-- Header (Sticky, clean)
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ HERO SECTION                                                                    │
│ Setra Genyang Wicana                                                            │
│ Data Engineer based in London.                                                  │
│ Building data platforms with a product mindset — focused on                     │
│ engineering pace, reliability, and measurable business impact.                  │
│                                                                                 │
│ I bridge software engineering fundamentals with modern data                     │
│ infrastructure. Currently at Sainsbury's leading a team of 5                    │
│ engineers; previously scaling data systems in Indonesia and Turkey.             │
│                                                                                 │
│ 📍 Based in London, UK • Open to UK Skilled Worker Visa transfer opportunities   │
│                                                                                 │
│ [Download CV ↗]   [GitHub ↗]   [LinkedIn ↗]   [Email ↗]                         │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ RECENT WRITING                                                  [All Posts →]   │
│                                                                                 │
│ 15 Sep 2026   Designing Resilient Kafka Pipelines for Retail                    │
│               Lessons on consumer lag, error reduction, and GDPR compliance.    │
│                                                                                 │
│ 10 Aug 2026   Engineering Pace vs. Platform Quality                             │
│               How product-minded engineers avoid the overengineering trap.      │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ SELECTED ARCHITECTURE CASE STUDIES                                              │
│                                                                                 │
│ • Aplikasi Super — Zero-to-One BI & Data Platform                   [Read Case →]
│   Airflow • DBT • Redshift • AWS • REST APIs                                    │
│   Built the complete data engineering strategy from scratch for a rapid         │
│   supply-chain scale-up. Sped up processing by 50% for 20+ stakeholders.        │
│                                                                                 │
│ • FinAccel / Kredivo — Mission-Critical Regulatory Data             [Read Case →]
│   Airflow • BigQuery • Redshift • Automated Validation                          │
│   Architected daily financial authority (OJK) compliance and institutional      │
│   lending pipelines, cutting data errors by 20% across 5 lending partners.      │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ OPEN-SOURCE & SIDE PROJECTS                                                     │
│                                                                                 │
│ • kafka-lag-auditor ↗                                                           │
│   Lightweight CLI utility to audit consumer group lag across multi-topic clusters│
│   Python • Kafka • CLI                                                          │
│                                                                                 │
│ • dbt-clean-schema ↗                                                            │
│   Automated linter and schema checker for high-velocity DBT repositories.       │
│   Python • DBT • SQL                                                            │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ EXPERIENCE                                                                      │
│                                                                                 │
│ Sainsbury's               Data Engineer                           2023 — Present│
│ London, UK                • Lead team of 5 engineers on customer support platform│
│                           • Snowflake, Kafka, Airflow, Kubernetes, Terraform     │
│                           • 50% error reduction, -25% pipeline development time │
│                                                                                 │
│ Aplikasi Super            Senior Data Engineer                     2021 — 2023  │
│ Surabaya, Indonesia       • Led data strategy from scratch, 50% processing speed│
│                                                                                 │
│ FinAccel / Kredivo        Data Engineer                            2021 — 2021  │
│ Jakarta, Indonesia        • Daily financial compliance & institutional lending  │
│                                                                                 │
│ Insider                   Data Engineer & JavaScript Dev           2018 — 2021  │
│ Istanbul, Turkey          • Automated reporting (-15 hrs/wk), led frontend team │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ TOOLKIT & TECHNOLOGIES                                                          │
│                                                                                 │
│ Platforms & Storage:  Snowflake, Redshift, BigQuery, MySQL                      │
│ Orchestration:        Apache Airflow, DBT, Kafka                                │
│ Cloud & Infra:        AWS (S3, EC2, Lambda), Docker, Kubernetes, Terraform      │
│ Core Languages:       Python, SQL, JavaScript/TypeScript                        │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│ © 2026 Setra Genyang Wicana • London, UK • Built with Astro                     │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Article / Writing Page Layout (`/writing/[slug]`)

When a user clicks on an article, the single-column measure remains locked to `~680px`, giving it an editorial feel like `matklad` or `lexi-lambda`:

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ← Back to Writing                                                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ Designing Resilient Kafka Pipelines for Retail                                  │
│ Published 15 September 2026 • 6 min read • Tags: #Kafka #Snowflake              │
│ Available in: [English (Selected)] • [Bahasa Indonesia 🇮🇩]                      │
│ ─────────────────────────────────────────────────────────────────────────────── │
│                                                                                 │
│ When integrating multiple high-velocity support tools into a centralized        │
│ warehouse, the primary bottleneck is rarely raw throughput — it is consumer     │
│ lag and schema drift...                                                         │
│                                                                                 │
│ ### The Architecture Pattern                                                    │
│                                                                                 │
│ Here is how the event streaming layer was structured:                           │
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │ # Python Kafka Consumer Loop                                          [Copy]│ │
│ │ def process_support_event(message: dict) -> None:                           │ │
│ │     validated = EventSchema.model_validate(message.value)                  │ │
│ │     snowpipe_client.ingest(validated)                                       │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│ ### Key Trade-offs: Pace vs. Perfection                                         │
│ Rather than spending 3 months designing a generic event bus, we began by...     │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│ Have thoughts or questions on this pattern? [Discuss on LinkedIn] or [Email me] │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Case Study Page Layout (`/case-studies/[slug]`)

For the in-depth enterprise case studies (Aplikasi Super, FinAccel):

1. **Header:** Project Title, Company, Your Role, Timeline, Key Metrics (e.g. `+50% Speed`, `20+ Stakeholders`).
2. **The Context & Problem:** What was the business bottleneck?
3. **The Architectural Solution:** Diagram and tech stack breakdown.
4. **Pragmatic Trade-offs:** What shortcuts were taken to move fast, and what had to be engineered with extreme rigor?
5. **Business Impact & Key Takeaway:** The measurable outcome.
