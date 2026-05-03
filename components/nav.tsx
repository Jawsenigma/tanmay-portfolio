import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight hover:text-accent transition-colors"
        >
          tanmay<span className="text-accent">.</span>saxena
        </Link>
        <nav className="flex items-center gap-6 text-sm text-fg-muted">
          <Link href="/#work" className="hover:text-fg transition-colors">
            Work
          </Link>
          <Link href="/#about" className="hover:text-fg transition-colors">
            About
          </Link>
          <Link href="/#contact" className="hover:text-fg transition-colors">
            Contact
          </Link>
          <Link
            href="/resume"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border-strong px-3 py-1.5 text-fg hover:border-accent hover:text-accent transition-colors"
          >
            Résumé
          </Link>
        </nav>
      </div>
    </header>
  );
}
