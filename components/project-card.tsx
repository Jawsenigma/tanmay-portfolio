import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-lg border border-border bg-bg-elev p-6 hover:border-accent transition-colors"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold tracking-tight">
              {project.name}
            </h3>
            {project.proprietary && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-border text-xs text-fg-muted"
                title="Closed-source / employer IP"
              >
                <Lock className="w-3 h-3" /> closed
              </span>
            )}
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                project.status === "active"
                  ? "bg-success pulse-dot"
                  : project.status === "shipped"
                    ? "bg-info"
                    : "bg-fg-dim"
              }`}
              title={project.status}
            />
          </div>
          <div className="text-xs font-mono text-fg-muted mt-1">
            {project.context} · {project.year}
          </div>
        </div>
        <ArrowUpRight className="w-5 h-5 text-fg-muted group-hover:text-accent transition-colors flex-shrink-0" />
      </div>

      <p className="text-fg text-sm leading-relaxed">{project.tagline}</p>

      {project.metrics.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="border-l border-border pl-3">
              <div className="stat-num text-sm text-accent">{m.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-fg-dim mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 6).map((s) => (
          <span
            key={s}
            className="text-[11px] font-mono px-2 py-0.5 rounded border border-border text-fg-muted"
          >
            {s}
          </span>
        ))}
        {project.stack.length > 6 && (
          <span className="text-[11px] font-mono px-2 py-0.5 text-fg-dim">
            +{project.stack.length - 6}
          </span>
        )}
      </div>
    </Link>
  );
}
