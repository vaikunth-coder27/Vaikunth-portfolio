export function Footer() {
  return (
    <footer className="border-t border-p-border-subtle bg-background py-8 px-6 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="font-serif italic text-p-text font-semibold text-lg"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Vaikunth Guruswamy
          </span>
          <span className="text-p-text-5 text-xs font-mono">·</span>
          <span className="text-p-text-5 text-xs font-mono">AI Researcher & ML Engineer</span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-p-text-5">
          <a href="#hero" className="hover:text-p-text-3 transition-colors">Top</a>
          <a href="#projects" className="hover:text-p-text-3 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-p-text-3 transition-colors">Contact</a>
          <span className="opacity-50">© 2025</span>
        </div>
      </div>
    </footer>
  )
}
