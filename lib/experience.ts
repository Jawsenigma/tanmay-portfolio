export type ExperienceEntry = {
  company: string;
  role: string;
  dates: string;
  location: string;
  // Slugs of major work outputs (link to /projects/[slug] case studies)
  outputs?: { slug: string; name: string; oneLiner: string }[];
  // Bullet points for jobs without standalone case studies
  bullets?: string[];
  current?: boolean;
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Q IT Technologies",
    role: "Lead AI/ML Engineer",
    dates: "Jun 2025 - Present",
    location: "Gainesville, FL",
    current: true,
    outputs: [
      {
        slug: "directly",
        name: "Directly",
        oneLiner:
          "Real-time AI dance coaching with sub-150ms visual feedback and a sub-500ms voice loop.",
      },
      {
        slug: "shorten",
        name: "Shorten",
        oneLiner:
          "AI video intelligence platform - multi-stage LLM pipeline turning aggregated short-form videos into 80–120 page enterprise reports.",
      },
      {
        slug: "favorit",
        name: "FavorIt",
        oneLiner:
          "P2P marketplace with GenAI receipt OCR cutting settlement time by 80%, real-time Firebase, Stripe payments.",
      },
    ],
  },
  {
    company: "ACM @ University of Florida",
    role: "Software Engineer",
    dates: "Mar 2025 - May 2025",
    location: "Gainesville, FL",
    bullets: [
      "Optimized front-end load by 50% on a real-time dashboard via Vite bundling and Material UI tuning.",
      "Reduced AWS costs 30% by migrating workloads to Lambda and right-sizing EC2.",
      "Deployed full-stack apps (Node.js, PostgreSQL, React) using AWS and Docker.",
    ],
  },
  {
    company: "Applyin.co",
    role: "SDE Intern",
    dates: "Jun 2024 - Aug 2024",
    location: "Remote",
    bullets: [
      "Built and optimized RESTful APIs in Node.js / Express.js, improving latency by 35%.",
      "Reduced first input delay by 40% using React SSR, memoization, and event-handler optimization.",
      "Implemented JWT auth flows + Google SSO integration, cutting onboarding time by 60%.",
      "Boosted user engagement by 25% with a dynamic, interactive React-based story-builder tool.",
    ],
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Systems Engineer · Developer for General Motors",
    dates: "Jan 2021 - May 2023",
    location: "Bengaluru, India",
    bullets: [
      "Automated GM ADAS data processing with a Django + React app - 87.5% manual work reduction.",
      "Improved 1TB+ PostgreSQL query performance by 60% via indexing and partitioning.",
      "Cut deployment time 50% by implementing CI/CD pipelines with GitHub Actions.",
      "Scaled the backend pipeline 2x to support 21+ ADAS features in autonomous-vehicle data.",
      "Built real-time React dashboards reducing issue resolution time by 40%.",
    ],
  },
];
