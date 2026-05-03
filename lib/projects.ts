import type { Role } from "./utils";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  context: string;
  year: string;
  status: "active" | "shipped" | "archived";
  proprietary?: boolean;
  stack: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
  roleWeight: Record<Role, number>;
  links?: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "directly",
    name: "Directly",
    tagline: "Real-time AI dance coaching with sub-150ms visual feedback",
    context: "Q IT Technologies · Lead AI/ML Engineer",
    year: "2025–",
    status: "active",
    proprietary: true,
    stack: [
      "MediaPipe",
      "WebSocket",
      "Claude Haiku",
      "Deepgram Nova-2",
      "ElevenLabs",
      "WebGPU",
      "WGSL",
      "Modal",
      "ONNX",
      "pgvector",
      "Voyage AI",
      "FastAPI",
      "Next.js",
    ],
    highlights: [
      "Built privacy-by-design pipeline: MediaPipe Pose runs client-side at 30–60 FPS, transmitting only 165 floats/frame over WebSocket — video never leaves the device.",
      "Designed sliding-window Dynamic Time Warping engine (dtaidistance C backend) with weighted joint importance for tempo-agnostic pose comparison.",
      "Engineered bidirectional voice coaching loop — Deepgram Nova-2 STT → Claude Haiku intent classification → ElevenLabs Flash v2.5 TTS — full round trip <500ms with 528+ pre-cached phrases.",
      "Built WebGPU-accelerated 3D Gaussian Splatting pipeline (GauHuman → ONNX → custom WGSL shaders) with 3-tier graceful fallback to ANNY mesh, then Canvas 2D.",
      "Implemented RAG-enhanced personalization — Voyage AI voyage-3-lite (1024-dim) embeds coaching episodes into pgvector; retrieval ranked by 40% similarity + 60% effectiveness score.",
      "Designed typed bidirectional WebSocket protocol with 33+ discriminated message types covering pose frames, staged feedback, voice commands, base64 TTS audio, rep tracking, and full session lifecycle.",
    ],
    metrics: [
      { label: "Visual feedback latency", value: "<150ms" },
      { label: "Voice loop round trip", value: "<500ms" },
      { label: "Pre-cached phrases", value: "528+" },
      { label: "WebSocket message types", value: "33+" },
      { label: "Embedding dim", value: "1024" },
      { label: "Pose tracking FPS", value: "30–60" },
    ],
    roleWeight: { ai: 100, fullstack: 90, backend: 85 },
  },
  {
    slug: "shorten",
    name: "Shorten",
    tagline: "AI video intelligence platform — 80–120 page enterprise reports from raw video",
    context: "Q IT Technologies · Lead AI/ML Engineer",
    year: "2025",
    status: "shipped",
    proprietary: true,
    stack: [
      "Gemini 2.5 Pro",
      "Deepgram",
      "Ollama",
      "Groq",
      "GPT-4o",
      "Puppeteer",
      "PostgreSQL",
      "Upstash Redis",
      "OpenAI Embeddings",
    ],
    highlights: [
      "Architected 6-stage LLM pipeline (Gemini 2.5 Pro) that aggregates 50–100 video signals per brand into 80–120 page strategic intelligence reports at $0.40–0.60/brand.",
      "Built multimodal video analysis integrating Deepgram transcription, Ollama local vision models, and Groq for signal synthesis — extracting sentiment, sarcasm, product claims, and competitor mentions.",
      "Designed graceful AI fallback chain: Gemini multimodal → Deepgram + Ollama + Groq → GPT-4o, with semantic relevance verification using OpenAI embeddings to filter multi-source evidence.",
      "Designed 30+ model PostgreSQL schema with multi-tenant data isolation across YouTube, TikTok, and Instagram, with audit trails, status tracking, and time-series engagement metrics.",
      "Implemented distributed rate limiting (Upstash Redis) and feature-flag-based cost controls (max video duration, model selection) — kept per-brand analysis cost under $5.",
      "Built Puppeteer-based stealth scraping for TikTok as a zero-API-key fallback; developed 15+ CLI scripts for end-to-end pipeline orchestration.",
    ],
    metrics: [
      { label: "Tokens per report", value: "40–60K" },
      { label: "Cost per brand report", value: "$0.40–0.60" },
      { label: "Hard cost ceiling", value: "<$5/brand" },
      { label: "Pipeline stages", value: "6" },
      { label: "Schema models", value: "30+" },
      { label: "Videos analyzed/brand", value: "100–300" },
    ],
    roleWeight: { ai: 95, fullstack: 75, backend: 95 },
  },
  {
    slug: "favorit",
    name: "FavorIt",
    tagline: "Peer-to-peer marketplace with GenAI receipt OCR and real-time payments",
    context: "Q IT Technologies · Lead Software Developer",
    year: "2025",
    status: "shipped",
    proprietary: true,
    stack: [
      "React Native",
      "Expo",
      "Node.js",
      "Firebase",
      "Firestore",
      "Cloud Functions",
      "Stripe",
      "GPT-4 Vision",
      "OpenAI",
    ],
    highlights: [
      "Engineered a Generative AI receipt processing feature integrating Vision OCR and GPT-4 — cut settlement time by over 80% with bounding-box-based POI detection for real-time location discovery.",
      "Architected real-time communication using Node.js + Firebase, achieving 60% latency reduction; built Cloud Functions for payment processing, push notifications, and OpenAI-powered receipt OCR.",
      "Integrated Stripe SDK end-to-end — PaymentIntent, manual capture, KYC via Stripe Identity; implemented Firestore real-time subscriptions with composite indexes and multi-document atomic transactions.",
      "Improved React Native app performance by 55% with skeleton screens, FlashList, memoized components, and efficient data loading patterns.",
    ],
    metrics: [
      { label: "Settlement time cut", value: "80%+" },
      { label: "Real-time latency reduction", value: "60%" },
      { label: "RN perf improvement", value: "55%" },
    ],
    roleWeight: { ai: 70, fullstack: 95, backend: 80 },
  },
  {
    slug: "unibazaar",
    name: "UniBazaar",
    tagline: "Auto-scaling Go + WebSocket marketplace with 99.9% uptime",
    context: "Personal project · 2024",
    year: "2024",
    status: "shipped",
    stack: [
      "Go",
      "PostgreSQL",
      "React",
      "Tailwind",
      "Docker",
      "AWS EC2",
      "AWS RDS",
      "AWS S3",
      "AWS Lambda",
      "Azure",
    ],
    highlights: [
      "Designed a highly-available, auto-scaling WebSocket marketplace backend in Go on AWS EC2 — 99.9% uptime, 35% lower API latency.",
      "Optimized Golang RESTful APIs and WebSocket communication for real-time chat at scale.",
      "Deployed across AWS (EC2, RDS, S3, Lambda) and Azure for redundancy.",
    ],
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "API latency reduction", value: "35%" },
    ],
    roleWeight: { ai: 50, fullstack: 80, backend: 100 },
    links: [
      { label: "GitHub", href: "https://github.com/Jawsenigma" },
    ],
  },
];

export function projectsForRole(role: Role): Project[] {
  return [...PROJECTS].sort(
    (a, b) => b.roleWeight[role] - a.roleWeight[role],
  );
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
