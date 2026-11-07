import { useMemo } from 'react';

interface DiyaProps {
  size?: number; // width in px
  lit?: boolean;
  igniting?: boolean; // play ignite animation
  reflection?: boolean;
  sparks?: number;
  delay?: number; // animation offset seconds (avoid synchronised flames)
  className?: string;
  glow?: number; // halo multiplier
}

/** Traditional clay diya with a living, flickering flame anchored directly to the wick. */
export default function Diya({
  size = 80,
  lit = true,
  igniting = false,
  reflection = true,
  sparks = 3,
  delay,
  className = '',
  glow = 1,
}: DiyaProps) {
  const d = useMemo(() => delay ?? Math.random() * 2, [delay]);
  const sparkList = useMemo(
    () =>
      Array.from({ length: sparks }, () => ({
        dx: `${(Math.random() - 0.5) * 26}px`,
        delay: Math.random() * 2.4,
        dur: 2 + Math.random() * 1.5,
      })),
    [sparks],
  );

  const h = size * 0.42;
  const flameW = size * 0.17;
  const flameH = size * 0.42;
  const id = useMemo(() => 'd' + Math.random().toString(36).slice(2, 8), []);

  const BowlSvg = (
    <svg viewBox="0 0 100 42" width={size} height={h} className="block overflow-visible">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e07a3a" />
          <stop offset="0.45" stopColor="#a8441d" />
          <stop offset="1" stopColor="#4a1608" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b98327" />
          <stop offset="0.5" stopColor="#ffe9a8" />
          <stop offset="1" stopColor="#b98327" />
        </linearGradient>
        <radialGradient id={`${id}o`} cx="0.5" cy="0.3" r="0.6">
          <stop offset="0" stopColor="#ffcf6b" stopOpacity={lit ? 0.9 : 0.2} />
          <stop offset="1" stopColor="#7a2e0e" />
        </radialGradient>
      </defs>
      {/* bowl body */}
      <path d="M2 11 Q50 21 98 11 Q94 30 76 37 Q50 45 24 37 Q6 30 2 11 Z" fill={`url(#${id}b)`} />
      {/* oil surface */}
      <ellipse cx="50" cy="12" rx="46" ry="5.5" fill={`url(#${id}o)`} />
      {/* gold rim */}
      <path d="M2 11 Q50 23 98 11" stroke={`url(#${id}r)`} strokeWidth="2.2" fill="none" />
      {/* decorative band */}
      <path d="M12 25 Q50 36 88 25" stroke="#f3c86a" strokeWidth="1.2" fill="none" strokeDasharray="2 3" opacity=".85" />
      {[24, 37, 50, 63, 76].map((x, i) => (
        <circle key={i} cx={x} cy={29 + (i === 2 ? 2.5 : i % 2 ? 1.6 : 0)} r="1.5" fill="#ffd36b" opacity=".9" />
      ))}
      {/* wick extending into flame base */}
      <path d="M50 12 q1.2 -3.5 0.5 -7" stroke="#231005" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: h }}
      aria-hidden="true"
    >
      {/* Flame & Aura locked to the wick tip */}
      {lit && (
        <>
          {/* Radial warm halo centered on flame */}
          <div
            className="halo"
            style={{
              width: size * 2.2 * glow,
              height: size * 2.2 * glow,
              position: 'absolute',
              left: '50%',
              bottom: `${h * 0.76 - (size * 1.1 * glow) / 2}px`,
              transform: 'translateX(-50%)',
              animationDelay: `-${d}s`,
            }}
          />
          {/* Flame element directly seated over the wick */}
          <div
            className={`flame-wrap ${igniting ? 'ignite' : ''}`}
            style={{
              width: flameW,
              height: flameH,
              position: 'absolute',
              left: '50%',
              bottom: `${h * 0.72}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="flame outer" style={{ animationDelay: `-${d}s, -${d * 1.3}s` }} />
            <div className="flame inner" style={{ animationDelay: `-${d}s, -${d * 1.3}s` }} />
            <div className="flame core" />
            {sparkList.map((s, i) => (
              <span
                key={i}
                className="spark"
                style={{
                  ['--dx' as string]: s.dx,
                  animationDelay: `${s.delay}s`,
                  animationDuration: `${s.dur}s`,
                  bottom: '75%',
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Clay Diya Bowl */}
      <div className="relative z-[2]">{BowlSvg}</div>

      {/* Water reflection */}
      {reflection && lit && (
        <div
          className="pointer-events-none absolute left-0 top-full z-[1]"
          style={{
            width: size,
            height: h,
            opacity: 0.35,
            transform: `translateY(${h * 0.15}px) scaleY(-0.6)`,
            transformOrigin: 'top',
            filter: 'blur(2px)',
            maskImage: 'linear-gradient(to top, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
          }}
        >
          {BowlSvg}
        </div>
      )}
      {reflection && lit && (
        <div
          className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 rounded-full"
          style={{
            width: size * 0.55,
            height: size * 0.3,
            background: 'radial-gradient(ellipse, rgba(255,200,90,.4), transparent 70%)',
            filter: 'blur(3px)',
          }}
        />
      )}
    </div>
  );
}
