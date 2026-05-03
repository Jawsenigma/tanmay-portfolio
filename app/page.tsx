import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { isRole, type Role } from "@/lib/utils";
import { projectsForRole } from "@/lib/projects";
import { Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const sp = await searchParams;
  const role: Role = isRole(sp.role) ? sp.role : "ai";
  const projects = projectsForRole(role);

  return (
    <>
      <Hero role={role} />

      <section id="work" className="py-16 md:py-24 border-t border-border relative z-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <div>
              <div className="label mb-2">Selected work</div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Production systems I&apos;ve shipped.
              </h2>
            </div>
            <p className="text-fg-muted text-sm max-w-md">
              Ordered for the <span className="text-fg">{role === "ai" ? "AI/ML" : role === "fullstack" ? "full-stack" : "backend"}</span> view. Toggle the role above to re-rank.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 border-t border-border relative z-10">
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-[1fr_1.5fr] gap-10">
          <div>
            <div className="label mb-2">About</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Who I am.
            </h2>
          </div>
          <div className="prose-tanmay text-fg-muted">
            <p>
              I&apos;m an <strong>AI/ML Engineer</strong> with 3+ years building production systems — multi-stage LLM pipelines, real-time computer vision, sub-second voice loops, and the backend infrastructure to keep them running cheaply.
            </p>
            <p>
              I currently lead AI/ML engineering at <strong>Q IT Technologies</strong>, where I&apos;ve shipped <Link href="/projects/directly" className="text-accent">Directly</Link> (real-time AI dance coaching with sub-150ms feedback), <Link href="/projects/shorten" className="text-accent">Shorten</Link> (a 6-stage LLM pipeline that turns 100+ videos into 80–120 page enterprise reports), and the GenAI receipt OCR feature for <Link href="/projects/favorit" className="text-accent">FavorIt</Link>.
            </p>
            <p>
              Before that I was a Systems Engineer at <strong>TCS</strong> (developer for General Motors&apos; ADAS data pipeline) and an SDE intern at Applyin.co. I have an <strong>MS in Computer Science</strong> from the University of Florida (3.90 / 4.00).
            </p>
            <p>
              I care about <strong>latency budgets</strong>, <strong>graceful degradation</strong>, and <strong>cost-controlled inference</strong>. The portfolio you&apos;re reading runs Claude with prompt caching to keep per-turn cost under a cent.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 border-t border-border relative z-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="label mb-2">Contact</div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">
            Let&apos;s talk.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ContactCard
              icon={<Mail className="w-4 h-4" />}
              label="Email"
              value="tanmaysaxena58@gmail.com"
              href="mailto:tanmaysaxena58@gmail.com"
            />
            <ContactCard
              icon={<Phone className="w-4 h-4" />}
              label="Phone"
              value="+1 352-721-4719"
              href="tel:+13527214719"
            />
            <ContactCard
              icon={<LinkedinIcon className="w-4 h-4" />}
              label="LinkedIn"
              value="t-saxena"
              href="https://linkedin.com/in/t-saxena"
            />
            <ContactCard
              icon={<GithubIcon className="w-4 h-4" />}
              label="GitHub"
              value="Jawsenigma"
              href="https://github.com/Jawsenigma"
            />
          </div>
          <div className="mt-8 inline-flex items-center gap-2 text-sm text-fg-muted">
            <MapPin className="w-4 h-4" /> Gainesville, FL · Open to relocate
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group rounded-lg border border-border bg-bg-elev p-4 hover:border-accent transition-colors"
    >
      <div className="flex items-center gap-2 text-fg-muted group-hover:text-accent transition-colors">
        {icon}
        <span className="label !text-fg-muted group-hover:!text-accent">{label}</span>
      </div>
      <div className="mt-2 text-sm break-all">{value}</div>
    </a>
  );
}
