import { useMemo, type ReactNode } from 'react';
import Lantern from './Lantern';
import { CalendarIcon, ClockIcon, PinIcon } from './Icons';
import type { EventInfo } from '../config';
import { GovardhanArchTop, BhaiDoojArchTop } from './FestivalOrnaments';

/* ---------------- Mughal / Rajasthani arch top ---------------- */
const ARCH =
  'M0,200 L0,135 C90,124 160,100 225,84 C250,62 292,60 315,72 C352,44 410,36 442,44 C462,24 488,12 500,0 C512,12 538,24 558,44 C590,36 648,44 685,72 C708,60 750,62 775,84 C840,100 910,124 1000,135 L1000,200';

export function ArchTop() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[95px] sm:h-[140px] lg:h-[170px]" aria-hidden="true">
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="spandrel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a1160" />
            <stop offset="1" stopColor="#1e0838" />
          </linearGradient>
          <pattern id="jali" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 2 Q26 14 38 20 Q26 26 20 38 Q14 26 2 20 Q14 14 20 2Z" fill="none" stroke="#d4a03a" strokeWidth="1.2" opacity=".55" />
            <circle cx="20" cy="20" r="2.4" fill="#e9bd5b" opacity=".6" />
            <circle cx="0" cy="0" r="1.6" fill="#e9bd5b" opacity=".5" />
            <circle cx="40" cy="40" r="1.6" fill="#e9bd5b" opacity=".5" />
          </pattern>
          <linearGradient id="goldLine" x1="0" x2="1">
            <stop offset="0" stopColor="#a8761f" /><stop offset=".25" stopColor="#ffe9a8" /><stop offset=".5" stopColor="#d4a03a" />
            <stop offset=".75" stopColor="#ffe9a8" /><stop offset="1" stopColor="#a8761f" />
          </linearGradient>
        </defs>
        {/* spandrels */}
        <path d={`M0,0 H1000 V135 C910,124 840,100 775,84 C750,62 708,60 685,72 C648,44 590,36 558,44 C538,24 512,12 500,0 C488,12 462,24 442,44 C410,36 352,44 315,72 C292,60 250,62 225,84 C160,100 90,124 0,135 Z`} fill="url(#spandrel)" />
        <path d={`M0,0 H1000 V135 C910,124 840,100 775,84 C750,62 708,60 685,72 C648,44 590,36 558,44 C538,24 512,12 500,0 C488,12 462,24 442,44 C410,36 352,44 315,72 C292,60 250,62 225,84 C160,100 90,124 0,135 Z`} fill="url(#jali)" />
        {/* double gold arch line */}
        <path d={ARCH} fill="none" stroke="url(#goldLine)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        <path d={ARCH} transform="translate(0 9)" fill="none" stroke="#d4a03a" strokeWidth="1.2" opacity=".8" vectorEffect="non-scaling-stroke" />
        <path d={ARCH} transform="translate(0 15)" fill="none" stroke="#ffe9a8" strokeWidth="1" strokeDasharray="1 5" strokeLinecap="round" opacity=".9" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* kalash finial */}
      <svg viewBox="0 0 40 40" className="absolute left-1/2 top-0 h-6 w-6 sm:h-8 sm:w-8 -translate-x-1/2">
        <path d="M20 2 C24 8 26 12 20 18 C14 12 16 8 20 2Z" fill="#ffe9a8" />
        <circle cx="20" cy="24" r="6" fill="#d4a03a" stroke="#ffe9a8" strokeWidth="1" />
        <path d="M10 32 Q20 26 30 32" stroke="#ffe9a8" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

/* ---------------- Flowers ---------------- */
export function Marigold({ size = 40, hue = 'orange' }: { size?: number; hue?: 'orange' | 'yellow' }) {
  const c = hue === 'orange' ? ['#ff7a00', '#ff9f1c', '#ffc04d'] : ['#f7a800', '#ffc93c', '#ffe680'];
  return (
    <svg viewBox="-20 -20 40 40" width={size} height={size} aria-hidden="true">
      {[18, 14, 10, 6].map((r, layer) =>
        Array.from({ length: 16 - layer * 2 }, (_, i) => {
          const a = (i / (16 - layer * 2)) * 360 + layer * 11;
          return <ellipse key={`${layer}-${i}`} cx="0" cy={-r * 0.55} rx={r * 0.28} ry={r * 0.5} transform={`rotate(${a})`} fill={c[Math.min(layer, 2)]} stroke="#b84a00" strokeWidth=".3" />;
        }),
      )}
      <circle r="3" fill="#d96500" />
    </svg>
  );
}

