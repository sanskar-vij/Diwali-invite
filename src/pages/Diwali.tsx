import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import diwaliArt from '../assets/diwali-celebration.jpg';
import Diya from '../components/Diya';
import EventLayout, { BlendedArt } from '../components/EventLayout';
import { INVITE } from '../config';
import { celebrate } from '../context';

/** Traditional Diwali Firecracker Anar (Flowerpot Fountain) */
function AnarFountain({ active = true }: { active?: boolean }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        dx: (Math.random() - 0.5) * 60,
        h: 70 + Math.random() * 80,
        d: Math.random() * 1.8,
        dur: 1.2 + Math.random() * 0.8,
        color: Math.random() > 0.4 ? '#fef08a' : Math.random() > 0.5 ? '#f97316' : '#67e8f9',
      })),
    [],
  );

  return (
    <div className="relative flex flex-col items-center">
      {/* Spark fountain spraying upwards */}
      {active && (
        <div className="pointer-events-none absolute bottom-8 h-36 w-24 overflow-visible flex justify-center">
          <div className="absolute bottom-0 h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(255,220,100,.9)_0%,rgba(255,140,20,.6)_45%,transparent_70%)] blur-[2px] animate-pulse" />
          {sparks.map((s, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 h-2 w-1.5 rounded-full"
              style={{
                backgroundColor: s.color,
                boxShadow: `0 0 8px 2px ${s.color}`,
              }}
              animate={{
                y: [0, -s.h],
                x: [0, s.dx],
                opacity: [0, 1, 0.8, 0],
                scale: [0.6, 1.2, 0.3],
              }}
              transition={{
                duration: s.dur,
                delay: s.d,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
      {/* Traditional clay cone base */}
      <svg viewBox="0 0 50 40" width={44} height={36} className="relative z-10 drop-shadow-[0_0_12px_rgba(255,180,60,.6)]">
        <defs>
          <linearGradient id="anarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
          <linearGradient id="goldCap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
        <polygon points="25,4 46,38 4,38" fill="url(#anarGrad)" stroke="#fef08a" strokeWidth="1" />
        <ellipse cx="25" cy="4" rx="4" ry="2" fill="url(#goldCap)" />
        <path d="M12 28 Q25 22 38 28" stroke="#fef08a" strokeWidth="1" fill="none" opacity="0.8" />
        <circle cx="25" cy="30" r="2" fill="#fef08a" />
      </svg>
    </div>
  );
}

/** Traditional Diwali Ground Chakri (Spinning Wheel of Fire) */
function GroundChakri({ spinning = true }: { spinning?: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {spinning && (
        <motion.div
          className="pointer-events-none absolute h-24 w-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,200,80,.4) 0%, rgba(255,100,20,.2) 50%, transparent 70%)',
          }}
          animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
      {/* Spinning spark trail wheel */}
      <motion.div
        animate={spinning ? { rotate: 360 } : {}}
        transition={{ duration: 0.65, repeat: Infinity, ease: 'linear' }}
        className="relative z-10"
      >
        <svg viewBox="0 0 60 60" width={48} height={48} className="overflow-visible drop-shadow-[0_0_10px_rgba(255,200,60,.8)]">
          <defs>
            <linearGradient id="chakriGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <circle cx="30" cy="30" r="16" fill="url(#chakriGrad)" stroke="#fde047" strokeWidth="1.5" />
          <circle cx="30" cy="30" r="6" fill="#1e1b4b" stroke="#fde047" strokeWidth="1" />
          {/* Spiraling spark arms */}
          {[0, 90, 180, 270].map((deg) => (
            <path
              key={deg}
              d="M30 14 C36 14 42 18 45 24"
              stroke="#fef08a"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              transform={`rotate(${deg} 30 30)`}
            />
          ))}
          {[45, 135, 225, 315].map((deg) => (
            <circle
              key={deg}
              cx="42"
              cy="30"
              r="2"
              fill="#fbbf24"
              transform={`rotate(${deg} 30 30)`}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

function DiwaliArt() {
  const [burstCount, setBurstCount] = useState(0);

  const handleLaunchBurst = (e: React.MouseEvent) => {
    setBurstCount((c) => c + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    celebrate(rect.left + rect.width / 2, rect.top, 4);
  };

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <BlendedArt
        src={diwaliArt}
        alt="Royal Indian palace courtyard glowing with thousands of earthen diyas, vibrant rangoli and fireworks"
        className="aspect-[4/3.8] sm:aspect-[4/3.5] w-full"
        position="50% 50%"
      />

      {/* Ground Diwali Crackers: Anar and Chakri flanking the courtyard */}
      <div className="absolute inset-x-2 bottom-12 sm:bottom-16 flex items-end justify-between px-3 sm:px-8 pointer-events-none z-10">
        <AnarFountain active={true} />
        <GroundChakri spinning={true} />
      </div>

      {/* Three perfectly aligned, harmoniously spaced golden diyas */}
      <div className="absolute inset-x-0 bottom-2 sm:bottom-3 flex items-end justify-center gap-6 sm:gap-14 z-20">
        <Diya size={54} delay={0.4} sparks={3} />
        <Diya size={78} delay={0} sparks={6} glow={1.3} />
        <Diya size={54} delay={1.1} sparks={3} />
      </div>

      {/* Interactive Cracker Sparkle Launcher */}
      <div className="absolute -top-3 right-2 sm:top-2 sm:right-4 z-20">
        <button
          onClick={handleLaunchBurst}
          className="flex items-center gap-1.5 rounded-full border border-gold-400/80 bg-royal-950/85 px-3 py-1.5 font-serif text-xs sm:text-sm font-semibold text-gold-200 shadow-[0_0_18px_rgba(255,190,80,.45)] backdrop-blur-md transition hover:scale-105 hover:border-gold-200 active:scale-95 cursor-pointer"
          title="Tap to burst festive crackers"
        >
          <span className="animate-bounce">🎆</span>
          <span>Burst Cracker{burstCount > 0 ? ` (${burstCount})` : ''}</span>
        </button>
      </div>
    </div>
  );
}

export default function Diwali() {
  return (
    <EventLayout
      id="diwali"
      theme="diwali"
      title="Diwali"
      subtitle="The Grand Festival of Lights"
      description="May the divine light of Diwali illuminate your home with boundless prosperity, supreme peace, and everlasting joy."
      art={<DiwaliArt />}
      info={INVITE.events.diwali}
      ribbon="Let's celebrate together!"
      shloka={{
        text: 'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥',
        meaning: 'Lead us from untruth to truth, from darkness to divine light, from mortality to immortality.',
      }}
      features={[
        {
          icon: '🪔',
          title: 'Maha Lakshmi Puja',
          description:
            'Auspicious evening prayers welcoming Goddess Lakshmi & Lord Ganesha into our abode for abundance and wisdom.',
        },
        {
          icon: '✨',
          title: 'Deepotsav Illuminations',
          description:
            'Lighting hundreds of earthen diyas, candles, and royal lanterns to dispel darkness and welcome Lord Rama.',
        },
        {
          icon: '🍬',
          title: 'Festive Mithai Feast',
          description:
            'Savoring rich festive sweets, handcrafted dry-fruit laddoos, and royal delicacies prepared with love.',
        },
        {
          icon: '🎆',
          title: 'Celebratory Fireworks & Crackers',
          description:
            'Joyful sparklers, spinning chakris, glowing anar fountains, and vibrant aerial bursts painting the festive night sky.',
        },
      ]}
    />
  );
}
