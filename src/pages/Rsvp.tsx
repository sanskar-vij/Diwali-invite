import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import rsvpArt from '../assets/rsvp-celebration.jpg';
import Diya from '../components/Diya';
import { CloseIcon, GuestsGlyph } from '../components/Icons';
import { Divider, PageFrame } from '../components/Ornaments';
import Reveal from '../components/Reveal';
import { INVITE } from '../config';
import { celebrate } from '../context';

type Status = 'yes' | 'no';
interface Rsvp { name: string; guests: number; status: Status }

function Celebration() {
  const bits = useMemo(() => Array.from({ length: 36 }, () => ({ a: Math.random() * Math.PI * 2, r: 80 + Math.random() * 160, s: 3 + Math.random() * 5, d: Math.random() * 0.3, c: Math.random() < 0.6 ? '#ffd36b' : Math.random() < 0.5 ? '#ff8fcf' : '#ffb347' })), []);
  return (
    <div className="pointer-events-none absolute left-1/2 top-16" aria-hidden="true">
      {bits.map((b, i) => (
        <motion.span key={i} className="absolute rounded-full" style={{ width: b.s, height: b.s, background: b.c, boxShadow: `0 0 8px ${b.c}` }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: Math.cos(b.a) * b.r, y: Math.sin(b.a) * b.r + 60, opacity: 0, scale: 0.4 }}
          transition={{ duration: 1.8, delay: b.d, ease: 'easeOut' }} />
      ))}
    </div>
  );
}

function RsvpModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<Rsvp>({ name: '', guests: 1, status: 'yes' });
  const [error, setError] = useState('');
  const [done, setDone] = useState<Rsvp | null>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    if (name.length < 2) return setError('Please enter your name.');
    if (form.status === 'yes' && (form.guests < 1 || form.guests > 20)) return setError('Number of guests should be between 1 and 20.');
    setError('');
    const entry = { ...form, name };
    // No backend is configured: keep a local copy on this device only.
    try {
      const prev = JSON.parse(localStorage.getItem('diwali-rsvp') || '[]');
      localStorage.setItem('diwali-rsvp', JSON.stringify([...prev, { ...entry, at: new Date().toISOString() }]));
    } catch { /* storage unavailable */ }
    setDone(entry);
    if (entry.status === 'yes') celebrate(window.innerWidth / 2, window.innerHeight * 0.22, 3);
  };

  const message = done
    ? `Namaste! This is ${done.name}. ${done.status === 'yes' ? `We will be attending the Diwali celebrations — ${done.guests} guest${done.guests > 1 ? 's' : ''}.` : 'Sadly, we are unable to attend the Diwali celebrations. Wishing you a very Happy Diwali!'}`
    : '';
  const waLink = `https://wa.me/${INVITE.rsvpWhatsApp}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="rsvp-title">
      <div className="absolute inset-0 bg-royal-950/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ y: 40, scale: 0.92, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 30, scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 240 }}
        className="relative max-h-[92svh] w-full max-w-md overflow-y-auto rounded-[24px] sm:rounded-[28px] border-2 border-gold-400 bg-gradient-to-b from-royal-800 to-royal-950 px-4 sm:px-6 pb-6 pt-7 shadow-[0_0_50px_rgba(255,190,80,.35),inset_0_0_0_5px_rgba(26,11,51,.9),inset_0_0_0_6px_#b98327]"
      >
        <button onClick={onClose} className="absolute right-3.5 top-3.5 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-gold-400/60 text-gold-300 hover:bg-gold-400/10 cursor-pointer" aria-label="Close RSVP form"><CloseIcon /></button>
        {!done ? (
          <form onSubmit={submit} noValidate>
            <h2 id="rsvp-title" className="gold-text text-center font-script text-4xl sm:text-5xl leading-tight">Kindly RSVP</h2>
            <Divider className="my-2.5 sm:my-3" />
            <label className="mt-3.5 block">
              <span className="mb-1 block text-base sm:text-lg text-gold-300">Guest Name</span>
              <input ref={firstRef} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" required placeholder="Your full name"
                className="w-full rounded-xl border border-gold-500/60 bg-royal-950/60 px-3.5 py-2.5 text-base sm:text-lg text-gold-200 placeholder:text-gold-300/40 outline-none focus:border-gold-300 focus:shadow-[0_0_14px_rgba(255,190,80,.35)]" />
            </label>
            <fieldset className="mt-4">
              <legend className="mb-1.5 text-base sm:text-lg text-gold-300">Will you join us?</legend>
              <div className="grid grid-cols-2 gap-2.5">
                {([['yes', 'Attending'], ['no', 'Unable to Attend']] as const).map(([v, l]) => (
                  <label key={v} className={`cursor-pointer rounded-xl border px-2.5 py-2.5 text-center text-[15px] sm:text-[17px] transition ${form.status === v ? 'border-gold-300 bg-gold-400/15 text-gold-200 shadow-[0_0_14px_rgba(255,190,80,.35)]' : 'border-gold-500/40 text-gold-300/80 hover:border-gold-400'}`}>
                    <input type="radio" name="status" value={v} checked={form.status === v} onChange={() => setForm({ ...form, status: v })} className="sr-only" />
                    {l}
                  </label>
                ))}
              </div>
            </fieldset>
            <AnimatePresence initial={false}>
              {form.status === 'yes' && (
                <motion.label className="mt-4 block overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <span className="mb-1.5 block text-base sm:text-lg text-gold-300">Number of Guests</span>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })} className="h-11 w-11 rounded-xl border border-gold-500/60 text-xl text-gold-300 hover:bg-gold-400/10 cursor-pointer" aria-label="Decrease guests">−</button>
                    <input type="number" min={1} max={20} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) || 1 })}
                      className="h-11 w-full rounded-xl border border-gold-500/60 bg-royal-950/60 text-center text-lg sm:text-xl text-gold-200 outline-none focus:border-gold-300" aria-label="Number of guests" />
                    <button type="button" onClick={() => setForm({ ...form, guests: Math.min(20, form.guests + 1) })} className="h-11 w-11 rounded-xl border border-gold-500/60 text-xl text-gold-300 hover:bg-gold-400/10 cursor-pointer" aria-label="Increase guests">+</button>
                  </div>
                </motion.label>
              )}
            </AnimatePresence>
            {error && <p role="alert" className="mt-3 text-center text-sm text-[#ffb4b4]">{error}</p>}
            <button type="submit" className="gold-btn mt-6 w-full rounded-full py-3 font-serif text-lg sm:text-xl font-bold tracking-wide cursor-pointer active:scale-98">Submit RSVP</button>
          </form>
        ) : (
          <div className="relative text-center" aria-live="polite">
            <Celebration />
            <div className="mx-auto mt-2 flex justify-center"><Diya size={80} igniting sparks={6} reflection={false} /></div>
            <h2 id="rsvp-title" className="gold-text mt-3 font-script text-5xl leading-tight">{done.status === 'yes' ? 'Thank You!' : 'You’ll Be Missed'}</h2>
            <Divider className="my-3" />
            <p className="text-xl leading-snug text-gold-200">
              {done.status === 'yes'
                ? <>Dear <strong className="text-gold-300">{done.name}</strong>, we are delighted! We look forward to celebrating with {done.guests > 1 ? `your party of ${done.guests}` : 'you'}.</>
                : <>Dear <strong className="text-gold-300">{done.name}</strong>, thank you for letting us know. Wishing you a very Happy Diwali!</>}
            </p>
            <p className="mt-4 rounded-xl border border-gold-500/40 bg-royal-950/50 px-4 py-3 text-[15px] leading-snug text-gold-300/85">
              Your response has been noted on this device only. Please send it to {INVITE.familyName} so they receive it:
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="gold-btn mt-5 inline-flex w-full items-center justify-center rounded-full py-3 font-serif text-lg font-bold">Send RSVP via WhatsApp</a>
            <button onClick={onClose} className="mt-3 w-full rounded-full border border-gold-400/60 py-3 text-lg text-gold-300 hover:bg-gold-400/10">Close</button>
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
      <div className="relative z-[7] px-3 pt-[72px] text-center sm:px-5 sm:pt-[124px] lg:pt-[140px]">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="gold-text gold-glow-pulse font-script text-[clamp(40px,12vw,58px)] leading-[1.1] sm:text-[78px]">
          Join Us for<br />a Joyous Celebration!
        </motion.h1>
        <Divider className="my-2.5 sm:my-3" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-shadow-soft mx-auto max-w-[19rem] text-[17px] sm:text-[20px] leading-snug text-[#fdeccb] sm:max-w-md">
          Your presence will make our festivities even more special.
        </motion.p>
        <Reveal delay={0.5}>
          <button onClick={() => setOpen(true)} className="gold-btn shimmer-border mt-5 sm:mt-7 inline-flex items-center gap-2.5 sm:gap-3 rounded-2xl px-8 py-3 sm:px-12 sm:py-4 font-serif text-[22px] sm:text-[28px] font-bold tracking-wider cursor-pointer active:scale-95" aria-haspopup="dialog">
            <GuestsGlyph width={32} height={22} /> RSVP
          </button>
        </Reveal>
        <Reveal delay={0.6}>
          <p className="mt-5 sm:mt-7 text-lg sm:text-xl text-gold-200">With warm regards,</p>
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

      {createPortal(<AnimatePresence>{open && <RsvpModal onClose={() => setOpen(false)} />}</AnimatePresence>, document.body)}
    </PageFrame>
  );
}