export function Lotus({ size = 44 }: { size?: number }) {
  return (
    <svg viewBox="-25 -25 50 40" width={size} height={size * 0.8} aria-hidden="true">
      <defs>
        <linearGradient id="lotusG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd6ec" /><stop offset=".6" stopColor="#ff6fb5" /><stop offset="1" stopColor="#c2186b" />
        </linearGradient>
      </defs>
      {[-70, -40, 40, 70, -15, 15, 0].map((a, i) => (
        <path key={i} d="M0 10 C-7 0 -6 -12 0 -20 C6 -12 7 0 0 10Z" transform={`rotate(${a} 0 10)`} fill="url(#lotusG)" stroke="#a3125a" strokeWidth=".5" />
      ))}
      <circle cx="0" cy="6" r="3" fill="#ffd36b" />
    </svg>
  );
}

export function FlowerCluster({ side = 'left', scale = 1 }: { side?: 'left' | 'right'; scale?: number }) {
  const s = scale;
  return (
    <div className={`pointer-events-none absolute bottom-0 z-[6] ${side === 'left' ? 'left-0' : 'right-0 -scale-x-100'}`} aria-hidden="true">
      <div className="relative" style={{ width: 130 * s, height: 110 * s }}>
        <svg viewBox="0 0 130 110" width={130 * s} height={110 * s} className="absolute inset-0">
          <path d="M0 110 Q20 60 60 50 Q30 75 25 110Z" fill="#1f6b3a" opacity=".9" />
          <path d="M0 110 Q50 90 90 70 Q60 95 50 110Z" fill="#2c8a4b" opacity=".85" />
        </svg>
        <div className="absolute" style={{ left: -6 * s, bottom: 8 * s }}><Marigold size={46 * s} /></div>
        <div className="absolute" style={{ left: 30 * s, bottom: -6 * s }}><Lotus size={58 * s} /></div>
        <div className="absolute" style={{ left: 4 * s, bottom: 50 * s }}><Lotus size={40 * s} /></div>
        <div className="absolute" style={{ left: 78 * s, bottom: -4 * s }}><Marigold size={36 * s} hue="yellow" /></div>
        <div className="absolute" style={{ left: -4 * s, bottom: 84 * s }}><Marigold size={28 * s} hue="yellow" /></div>
      </div>
    </div>
  );
}

/* ---------------- Dividers & text ---------------- */
export function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400 sm:w-24" />
      <svg viewBox="0 0 60 16" className="h-4 w-14">
        <path d="M30 1 C33 6 36 7 42 8 C36 9 33 10 30 15 C27 10 24 9 18 8 C24 7 27 6 30 1Z" fill="#f3cf78" />
        <circle cx="10" cy="8" r="2" fill="#e9bd5b" /><circle cx="50" cy="8" r="2" fill="#e9bd5b" />
        <circle cx="3" cy="8" r="1.2" fill="#e9bd5b" /><circle cx="57" cy="8" r="1.2" fill="#e9bd5b" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400 sm:w-24" />
    </div>
  );
}

export function SparkleField({ count = 14, className = '' }: { count?: number; className?: string }) {
  const dots = useMemo(() => Array.from({ length: count }, () => ({ l: Math.random() * 100, t: Math.random() * 100, d: Math.random() * 3, s: 2 + Math.random() * 3 })), [count]);
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {dots.map((d, i) => (
        <span key={i} className="twinkle absolute rounded-full bg-gold-200" style={{ left: `${d.l}%`, top: `${d.t}%`, width: d.s, height: d.s, animationDelay: `${d.d}s`, boxShadow: '0 0 8px 2px rgba(255,210,120,.7)' }} />
      ))}
    </div>
  );
}

