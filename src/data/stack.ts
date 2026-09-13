export interface StackCategory {
  category: string;
  items: string[];
  links?: { label: string; url: string }[];
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
    items: ["Python", "SQL", "JavaScript", "Data Structures & Algorithms"],
    links: [
      { label: "LeetCode ↗", url: "https://leetcode.com/u/gwsetra/" },
      { label: "NeetCode ↗", url: "https://neetcode.io/user/SolarSharingan193" }
    ]
  }
];
