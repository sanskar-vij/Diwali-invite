import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Diya from './Diya';
import { LotusLogo } from './Icons';

interface IntroProps {
  onDone: () => void;
  onStartAudio?: () => void;
}

/** Redesigned Clickable Royal Opening Page: Tap anywhere to light up celebration and start music */
export default function Intro({ onDone, onStartAudio }: IntroProps) {
  const [lit, setLit] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, () => ({
        a: Math.random() * Math.PI * 2,
        r: 100 + Math.random() * 400,
        d: Math.random() * 0.4,
        s: 2.5 + Math.random() * 3.5,
        c: Math.random() > 0.4 ? '#fef08a' : Math.random() > 0.5 ? '#f59e0b' : '#67e8f9',
      })),
    [],
  );

  const handleEnter = () => {
    if (lit) return;
    setLit(true);
    // Start festive audio immediately within the direct user tap event handler
    if (onStartAudio) {
      try {
        onStartAudio();
      } catch {
        /* noop */
      }
    }
    // Transition to the main celebration after spark explosion
    setTimeout(onDone, 1600);
  };

  return (
    <motion.div
      onClick={handleEnter}
      className="fixed inset-0 z-[80] flex cursor-pointer select-none items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#240940_0%,#110424_55%,#06010d_100%)] p-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9 } }}
      role="button"
      tabIndex={0}
      aria-label="Tap to enter Diwali celebrations and start festive music"
    >
      {/* Skip button in corner */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDone();
        }}
        className="absolute right-4 top-4 z-30 rounded-full border border-gold-400/50 bg-royal-950/70 px-4 py-1.5 font-serif text-xs tracking-widest text-gold-300 uppercase transition hover:border-gold-300 hover:text-white"
        aria-label="Skip opening"
      >
        Skip →
      </button>

      {/* Golden light wave expansion on tap */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,210,120,.85) 0%, rgba(255,140,40,.3) 45%, transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={lit ? { scale: 16, opacity: [0, 1, 0.4, 0] } : { scale: [0.8, 1.1, 0.8], opacity: 0.15 }}
        transition={lit ? { duration: 1.6, ease: 'easeOut' } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Explosion particles on ignition */}
      {lit &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: p.s,
              height: p.s,
              backgroundColor: p.c,
              boxShadow: `0 0 10px 3px ${p.c}`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: Math.cos(p.a) * p.r,
              y: Math.sin(p.a) * p.r,
              opacity: [0, 1, 0],
              scale: [0.5, 1.4, 0.2],
            }}
            transition={{ duration: 1.5, delay: p.d, ease: 'easeOut' }}
          />
        ))}

      {/* Central Royal Invitation Card */}
      <div className="relative z-20 flex w-full max-w-[420px] flex-col items-center rounded-[32px] border border-gold-400/50 bg-gradient-to-b from-royal-900/90 via-royal-950/95 to-[#0e041c] p-6 text-center shadow-[0_0_60px_rgba(255,190,80,.35),0_0_0_1px_rgba(255,210,120,.2)] backdrop-blur-xl sm:p-8">
        {/* Sacred Sanskrit Invocation */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-xs sm:text-sm tracking-[0.2em] text-gold-300/80 uppercase"
        >
          ॥ शुभ दीपावली ॥
        </motion.p>

        {/* Brand Lotus Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-3 flex items-center justify-center"
        >
          <LotusLogo className="h-10 w-16 drop-shadow-[0_0_12px_rgba(255,200,100,.6)]" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-2"
        >
          <span className="gold-text gold-glow-pulse block font-script text-5xl leading-tight sm:text-6xl">
            Diwali
          </span>
          <span className="gold-text -mt-1 block font-script text-3xl sm:text-4xl">
            Celebrations 2026
          </span>
        </motion.h1>

        <p className="mt-1 font-serif text-xs sm:text-sm tracking-wider text-gold-200/90">
          Presented with love by Patrika Studio
        </p>

        {/* Center Diya with breathing halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="relative my-6 flex items-center justify-center"
        >
          <div className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,200,90,.3),transparent_70%)] animate-pulse" />
          <Diya size={110} lit={true} igniting={lit} sparks={lit ? 12 : 4} glow={lit ? 1.8 : 1.2} />
        </motion.div>

        {/* Interactive Pulsing Tap Call to Action Banner */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full"
        >
          <div className="gold-btn flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 font-serif text-sm sm:text-base font-bold tracking-wider text-[#3a1350] shadow-[0_0_30px_rgba(255,190,80,.6)] uppercase">
            <span className="animate-spin text-base sm:text-lg">🎵</span>
            <span>{lit ? 'Opening Celebration...' : 'Tap To Enter With Music'}</span>
            <span className="animate-pulse text-base sm:text-lg">✨</span>
          </div>
        </motion.div>

        <p className="mt-3 text-[11px] sm:text-xs text-gold-300/75 font-serif">
          Tap anywhere on screen to begin the celebration with divine temple music
        </p>
      </div>
    </motion.div>
  );
}
