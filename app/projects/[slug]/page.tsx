import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { getProject, PROJECTS } from "@/lib/projects";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="py-12 md:py-20 relative z-10">
      <div className="mx-auto max-w-3xl px-5">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to work
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <span className="label">{project.context}</span>
          <span className="text-fg-dim">·</span>
          <span className="label">{project.year}</span>
          {project.proprietary && (
            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-border text-xs text-fg-muted">
              <Lock className="w-3 h-3" /> closed-source
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          {project.name}
        </h1>
        <p className="mt-4 text-xl text-fg-muted leading-relaxed">
          {project.tagline}
        </p>

        {project.metrics.length > 0 && (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-border py-6">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="stat-num text-2xl text-accent">{m.value}</div>
                <div className="text-xs text-fg-muted mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <div className="label mb-3">Stack</div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-xs font-mono px-2.5 py-1 rounded border border-border text-fg-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="label mb-4">What I built</div>
          <ul className="prose-tanmay">
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>

        {project.proprietary && (
          <div className="mt-10 rounded-lg border border-border bg-bg-elev px-5 py-4 text-sm text-fg-muted">
            <strong className="text-fg">Why no code link?</strong> This project is
            closed-source IP belonging to my employer. Happy to walk through architecture and decisions in an interview.
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm">
          <Link
            href="/#work"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            ← All projects
          </Link>
          <Link
            href="/#contact"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </article>
  );
}
