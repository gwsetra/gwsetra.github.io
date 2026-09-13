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
    role: "Data Engineer",
    period: "Oct 2023 — Present",
    highlights: [
      "Leading engineering initiatives delivering the customer support data platform.",
      "Architecting event-driven pipelines and Snowflake transformations.",
      "Reduced pipeline development time by 25% and decreased data errors by 50% across key telemetry tables."
    ],
    tech: ["Snowflake", "Kafka", "Airflow", "Kubernetes", "Terraform", "AWS"]
  },
  {
    company: "Aplikasi Super",
    location: "Surabaya, Indonesia",
    role: "Data Engineer",
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
