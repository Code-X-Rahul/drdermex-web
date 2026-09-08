import Image from "next/image";
import CarouselSection from "./CarouselSection";

const FEATURES = [
  { icon: "/skinMap.svg", title: "Skin mapping", text: "Mark exactly where it is on the body so nothing gets missed." },
  { icon: "/teleDerma.svg", title: "Tele-dermatology", text: "Video consult a registered dermatologist from anywhere." },
  { icon: "/perfMetric.svg", title: "Performance metrics", text: "See how your treatment is working, in numbers." },
  { icon: "/evolutionTrack.svg", title: "Evolution tracking", text: "Photo timeline of your skin as it improves." },
  { icon: "/refer.svg", title: "Referral network", text: "GPs and health workers refer complex cases in one tap." },
  { icon: "/patientPortal.svg", title: "Patient portal", text: "Reports, prescriptions and history in one place." },
];

const Features = () => {
  return (
    <div className='mt-24 bg-cream py-20 sm:mt-32 sm:py-24'>
      <CarouselSection eyebrow='Key features' title='Everything your skin needs, in one app'>
        {FEATURES.map((f) => (
          <div key={f.title} className='flex w-[240px] shrink-0 snap-start flex-col items-center rounded-[20px] bg-white p-6 text-center sm:w-[260px]'>
            <div className='flex size-[92px] items-center justify-center rounded-2xl bg-mist'>
              <Image src={f.icon} alt='' aria-hidden width={44} height={44} />
            </div>
            <p className='mt-6 text-[18px] font-bold text-ink'>{f.title}</p>
            <p className='mt-2 text-[14px] leading-6 text-ink/70'>{f.text}</p>
          </div>
        ))}
      </CarouselSection>
    </div>
  );
};

export default Features;
