export function SiteFooter() {
  const links = ["About", "Privacy", "Twitter"];

  return (
    <footer className="bg-surface-container-lowest w-full py-12 border-t border-white/5 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 w-full max-w-[1440px] mx-auto gap-8">
        <div className="text-lg font-bold text-on-surface-variant">MUSIC MAESTRO</div>

        <div className="flex gap-8">
          {links.map((label) => (
            <a
              key={label}
              href="#"
              className="text-xs font-medium uppercase tracking-widest text-on-surface-variant/60 hover:text-primary hover:-translate-y-0.5 transition-all"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="text-xs font-medium uppercase tracking-widest text-on-surface-variant/40">
          © 2026 Music Maestro
        </div>
      </div>
    </footer>
  );
}

