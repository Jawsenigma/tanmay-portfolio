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
      "LLM intent classification",
      "Streaming STT",
      "Low-latency TTS",
      "WebGPU",
      "WGSL",
      "Serverless GPU",
      "ONNX",
      "pgvector",
      "RAG",
      "FastAPI",
      "Next.js",
    ],
    highlights: [
      "Privacy-by-design pipeline: MediaPipe Pose runs client-side at 30–60 FPS, transmitting only joint landmarks over WebSocket - video never leaves the device.",
      "Sliding-window Dynamic Time Warping engine with weighted joint importance scoring for tempo-agnostic pose comparison.",
      "Bidirectional voice coaching loop - streaming STT → LLM intent classification → low-latency TTS - full round trip <500ms with pre-cached correction phrases for instant playback.",
      "WebGPU-accelerated 3D Gaussian Splatting for photorealistic instructor overlay, with multi-tier graceful fallback (WebGPU → parametric mesh on WebGL → Canvas 2D).",
      "RAG-enhanced personalization - vector embeddings of coaching episodes stored in pgvector, retrieved and ranked by similarity combined with effectiveness scoring.",
      "Typed bidirectional WebSocket protocol covering pose frames, staged feedback, voice commands, TTS audio, rep tracking, and full session lifecycle.",
    ],
    metrics: [
      { label: "Visual feedback latency", value: "<150ms" },
      { label: "Voice loop round trip", value: "<500ms" },
      { label: "Pose tracking FPS", value: "30–60" },
    ],
  },
  {
    slug: "shorten",
    name: "Shorten",
    tagline:
      "AI video intelligence platform - a multi-stage LLM pipeline turning aggregated short-form video signals into 80–120 page enterprise reports.",
    context: "Q IT Technologies · Lead AI/ML Engineer",
    year: "2025",
    status: "shipped",
    proprietary: true,
    stack: [
      "Frontier multimodal LLM",
      "Streaming transcription",
      "Local vision models",
      "Fast inference",
      "Embeddings",
      "PostgreSQL",
      "Redis",
    ],
    highlights: [
      "Multi-stage LLM pipeline aggregating short-form video signals per brand into 80–120 page strategic reports.",
      "Multimodal video analysis combining transcription, local vision models, and fast inference for signal synthesis - extracting sentiment, sarcasm, product claims, and competitor mentions.",
      "Graceful AI fallback chain across providers, with semantic relevance verification using embeddings to filter multi-source evidence.",
      "Multi-tenant PostgreSQL schema across major short-form video platforms with audit trails, status tracking, and time-series engagement metrics.",
      "Distributed rate limiting and feature-flag-based cost controls drove per-brand analysis cost roughly an order of magnitude below typical full-LLM analysis.",
      "End-to-end CLI tooling for pipeline orchestration: setup → ingestion → aggregation → report generation.",
    ],
    metrics: [
      { label: "Pages per report", value: "80–120" },
      { label: "Cost reduction vs naive LLM analysis", value: "~10x" },
    ],
  },
  {
    slug: "favorit",
    name: "FavorIt",
    tagline:
      "Peer-to-peer marketplace with GenAI receipt OCR cutting settlement time by 80%, real-time Firebase, and Stripe payments.",
    context: "Q IT Technologies · Lead Software Developer",
    year: "2025",
    status: "shipped",
    proprietary: true,
    stack: [
      "Vision LLM",
      "React Native",
      "Expo",
      "Node.js",
      "Firebase",
      "Firestore",
      "Cloud Functions",
      "Stripe",
    ],
    highlights: [
      "Generative AI receipt processing - Vision OCR + LLM cut settlement time by over 80%; bounding-box-based POI detection for real-time location discovery.",
      "Real-time communication via Node.js + Firebase, 60% latency reduction; Cloud Functions for payment processing, push notifications, and AI-powered receipt OCR.",
      "Stripe SDK end-to-end - payments, manual capture, KYC via Stripe Identity; Firestore real-time subscriptions with composite indexes and multi-document atomic transactions.",
      "Improved React Native app performance by 55% with skeleton screens, virtualized lists, memoized components, and efficient data loading.",
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
      "Auto-scaling Go + WebSocket marketplace backend on AWS - 99.9% uptime, 35% lower API latency. (The systems-engineering plumbing under the AI work.)",
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
      "Designed a highly-available, auto-scaling WebSocket marketplace backend in Go on AWS EC2 - 99.9% uptime, 35% lower API latency.",
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
