import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { EventInfo } from '../config';
import { Divider, InfoPanel, PageFrame, Ribbon, SparkleField } from './Ornaments';
import { SanskritBadge, FestivalFeatureCard } from './FestivalOrnaments';
import Reveal from './Reveal';

interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
}

interface Props {
  id?: string;
  theme?: 'diwali' | 'govardhan' | 'bhaidooj';
  title: string;
  subtitle: string;
  description: string;
  art: ReactNode;
  info: EventInfo;
  ribbon: string;
  shloka?: {
    text: string;
    meaning: string;
  };
  features?: FeatureItem[];
}

export default function EventLayout({
  id,
  theme = 'diwali',
  title,
  subtitle,
  description,
  art,
  info,
  ribbon,
  shloka,
  features,
}: Props) {
  const textClass = {
    diwali: 'gold-text',
    govardhan: 'peacock-text',
    bhaidooj: 'kumkum-text',
  }[theme];

  return (
    <PageFrame theme={theme} id={id}>
      <header className="relative px-3 pt-[72px] text-center sm:px-6 sm:pt-[112px] lg:pt-[130px]">
        <SparkleField count={12} />
        
        {shloka && (
          <Reveal>
            <div className="mb-3 sm:mb-6">
              <SanskritBadge shloka={shloka.text} meaning={shloka.meaning} theme={theme} />
            </div>
          </Reveal>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="leading-none"
        >
          <span className={`${textClass} gold-glow-pulse block font-script text-[clamp(44px,13vw,68px)] leading-[1.05] sm:text-[76px] lg:text-[88px]`}>
            {title}
          </span>
          <span className={`${textClass} mt-1 block font-script text-[clamp(24px,7.5vw,34px)] leading-tight sm:text-[36px] lg:text-[42px]`}>
            {subtitle}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <Divider className="my-2.5 sm:my-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="text-shadow-soft mx-auto max-w-[21rem] font-serif text-[17px] leading-snug text-[#fdeccb] sm:max-w-xl sm:text-[23px]"
        >
          {description}
        </motion.p>
      </header>

      {/* Main Art & Details layout */}
      <div className="mx-auto mt-4 sm:mt-6 grid w-full max-w-[1060px] flex-1 items-center gap-4 sm:gap-6 lg:mt-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12 px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="relative"
        >
          {art}
        </motion.div>

        <div className="relative z-[7] px-2 sm:px-4 pb-2 sm:pb-4 lg:pb-0">
          <Reveal>
            <InfoPanel info={info} />
          </Reveal>
          <Reveal delay={0.15}>
            <Ribbon>{ribbon}</Ribbon>
          </Reveal>
        </div>
      </div>

      {/* Festival Distinctive Features Grid */}
      {features && features.length > 0 && (
        <div className="relative z-[7] mx-auto mt-8 sm:mt-12 w-full max-w-[1040px] px-3 sm:px-4">
          <div className="mb-3.5 text-center">
            <h3 className="font-serif text-xl font-bold italic tracking-wide text-gold-200 sm:text-3xl">
              Sacred Traditions &amp; Celebrations
            </h3>
            <p className="mt-0.5 text-xs sm:text-sm text-gold-300/80">
              The essence of {title} with family &amp; loved ones
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
            {features.map((feat, idx) => (
              <Reveal key={idx} delay={0.1 * idx}>
                <FestivalFeatureCard
                  icon={feat.icon}
                  title={feat.title}
                  description={feat.description}
                  theme={theme}
                />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <div className="h-20 lg:h-24" />
    </PageFrame>
  );
}

/** Image that softly melts into the purple background (no hard edges, no stretching). */
export function BlendedArt({
  src,
  alt,
  className = '',
  position = '50% 50%',
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
}) {
  const mask = 'radial-gradient(ellipse 75% 70% at 50% 50%, black 55%, transparent 100%)';
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ maskImage: mask, WebkitMaskImage: mask }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="slow-pan absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
      <div className="light-sweep pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,200,110,.22),transparent_60%)] mix-blend-screen" />
    </div>
  );
}
