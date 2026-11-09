import { motion } from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';
import palace from '../assets/palace.jpg';
import { festiveAudio } from '../audio';
import Diya from '../components/Diya';
import { CowGlyph, CoupleGlyph, DiyaGlyph, WishesGlyph } from '../components/Icons';
import { Divider, PageFrame, SparkleField } from '../components/Ornaments';
import type { PageId } from '../config';
import { celebrate, useApp } from '../context';

const CARDS: { id: PageId; label: ReactNode; icon: ReactNode; sr: string; date: string }[] = [
  { id: 'diwali', label: 'Diwali', icon: <DiyaGlyph width={38} height={32} />, sr: 'Diwali Celebration', date: 'Sun, 8 Nov' },
  { id: 'govardhan', label: <>Govardhan<br />Puja</>, icon: <CowGlyph width={44} height={32} />, sr: 'Govardhan Puja', date: 'Mon, 9 Nov' },
  { id: 'bhaidooj', label: 'Bhai Dooj', icon: <CoupleGlyph width={38} height={32} />, sr: 'Bhai Dooj Celebration', date: 'Wed, 11 Nov' },
  { id: 'rsvp', label: 'Wishes', icon: <WishesGlyph width={32} height={32} />, sr: 'Send Festive Wishes', date: 'Send Wishes' },
];

