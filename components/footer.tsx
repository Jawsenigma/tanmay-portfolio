import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24 relative z-10">
      <div className="mx-auto max-w-6xl px-5 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <div className="font-mono text-fg">tanmay.saxena</div>
          <div className="text-fg-muted mt-1">
            AI/ML Engineer · Gainesville, FL · Open to relocate
          </div>
        </div>
        <div>
          <div className="label mb-2">Reach</div>
          <ul className="space-y-1">
            <li>
              <a
                href="mailto:tanmaysaxena58@gmail.com"
                className="text-fg-muted hover:text-accent transition-colors"
              >
                tanmaysaxena58@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+13527214719"
                className="text-fg-muted hover:text-accent transition-colors"
              >
                +1 352-721-4719
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="label mb-2">Elsewhere</div>
          <ul className="space-y-1">
            <li>
              <a
                href="https://github.com/Jawsenigma"
                target="_blank"
                rel="noreferrer"
                className="text-fg-muted hover:text-accent transition-colors"
              >
                github.com/Jawsenigma ↗
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/t-saxena"
                target="_blank"
                rel="noreferrer"
                className="text-fg-muted hover:text-accent transition-colors"
              >
                linkedin.com/in/t-saxena ↗
              </a>
            </li>
            <li>
              <Link
                href="/resume"
                className="text-fg-muted hover:text-accent transition-colors"
              >
                Résumé →
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between text-xs text-fg-dim font-mono">
          <span>© {new Date().getFullYear()} Tanmay Saxena</span>
          <span>Built with Next.js · Deployed on Netlify</span>
        </div>
      </div>
    </footer>
  );
}
