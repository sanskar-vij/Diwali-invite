import art from '../assets/bhaidooj.jpg';
import Diya from '../components/Diya';
import EventLayout, { BlendedArt } from '../components/EventLayout';
import { SwastikIcon } from '../components/FestivalOrnaments';
import { SparkleField } from '../components/Ornaments';
import { INVITE } from '../config';

function BhaiDoojArt() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <BlendedArt
        src={art}
        alt="A sister in a magenta saree applies tilak to her brother, holding a puja thali"
        className="aspect-[4/4.2] w-full sm:aspect-[4/3.8]"
        position="50% 35%"
      />
      <SparkleField count={16} />

      {/* Floating Auspicious Swastik Accents */}
      <div className="pointer-events-none absolute -left-2 top-8 z-10 opacity-75 sm:-left-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-300 bg-rose-950/80 shadow-[0_0_12px_rgba(244,63,94,0.5)]">
          <SwastikIcon size={22} />
        </div>
      </div>
      <div className="pointer-events-none absolute -right-2 top-14 z-10 opacity-75 sm:-right-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-300 bg-rose-950/80 shadow-[0_0_12px_rgba(244,63,94,0.5)]">
          <SwastikIcon size={22} />
        </div>
      </div>

      {/* Diyas beside the ceremony */}
      <div className="absolute inset-x-0 bottom-2 flex items-end justify-between px-8 sm:px-14">
        <Diya size={50} delay={0.2} />
        <Diya size={50} delay={1.3} />
      </div>
    </div>
  );
}

export default function BhaiDooj() {
  return (
    <EventLayout
      id="bhaidooj"
      theme="bhaidooj"
      title="Bhai Dooj"
      subtitle="A Sacred Bond Beyond Time (Yama Dwitiya)"
      description="Let us celebrate the timeless bond of affection, unconditional care, and lifelong protection between sisters and brothers."
      art={<BhaiDoojArt />}
      info={INVITE.events.bhaidooj}
      ribbon="Celebrating the eternal sibling bond!"
      shloka={{
        text: 'भ्रातस्तवानुजाताहं भुङ्क्ष्व भक्तमिमं शुभम् । प्रीतये यमराजस्य यमुनाया विशेषतः ॥',
        meaning: 'Beloved brother, accept this auspicious meal lovingly prepared; may the divine grace of Yamuna and Yama grant you everlasting protection and longevity.',
      }}
      features={[
        {
          icon: '🔴',
          title: 'Sacred Roli-Akshat Tilak',
          description:
            'The sister marks her brother’s forehead with vermilion and unbroken holy rice grains, praying for his prosperity and protection from all perils.',
        },
        {
          icon: '✨',
          title: 'Protective Aarti',
          description:
            'Waving the gleaming brass aarti thali with sacred camphor flame in devotion, dispelling negative energies and invoking divine light.',
        },
        {
          icon: '🧵',
          title: 'Moli & Auspicious Shrifal',
          description:
            'Tying the auspicious sacred red-yellow thread (moli) on the wrist and gifting the coconut as a token of honor and prosperity.',
        },
        {
          icon: '🍬',
          title: 'Sweet Delicacies & Vows',
          description:
            'Sharing homemade sweets, exchanging loving gifts, and reaffirming the solemn promise of unconditional sibling support.',
        },
      ]}
    />
  );
}
