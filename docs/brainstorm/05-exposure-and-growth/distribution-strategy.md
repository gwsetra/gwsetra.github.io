# Comprehensive Website Exposure, SEO & Distribution Strategy

This document outlines the multi-layered growth and distribution strategy to drive high-intent visits from UK tech recruiters, hiring managers, engineering leaders, and the global data engineering community.

---

## Tier 1: Targeted Recruiter & Hiring Manager Funnel (Immediate Impact)

### 1. Structured Data for Google (Schema.org JSON-LD)
Inject a structured `Person` and `ProfilePage` JSON-LD script into the website `<head>` so Google understands exactly who Setra is, indexing the site for his name and professional title:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Setra Genyang Wicana",
  "jobTitle": "Data Engineer",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "London",
    "addressCountry": "UK"
  },
  "url": "https://gwsetra.github.io",
  "sameAs": [
    "https://www.linkedin.com/in/setragenyangw/",
    "https://github.com/gwsetra",
    "https://adplist.org/mentors/setra-genyang-wicana",
    "https://leetcode.com/u/gwsetra/",
    "https://neetcode.io/user/SolarSharingan193"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Sainsbury's"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Sakarya University"
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
}
</script>
```
- **Outcome**: When UK recruiters Google "Setra Genyang Wicana", the personal site ranks #1 alongside LinkedIn with rich metadata.

### 2. CV Integration (High-Conversion Anchor)
In the header of Setra's CV (both the private and the web-safe version), place a direct clickable link to the portfolio:
> **Setra Genyang Wicana**  
> London, UK • [Email] • [LinkedIn] • **Portfolio & Case Studies: [gwsetra.github.io] ↗**

- **In the Experience section under Aplikasi Super & FinAccel**: Add a subtle deep-link:
  > *Detailed Architecture & Trade-offs: [gwsetra.github.io/projects/aplikasi-super] ↗*

### 3. LinkedIn Profile Anchor
- **Custom Header Button**: Set LinkedIn's custom top profile button to **"Visit my website"** pointing to `https://gwsetra.github.io`.
- **Featured Section**: Add a high-visibility link card in the Featured section using the pre-rendered `og-preview.png` banner:
  - Title: *Data Platform Architecture & Engineering Case Studies*
  - Description: *A deep dive into zero-to-one BI platforms, regulatory streaming compliance, and data platform engineering.*

### 4. Direct Outbound Recruiter Outreach Hook
When messaging UK Engineering Directors or Heads of Data on LinkedIn / InMail:
> *"Hi [Name], I noticed you're scaling the data platform team at [Company]. I'm a London-based Data Engineer currently at Sainsbury's (open to UK Skilled Worker Visa transfer). I previously documented the architectural trade-offs of building zero-to-one platforms and regulatory pipelines here: https://gwsetra.github.io. Thought you might find the approach relevant to [Company's] current data challenges."*

---

## Tier 2: Community & Social Syndication Loops (Viral & Network Discovery)

### 1. GitHub Profile Integration (`github.com/gwsetra`)
Add a clean personal README on GitHub with:
- Quick badge linking to the live portfolio (`[![Website](https://img.shields.io/badge/Website-gwsetra.github.io-black?style=flat&logo=astro)](https://gwsetra.github.io)`).
- 2-line summary of current focus in London.
- Direct links to the two flagship case studies.

### 2. LinkedIn Engineering Content Snippets
Publish short, bite-sized architecture breakdowns on LinkedIn (1–2 posts a month), drawing directly from the case studies:
- **Hook**: *"When building data infrastructure from scratch, the most dangerous trap is premature complexity. Here is why we chose Airflow + DBT over Spark at Aplikasi Super..."*
- **Body**: 4 concise bullet points explaining the problem, the decision, and the metric (+50% speed).
- **Call-to-Action**: *"Full architecture diagram and trade-offs documented on my personal site: [Link in comments/post]"*.

### 3. Developer Communities (Reddit & Specialist Forums)
Participate in technical discussions on `r/dataengineering` and relevant Discord/Slack groups (Locally Optimistic, dbt Slack), referencing your case studies when someone asks about real-world regulatory reporting or Airflow/Redshift patterns.

---

## Tier 3: Organic Technical SEO (Compounding Passive Search)

### 1. Semantic HTML & Performance Signals
- Semantic elements: `<article>`, `<header>`, `<main>`, `<section>`, `<nav>`.
- Target **100/100 Lighthouse score** across Performance, Accessibility, Best Practices, and SEO.
- Zero layout shift (CLS = 0) with self-hosted variable typography.
- Mobile-first responsive design ensuring Google's mobile crawler indexes all content without penalty.

### 2. Canonicalization & Crawlability
- Automatic `sitemap-index.xml` generated via `@astrojs/sitemap` on every build.
- `robots.txt` ensuring all public routes (`/`, `/projects/*`, `/writing/*`) are crawlable by search bots while keeping build artifacts clean.
- Canonical `<link rel="canonical" ...>` tags on every page preventing duplicate content issues.

### 3. Google Search Console Setup
- Submit `sitemap-index.xml` directly to Google Search Console upon domain publication.
- Monitor search queries, impressions, and index status.
