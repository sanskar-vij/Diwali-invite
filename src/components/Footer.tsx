import Diya from './Diya';
import { Divider, SparkleField } from './Ornaments';
import { PAGES, type PageId, INVITE } from '../config';
import { useApp } from '../context';

export default function Footer() {
  const { go } = useApp();

  return (
    <footer className="relative z-10 border-t border-gold-500/30 bg-gradient-to-b from-[#130626] to-[#070210] px-3 pt-10 pb-12 sm:px-4 sm:pt-12 sm:pb-16 text-center text-gold-200">
      <SparkleField count={10} className="opacity-50" />

      <div className="relative mx-auto max-w-4xl">
        {/* Sacred blessing */}
        <span className="gold-text text-4xl block mb-2" role="img" aria-label="Om">
          ॐ
        </span>
        <h3 className="gold-text font-script text-4xl sm:text-5xl leading-tight">
          Shubh Deepavali
        </h3>
        <p className="mt-1 font-serif text-lg sm:text-xl italic text-gold-300/90 max-w-md mx-auto">
          “May the divine lights bring endless health, happiness, prosperity and love to you and your family.”
        </p>

        <Divider className="my-6 opacity-75" />

        {/* Central glowing diya */}
        <div className="my-4 flex justify-center">
          <Diya size={70} sparks={4} glow={1.2} />
        </div>

        {/* Quick event dates recap */}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          <div
            onClick={() => go('diwali')}
            className="cursor-pointer rounded-2xl border border-gold-500/30 bg-royal-950/50 p-3.5 transition hover:border-gold-300 hover:bg-gold-400/10"
          >
            <p className="text-sm uppercase tracking-wider text-gold-400 font-sans">24 October 2026</p>
            <h4 className="font-serif text-xl font-bold text-gold-200">Diwali</h4>
            <p className="text-xs text-gold-300/70">Maha Lakshmi Puja &amp; Deepotsav</p>
          </div>

          <div
            onClick={() => go('govardhan')}
            className="cursor-pointer rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-3.5 transition hover:border-emerald-300 hover:bg-emerald-400/10"
          >
            <p className="text-sm uppercase tracking-wider text-emerald-400 font-sans">26 October 2026</p>
            <h4 className="font-serif text-xl font-bold text-emerald-200">Govardhan Puja</h4>
            <p className="text-xs text-emerald-300/70">Annakut &amp; Krishna Bhakti</p>
          </div>

          <div
            onClick={() => go('bhaidooj')}
            className="cursor-pointer rounded-2xl border border-rose-500/30 bg-rose-950/30 p-3.5 transition hover:border-rose-300 hover:bg-rose-400/10"
          >
            <p className="text-sm uppercase tracking-wider text-rose-400 font-sans">25 October 2026</p>
            <h4 className="font-serif text-xl font-bold text-rose-200">Bhai Dooj</h4>
            <p className="text-xs text-rose-300/70">Yama Dwitiya &amp; Sibling Love</p>
          </div>
        </div>

        {/* Section Quick Links */}
        <nav aria-label="Footer Navigation" className="my-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-serif text-lg text-gold-300/80">
            {PAGES.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => go(p.id)}
                  className="transition hover:text-gold-100 hover:underline underline-offset-4 cursor-pointer"
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-gold-500/40 to-transparent my-6" />

        {/* Official Patrika Studio Link & Credits */}
        <div className="space-y-2">
          <p className="font-serif text-base sm:text-lg text-gold-200">
            Crafted with artistic devotion &amp; technology by{' '}
            <strong className="text-gold-300 font-brand">Patrika Studio</strong>
          </p>
          <div>
            <a
              href="https://patrikastudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-border shimmer-border inline-flex items-center gap-2 rounded-full px-5 py-2 font-serif text-sm sm:text-base text-gold-200 tracking-wider transition hover:text-white hover:shadow-[0_0_24px_rgba(255,190,80,.5)]"
            >
              <span>Visit Official Website: https://patrikastudio.com/</span>
              <span className="font-sans text-xs">↗</span>
            </a>
          </div>
          <p className="text-xs font-sans tracking-widest text-gold-400/70 uppercase pt-2">
            © {new Date().getFullYear()} {INVITE.familyName} &bull; Powered by{' '}
            <a
              href="https://patrikastudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold-200"
            >
              Patrika Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
