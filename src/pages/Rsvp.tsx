import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import rsvpArt from '../assets/rsvp-celebration.jpg';
import Diya from '../components/Diya';
import { CloseIcon, WishesGlyph } from '../components/Icons';
import { Divider, PageFrame } from '../components/Ornaments';
import Reveal from '../components/Reveal';
import { INVITE } from '../config';
import { celebrate } from '../context';

interface WishEntry {
  name: string;
  message: string;
  city?: string;
}

const PRESET_WISHES = [
  '🪔 Wishing you and your family a blessed, glowing, and prosperous Diwali!',
  '✨ May Goddess Lakshmi shower boundless joy, health, and wealth upon your home!',
  '💖 Warm festive greetings on Diwali, Govardhan Puja & Bhai Dooj to your family!',
  '🌸 May the divine lights illuminate your path with eternal peace and happiness!',
];

function Celebration() {
  const bits = useMemo(
    () =>
      Array.from({ length: 36 }, () => ({
        a: Math.random() * Math.PI * 2,
        r: 80 + Math.random() * 160,
        s: 3 + Math.random() * 5,
        d: Math.random() * 0.3,
        c: Math.random() < 0.6 ? '#ffd36b' : Math.random() < 0.5 ? '#ff8fcf' : '#ffb347',
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute left-1/2 top-16" aria-hidden="true">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ width: b.s, height: b.s, background: b.c, boxShadow: `0 0 8px ${b.c}` }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: Math.cos(b.a) * b.r, y: Math.sin(b.a) * b.r + 60, opacity: 0, scale: 0.4 }}
          transition={{ duration: 1.8, delay: b.d, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

function WishesModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<WishEntry>({
    name: '',
    message: PRESET_WISHES[0],
    city: '',
  });
  const [error, setError] = useState('');
  const [done, setDone] = useState<WishEntry | null>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const message = form.message.trim();
    if (name.length < 2) return setError('Please enter your name.');
    if (message.length < 3) return setError('Please enter your festive wish or greeting.');
    setError('');
    const entry: WishEntry = { ...form, name, message };

    try {
      const prev = JSON.parse(localStorage.getItem('diwali-wishes') || '[]');
      localStorage.setItem('diwali-wishes', JSON.stringify([...prev, { ...entry, at: new Date().toISOString() }]));
    } catch {
      /* storage unavailable */
    }
    setDone(entry);
    celebrate(window.innerWidth / 2, window.innerHeight * 0.22, 3);
  };

  const shareText = done
    ? `Shubh Deepavali! 🪔✨ Warm festive wishes from ${done.name}${done.city ? ` (${done.city})` : ''} to ${INVITE.familyName}:\n\n"${done.message}"\n\nWishing you a joyous celebration!`
    : '';
  const waTarget = INVITE.rsvpWhatsApp ? `https://wa.me/${INVITE.rsvpWhatsApp}?text=${encodeURIComponent(shareText)}` : `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishes-title"
    >
      <div className="absolute inset-0 bg-royal-950/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ y: 40, scale: 0.92, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 30, scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 240 }}
        className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-[24px] sm:rounded-[30px] border-2 border-gold-400 bg-gradient-to-b from-royal-900 to-royal-950 px-4 sm:px-7 pb-6 pt-7 shadow-[0_0_50px_rgba(255,190,80,.35),inset_0_0_0_5px_rgba(26,11,51,.9),inset_0_0_0_6px_#b98327]"
      >
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-gold-400/60 text-gold-300 hover:bg-gold-400/10 cursor-pointer"
          aria-label="Close wishes form"
        >
          <CloseIcon />
        </button>

        {!done ? (
          <form onSubmit={submit} noValidate>
            <h2 id="wishes-title" className="gold-text text-center font-script text-4xl sm:text-5xl leading-tight">
              Send Festive Wishes
            </h2>
            <p className="mt-1 text-center font-serif text-sm sm:text-base text-gold-300/80">
              Share your love &amp; blessings with {INVITE.familyName}
            </p>
            <Divider className="my-2.5 sm:my-3" />

            <label className="mt-3.5 block">
              <span className="mb-1 block text-sm sm:text-base text-gold-300 font-semibold">Your Name *</span>
              <input
                ref={firstRef}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoComplete="name"
                required
                placeholder="e.g. Rahul & Priya Sharma"
                className="w-full rounded-xl border border-gold-500/60 bg-royal-950/60 px-3.5 py-2.5 text-base sm:text-lg text-gold-200 placeholder:text-gold-300/40 outline-none focus:border-gold-300 focus:shadow-[0_0_14px_rgba(255,190,80,.35)]"
              />
            </label>

            <label className="mt-3 block">
              <span className="mb-1 block text-sm sm:text-base text-gold-300 font-semibold">Your City / Location (Optional)</span>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="e.g. New Delhi, Mumbai, London"
                className="w-full rounded-xl border border-gold-500/60 bg-royal-950/60 px-3.5 py-2 text-base text-gold-200 placeholder:text-gold-300/40 outline-none focus:border-gold-300"
              />
            </label>

            {/* Quick-pick preset wishes buttons */}
            <div className="mt-4">
              <span className="mb-1.5 block text-xs sm:text-sm text-gold-300/90 uppercase tracking-wider font-semibold">
                Tap a Quick Wish or Type Below:
              </span>
              <div className="flex flex-col gap-1.5">
                {PRESET_WISHES.map((pw, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setForm({ ...form, message: pw })}
                    className={`text-left text-xs sm:text-[13px] rounded-lg px-2.5 py-2 transition border cursor-pointer ${
                      form.message === pw
                        ? 'border-gold-300 bg-gold-400/20 text-gold-100 shadow-[0_0_10px_rgba(255,190,80,.25)]'
                        : 'border-gold-500/30 bg-royal-950/40 text-gold-300/75 hover:border-gold-400/70 hover:text-gold-200'
                    }`}
                  >
                    {pw}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-3.5 block">
              <span className="mb-1 block text-sm sm:text-base text-gold-300 font-semibold">Your Custom Message / Blessing *</span>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                placeholder="Write your personal Diwali blessing..."
                className="w-full rounded-xl border border-gold-500/60 bg-royal-950/60 px-3.5 py-2.5 text-sm sm:text-base text-gold-200 placeholder:text-gold-300/40 outline-none focus:border-gold-300 focus:shadow-[0_0_14px_rgba(255,190,80,.35)] resize-none"
              />
            </label>

            {error && <p role="alert" className="mt-3 text-center text-sm text-[#ffb4b4]">{error}</p>}
            <button
              type="submit"
              className="gold-btn mt-5 w-full rounded-full py-3 font-serif text-lg sm:text-xl font-bold tracking-wide cursor-pointer active:scale-98"
            >
              Send Festive Wishes ✨
            </button>
          </form>
        ) : (
          <div className="relative text-center" aria-live="polite">
            <Celebration />
            <div className="mx-auto mt-2 flex justify-center">
              <Diya size={80} igniting sparks={6} reflection={false} />
            </div>
            <h2 id="wishes-title" className="gold-text mt-3 font-script text-4xl sm:text-5xl leading-tight">
              Thank You!
            </h2>
            <Divider className="my-3" />
            <p className="text-xl leading-snug text-gold-200">
              Dear <strong className="text-gold-300">{done.name}</strong>, thank you for your heartwarming wishes and blessings!
            </p>
            <p className="mt-3 italic font-serif text-base text-gold-300/90 max-w-sm mx-auto">
              “{done.message}”
            </p>
            <div className="mt-5 rounded-xl border border-gold-500/40 bg-royal-950/50 p-3 text-sm text-gold-300/90">
              Your wishes have been recorded with warmth and devotion! You can also share them directly with {INVITE.familyName} on WhatsApp:
            </div>
            <a
              href={waTarget}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 font-serif text-lg font-bold"
            >
              <span>Share Wishes via WhatsApp</span>
              <span className="text-base">↗</span>
            </a>
            <button
              onClick={onClose}
              className="mt-3 w-full rounded-full border border-gold-400/60 py-2.5 text-base text-gold-300 hover:bg-gold-400/10 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function RsvpPage() {
  const [open, setOpen] = useState(false);
  const fade = 'linear-gradient(to bottom, transparent 0%, black 30%, black 85%, transparent 100%)';

  return (
    <PageFrame id="rsvp" theme="royal">
      <div className="relative z-[7] px-3 pt-[72px] text-center sm:px-5 sm:pt-[118px] lg:pt-[130px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="gold-text gold-glow-pulse font-script text-[clamp(40px,12vw,58px)] leading-[1.1] sm:text-[76px]"
        >
          Send Your Warm<br />Wishes &amp; Blessings
        </motion.h1>
        <Divider className="my-2.5 sm:my-3" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-shadow-soft mx-auto max-w-[21rem] text-[17px] sm:text-[21px] leading-snug text-[#fdeccb] sm:max-w-xl"
        >
          Share your heartfelt prayers, love, and festive greetings with {INVITE.familyName}.
        </motion.p>
        <Reveal delay={0.5}>
          <button
            onClick={() => setOpen(true)}
            className="gold-btn shimmer-border mt-5 sm:mt-7 inline-flex items-center gap-2.5 sm:gap-3 rounded-2xl px-8 py-3.5 sm:px-12 sm:py-4 font-serif text-[21px] sm:text-[26px] font-bold tracking-wider cursor-pointer active:scale-95 shadow-[0_0_28px_rgba(255,190,80,.45)]"
            aria-haspopup="dialog"
          >
            <WishesGlyph width={30} height={26} /> Send Wishes
          </button>
        </Reveal>
        <Reveal delay={0.6}>
          <p className="mt-5 sm:mt-7 text-lg sm:text-xl text-gold-200">With warmest regards &amp; devotion,</p>
          <p className="gold-text font-script text-[32px] sm:text-[38px] leading-tight lg:text-5xl">{INVITE.familyName}</p>
        </Reveal>
      </div>

      <div className="relative mt-6 sm:mt-auto h-[230px] sm:h-[360px]">
        <div className="absolute inset-0 overflow-hidden" style={{ maskImage: fade, WebkitMaskImage: fade }}>
          <img
            src={rsvpArt}
            alt="Opulent royal celebration hall decorated with marigold garlands, chandeliers and glowing diyas"
            loading="lazy"
            className="slow-pan h-full w-full object-cover object-[50%_45%]"
          />
          <div className="light-sweep pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,200,100,.3),transparent_60%)]" />
        </div>
        <div className="absolute inset-x-0 bottom-4 sm:bottom-6 flex justify-center">
          <Diya size={76} sparks={5} glow={1.3} delay={0} className="sm:hidden" />
          <Diya size={106} sparks={5} glow={1.3} delay={0} className="hidden sm:inline-block" />
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {open && <WishesModal onClose={() => setOpen(false)} />}
        </AnimatePresence>,
        document.body,
      )}
    </PageFrame>
  );
}