export default function Home({ ready }: { ready: boolean }) {
  const { go } = useApp();
  const [boost, setBoost] = useState(0);
  const [boosting, setBoosting] = useState(false);
  const diyaRef = useRef<HTMLButtonElement>(null);

  const lightDiya = () => {
    setBoost((b) => b + 1);
    setBoosting(true);
    if (!festiveAudio.playing) {
      festiveAudio.start();
    }
    const r = diyaRef.current?.getBoundingClientRect();
    celebrate(r ? r.left + r.width / 2 : undefined, undefined, 3);
    setTimeout(() => setBoosting(false), 2600);
  };

  const show = (d: number) => ({
    initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 1, delay: d, ease: [0.2, 0.7, 0.2, 1] as const },
  });

  return (
    <PageFrame id="home" theme="royal">
      {/* Heading */}
      <div className="relative px-3 pt-[72px] text-center sm:px-5 sm:pt-[118px] lg:pt-[130px]">
        <SparkleField count={12} className="opacity-70" />
        <motion.p {...show(0.1)} className="text-shadow-soft font-serif text-[17px] text-gold-200 sm:text-2xl">
          You are cordially invited to our
        </motion.p>
        <motion.h1 {...show(0.35)} className="mt-0.5 leading-none">
          <span className="gold-text gold-glow-pulse block font-script text-[clamp(48px,15vw,84px)] leading-[0.95] sm:text-[100px] lg:text-[120px]">Diwali</span>
          <span className="gold-text gold-glow-pulse -mt-0.5 block font-script text-[clamp(34px,10.5vw,56px)] leading-[1.05] sm:text-[66px] lg:text-[78px]">Celebrations</span>
        </motion.h1>
        <motion.div {...show(0.6)}><Divider className="my-2.5 sm:my-3" /></motion.div>
        <motion.p {...show(0.75)} className="text-shadow-soft mx-auto max-w-xs font-serif text-[16.5px] leading-snug text-[#fdeccb] sm:max-w-md sm:text-2xl">
          Let&apos;s come together to celebrate the festival of lights!
        </motion.p>
      </div>

      {/* Palace with water reflections and diyas */}
      <motion.div {...show(0.5)} className="relative mt-3 sm:mt-6">
        <div className="relative mx-auto h-[210px] overflow-hidden sm:h-[330px] lg:h-[400px]" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)' }}>
          <img
            src={palace}
            alt="Illuminated royal palace reflected in still water on Diwali night"
            className="slow-pan absolute inset-0 h-full w-full object-cover object-[50%_55%] transition-[filter] duration-[1500ms]"
            style={{ filter: boosting ? 'brightness(1.35) saturate(1.2)' : 'brightness(1) saturate(1.05)' }}
          />
          <div className="light-sweep pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(255,200,100,.35),transparent_60%)]" />
          <motion.div
            key={boost}
            className="pointer-events-none absolute left-1/2 top-[75%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-24 sm:w-24"
            style={{ background: 'radial-gradient(circle, rgba(255,210,120,.8), rgba(255,160,60,.25) 45%, transparent 70%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={boost ? { scale: [0, 9], opacity: [0, 1, 0] } : {}}
            transition={{ duration: 2.2, ease: 'easeOut' }}
          />
        </div>
        {/* Diyas floating on the water: cleanly spaced, never overlapping */}
        <div className="absolute inset-x-0 bottom-2.5 flex items-end justify-center gap-4 sm:bottom-6 sm:gap-10">
          <div className="hidden sm:block">
            <Diya size={46} delay={0.3} />
          </div>
          <Diya size={50} delay={0.9} />
          <button
            ref={diyaRef}
            onClick={lightDiya}
            className="group relative -mb-1 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-gold-300"
            aria-label="Tap the diya to light up the celebration and music"
          >
            <Diya key={boost} size={74} igniting={boost > 0} sparks={boosting ? 10 : 4} glow={boosting ? 1.6 : 1.1} delay={0} />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-widest text-gold-300/85 uppercase opacity-85 transition group-hover:opacity-100 font-semibold">
              Tap to light 🎵
            </span>
          </button>
          <Diya size={50} delay={1.4} />
          <div className="hidden sm:block">
            <Diya size={46} delay={2} />
          </div>
        </div>
      </motion.div>

      {/* Navigation cards to jump/scroll to sections */}
      <nav aria-label="Celebrations" className="relative z-[7] mx-auto mt-6 sm:mt-10 grid w-full max-w-[420px] grid-cols-2 gap-2.5 px-2.5 sm:max-w-[580px] sm:gap-5 lg:max-w-[940px] lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => go(c.id)}
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1 + i * 0.12 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            aria-label={`Go to ${c.sr}`}
            className="gold-border shimmer-border group relative flex min-h-[96px] sm:min-h-[126px] flex-col items-center justify-center gap-0.5 sm:gap-1 rounded-[18px] sm:rounded-[22px] px-2 py-2 sm:py-3 text-gold-300 shadow-[0_8px_26px_rgba(0,0,0,.45)] transition-shadow hover:shadow-[0_0_30px_rgba(255,196,90,.55)] focus-visible:outline-2 focus-visible:outline-gold-200 cursor-pointer"
          >
            <span className="pointer-events-none absolute inset-[4px] sm:inset-[5px] rounded-[14px] sm:rounded-[17px] border border-gold-500/50" />
            {/* Corner flourishes */}
            {['left-1.5 top-1.5 sm:left-2 sm:top-2', 'right-1.5 top-1.5 sm:right-2 sm:top-2 rotate-90', 'right-1.5 bottom-1.5 sm:right-2 sm:bottom-2 rotate-180', 'left-1.5 bottom-1.5 sm:left-2 sm:bottom-2 -rotate-90'].map((pos) => (
              <svg key={pos} viewBox="0 0 12 12" className={`pointer-events-none absolute h-2.5 w-2.5 sm:h-3 sm:w-3 ${pos}`} aria-hidden="true"><path d="M1 11V5a4 4 0 0 1 4-4h6" stroke="#f3cf78" strokeWidth="1.2" fill="none" /><circle cx="4" cy="4" r="1" fill="#f3cf78" /></svg>
            ))}
            <span className="drop-shadow-[0_0_8px_rgba(255,200,100,.6)] transition-transform group-hover:scale-110 scale-90 sm:scale-100">{c.icon}</span>
            <span className="text-center font-serif text-[17px] sm:text-[22px] font-semibold italic leading-tight text-gold-200">{c.label}</span>
            <span className="text-[11px] sm:text-[12px] font-sans text-gold-300/70 tracking-wider uppercase">{c.date}</span>
          </motion.button>
        ))}
      </nav>

      {/* Scroll indicator invitation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
        className="relative z-[7] mx-auto mt-8 flex flex-col items-center text-center cursor-pointer"
        onClick={() => go('diwali')}
      >
        <span className="text-sm font-serif tracking-[0.2em] text-gold-300/80 uppercase">
          Scroll Down to Explore Celebrations
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-1 text-gold-300 text-lg"
          aria-hidden="true"
        >
          ↓
        </motion.span>
      </motion.div>

      {/* Footer attribution with official Patrika Studio link */}
      <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.6 }} className="relative z-[7] mt-auto px-6 pb-8 pt-6 text-center">
        <div className="flex items-center justify-center gap-3 text-gold-200">
          <span className="h-px w-10 bg-gold-400/70" />
          <span className="font-serif text-lg italic">With warmest wishes</span>
          <span className="h-px w-10 bg-gold-400/70" />
        </div>
        <a
          href="https://patrikastudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm tracking-[0.2em] text-gold-300/90 uppercase underline-offset-4 transition hover:text-white hover:underline"
        >
          <span>Crafted with devotion by Patrika Studio</span>
          <span className="text-xs font-sans text-gold-400">↗</span>
        </a>
      </motion.div>
    </PageFrame>
  );
}
