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
