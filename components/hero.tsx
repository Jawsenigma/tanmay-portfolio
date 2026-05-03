import { ROLE_META, type Role } from "@/lib/utils";
import { RoleToggle } from "./role-toggle";
import { Avatar3D } from "./avatar-3d";

export function Hero({ role }: { role: Role }) {
  const meta = ROLE_META[role];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div className="fade-up">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
              <span className="label">Lead AI/ML Engineer · Q IT Technologies</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Tanmay Saxena.
              <br />
              <span className="text-fg-muted">{meta.label}.</span>
            </h1>

            <p className="mt-6 text-lg text-fg-muted max-w-2xl leading-relaxed">
              {meta.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <RoleToggle role={role} />
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              <Stat value="3+" label="Years experience" />
              <Stat value="<150ms" label="Real-time CV" />
              <Stat value="<500ms" label="Voice loops" />
              <Stat value="3.90" label="MS CS GPA · UF" />
            </div>
          </div>

          <div className="relative">
            <Avatar3D />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="stat-num text-2xl text-accent">{value}</div>
      <div className="text-xs text-fg-muted mt-1">{label}</div>
    </div>
  );
}
