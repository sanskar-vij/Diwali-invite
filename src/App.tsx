import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { festiveAudio } from './audio';
import Fireworks from './components/Fireworks';
import Footer from './components/Footer';
import Intro from './components/Intro';
import Nav from './components/Nav';
import Petals from './components/Petals';
import { FIREWORK_INTENSITY, PAGES, type PageId } from './config';
import { AppContext, celebrate } from './context';
import BhaiDooj from './pages/BhaiDooj';
import Diwali from './pages/Diwali';
import Govardhan from './pages/Govardhan';
import Home from './pages/Home';
import RsvpPage from './pages/Rsvp';
import Studio from './pages/Studio';

const isPage = (h: string): h is PageId => PAGES.some((p) => p.id === h);

function Sky() {
  const stars = useMemo(
    () =>
      Array.from({ length: 75 }, () => ({
        l: Math.random() * 100,
        t: Math.random() * 75,
        s: Math.random() < 0.85 ? 1.5 : 2.5,
        d: Math.random() * 4,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#4a1a7a_0%,#2a0d4a_35%,#160830_65%,#0b0420_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,150,60,.18),transparent_65%)]" />
      {stars.map((s, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full bg-white"
          style={{
            left: `${s.l}%`,
            top: `${s.t}%`,
            width: s.s,
            height: s.s,
            animationDelay: `${s.d}s`,
            animationDuration: `${3 + s.d}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<PageId>('home');
  const [introDone, setIntroDone] = useState(false);
  const [sound, setSound] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reduced] = useState(() => {
    try {
      const saved = localStorage.getItem('reduced-motion');
      if (saved !== null) return saved === '1';
    } catch {
      /* noop */
    }
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  });

  const go = useCallback((targetId: PageId) => {
    setPage(targetId);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (targetId === 'home') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } else {
      history.replaceState(null, '', `#${targetId}`);
    }
  }, []);

  // Scroll spy to highlight active section in nav and bottom dock
  useEffect(() => {
    const sectionIds: PageId[] = ['home', 'diwali', 'govardhan', 'bhaidooj', 'rsvp', 'studio'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 300);

      const triggerPos = scrollY + window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= triggerPos) {
          setPage(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle URL hash on popstate and initial load
  useEffect(() => {
    const onPop = () => {
      const h = window.location.hash.slice(1);
      if (isPage(h)) {
        go(h);
      } else {
        go('home');
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [go]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduced', reduced);
    try {
      localStorage.setItem('reduced-motion', reduced ? '1' : '0');
    } catch {
      /* noop */
    }
  }, [reduced]);

  useEffect(() => {
    const label = PAGES.find((p) => p.id === page)?.label;
    document.title =
      page === 'home'
        ? 'Diwali Celebrations — Invitation by Patrika Studio'
        : `${label} — Diwali Celebrations by Patrika Studio`;
  }, [page]);

  const finishIntro = useCallback(() => {
    if (introDone) return;
    setIntroDone(true);
    setTimeout(() => celebrate(undefined, undefined, 3), 400);

    // If an initial hash was present, scroll to it once intro finishes
    const initialHash = window.location.hash.slice(1);
    if (isPage(initialHash)) {
      setTimeout(() => {
        const el = document.getElementById(initialHash);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, [introDone]);

  const toggleSound = async () => {
    if (festiveAudio.playing) {
      festiveAudio.stop();
      setSound(false);
    } else {
      await festiveAudio.start();
      setSound(festiveAudio.playing);
    }
  };

  return (
    <AppContext.Provider value={{ page, go, reduced }}>
      <Sky />
      <Fireworks intensity={introDone ? FIREWORK_INTENSITY[page] : 0} reduced={reduced} />
      {!reduced && <Petals count={page === 'govardhan' ? 18 : 14} />}

      {/* Main Container: Fully responsive luxury experience across mobile, tablets, and laptops */}
      <div className="relative w-full min-h-screen transition-all duration-300">
        {introDone && <Nav />}

        {/* Continuous vertical scrollable festival sections */}
        <main className="relative z-[2] w-full">
          <Home ready={introDone} />
          <Diwali />
          <Govardhan />
          <BhaiDooj />
          <RsvpPage />
          <Studio />
          <Footer />
        </main>

        {/* Floating Bottom-Right Festive Music Button */}
        {introDone && (
          <motion.button
            onClick={toggleSound}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 rounded-full border px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_0_24px_rgba(255,190,80,.5)] backdrop-blur-md transition-colors cursor-pointer ${
              sound
                ? 'border-gold-300 bg-royal-950/95 text-gold-200 shadow-[0_0_28px_rgba(255,200,90,.65)]'
                : 'border-gold-500/60 bg-royal-950/85 text-gold-300/90 hover:border-gold-300'
            }`}
            aria-pressed={sound}
            aria-label={sound ? 'Mute festive temple music' : 'Play festive temple music'}
            title={sound ? 'Mute music' : 'Play festive temple music'}
          >
            {sound ? (
              <>
                <span className="flex items-center gap-0.5 h-4">
                  <span className="inline-block h-3 w-1 rounded-full bg-gold-300 animate-[bounce_0.8s_infinite]" />
                  <span className="inline-block h-4 w-1 rounded-full bg-gold-400 animate-[bounce_1.1s_infinite_0.2s]" />
                  <span className="inline-block h-2 w-1 rounded-full bg-gold-200 animate-[bounce_0.9s_infinite_0.4s]" />
                </span>
                <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-gold-200">
                  Music ON
                </span>
              </>
            ) : (
              <>
                <span className="text-base sm:text-lg">🔇</span>
                <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-gold-300">
                  Play Music
                </span>
              </>
            )}
          </motion.button>
        )}

        {/* Floating Back to Top Button (stacked above the bottom-right music button) */}
        <AnimatePresence>
          {scrolled && (
            <motion.button
              onClick={() => go('home')}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="fixed bottom-[68px] right-4 sm:bottom-[78px] sm:right-6 z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gold-400/80 bg-royal-950/90 text-gold-200 shadow-[0_0_20px_rgba(255,190,80,.4)] backdrop-blur-md transition hover:border-gold-200 cursor-pointer"
              aria-label="Back to top"
              title="Return to top"
            >
              <span className="text-base sm:text-lg">↑</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!introDone && <Intro onDone={finishIntro} onStartAudio={toggleSound} />}
      </AnimatePresence>
    </AppContext.Provider>
  );
}
