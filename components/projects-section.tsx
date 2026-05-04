import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";
import { getProject } from "@/lib/projects";
import { PERSONAL_PROJECTS } from "@/lib/personal-projects";

export function ProjectsSection() {
  const featured = getProject("unibazaar");

  return (
    <section
      id="projects"
      className="py-16 md:py-24 border-t border-border relative z-10"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <div className="label mb-2">Personal projects</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Things I built on my own time.
            </h2>
          </div>
          <p className="text-fg-muted text-sm max-w-md">
            Open-source side work - code is on GitHub, no NDA in the way.
          </p>
        </div>

        {featured && (
          <Link
            href={`/projects/${featured.slug}`}
            className="group block rounded-lg border border-border bg-bg-elev p-6 md:p-8 hover:border-accent transition-colors mb-5"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="label">Featured</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-info" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  {featured.name}
                </h3>
                <div className="text-xs font-mono text-fg-muted mt-1">
                  {featured.context} · {featured.year}
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-fg-muted group-hover:text-accent transition-colors" />
            </div>
            <p className="text-fg leading-relaxed max-w-2xl">
              {featured.tagline}
            </p>
            {featured.metrics.length > 0 && (
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {featured.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="stat-num text-xl text-accent">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-fg-muted mt-1 leading-snug">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {featured.stack.slice(0, 8).map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-mono px-2 py-0.5 rounded border border-border text-fg-muted"
                >
                  {s}
                </span>
              ))}
              {featured.stack.length > 8 && (
                <span className="text-[11px] font-mono px-2 py-0.5 text-fg-dim">
                  +{featured.stack.length - 8}
                </span>
              )}
            </div>
          </Link>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          {PERSONAL_PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-lg border border-border bg-bg-elev p-5 hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.name}
                  </h3>
                  <div className="text-xs font-mono text-fg-muted mt-1">
                    {p.language} · {p.year}
                  </div>
                </div>
                <GithubIcon className="w-5 h-5 text-fg-muted group-hover:text-accent transition-colors" />
              </div>
              <p className="text-sm text-fg-muted leading-relaxed">
                {p.description}
              </p>
              {p.highlights && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[11px] font-mono px-2 py-0.5 rounded border border-border text-fg-muted"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
