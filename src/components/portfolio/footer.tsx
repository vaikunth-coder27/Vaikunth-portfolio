export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-8 px-6 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="font-serif italic text-white font-semibold text-lg"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Vaikunth Guruswamy
          </span>
          <span className="text-neutral-700 text-xs font-mono">·</span>
          <span className="text-neutral-600 text-xs font-mono">AI Researcher & ML Engineer</span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-neutral-700">
          <a href="#hero" className="hover:text-neutral-400 transition-colors">Top</a>
          <a href="#projects" className="hover:text-neutral-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-neutral-400 transition-colors">Contact</a>
          <span className="text-neutral-800">© 2025</span>
        </div>
      </div>
    </footer>
  )
}
