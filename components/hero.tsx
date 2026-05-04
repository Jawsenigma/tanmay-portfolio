import { Avatar3D } from "./avatar-3d";
import { ParticleField } from "./particle-field";
import { TAGLINE } from "@/lib/utils";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center pt-10 pb-16 md:pt-16 md:pb-24">
      <ParticleField density={750} />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/40 to-bg pointer-events-none z-0"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 w-full">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          <div className="fade-up">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
              <span className="label">
                Lead AI/ML Engineer · Q IT Technologies · Gainesville, FL
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.0]">
              Tanmay
              <br />
              Saxena<span className="text-accent">.</span>
            </h1>

            <div className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-fg-muted">
              <span className="text-fg">AI/ML Engineer</span>
              <span className="text-fg-dim">·</span>
              <span>production LLM · CV · voice systems</span>
            </div>

            <p className="mt-6 text-lg md:text-xl text-fg-muted max-w-2xl leading-relaxed">
              {TAGLINE}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-fg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                See the work <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-bg/40 backdrop-blur px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
              >
                <Download className="w-4 h-4" /> Résumé
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-2xl">
              <Stat value="<150ms" label="Real-time CV feedback" />
              <Stat value="<500ms" label="Voice loop round-trip" />
              <Stat value="Multi-stage" label="Cost-controlled LLM pipelines" />
              <Stat value="3.90" label="MS CS · UF · 2025" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-radial from-accent/10 to-transparent blur-2xl pointer-events-none" />
            <div className="relative">
              <Avatar3D />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-fg-dim text-xs font-mono flex items-center gap-2 fade-up">
        <span className="w-px h-6 bg-fg-dim" />
        scroll
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="stat-num text-2xl md:text-3xl text-accent">{value}</div>
      <div className="text-xs text-fg-muted mt-1 leading-snug">{label}</div>
    </div>
  );
}
