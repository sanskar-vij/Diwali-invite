import { motion } from 'framer-motion';
import studioArt from '../assets/studio-atelier.jpg';
import Diya from '../components/Diya';
import { GiftGlyph, ImageGlyph, LotusLogo, PaletteGlyph } from '../components/Icons';
import { Divider, PageFrame, SparkleField } from '../components/Ornaments';
import Reveal from '../components/Reveal';
import { INVITE } from '../config';

const FEATURES = [
  {
    n: '01',
    title: 'Custom Invitations',
    text: 'Bespoke, animated digital invitations tailored for weddings, Diwali, religious ceremonies & special milestones.',
    icon: <PaletteGlyph width={34} height={34} />,
  },
  {
    n: '02',
    title: 'Interactive Experiences',
    text: 'Rich festive animations, interactive diya lighting, custom audio, festive wishes sharing, and seamless guest greetings.',
    icon: <ImageGlyph width={34} height={34} />,
  },
  {
    n: '03',
    title: 'Heritage & Artistry',
    text: 'Combining royal Indian motifs, calligraphy, and modern creative craft to make your celebrations unforgettable.',
    icon: <GiftGlyph width={34} height={34} />,
  },
];

export default function Studio() {
  const fade = 'linear-gradient(to bottom, transparent 0%, black 45%, black 85%, transparent 100%)';
  return (
    <PageFrame id="studio" theme="studio">
      <div className="relative z-[7] px-3 pt-[72px] text-center sm:px-5 sm:pt-[118px] lg:pt-[130px]">
        <SparkleField count={18} />

        {/* Brand reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto w-fit"
        >
          <div className="lantern-glow absolute left-1/2 top-1/2 h-32 w-32 sm:h-40 sm:w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,200,100,.35),transparent_65%)]" />
          <LotusLogo className="relative h-[56px] w-[84px] drop-shadow-[0_0_14px_rgba(255,200,100,.6)] sm:h-[90px] sm:w-[135px]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.02em' }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.2 }}
          className="gold-text mt-2 font-brand text-[clamp(32px,10vw,52px)] leading-tight sm:text-6xl lg:text-7xl"
        >
          {INVITE.studio.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-0.5 text-lg sm:text-2xl text-gold-200 italic font-serif"
        >
          {INVITE.studio.tagline}
        </motion.p>

        <Divider className="my-3 sm:my-4" />

        <Reveal delay={0.2}>
          <h2 className="font-serif text-[19px] sm:text-[28px] font-semibold text-gold-300">
            Bringing Tradition &amp; Creativity Together
          </h2>
          <p className="text-shadow-soft mx-auto mt-2 max-w-[22rem] text-[15.5px] sm:text-xl leading-relaxed text-[#fdeccb] sm:max-w-2xl">
            At <strong>Patrika Studio</strong>, we design unforgettable digital experiences — from opulent royal wedding cards to personalized festive invitations and bespoke animated websites.
          </p>
        </Reveal>

        {/* Feature cards */}
        <div className="mx-auto mt-6 sm:mt-8 grid max-w-[940px] grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.n} delay={0.12 * i}>
              <article className="gold-border shimmer-border group relative h-full rounded-2xl p-4 sm:p-6 text-left transition hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(255,196,90,.45)] sm:text-center">
                <div className="flex items-center gap-3.5 sm:flex-col sm:gap-2">
                  <span className="shrink-0 text-gold-300 drop-shadow-[0_0_8px_rgba(255,200,100,.6)] transition-transform group-hover:scale-110">
                    {f.icon}
                  </span>
                  <div>
                    <p className="font-brand text-xs sm:text-sm tracking-[0.25em] text-gold-400">{f.n}</p>
                    <h3 className="text-lg sm:text-[21px] font-semibold leading-tight text-gold-200">{f.title}</h3>
                  </div>
                </div>
                <p className="mt-2 text-[14.5px] sm:text-[16px] leading-relaxed text-[#f3dfbd]/90">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* The single official link button on the page */}
        <Reveal delay={0.25}>
          <div className="mt-7 sm:mt-9 flex flex-col items-center justify-center gap-2.5">
            <a
              href="https://patrikastudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group gold-btn inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full px-6 py-3 sm:px-8 sm:py-4 font-serif text-base sm:text-xl font-bold tracking-wider text-[#3a1350] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,200,100,.8)] active:scale-95 text-center"
            >
              <span>Visit Official Website: patrikastudio.com</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5 font-sans">
                →
              </span>
            </a>
            <p className="text-xs sm:text-sm text-gold-300/80 font-serif">
              Click to explore our full collection of wedding and festival invitations
            </p>
          </div>
        </Reveal>
      </div>

      {/* Patrika Studio Atelier bottom showcase with clean diyas & no duplicate text */}
      <div className="relative mt-6 sm:mt-8 h-[200px] sm:h-[280px]">
        <div className="absolute inset-0 overflow-hidden" style={{ maskImage: fade, WebkitMaskImage: fade }}>
          <img
            src={studioArt}
            alt="Patrika Studio artisan atelier with handcrafted gold-foil invitations and lotus flowers"
            loading="lazy"
            className="slow-pan h-full w-full object-cover object-[50%_50%] opacity-85"
            style={{ filter: 'brightness(0.9) saturate(1.1)' }}
          />
          <div className="light-sweep pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,200,100,.3),transparent_60%)]" />
        </div>
        
        {/* Clean, well-spaced bottom diyas */}
        <div className="absolute inset-x-0 bottom-3.5 sm:bottom-4 flex items-end justify-center gap-16 sm:gap-32">
          <Diya size={48} delay={0.3} />
          <Diya size={48} delay={1.6} />
        </div>
      </div>
    </PageFrame>
  );
}
