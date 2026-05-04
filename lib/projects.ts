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
  links?: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "directly",
    name: "Directly",
    tagline:
      "Real-time AI dance coaching with sub-150ms visual feedback, voice loops under 500ms, and WebGPU-accelerated 3D Gaussian Splatting overlays.",
    context: "Q IT Technologies · Lead AI/ML Engineer",
    year: "2025–",
    status: "active",
    proprietary: true,
    stack: [
      "MediaPipe Pose",
      "WebSocket",
      "Claude Haiku",
      "Deepgram Nova-2",
      "ElevenLabs Flash v2.5",
      "WebGPU",
      "WGSL",
      "Modal GPU",
      "ONNX",
      "pgvector",
      "Voyage AI",
      "FastAPI",
      "Next.js",
    ],
    highlights: [
      "Privacy-by-design pipeline: MediaPipe Pose runs client-side at 30–60 FPS, transmitting only 165 floats/frame over WebSocket — video never leaves the device.",
      "Sliding-window Dynamic Time Warping engine (dtaidistance C backend) with weighted joint importance for tempo-agnostic pose comparison.",
      "Bidirectional voice coaching loop — Deepgram Nova-2 STT → Claude Haiku intent classification → ElevenLabs Flash v2.5 TTS — full round trip <500ms with 528+ pre-cached phrases.",
      "WebGPU-accelerated 3D Gaussian Splatting (GauHuman → ONNX → custom WGSL shaders) with 3-tier graceful fallback to ANNY mesh, then Canvas 2D.",
      "RAG-enhanced personalization — Voyage AI voyage-3-lite (1024-dim) embeds coaching episodes into pgvector; retrieval ranked by 40% similarity + 60% effectiveness score.",
      "Typed bidirectional WebSocket protocol with 33+ discriminated message types covering pose frames, staged feedback, voice commands, base64 TTS audio, rep tracking, and full session lifecycle.",
    ],
    metrics: [
      { label: "Visual feedback latency", value: "<150ms" },
      { label: "Voice loop round trip", value: "<500ms" },
      { label: "Pre-cached phrases", value: "528+" },
      { label: "WebSocket message types", value: "33+" },
      { label: "Embedding dim", value: "1024" },
      { label: "Pose tracking FPS", value: "30–60" },
    ],
  },
  {
    slug: "shorten",
    name: "Shorten",
    tagline:
      "AI video intelligence platform — a 6-stage LLM pipeline turning 100+ videos per brand into 80–120 page enterprise reports for under $5.",
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
      "OpenAI Embeddings",
      "Puppeteer",
      "PostgreSQL",
      "Upstash Redis",
    ],
    highlights: [
      "6-stage LLM pipeline (Gemini 2.5 Pro) aggregating 50–100 video signals per brand into 80–120 page strategic reports at $0.40–0.60/brand.",
      "Multimodal video analysis integrating Deepgram transcription, Ollama local vision, and Groq for signal synthesis — extracting sentiment, sarcasm, product claims, and competitor mentions.",
      "Graceful AI fallback chain: Gemini multimodal → Deepgram + Ollama + Groq → GPT-4o, with semantic relevance verification using OpenAI embeddings to filter multi-source evidence.",
      "30+ model PostgreSQL schema with multi-tenant data isolation across YouTube, TikTok, and Instagram, with audit trails, status tracking, and time-series engagement metrics.",
      "Distributed rate limiting (Upstash Redis) and feature-flag-based cost controls — kept per-brand analysis cost under $5.",
      "Puppeteer-based stealth scraping for TikTok as a zero-API-key fallback; 15+ CLI scripts for end-to-end pipeline orchestration.",
    ],
    metrics: [
      { label: "Tokens per report", value: "40–60K" },
      { label: "Cost per brand report", value: "$0.40–0.60" },
      { label: "Hard cost ceiling", value: "<$5/brand" },
      { label: "Pipeline stages", value: "6" },
      { label: "Schema models", value: "30+" },
      { label: "Videos analyzed/brand", value: "100–300" },
    ],
  },
  {
    slug: "favorit",
    name: "FavorIt",
    tagline:
      "Peer-to-peer marketplace with GenAI receipt OCR (Vision + GPT-4) cutting settlement time by 80%, real-time Firebase, and Stripe payments.",
    context: "Q IT Technologies · Lead Software Developer",
    year: "2025",
    status: "shipped",
    proprietary: true,
    stack: [
      "GPT-4 Vision",
      "OpenAI",
      "React Native",
      "Expo",
      "Node.js",
      "Firebase",
      "Firestore",
      "Cloud Functions",
      "Stripe",
    ],
    highlights: [
      "Generative AI receipt processing — Vision OCR + GPT-4 cut settlement time by over 80%; bounding-box-based POI detection for real-time location discovery.",
      "Real-time communication via Node.js + Firebase, 60% latency reduction; Cloud Functions for payment processing, push notifications, and OpenAI-powered receipt OCR.",
      "Stripe SDK end-to-end — PaymentIntent, manual capture, KYC via Stripe Identity; Firestore real-time subscriptions with composite indexes and multi-document atomic transactions.",
      "Improved React Native app performance by 55% with skeleton screens, FlashList, memoized components, efficient data loading.",
    ],
    metrics: [
      { label: "Settlement time cut", value: "80%+" },
      { label: "Real-time latency reduction", value: "60%" },
      { label: "RN perf improvement", value: "55%" },
    ],
  },
  {
    slug: "unibazaar",
    name: "UniBazaar",
    tagline:
      "Auto-scaling Go + WebSocket marketplace backend on AWS — 99.9% uptime, 35% lower API latency. (The systems-engineering plumbing under the AI work.)",
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
    links: [{ label: "GitHub", href: "https://github.com/Jawsenigma" }],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
