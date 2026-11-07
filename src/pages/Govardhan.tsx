import { useMemo } from 'react';
import art from '../assets/krishna.jpg';
import Diya from '../components/Diya';
import EventLayout, { BlendedArt } from '../components/EventLayout';
import { PeacockFeather } from '../components/FestivalOrnaments';
import { INVITE } from '../config';

function TempleLights() {
  const lights = useMemo(
    () =>
      Array.from({ length: 24 }, () => ({
        l: 35 + Math.random() * 60,
        t: 20 + Math.random() * 45,
        d: Math.random() * 3,
        c: Math.random() > 0.5 ? '#67e8f9' : '#fef08a',
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {lights.map((p, i) => (
        <span
          key={i}
          className="twinkle absolute h-1.5 w-1.5 rounded-full"
          style={{
            left: `${p.l}%`,
            top: `${p.t}%`,
            animationDelay: `${p.d}s`,
            animationDuration: '3.6s',
            background: p.c,
            boxShadow: `0 0 10px 3px ${p.c}`,
          }}
        />
      ))}
    </div>
  );
}

function GovardhanArt() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <BlendedArt
        src={art}
        alt="Lord Krishna playing the flute beside a sacred cow, with Govardhan hill and a golden temple"
        className="aspect-[4/4.4] w-full sm:aspect-[4/4]"
        position="50% 40%"
      />
      <TempleLights />

      {/* Floating Peacock Feathers */}
      <div className="pointer-events-none absolute -left-2 top-8 z-10 opacity-80 sm:-left-6">
        <PeacockFeather size={42} className="rotate-[-20deg]" />
      </div>
      <div className="pointer-events-none absolute -right-2 top-12 z-10 opacity-80 sm:-right-6">
        <PeacockFeather size={36} className="rotate-[25deg]" />
      </div>

      {/* Temple butter diyas */}
      <div className="absolute inset-x-0 bottom-2 flex items-end justify-center gap-24 sm:gap-40">
        <Diya size={48} delay={0.5} sparks={2} />
        <Diya size={48} delay={1.7} sparks={2} />
      </div>
    </div>
  );
}

export default function Govardhan() {
  return (
    <EventLayout
      id="govardhan"
      theme="govardhan"
      title="Govardhan Puja"
      subtitle="Faith, Gratitude &amp; Annakut Mahotsav"
      description="Let us unite with devotion to celebrate Lord Krishna lifting the sacred Govardhan hill and offer our gratitude to Mother Nature."
      art={<GovardhanArt />}
      info={INVITE.events.govardhan}
      ribbon="With heartfelt devotion and joy!"
      shloka={{
        text: 'नमो ब्रह्मण्य देवाय गोब्राह्मणहिताय च । जगद्धिताय कृष्णाय गोविन्दाय नमो नमः ॥',
        meaning: 'Salutations to Lord Krishna, the supreme protector of cows, devotees, and the entire cosmic order.',
      }}
      features={[
        {
          icon: '⛰️',
          title: 'Mount Govardhan Leela',
          description:
            'Commemorating the divine miracle when Bal-Gopal lifted Mount Govardhan on his little finger to shield Vraj from rain.',
        },
        {
          icon: '🍛',
          title: 'Annakut (56 Bhog)',
          description:
            'Offering a mountain of 56 pure vegetarian delicacies, freshly harvested grains, and sweets in gratitude to Mother Earth.',
        },
        {
          icon: '🐄',
          title: 'Gau Mata (Cow) Puja',
          description:
            'Honoring and garlanding sacred cows with fragrant malas, turmeric, fresh grass, and jaggery as the symbol of motherhood.',
        },
        {
          icon: '🪈',
          title: 'Krishna Bhakti & Kirtan',
          description:
            'Soul-stirring bhajans, sweet flute melodies, and collective devotion invoking the timeless atmosphere of Vrindavan.',
        },
      ]}
    />
  );
}
