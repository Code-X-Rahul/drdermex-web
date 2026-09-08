import Image from "next/image";
import { Sun, Wind, Brain } from "lucide-react";
import CarouselSection from "./CarouselSection";

const CAUSES = [
  { icon: "/diseaseIcon2.svg", title: "Nutritional deficiencies", text: "Low iron, zinc or vitamin A shows up early as dry, flaky or dull skin." },
  { icon: "/diseaseIcon.svg", title: "Underlying diseases", text: "Diabetes, thyroid and liver issues often surface on the skin before anywhere else." },
  { icon: "/waterDrop.svg", title: "Dehydration", text: "Skin loses elasticity and cracks when the body isn't getting enough water." },
  { icon: "/backteria.svg", title: "Infections", text: "Fungal, bacterial and viral infections spread fast if they're not identified early." },
  { Icon: Sun, title: "Sun damage", text: "UV exposure drives pigmentation, premature ageing and long-term skin risk." },
  { Icon: Wind, title: "Allergies", text: "Rashes, hives and eczema flare-ups point to triggers in food or environment." },
  { Icon: Brain, title: "Stress", text: "High stress worsens acne, psoriasis and eczema through hormonal changes." },
];

const RootCauses = () => {
  return (
    <CarouselSection
      eyebrow='Root causes'
      title='Skin is a window to the body’s health'
      description='Skin conditions rarely start on the skin. What you see on the surface is usually a signal of what’s happening underneath.'
      className='pt-20 sm:pt-28'
    >
      {CAUSES.map((c) => (
        <div key={c.title} className='flex w-[260px] shrink-0 snap-start flex-col rounded-[20px] bg-cream p-6 sm:w-[280px]'>
          <div className='flex size-14 items-center justify-center rounded-full bg-white'>
            {"Icon" in c && c.Icon ? (
              <c.Icon className='size-6 text-rose' strokeWidth={2.2} />
            ) : (
              <Image src={c.icon as string} alt='' aria-hidden width={28} height={28} className='brightness-0 opacity-80' />
            )}
          </div>
          <p className='mt-8 text-[20px] font-bold text-ink'>{c.title}</p>
          <p className='mt-2 text-[15px] leading-6 text-ink/70'>{c.text}</p>
        </div>
      ))}
    </CarouselSection>
  );
};

export default RootCauses;
