import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Role = "ai" | "fullstack" | "backend";

export const ROLES: Role[] = ["ai", "fullstack", "backend"];

export function isRole(v: string | null | undefined): v is Role {
  return v === "ai" || v === "fullstack" || v === "backend";
}

export const ROLE_META: Record<
  Role,
  { label: string; tagline: string; resume: string }
> = {
  ai: {
    label: "AI / ML Engineer",
    tagline:
      "I build production AI systems — multi-stage LLM pipelines, real-time CV, sub-second voice loops.",
    resume: "/resumes/tanmay-saxena-ai-engineer.pdf",
  },
  fullstack: {
    label: "Full-Stack Engineer",
    tagline:
      "I ship end-to-end products — React/React Native, Node/Go/Python backends, real-time and AI-powered.",
    resume: "/resumes/tanmay-saxena-fullstack-engineer.pdf",
  },
  backend: {
    label: "Backend Engineer",
    tagline:
      "I design high-throughput distributed systems, real-time WebSocket protocols, and scalable data pipelines.",
    resume: "/resumes/tanmay-saxena-backend-engineer.pdf",
  },
};
