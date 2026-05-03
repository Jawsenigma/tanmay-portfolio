import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";
import { ROLES, ROLE_META } from "@/lib/utils";

export const metadata = {
  title: "Résumé",
  description: "Three role-targeted résumés: AI/ML, Full-Stack, Backend.",
};

export default function ResumePage() {
  return (
    <section className="py-16 md:py-24 relative z-10">
      <div className="mx-auto max-w-3xl px-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back home
        </Link>

        <div className="label mb-2">Résumé</div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Three flavors. Same person.
        </h1>
        <p className="mt-4 text-fg-muted max-w-xl">
          I tailor my résumé to the role I&apos;m applying for. Pick whichever fits your opening best — same projects underneath, different framing on top.
        </p>

        <div className="mt-10 grid gap-4">
          {ROLES.map((role) => {
            const meta = ROLE_META[role];
            return (
              <a
                key={role}
                href={meta.resume}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-lg border border-border bg-bg-elev p-5 hover:border-accent transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold tracking-tight">
                      {meta.label}
                    </div>
                    <div className="text-sm text-fg-muted mt-1">
                      {meta.tagline}
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-fg-muted group-hover:text-accent transition-colors flex-shrink-0" />
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-10 text-sm text-fg-muted">
          Prefer plain text? Email me at{" "}
          <a
            href="mailto:tanmaysaxena58@gmail.com"
            className="text-accent hover:underline"
          >
            tanmaysaxena58@gmail.com
          </a>
          {" "}and I&apos;ll send a doc.
        </div>
      </div>
    </section>
  );
}
