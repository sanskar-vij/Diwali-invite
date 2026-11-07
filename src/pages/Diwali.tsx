import diwaliArt from '../assets/diwali-celebration.jpg';
import Diya from '../components/Diya';
import EventLayout, { BlendedArt } from '../components/EventLayout';
import { INVITE } from '../config';

function DiwaliArt() {
  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <BlendedArt
        src={diwaliArt}
        alt="Royal Indian palace courtyard glowing with thousands of earthen diyas, vibrant rangoli and festive lights"
        className="aspect-[4/3.8] sm:aspect-[4/3.5] w-full"
        position="50% 50%"
      />

      {/* Three perfectly aligned, harmoniously spaced golden earthen diyas */}
      <div className="absolute inset-x-0 bottom-2 sm:bottom-3 flex items-end justify-center gap-6 sm:gap-14 z-20">
        <Diya size={54} delay={0.4} sparks={3} />
        <Diya size={78} delay={0} sparks={5} glow={1.3} />
        <Diya size={54} delay={1.1} sparks={3} />
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
          title: 'Celebratory Festive Sky',
          description:
            'Auspicious twilight glow, shimmering golden lanterns, and celestial radiance painting the festive night sky.',
        },
      ]}
    />
  );
}
