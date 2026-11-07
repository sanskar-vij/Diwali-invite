import { useEffect, useRef } from 'react';

type Kind = 'chrysanthemum' | 'peony' | 'starburst' | 'willow' | 'sparkle' | 'glitter' | 'ring';

interface Rocket {
  x: number; y: number; vx: number; vy: number; ty: number;
  kind: Kind; palette: string[]; scale: number; trail: { x: number; y: number }[];
}
interface Particle {
  x: number; y: number; px: number; py: number; vx: number; vy: number;
  life: number; decay: number; color: string; size: number;
  gravity: number; friction: number; flicker: boolean; crackle: boolean;
}

const PALETTES: Record<string, string[]> = {
  gold: ['#fff3c4', '#ffd36b', '#ffb73b', '#ffe29a'],
  purplePink: ['#e58cff', '#ff6fc8', '#ffa6e6', '#b56cff'],
  blueGold: ['#8fc4ff', '#5c9dff', '#ffd36b', '#fff3c4'],
  orange: ['#ffb347', '#ff8a2a', '#ffd36b'],
  pink: ['#ff8fcf', '#ffc1e3', '#ff5fa8'],
  white: ['#ffffff', '#fff6dc', '#ffe9b0'],
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[(Math.random() * arr.length) | 0];

export default function Fireworks({ intensity = 1, reduced = false }: { intensity?: number; reduced?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intensityRef = useRef(intensity);
  const reducedRef = useRef(reduced);
  intensityRef.current = intensity;
  reducedRef.current = reduced;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w = 0, h = 0, dpr = 1, raf = 0, last = performance.now(), nextLaunch = 0;
    const rockets: Rocket[] = [];
    const particles: Particle[] = [];
    let mobile = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      mobile = w < 768;
      if (mobile) dpr = Math.min(dpr, 1.5);
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const maxParticles = () => (mobile ? 650 : 1800);

    const launch = (x?: number, ty?: number, big = false) => {
      const kinds: Kind[] = ['chrysanthemum', 'chrysanthemum', 'peony', 'starburst', 'willow', 'sparkle', 'glitter', 'ring'];
      const kind = big ? pick<Kind>(['chrysanthemum', 'willow', 'starburst']) : pick(kinds);
      const palette =
        kind === 'willow' || kind === 'chrysanthemum' ? (Math.random() < .7 ? PALETTES.gold : PALETTES.orange)
        : kind === 'peony' ? (Math.random() < .5 ? PALETTES.purplePink : PALETTES.pink)
        : kind === 'starburst' ? PALETTES.blueGold
        : kind === 'glitter' ? PALETTES.white
        : pick(Object.values(PALETTES));
      const sx = x ?? rand(w * 0.08, w * 0.92);
      const targetY = ty ?? rand(h * 0.08, h * 0.42);
      const dist = h - targetY;
      const vy = -Math.sqrt(2 * 0.06 * dist) * rand(0.98, 1.04);
      rockets.push({
        x: sx, y: h + 6, vx: rand(-0.4, 0.4), vy, ty: targetY, kind, palette,
        scale: (big ? rand(1.3, 1.6) : rand(0.6, 1.1)) * (mobile ? 0.75 : 1), trail: [],
      });
    };

    const explode = (r: Rocket) => {
      const room = maxParticles() - particles.length;
      if (room <= 0) return;
      const add = (p: Partial<Particle> & { vx: number; vy: number }) => {
        if (particles.length >= maxParticles()) return;
        particles.push({
          x: r.x, y: r.y, px: r.x, py: r.y, life: 1, decay: rand(0.010, 0.018),
          color: pick(r.palette), size: rand(1.2, 2.2), gravity: 0.035, friction: 0.975,
          flicker: false, crackle: false, ...p,
        });
      };
      const s = r.scale;
      const base = mobile ? 0.55 : 1;
      switch (r.kind) {
        case 'chrysanthemum': {
          const n = Math.round(110 * base * s);
          for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2 + rand(-0.05, 0.05);
            const sp = rand(2.8, 4.2) * s;
            add({ vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, decay: rand(0.009, 0.014), flicker: Math.random() < 0.4 });
          }
          break;
        }
        case 'peony': {
          const n = Math.round(90 * base * s);
          for (let i = 0; i < n; i++) {
            const a = rand(0, Math.PI * 2);
            const sp = Math.sqrt(Math.random()) * 4 * s;
            add({ vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, size: rand(1.6, 2.6), decay: rand(0.012, 0.02) });
          }
          break;
        }
        case 'starburst': {
          const rays = 12, per = Math.round(9 * base * s) + 3;
          for (let k = 0; k < rays; k++) {
            const a = (k / rays) * Math.PI * 2;
            for (let i = 0; i < per; i++) {
              const sp = (1 + i * 0.35) * s;
              add({ vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, color: k % 2 ? r.palette[0] : r.palette[2], decay: rand(0.013, 0.02) });
            }
          }
          for (let i = 0; i < 30 * base; i++) {
            const a = rand(0, Math.PI * 2), sp = rand(0.5, 1.6) * s;
            add({ vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, color: '#fff3c4', flicker: true });
          }
          break;
        }
        case 'willow': {
          const n = Math.round(95 * base * s);
          for (let i = 0; i < n; i++) {
            const a = rand(0, Math.PI * 2), sp = rand(1.5, 3.6) * s;
            add({ vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.6, decay: rand(0.005, 0.008), gravity: 0.028, friction: 0.965, size: rand(1.2, 1.9), flicker: Math.random() < 0.6 });
          }
          break;
        }
        case 'ring': {
          const n = Math.round(60 * base * s) + 10;
          const tilt = rand(0.35, 0.8);
          for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2, sp = 3 * s;
            add({ vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * tilt, decay: rand(0.012, 0.016) });
          }
          break;
        }
        case 'glitter': {
          const n = Math.round(70 * base * s);
          for (let i = 0; i < n; i++) {
            const a = rand(0, Math.PI * 2), sp = rand(1, 3.2) * s;
            add({ vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, decay: rand(0.007, 0.011), crackle: true, flicker: true, size: rand(1, 1.6) });
          }
          break;
        }
        default: {
          const n = Math.round(40 * base * s) + 8;
          for (let i = 0; i < n; i++) {
            const a = rand(0, Math.PI * 2), sp = rand(0.8, 2.2) * s;
            add({ vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, decay: rand(0.018, 0.028), flicker: true });
          }
        }
      }
      // flash
      add({ vx: 0, vy: 0, size: 14 * s, decay: 0.12, gravity: 0, color: '#fff6dc' });
    };

    const onBurst = (e: Event) => {
      const d = (e as CustomEvent).detail || {};
      const count = d.count ?? 1;
      for (let i = 0; i < count; i++) {
        setTimeout(() => launch(d.x !== undefined ? d.x + rand(-60, 60) : undefined, d.y, true), i * 260);
      }
    };
    window.addEventListener('fw-burst', onBurst);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 50);
      last = now;
      const step = dt / 16.67;

      // Launch scheduling — irregular, never synchronized
      const inten = reducedRef.current ? Math.min(intensityRef.current, 0.05) : intensityRef.current;
      if (inten > 0 && now > nextLaunch) {
        if (Math.random() < 0.06 * inten) {
          launch(undefined, undefined, true); // occasional big celebratory shell
          setTimeout(() => launch(), rand(100, 400));
        } else launch();
        const baseGap = mobile ? 1300 : 900;
        nextLaunch = now + rand(baseGap * 0.4, baseGap * 1.6) / Math.max(inten, 0.05);
      }

      // fade previous frame (keeps transparent canvas with trails)
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${Math.min(0.28 * step, 0.6)})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 10) r.trail.shift();
        r.x += r.vx * step; r.y += r.vy * step; r.vy += 0.06 * step;
        // trail
        ctx.beginPath();
        ctx.moveTo(r.trail[0].x, r.trail[0].y);
        for (const t of r.trail) ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = 'rgba(255,190,90,0.55)';
        ctx.lineWidth = 1.6;
        ctx.stroke();
        // glowing head
        ctx.fillStyle = '#fff4d0';
        ctx.beginPath(); ctx.arc(r.x, r.y, 1.8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,190,90,0.25)';
        ctx.beginPath(); ctx.arc(r.x, r.y, 5, 0, Math.PI * 2); ctx.fill();
        // falling glitter from rocket
        if (Math.random() < 0.35 && particles.length < maxParticles()) {
          particles.push({ x: r.x, y: r.y, px: r.x, py: r.y, vx: rand(-0.3, 0.3), vy: rand(0.2, 0.8), life: 0.7, decay: 0.03, color: '#ffcf70', size: 1, gravity: 0.02, friction: 0.98, flicker: true, crackle: false });
        }
        if (r.vy >= -0.4 || r.y <= r.ty) { explode(r); rockets.splice(i, 1); }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.px = p.x; p.py = p.y;
        p.vx *= Math.pow(p.friction, step); p.vy *= Math.pow(p.friction, step);
        p.vy += p.gravity * step;
        p.x += p.vx * step; p.y += p.vy * step;
        p.life -= p.decay * step;
        if (p.life <= 0) {
          if (p.crackle && particles.length < maxParticles() && Math.random() < 0.5) {
            for (let k = 0; k < 3; k++) particles.push({ ...p, life: 0.4, decay: 0.05, vx: rand(-1, 1), vy: rand(-1, 1), crackle: false, size: 0.9, color: '#fffbe8' });
          }
          particles.splice(i, 1);
          continue;
        }
        let alpha = Math.min(1, p.life * 1.4);
        if (p.flicker && Math.random() < 0.3) alpha *= 0.3;
        ctx.globalAlpha = alpha;
        if (p.size > 6) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          g.addColorStop(0, 'rgba(255,246,220,0.7)'); g.addColorStop(1, 'rgba(255,200,100,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('fw-burst', onBurst);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]" />;
}
