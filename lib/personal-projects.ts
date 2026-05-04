export type PersonalProject = {
  name: string;
  description: string;
  language: string;
  year: string;
  href: string;
  highlights?: string[];
};

// Smaller side projects on GitHub. UniBazaar lives in lib/projects.ts because it has a case study page.
export const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    name: "Text-Redactor",
    description:
      "Python package that automatically redacts user-specified sensitive information (names, addresses) from large text corpora using optimized regex matching.",
    language: "Python",
    year: "2024",
    href: "https://github.com/Jawsenigma/Text-Redactor",
    highlights: ["80% privacy-compliance gain", "60% faster regex pipeline"],
  },
  {
    name: "Essay Evaluator",
    description:
      "Django web app that uses the OpenAI API to grade essays - spelling, content relevance, structured scoring - with Google SSO auth.",
    language: "Python · Django",
    year: "2024",
    href: "https://github.com/Jawsenigma/Backend_Django_Essay_Evaluator",
    highlights: ["OpenAI-powered grading", "Google SSO onboarding"],
  },
];
