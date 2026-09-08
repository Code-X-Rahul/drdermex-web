import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const RISKS = [
  "Spread of infection",
  "Delayed diagnosis",
  "Emotional impact",
  "Worsening of existing conditions",
  "Permanent scarring",
];

const Untreated = () => {
  return (
    <section className='mx-auto max-w-[1400px] px-5 pt-24 sm:px-8 sm:pt-32 lg:px-10'>
      <SectionHeading
        eyebrow='Why early diagnosis matters'
        title='What happens when skin problems are ignored'
      />
      <div className='mt-10 grid grid-cols-2 gap-4 md:grid-cols-5'>
        {RISKS.map((r) => (
          <div key={r} className='relative rounded-[20px] bg-white p-6 pt-8 shadow-[0_2px_12px_rgba(38,43,51,0.05)]'>
            <span className='absolute -top-3 right-4 flex size-7 items-center justify-center rounded-full bg-rose text-white'>
              <X className='size-4' strokeWidth={3} />
            </span>
            <p className='text-[17px] font-bold leading-6 text-ink'>{r}</p>
          </div>
        ))}
      </div>

      <div className='mt-8 rounded-[24px] bg-cream px-7 py-10 sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12'>
        <p className='max-w-2xl text-[24px] font-bold leading-[1.3] tracking-[-0.3px] text-ink sm:text-[30px]'>
          Early diagnosis and treatment go a long way in protecting overall health and well-being —
          especially in remote settings.
        </p>
        <Link
          href='/diagnose'
          className='mt-8 inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-8 text-[15px] font-bold uppercase tracking-wide text-white transition hover:bg-coral hover:text-ink lg:mt-0'
        >
          Check my skin now <ArrowRight className='size-4' />
        </Link>
      </div>
    </section>
  );
};

export default Untreated;
