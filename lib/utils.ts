import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const RESUME_PATH = "/resumes/tanmay-saxena-ai-engineer.pdf";

export const TAGLINE =
  "I build production AI systems with hard latency and cost budgets - multi-stage LLM pipelines, real-time computer vision, and sub-second voice loops.";
