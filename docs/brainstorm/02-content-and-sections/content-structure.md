# Website Content & Section Structure

## 1. Hero Section
- **Name**: Setra Genyang Wicana
- **Headline**:
  > "Data Engineer based in London. Building data platforms with a product mindset — focused on engineering pace, reliability, and measurable business impact."
- **Brief Bio / Executive Summary (Minimalist & Scan-Friendly)**:
  - **What I Do**: Architecting and scaling resilient data platforms, streaming pipelines, and warehouse systems with a focus on product velocity.
  - **Scale & Impact**: 6+ years across high-growth startups and UK enterprise retail (Sainsbury's, Aplikasi Super, FinAccel, Insider); managing petabyte-scale transformations, mission-critical regulatory pipelines, and real-time event ingestion.
  - **Core Principles**: Pragmatism over hype, zero-unnecessary-complexity, fast feedback loops, and data as a reliable internal product.
  - **Mentorship & Community**: Mentoring emerging data engineers and analytics practitioners on [ADPList](https://adplist.org/mentors/setra-genyang-wicana).
- **UK Status Indicator**: *"Based in London, UK • Open to UK Skilled Worker Visa transfer opportunities"*
- **Direct Action Bar (Frictionless Inbound Outreach)**:
  - **Email**: Direct `mailto:setra.wicana.uk@gmail.com` with subject template + lightweight one-click "Copy Email" button (in-button state transition to `[✓ Copied!]` for 2 seconds, with fallback text-selection if clipboard API is blocked).
  - **LinkedIn**: Direct link to profile (`https://www.linkedin.com/in/setragenyangw/`).
  - **GitHub**: Direct link to profile (`https://github.com/gwsetra`).
  - **ADPList**: Direct clean icon link to mentorship profile (`https://adplist.org/mentors/setra-genyang-wicana`).
  - **LeetCode**: Direct clean icon link to profile (`https://leetcode.com/u/gwsetra/`).
  - **NeetCode**: Direct clean icon link to profile (`https://neetcode.io/user/SolarSharingan193`) showcasing roadmap completion and algorithmic preparation.
  - **CV**: One-click download of Web-Safe CV (PDF with phone number redacted).
  - **Intro Call (Optional Config)**: Optional "Book a 15-min chat" link powered by a configurable URL (Cal.com / Calendly in `site.config.ts`), cleanly hidden if left empty.

## 2. Featured Systems & Case Studies (Hybrid Showcase)
### Tier 1: In-Depth Architectural Case Studies (Past Companies / Safe for Deep Dives)
Focus on Problem $\rightarrow$ Architecture & Trade-offs $\rightarrow$ Impact:
1. **Aplikasi Super (Zero-to-One Data Platform & BI Overhaul)**:
   - *Challenge*: Building data accessibility and BI infrastructure from scratch for a rapid supply-chain scale-up.
   - *Architecture*: Airflow, DBT, Redshift, AWS S3/EC2/Lambda, REST APIs to Notion/Amplitude/Tableau.
   - *Impact*: 50% increase in data processing speed, real-time access for 20+ stakeholders.
2. **FinAccel / Kredivo (Mission-Critical Regulatory & Institutional Lending Pipeline)**:
   - *Challenge*: Daily data compliance for Financial Authorities (OJK) and institutional credit scoring across lending partners.
   - *Architecture*: Airflow, BigQuery, Redshift, automated validation framework.
   - *Impact*: 20% error reduction, automated daily reporting for 5 lending partners.

*(Note on Sainsbury's: Detailed safely in the Career Timeline below using public LinkedIn/CV metrics — protecting internal IP while establishing current leadership).*

### Tier 2: Open-Source & Side Projects (Compact GitHub-Linked Grid)
- Clean, minimal cards linking directly out to public GitHub repositories (`↗`):
  - **Title**: Repository/Project name (linked to GitHub repo).
  - **Description**: 1–2 sentence explanation of the engineering problem it solves.
  - **Tech Stack Badges**: Key technologies used (e.g. `Python`, `Kafka`, `DBT`).
  - **Data Source**: Defined in a type-safe config file (`src/data/projects.ts`) for zero external API latency, pre-seeded with 2 data engineering utilities ready to customize.

## 3. Writing / Technical Blog (Homepage Placeholder Block & Infrastructure Ready)
- **Status**: Platform infrastructure and layout are built and ready for Markdown/MDX posts, while content drafting is deferred.
- **Homepage Integration**: A clean, compact placeholder section on the homepage:
  - Header: `WRITING`
  - Note: *"Technical essays on data platforms, engineering velocity, and streaming reliability are in progress. Connect on [LinkedIn] to follow updates."*
- **Language Strategy**: Bilingual schema support (`lang: "en"` / `lang: "id"`).
- **Format**: File-based Markdown collections (`src/content/blog/`) with clean typography.

## 4. Career Journey / Experience Timeline
- Compact, clean timeline of roles:
  - Sainsbury's (London, UK) — Oct 2023–Present
  - Aplikasi Super (Surabaya, Indonesia) — Dec 2021–Oct 2023
  - FinAccel (Jakarta, Indonesia) — May 2021–Dec 2021
  - Insider (Istanbul, Turkey) — Jun 2018–Apr 2021

## 5. Toolkit & Tech Stack
- Grouped cleanly by domain (no buzzword clutter):
  - **Data Platforms & Warehousing**: Snowflake, Redshift, BigQuery, MySQL.
  - **Pipelines & Streaming**: Apache Airflow, DBT, Kafka, ETL/ELT patterns.
  - **Cloud & Infrastructure**: AWS, Docker, Kubernetes, Terraform.
  - **Languages & Frameworks**: Python, SQL, JavaScript.
