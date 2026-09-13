---
title: "Zero-to-One Data Platform & BI Overhaul"
company: "Aplikasi Super"
role: "Data Engineer"
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
