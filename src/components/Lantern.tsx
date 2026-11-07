import { useMemo } from 'react';

/** Hanging Rajasthani lantern with warm glow and gentle swing. */
export default function Lantern({ size = 44, chain = 40, delay = 0, className = '' }: { size?: number; chain?: number; delay?: number; className?: string }) {
  const id = useMemo(() => 'l' + Math.random().toString(36).slice(2, 8), []);
  return (
    <div className={`lantern pointer-events-none ${className}`} style={{ animationDelay: `-${delay}s`, width: size }} aria-hidden="true">
      <div className="mx-auto w-px" style={{ height: chain, background: 'repeating-linear-gradient(#f3cf78 0 3px, #8a5a14 3px 5px)' }} />
      <div className="relative" style={{ width: size, height: size * 1.7 }}>
        <div className="lantern-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: size * 3, height: size * 3, background: 'radial-gradient(circle, rgba(255,190,80,.45), rgba(255,140,40,.12) 45%, transparent 70%)', animationDelay: `-${delay}s` }} />
        <svg viewBox="0 0 40 68" width={size} height={size * 1.7} className="relative">
          <defs>
            <linearGradient id={`${id}g`} x1="0" x2="1">
              <stop offset="0" stopColor="#8a5a14" /><stop offset=".5" stopColor="#ffe9a8" /><stop offset="1" stopColor="#8a5a14" />
            </linearGradient>
            <radialGradient id={`${id}l`} cx=".5" cy=".55" r=".6">
              <stop offset="0" stopColor="#fffbe0" /><stop offset=".4" stopColor="#ffd36b" /><stop offset="1" stopColor="#d9771f" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="3" r="2.5" fill="none" stroke={`url(#${id}g)`} strokeWidth="1.5" />
          <path d="M14 6 h12 l6 8 h-24 z" fill={`url(#${id}g)`} />
          <path d="M8 14 h24 l3 8 v22 l-3 8 h-24 l-3 -8 v-22 z" fill={`url(#${id}l)`} />
          {/* jali cut-out frame */}
          <path d="M8 14 h24 l3 8 v22 l-3 8 h-24 l-3 -8 v-22 z M14 14 v38 M20 14 v38 M26 14 v38" fill="none" stroke={`url(#${id}g)`} strokeWidth="1.6" />
          <path d="M5 30 h30 M5 38 h30" stroke="#b98327" strokeWidth="1" opacity=".8" />
          <path d="M8 52 h24 l-5 6 h-14 z" fill={`url(#${id}g)`} />
          <path d="M20 58 v4" stroke="#e9bd5b" strokeWidth="1.5" />
          <path d="M20 62 l-2.5 5 h5 z" fill="#e9bd5b" />
        </svg>
      </div>
    </div>
  );
}
