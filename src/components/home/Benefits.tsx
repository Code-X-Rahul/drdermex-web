import Image from "next/image";
import CarouselSection from "./CarouselSection";

const BENEFITS = [
  { title: "Early detection", text: "A proactive approach to skin health — catch it before it spreads.", img: "/Early_Detection.png" },
  { title: "Improved outcomes", text: "Accelerate your skin’s journey to wellness with verified plans.", img: "/Improved_Outcomes.png" },
  { title: "Mass screening", text: "A new era of accessible skincare for clinics, camps and communities.", img: "/Mass_Screening.png" },
  { title: "Empowered health workers", text: "GPs and frontline workers diagnose confidently, anywhere.", img: "/Health_Workers.png" },
];

const Benefits = () => {
  return (
    <CarouselSection eyebrow='Benefits' title='Built for patients, doctors and the people between them' className='pt-24 sm:pt-32'>
      {BENEFITS.map((b) => (
        <div key={b.title} className='flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_2px_12px_rgba(38,43,51,0.05)] sm:w-[320px]'>
          <div className='relative h-[240px] bg-mist'>
            <Image src={b.img} alt='' aria-hidden fill className='object-contain object-bottom p-4' sizes='320px' />
          </div>
          <div className='p-6'>
            <p className='text-[20px] font-bold text-ink'>{b.title}</p>
            <p className='mt-2 text-[15px] leading-6 text-ink/70'>{b.text}</p>
          </div>
        </div>
      ))}
    </CarouselSection>
  );
};

export default Benefits;
