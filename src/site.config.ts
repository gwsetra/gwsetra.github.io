export interface SiteConfig {
  name: string;
  role: string;
  location: string;
  headline: string;
  status: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    adplist: string;
    leetcode: string;
    neetcode: string;
    calUrl?: string;
  };
  cvPath?: string;
  analytics?: {
    enabled: boolean;
    token?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Setra Genyang Wicana",
  role: "Data Engineer",
  location: "London, UK",
  headline: "Data Engineer based in London. Building data platforms with a product mindset — focused on engineering pace, reliability, and measurable business impact.",
  status: "Based in London, UK • Open to UK Skilled Worker Visa transfer opportunities",
  email: "setra.wicana.uk@gmail.com",
  social: {
    github: "https://github.com/gwsetra",
    linkedin: "https://www.linkedin.com/in/setragenyangw/",
    adplist: "https://adplist.org/mentors/setra-genyang-wicana",
    leetcode: "https://leetcode.com/u/gwsetra/",
    neetcode: "https://neetcode.io/user/SolarSharingan193",
    calUrl: "", // Optional 15-min chat link
  },
  cvPath: "",
  analytics: {
    enabled: false,
    token: "",
  },
};
