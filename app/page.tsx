import { Hero } from "@/components/hero";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { StackGrid } from "@/components/stack-grid";
import { Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />

      <ExperienceSection />

      <StackGrid />

      <ProjectsSection />

      <section
        id="about"
        className="py-16 md:py-24 border-t border-border relative z-10"
      >
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-[1fr_1.5fr] gap-10">
          <div>
            <div className="label mb-2">About</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              How I think about AI engineering.
            </h2>
          </div>
          <div className="prose-tanmay text-fg-muted">
            <p>
              I&apos;m an <strong>AI/ML Engineer</strong> who builds production systems where every millisecond and every cent counts. Foundation models are the easy part — the engineering is the chain around them: graceful fallback, latency budgets, RAG plumbing, GPU dispatch, cost ceilings, evals.
            </p>
            <p>
              I currently lead AI/ML engineering at <strong>Q IT Technologies</strong>, where I&apos;ve led delivery of three production AI products: <Link href="/projects/directly" className="text-accent">Directly</Link>, <Link href="/projects/shorten" className="text-accent">Shorten</Link>, and the GenAI features inside <Link href="/projects/favorit" className="text-accent">FavorIt</Link>.
            </p>
            <p>
              I have an <strong>MS in Computer Science</strong> from the University of Florida (3.90 / 4.00). Before AI, I built large-scale Django/PostgreSQL pipelines for General Motors&apos; ADAS data at TCS — the systems-engineering muscle still shows up in how I scaffold inference infrastructure.
            </p>
            <p>
              What I optimize for: <strong>latency budgets</strong>, <strong>graceful degradation</strong>, <strong>cost-controlled inference</strong>. The hero you scrolled past runs MediaPipe Pose + Three.js client-side — same client-side CV pattern as Directly. The chat agent on this page runs Llama 3.3 70B on Groq&apos;s LPU (free tier) — same Groq inference engine I use in Shorten.
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-16 md:py-24 border-t border-border relative z-10"
      >
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
        <span className="label !text-fg-muted group-hover:!text-accent">
          {label}
        </span>
      </div>
      <div className="mt-2 text-sm break-all">{value}</div>
    </a>
  );
}
