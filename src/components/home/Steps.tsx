import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

const STEPS = [
  { n: 1, title: "Upload a photo", text: "Snap the affected area and answer a few quick questions.", img: "/Mass_Screening.png" },
  { n: 2, title: "Get it verified", text: "AI gives a preliminary diagnosis; a dermatologist confirms it.", img: "/screen2.png" },
  { n: 3, title: "Start your plan", text: "Get your prescription, book a consult and track progress.", img: "/Improved_Outcomes.png" },
];

const Steps = () => {
  return (
    <section id='how-it-works' className='mx-auto max-w-[1400px] px-5 pt-24 sm:px-8 sm:pt-32 lg:px-10'>
      <SectionHeading eyebrow='How to get started' title='Take the first step towards healthy skin' />
      <div className='mt-10 grid gap-5 md:grid-cols-3'>
        {STEPS.map((s) => (
          <div key={s.n} className='relative h-[250px] overflow-hidden rounded-[20px] bg-[#f3f2ee] p-6'>
            <span className='inline-block rounded-lg bg-white px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-wide text-ink'>
              Step {s.n}
            </span>
            <p className='mt-4 max-w-[56%] text-[22px] font-bold leading-7 text-ink'>{s.title}</p>
            <p className='mt-2 max-w-[56%] text-[15px] leading-6 text-ink/70'>{s.text}</p>
            <Image
              src={s.img}
              alt=''
              aria-hidden
              width={260}
              height={260}
              className='pointer-events-none absolute -bottom-8 -right-4 w-[48%] object-contain object-bottom'
            />
          </div>
        ))}
      </div>
      <div className='mt-8 flex justify-center'>
        <Link
          href='/diagnose'
          className='flex h-[52px] w-full max-w-[360px] items-center justify-center rounded-xl bg-coral text-[17px] font-bold uppercase tracking-wide text-ink transition hover:bg-coral-deep hover:text-white'
        >
          Start my diagnosis
        </Link>
      </div>
    </section>
  );
};

export default Steps;
