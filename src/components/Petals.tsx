import { useMemo } from 'react';

/** Floating marigold & rose petals (CSS only, GPU friendly). */
export default function Petals({ count = 16 }: { count?: number }) {
  const n = typeof window !== 'undefined' && window.innerWidth < 768 ? Math.round(count * 0.6) : count;
  const petals = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => {
        const kind = i % 3; // 0 marigold, 1 rose, 2 pink
        return {
          left: Math.random() * 100,
          dur: 12 + Math.random() * 12,
          delay: -Math.random() * 24,
          drift: (Math.random() - 0.5) * 140,
          size: 8 + Math.random() * 9,
          spin: 3 + Math.random() * 4,
          kind,
        };
      }),
    [n],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[3] overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <div key={i} className="petal" style={{ left: `${p.left}%`, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, ['--drift' as string]: `${p.drift}px` }}>
          <span
            style={{
              width: p.size,
              height: p.kind === 0 ? p.size : p.size * 1.3,
              animationDuration: `${p.spin}s`,
              borderRadius: p.kind === 0 ? '45% 55% 50% 50%' : '80% 0 80% 0',
              background:
                p.kind === 0
                  ? 'radial-gradient(circle at 35% 35%, #ffd36b, #ff9f1c 55%, #e06a00)'
                  : p.kind === 1
                    ? 'linear-gradient(135deg, #ff6b8b, #c2185b)'
                    : 'linear-gradient(135deg, #ffc1e3, #ff6fc8)',
              boxShadow: '0 0 4px rgba(255,160,60,.25)',
              opacity: 0.9,
            }}
          />
        </div>
      ))}
    </div>
  );
}
