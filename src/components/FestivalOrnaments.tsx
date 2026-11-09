/* ---------------- Peacock Feather (Mor Pankh) ---------------- */
export function PeacockFeather({ size = 48, className = '' }: { size?: number; className?: string }) {
  const w = size;
  const h = size * 1.5;
  return (
    <svg viewBox="0 0 100 150" width={w} height={h} className={className} aria-hidden="true">
      <defs>
        <radialGradient id="peacockEye" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="25%" stopColor="#0284c7" />
          <stop offset="50%" stopColor="#0d9488" />
          <stop offset="75%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
        <linearGradient id="quillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      {/* Quill stem */}
      <path d="M50 35 Q50 90 48 145" stroke="url(#quillGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Outer green/cyan barbs */}
      {[-35, -25, -15, 0, 15, 25, 35].map((angle, i) => (
        <path
          key={i}
          d="M50 40 Q30 20 20 50 Q35 48 50 40"
          transform={`rotate(${angle} 50 45)`}
          fill="#059669"
          opacity="0.8"
        />
      ))}
      {[-30, -20, -10, 0, 10, 20, 30].map((angle, i) => (
        <path
          key={`sub-${i}`}
          d="M50 40 Q70 20 80 50 Q65 48 50 40"
          transform={`rotate(${angle} 50 45)`}
          fill="#0284c7"
          opacity="0.75"
        />
      ))}
      {/* Golden halo ring */}
      <ellipse cx="50" cy="45" rx="26" ry="32" fill="#eab308" opacity="0.9" />
      {/* Emerald ring */}
      <ellipse cx="50" cy="45" rx="21" ry="26" fill="#059669" />
      {/* Turquoise ring */}
      <ellipse cx="50" cy="46" rx="16" ry="20" fill="#06b6d4" />
      {/* Deep indigo core eye */}
      <ellipse cx="50" cy="48" rx="10" ry="13" fill="#1e1b4b" />
      {/* Shimmer dot */}
      <circle cx="47" cy="44" r="3.5" fill="#f8fafc" opacity="0.95" />
    </svg>
  );
}

/* ---------------- Lord Krishna's Bansuri (Divine Flute) ---------------- */
export function BansuriIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 50" width="140" height="44" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="goldFlute" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="25%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="75%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      {/* Flute bamboo tube */}
      <rect x="25" y="20" width="110" height="10" rx="5" fill="url(#goldFlute)" stroke="#a16207" strokeWidth="1.2" />
      {/* Finger holes */}
      {[45, 58, 71, 84, 97, 110].map((cx, i) => (
        <ellipse key={i} cx={cx} cy="25" rx="2.5" ry="3.5" fill="#451a03" />
      ))}
      {/* Blowing hole */}
      <ellipse cx="33" cy="25" rx="3" ry="3.5" fill="#451a03" />
      {/* Peacock feather crest on flute head */}
      <g transform="translate(18, -4) scale(0.28)">
        <PeacockFeather size={50} />
      </g>
      {/* Silk tassels */}
      <path d="M130 25 C135 32 140 40 142 46" stroke="#ef4444" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="143" cy="47" r="3" fill="#eab308" />
      <path d="M126 25 C130 32 134 42 135 48" stroke="#f59e0b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="136" cy="49" r="2.5" fill="#ef4444" />
    </svg>
  );
}

