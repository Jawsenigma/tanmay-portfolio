import Link from "next/link";
import { ArrowUpRight, Lock, Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/lib/experience";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-16 md:py-24 border-t border-border relative z-10"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="label mb-2">Experience</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Where I&apos;ve shipped production AI.
            </h2>
          </div>
          <p className="text-fg-muted text-sm max-w-md">
            Three companies, four years. The Q IT products are closed-source - I can&apos;t share repos, but happy to deep-dive architecture in an interview.
          </p>
        </div>

        <div className="space-y-6">
          {EXPERIENCE.map((entry) => (
            <article
              key={entry.company + entry.dates}
              className="rounded-lg border border-border bg-bg-elev p-6 md:p-8"
            >
              <div className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-accent" />
                    {entry.current && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-success">
                        <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
                        current
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {entry.company}
                  </h3>
                  <div className="text-sm text-fg mt-1">{entry.role}</div>
                  <div className="text-xs font-mono text-fg-muted mt-3">
                    {entry.dates}
                  </div>
                  <div className="text-xs font-mono text-fg-dim">
                    {entry.location}
                  </div>
                </div>

                <div>
                  {entry.outputs && (
                    <div className="space-y-4">
                      <div className="text-xs uppercase tracking-wider font-mono text-fg-dim">
                        Shipped
                      </div>
                      {entry.outputs.map((o) => (
                        <Link
                          key={o.slug}
                          href={`/projects/${o.slug}`}
                          className="group block rounded-md border border-border bg-bg p-4 hover:border-accent transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{o.name}</span>
                              <span
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-border text-[10px] text-fg-dim"
                                title="Closed-source"
                              >
                                <Lock className="w-2.5 h-2.5" /> closed
                              </span>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-fg-muted group-hover:text-accent transition-colors" />
                          </div>
                          <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                            {o.oneLiner}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                  {entry.bullets && (
                    <ul className="space-y-2">
                      {entry.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="text-sm text-fg-muted leading-relaxed flex gap-2"
                        >
                          <span className="text-accent font-mono mt-1">→</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