/* ---------------- Event info panel ---------------- */
export function InfoPanel({ info }: { info: EventInfo }) {
  const rows = [
    { icon: <CalendarIcon />, label: 'Date', value: <>{info.date}<span className="block text-[0.92em] opacity-85">({info.day})</span></> },
    { icon: <ClockIcon />, label: 'Time', value: info.time },
    { icon: <PinIcon />, label: 'Venue', value: info.venue },
  ];
  return (
    <div className="gold-border shimmer-border mx-auto w-full max-w-sm rounded-2xl px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,.45)] backdrop-blur-sm">
      <dl className="space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start gap-3.5">
            <dt className="mt-0.5 shrink-0 text-gold-300">{r.icon}<span className="sr-only">{r.label}</span></dt>
            <dd className="text-[17px] leading-snug text-gold-200 sm:text-lg">
              <span className="text-gold-300">{r.label}:</span> {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Ribbon({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-5 flex flex-col items-center">
      <Divider className="mb-2 opacity-90" />
      <div className="gold-border rounded-full px-7 py-2 shadow-[0_0_24px_rgba(255,190,80,.3)]">
        <p className="gold-text font-script text-2xl sm:text-3xl">{children}</p>
      </div>
    </div>
  );
}

/* ---------------- Page frame ---------------- */
export function PageFrame({
  children,
  flowers = true,
  lanterns = true,
  theme = 'diwali',
  id,
  className = '',
}: {
  children: ReactNode;
  flowers?: boolean;
  lanterns?: boolean;
  theme?: 'diwali' | 'govardhan' | 'bhaidooj' | 'royal' | 'studio';
  id?: string;
  className?: string;
}) {
  const borderStyles = {
    diwali: 'border-gold-400 bg-gradient-to-b from-[#1c0838]/90 via-[#120526]/95 to-[#0a0217]',
    govardhan: 'border-emerald-400 bg-gradient-to-b from-[#064e3b]/90 via-[#043328]/95 to-[#021f18]',
    bhaidooj: 'border-rose-400 bg-gradient-to-b from-[#5c0822]/90 via-[#3b0516]/95 to-[#21030d]',
    royal: 'border-gold-400 bg-gradient-to-b from-[#1e0a3b]/90 via-[#120526]/95 to-[#0a0217]',
    studio: 'border-amber-400/90 bg-gradient-to-b from-[#261307]/95 via-[#1a0c04]/95 to-[#0d0502]',
  }[theme];

  const shadowStyles = {
    diwali: '0 0 0 1px #8a5a14, 0 0 32px rgba(255,190,80,.35), inset 0 0 0 4px rgba(26,11,51,.9), inset 0 0 0 5px #b98327, inset 0 0 80px rgba(10,0,30,.7)',
    govardhan: '0 0 0 1px #065f46, 0 0 32px rgba(16,185,129,.35), inset 0 0 0 4px rgba(4,47,46,.9), inset 0 0 0 5px #059669, inset 0 0 80px rgba(2,31,24,.75)',
    bhaidooj: '0 0 0 1px #881337, 0 0 32px rgba(244,63,94,.35), inset 0 0 0 4px rgba(76,5,25,.9), inset 0 0 0 5px #be123c, inset 0 0 80px rgba(33,3,13,.75)',
    royal: '0 0 0 1px #8a5a14, 0 0 32px rgba(255,190,80,.35), inset 0 0 0 4px rgba(26,11,51,.9), inset 0 0 0 5px #b98327, inset 0 0 80px rgba(10,0,30,.7)',
    studio: '0 0 0 1px #d97706, 0 0 36px rgba(245,158,11,.35), inset 0 0 0 4px rgba(45,21,11,.9), inset 0 0 0 5px #f59e0b, inset 0 0 90px rgba(20,9,4,.85)',
  }[theme];

  return (
    <section id={id} className={`festival-section relative min-h-[100svh] p-1.5 sm:p-4 mb-4 sm:mb-10 ${className}`}>
      <div
        className={`relative mx-auto min-h-[calc(100svh-12px)] max-w-[1180px] overflow-hidden rounded-[24px] border-2 sm:min-h-[calc(100svh-32px)] sm:rounded-[36px] ${borderStyles}`}
        style={{ boxShadow: shadowStyles }}
      >
        {theme === 'govardhan' ? (
          <GovardhanArchTop />
        ) : theme === 'bhaidooj' ? (
          <BhaiDoojArchTop />
        ) : (
          <ArchTop />
        )}

        {lanterns && (
          <>
            <div className="absolute left-2 top-6 z-[6] sm:left-8 lg:left-14"><Lantern size={24} chain={26} delay={0.5} className="sm:hidden" /><Lantern size={42} chain={52} delay={0.5} className="hidden sm:block" /></div>
            <div className="absolute right-2 top-6 z-[6] sm:right-8 lg:right-14"><Lantern size={24} chain={26} delay={2.1} className="sm:hidden" /><Lantern size={42} chain={52} delay={2.1} className="hidden sm:block" /></div>
            <div className="absolute left-[16%] top-4 z-[6] hidden lg:block"><Lantern size={30} chain={90} delay={1.3} /></div>
            <div className="absolute right-[16%] top-4 z-[6] hidden lg:block"><Lantern size={30} chain={90} delay={3.2} /></div>
          </>
        )}
        {flowers && (
          <>
            <div className="sm:hidden"><FlowerCluster side="left" scale={0.55} /><FlowerCluster side="right" scale={0.55} /></div>
            <div className="hidden sm:block"><FlowerCluster side="left" scale={1.1} /><FlowerCluster side="right" scale={1.1} /></div>
          </>
        )}
        <div className="relative z-[4] flex min-h-[inherit] flex-col">{children}</div>
      </div>
    </section>
  );
}