/* ---------------- Authentic Bhai Dooj Puja Thali ---------------- */
export function BhaiDoojPujaThali({ size = 110, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 160 160" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <radialGradient id="brassThali" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="45%" stopColor="#eab308" />
          <stop offset="85%" stopColor="#a16207" />
          <stop offset="100%" stopColor="#713f12" />
        </radialGradient>
        <radialGradient id="kumkumRed" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="70%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="80" cy="85" rx="72" ry="70" fill="rgba(0,0,0,0.45)" filter="blur(6px)" />

      {/* Brass plate rim */}
      <circle cx="80" cy="80" r="74" fill="url(#brassThali)" stroke="#ca8a04" strokeWidth="3" />
      {/* Embossed inner pattern */}
      <circle cx="80" cy="80" r="66" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.8" />
      <circle cx="80" cy="80" r="54" fill="#a16207" opacity="0.4" />

      {/* Center Aarti Diya */}
      <ellipse cx="80" cy="80" rx="14" ry="10" fill="#78350f" stroke="#ca8a04" strokeWidth="1.5" />
      {/* Diya Flame */}
      <path d="M80 62 C74 72 74 77 80 77 C86 77 86 72 80 62 Z" fill="#fef08a" />
      <path d="M80 66 C77 71 77 75 80 75 C83 75 83 71 80 66 Z" fill="#ffffff" />
      {/* Flame halo */}
      <circle cx="80" cy="70" r="14" fill="radial-gradient(circle, rgba(254,240,138,0.8), transparent)" opacity="0.6" />

      {/* Roli (Kumkum) Bowl */}
      <g transform="translate(48, 50)">
        <ellipse cx="14" cy="14" rx="13" ry="10" fill="#ca8a04" stroke="#fef08a" strokeWidth="1" />
        <ellipse cx="14" cy="13" rx="10" ry="7" fill="url(#kumkumRed)" />
        {/* Tilak mark */}
        <circle cx="14" cy="13" r="3.5" fill="#ffe4e6" opacity="0.9" />
      </g>

      {/* Akshat (Rice Grains) Bowl */}
      <g transform="translate(98, 50)">
        <ellipse cx="14" cy="14" rx="13" ry="10" fill="#ca8a04" stroke="#fef08a" strokeWidth="1" />
        <ellipse cx="14" cy="13" rx="10" ry="7" fill="#451a03" />
        {/* Rice grains */}
        {[
          [10, 11], [13, 10], [17, 12], [12, 14], [16, 14], [14, 13]
        ].map(([rx, ry], i) => (
          <ellipse key={i} cx={rx} cy={ry} rx="1.8" ry="0.9" fill="#f8fafc" transform={`rotate(${i * 25} ${rx} ${ry})`} />
        ))}
      </g>

      {/* Sacred Moli (Red-Yellow Kalava Thread) */}
      <path
        d="M52 112 Q65 102 80 115 Q95 128 110 112"
        stroke="#dc2626"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M52 112 Q65 102 80 115 Q95 128 110 112"
        stroke="#facc15"
        strokeWidth="1.8"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* Auspicious Shrifal (Coconut) */}
      <g transform="translate(70, 116)">
        <ellipse cx="10" cy="8" rx="10" ry="8" fill="#713f12" stroke="#a16207" strokeWidth="1" />
        <circle cx="7" cy="6" r="1.5" fill="#451a03" />
        <circle cx="10" cy="5" r="1.5" fill="#451a03" />
        <circle cx="13" cy="6" r="1.5" fill="#451a03" />
      </g>

      {/* Supari (Betel Nut) */}
      <circle cx="50" cy="88" r="6" fill="#854d0e" stroke="#ca8a04" strokeWidth="1" />
      {/* Sweet Mithai (Laddoo) */}
      <circle cx="112" cy="88" r="7.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <circle cx="110" cy="86" r="1.5" fill="#fef08a" />
      <circle cx="114" cy="89" r="1.5" fill="#fef08a" />
    </svg>
  );
}

/* ---------------- Auspicious Swastik Icon ---------------- */
export function SwastikIcon({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
      {/* Central Cross */}
      <path d="M20 6 V34 M6 20 H34" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="square" />
      {/* Right Arms */}
      <path d="M20 6 H32 M34 20 V32 M20 34 H8 M6 20 V8" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="square" />
      {/* 4 Sacred Dots (Bindu) */}
      <circle cx="13" cy="13" r="2" fill="#dc2626" />
      <circle cx="27" cy="13" r="2" fill="#dc2626" />
      <circle cx="13" cy="27" r="2" fill="#dc2626" />
      <circle cx="27" cy="27" r="2" fill="#dc2626" />
    </svg>
  );
}

