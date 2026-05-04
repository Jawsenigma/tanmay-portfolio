import Link from "next/link";
import { Download, ArrowLeft, FileText, Mail } from "lucide-react";
import { RESUME_PATH } from "@/lib/utils";

export const metadata = {
  title: "Résumé",
  description:
    "Tanmay Saxena — AI/ML Engineer résumé. Production LLM pipelines, real-time CV, sub-second voice systems.",
};

const SIGNATURE_STACK = [
  "Anthropic Claude",
  "Gemini 2.5 Pro",
  "GPT-4o · Vision",
  "Deepgram Nova-2",
  "ElevenLabs Flash",
  "MediaPipe Pose",
  "WebGPU + WGSL",
  "GauHuman / Splatting",
  "pgvector + Voyage",
  "Modal GPU",
  "ONNX Runtime",
  "FastAPI · Next.js",
];

export default function ResumePage() {
  return (
    <section className="py-12 md:py-16 relative z-10">
      <div className="mx-auto max-w-5xl px-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back home
        </Link>

        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="label mb-2">Résumé</div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Tanmay Saxena · AI/ML Engineer
            </h1>
            <p className="mt-3 text-fg-muted max-w-xl">
              3+ years shipping production AI — multi-stage LLM pipelines, real-time computer vision, and sub-second voice systems.
            </p>
          </div>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noreferrer"
            download
            className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-fg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {SIGNATURE_STACK.map((s) => (
            <span
              key={s}
              className="text-[11px] font-mono px-2 py-1 rounded border border-border text-fg-muted"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-border bg-bg-elev overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-bg-elev-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              <span className="font-mono text-xs text-fg-muted">
                tanmay-saxena-ai-engineer.pdf
              </span>
            </div>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-fg-muted hover:text-accent transition-colors"
            >
              open in new tab ↗
            </a>
          </div>

          <object
            data={RESUME_PATH}
            type="application/pdf"
            className="w-full h-[85vh] hidden md:block bg-white"
          >
            <div className="p-8 text-center bg-bg">
              <FileText className="w-10 h-10 mx-auto mb-3 text-fg-muted" />
              <p className="text-fg mb-4">
                Inline preview unavailable in this browser.
              </p>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-fg px-4 py-2 text-sm font-medium"
              >
                <Download className="w-4 h-4" /> Download résumé
              </a>
            </div>
          </object>

          <div className="md:hidden p-10 text-center bg-bg">
            <FileText className="w-10 h-10 mx-auto mb-3 text-fg-muted" />
            <p className="text-fg mb-4 text-sm">
              PDF preview is heavy on mobile — tap below to open.
            </p>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-fg px-4 py-2 text-sm font-medium"
            >
              <Download className="w-4 h-4" /> Open résumé
            </a>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-fg-muted">
          <Mail className="w-4 h-4" />
          Prefer plain text or have a specific role in mind?{" "}
          <a
            href="mailto:tanmaysaxena58@gmail.com"
            className="text-accent hover:underline"
          >
            tanmaysaxena58@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
