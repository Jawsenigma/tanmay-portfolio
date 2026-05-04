import { Cpu, Mic, Eye, Database } from "lucide-react";

type Category = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: string[];
};

const CATEGORIES: Category[] = [
  {
    icon: <Cpu className="w-4 h-4" />,
    title: "Foundation models",
    subtitle: "LLMs in production",
    items: [
      "Anthropic Claude (Sonnet, Haiku)",
      "OpenAI GPT-4o + Vision",
      "Google Gemini 2.5 Pro",
      "Meta Llama 3.3 70B (Groq)",
      "Ollama (local inference)",
    ],
  },
  {
    icon: <Mic className="w-4 h-4" />,
    title: "Speech & audio",
    subtitle: "Sub-500ms voice loops",
    items: [
      "Deepgram Nova-2 STT",
      "ElevenLabs Flash v2.5 TTS",
      "Echo guard + barge-in",
      "Bidirectional WebSocket protocols",
      "Pre-cached phrase libraries",
    ],
  },
  {
    icon: <Eye className="w-4 h-4" />,
    title: "Computer vision & 3D",
    subtitle: "Client-side, GPU-accelerated",
    items: [
      "MediaPipe Pose / Hand Landmarker",
      "Multi-HMR + ANNY (163-bone mesh)",
      "3D Gaussian Splatting (GauHuman)",
      "WebGPU + custom WGSL shaders",
      "ONNX Runtime Web · Three.js",
    ],
  },
  {
    icon: <Database className="w-4 h-4" />,
    title: "Inference infra",
    subtitle: "Cost-controlled, observable",
    items: [
      "pgvector + Voyage AI embeddings",
      "Modal serverless GPU dispatch",
      "Upstash Redis rate limiting",
      "Async SQLAlchemy 2.0 + Alembic",
      "Graceful AI fallback chains",
    ],
  },
];

export function StackGrid() {
  return (
    <section
      id="stack"
      className="py-16 md:py-24 border-t border-border relative z-10"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <div className="label mb-2">Stack</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              The pieces I assemble.
            </h2>
          </div>
          <p className="text-fg-muted text-sm max-w-md">
            Production AI is rarely one model. It&apos;s a chain of providers, fallbacks, embeddings, GPU compute, and rate limits — all under a latency budget.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((c) => (
            <div
              key={c.title}
              className="group rounded-lg border border-border bg-bg-elev p-5 hover:border-accent/60 transition-colors"
            >
              <div className="flex items-center gap-2 text-accent mb-3">
                {c.icon}
                <div className="font-mono text-[11px] uppercase tracking-wider">
                  {c.subtitle}
                </div>
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-3">
                {c.title}
              </h3>
              <ul className="space-y-1.5">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-fg-muted leading-snug flex items-start gap-2"
                  >
                    <span className="text-accent font-mono mt-0.5">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
