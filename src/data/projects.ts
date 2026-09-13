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
