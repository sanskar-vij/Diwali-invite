import { useEffect, useState } from 'react';
import { PAGES, type PageId } from '../config';
import { useApp } from '../context';

export default function Nav() {
  const { page, go } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nav = (id: PageId) => {
    go(id);
  };

  return (
    <header className="pointer-events-none sticky sm:fixed inset-x-0 top-0 z-40 px-2 pt-1.5 sm:px-4 sm:pt-4">
      <div
        className={`relative mx-auto flex max-w-[1180px] items-center justify-between px-3 py-1.5 sm:px-5 sm:py-2.5 transition-all duration-300 rounded-full ${
          scrolled
            ? 'bg-royal-950/85 backdrop-blur-md border border-gold-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : ''
        }`}
      >
        {/* Left: Auspicious ॐ symbol that scrolls back to top */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => go('home')}
            className="gold-text select-none text-[30px] sm:text-4xl leading-none transition-transform hover:scale-110 cursor-pointer flex items-center justify-center"
            aria-label="Scroll to top / Home"
            title="Return to top"
          >
            ॐ
          </button>
          <span className="font-serif text-xs sm:text-sm tracking-widest text-gold-300/90 uppercase font-semibold">
            Diwali Celebrations
          </span>
        </div>

        {/* Desktop horizontal nav (shown on laptop & desktop) */}
        <nav aria-label="Main" className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <ul className="gold-border flex items-center gap-1 rounded-full px-3 py-1.5 shadow-[0_0_24px_rgba(255,190,80,.25)] backdrop-blur-md bg-royal-950/60">
            {PAGES.map((p) => {
              const isActive = page === p.id;
              return (
                <li key={p.id}>
                  <button
                    onClick={() => nav(p.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative px-3.5 py-1.5 font-serif text-[17px] font-semibold tracking-wide transition xl:px-4 cursor-pointer ${
                      isActive ? 'text-gold-200' : 'text-gold-300/80 hover:text-gold-200'
                    }`}
                  >
                    {p.label}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-center bg-gradient-to-r from-transparent via-gold-300 to-transparent transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right controls: Patrika Studio official link */}
        <div className="pointer-events-auto flex items-center gap-2">
          <a
            href="https://patrikastudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/50 bg-royal-900/80 px-2.5 py-1 sm:px-3.5 sm:py-1.5 font-serif text-[11px] sm:text-xs text-gold-300 tracking-wider hover:text-gold-200 hover:border-gold-300 transition shadow-[0_0_10px_rgba(255,190,80,.2)]"
            title="Visit Patrika Studio official website"
          >
            <span className="hidden sm:inline">patrikastudio.com</span>
            <span className="sm:hidden">Patrika Studio</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