/* ---------------- 🦚 Govardhan Puja Arch Top ---------------- */
const ARCH_PATH =
  'M0,200 L0,135 C90,124 160,100 225,84 C250,62 292,60 315,72 C352,44 410,36 442,44 C462,24 488,12 500,0 C512,12 538,24 558,44 C590,36 648,44 685,72 C708,60 750,62 775,84 C840,100 910,124 1000,135 L1000,200';

export function GovardhanArchTop() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[95px] sm:h-[140px] lg:h-[170px]" aria-hidden="true">
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="peacockSpandrel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#064e3b" />
            <stop offset="60" stopColor="#042f2e" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>
          <pattern id="peacockJali" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 2 Q26 14 38 20 Q26 26 20 38 Q14 26 2 20 Q14 14 20 2Z" fill="none" stroke="#10b981" strokeWidth="1" opacity=".45" />
            <circle cx="20" cy="20" r="2.2" fill="#06b6d4" opacity=".55" />
          </pattern>
          <linearGradient id="emeraldGoldLine" x1="0" x2="1">
            <stop offset="0" stopColor="#059669" />
            <stop offset=".25" stopColor="#fef08a" />
            <stop offset=".5" stopColor="#10b981" />
            <stop offset=".75" stopColor="#fef08a" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>
        <path d={`M0,0 H1000 V135 C910,124 840,100 775,84 C750,62 708,60 685,72 C648,44 590,36 558,44 C538,24 512,12 500,0 C488,12 462,24 442,44 C410,36 352,44 315,72 C292,60 250,62 225,84 C160,100 90,124 0,135 Z`} fill="url(#peacockSpandrel)" />
        <path d={`M0,0 H1000 V135 C910,124 840,100 775,84 C750,62 708,60 685,72 C648,44 590,36 558,44 C538,24 512,12 500,0 C488,12 462,24 442,44 C410,36 352,44 315,72 C292,60 250,62 225,84 C160,100 90,124 0,135 Z`} fill="url(#peacockJali)" />
        <path d={ARCH_PATH} fill="none" stroke="url(#emeraldGoldLine)" strokeWidth="3.5" vectorEffect="non-scaling-stroke" />
        <path d={ARCH_PATH} transform="translate(0 9)" fill="none" stroke="#059669" strokeWidth="1.2" opacity=".8" vectorEffect="non-scaling-stroke" />
        <path d={ARCH_PATH} transform="translate(0 15)" fill="none" stroke="#6ee7b7" strokeWidth="1" strokeDasharray="2 6" strokeLinecap="round" opacity=".9" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* Peacock Feather Crest at center arch */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]">
        <PeacockFeather size={32} />
      </div>
    </div>
  );
}

/* ---------------- 💖 Bhai Dooj Arch Top ---------------- */
export function BhaiDoojArchTop() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[95px] sm:h-[140px] lg:h-[170px]" aria-hidden="true">
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="kumkumSpandrel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#700c2f" />
            <stop offset="60" stopColor="#4c0519" />
            <stop offset="100%" stopColor="#250310" />
          </linearGradient>
          <pattern id="kumkumJali" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 2 Q26 14 38 20 Q26 26 20 38 Q14 26 2 20 Q14 14 20 2Z" fill="none" stroke="#f43f5e" strokeWidth="1" opacity=".4" />
            <circle cx="20" cy="20" r="2" fill="#fb7185" opacity=".5" />
          </pattern>
          <linearGradient id="roseGoldLine" x1="0" x2="1">
            <stop offset="0" stopColor="#be123c" />
            <stop offset=".25" stopColor="#fef08a" />
            <stop offset=".5" stopColor="#f43f5e" />
            <stop offset=".75" stopColor="#fef08a" />
            <stop offset="1" stopColor="#be123c" />
          </linearGradient>
        </defs>
        <path d={`M0,0 H1000 V135 C910,124 840,100 775,84 C750,62 708,60 685,72 C648,44 590,36 558,44 C538,24 512,12 500,0 C488,12 462,24 442,44 C410,36 352,44 315,72 C292,60 250,62 225,84 C160,100 90,124 0,135 Z`} fill="url(#kumkumSpandrel)" />
        <path d={`M0,0 H1000 V135 C910,124 840,100 775,84 C750,62 708,60 685,72 C648,44 590,36 558,44 C538,24 512,12 500,0 C488,12 462,24 442,44 C410,36 352,44 315,72 C292,60 250,62 225,84 C160,100 90,124 0,135 Z`} fill="url(#kumkumJali)" />
        <path d={ARCH_PATH} fill="none" stroke="url(#roseGoldLine)" strokeWidth="3.5" vectorEffect="non-scaling-stroke" />
        <path d={ARCH_PATH} transform="translate(0 9)" fill="none" stroke="#be123c" strokeWidth="1.2" opacity=".8" vectorEffect="non-scaling-stroke" />
        <path d={ARCH_PATH} transform="translate(0 15)" fill="none" stroke="#fbcfe8" strokeWidth="1" strokeDasharray="2 6" strokeLinecap="round" opacity=".9" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* Auspicious Kalash & Swastik Medallion at Arch Crest */}
      <div className="absolute left-1/2 top-1 -translate-x-1/2 flex items-center justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-300 bg-rose-950/90 shadow-[0_0_12px_rgba(244,63,94,0.6)]">
          <SwastikIcon size={20} />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Sanskrit Sacred Badge ---------------- */
export function SanskritBadge({
  shloka,
  meaning,
  theme = 'diwali',
}: {
  shloka: string;
  meaning: string;
  theme?: 'diwali' | 'govardhan' | 'bhaidooj';
}) {
  const styles = {
    diwali: 'border-amber-400/60 bg-amber-950/40 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.25)]',
    govardhan: 'border-emerald-400/60 bg-emerald-950/40 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.25)]',
    bhaidooj: 'border-rose-400/60 bg-rose-950/40 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.25)]',
  }[theme];

  return (
    <div className={`mx-auto max-w-xl rounded-2xl border px-5 py-3 text-center backdrop-blur-md ${styles}`}>
      <p className="font-serif text-[17px] sm:text-[19px] font-semibold tracking-wide leading-relaxed">
        {shloka}
      </p>
      <p className="mt-1 text-[13px] sm:text-[14px] italic opacity-85 leading-snug">
        “{meaning}”
      </p>
    </div>
  );
}

/* ---------------- Themed Feature Highlight Card ---------------- */
export function FestivalFeatureCard({
  icon,
  title,
  description,
  theme = 'diwali',
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  theme?: 'diwali' | 'govardhan' | 'bhaidooj';
}) {
  const borders = {
    diwali: 'border-amber-500/40 bg-gradient-to-b from-[#2e104b]/80 to-[#17062b]/90 text-amber-200 hover:border-amber-400 hover:shadow-[0_0_24px_rgba(245,158,11,0.35)]',
    govardhan: 'border-emerald-500/40 bg-gradient-to-b from-[#064e3b]/80 to-[#022c22]/90 text-emerald-200 hover:border-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]',
    bhaidooj: 'border-rose-500/40 bg-gradient-to-b from-[#700c2f]/80 to-[#3b0718]/90 text-rose-200 hover:border-rose-400 hover:shadow-[0_0_24px_rgba(244,63,94,0.35)]',
  }[theme];

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 ${borders}`}>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl shadow-inner">
          {icon}
        </span>
        <h4 className="font-serif text-lg font-bold sm:text-xl text-white tracking-wide">
          {title}
        </h4>
      </div>
      <p className="mt-2.5 text-[15px] sm:text-[16px] leading-relaxed text-[#f3dfbd]/90">
        {description}
      </p>
    </div>
  );
}
