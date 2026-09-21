import Image from "next/image";
import Link from "next/link";
import { ScanFace, ShieldCheck, Stethoscope } from "lucide-react";

const STATS = [
  { value: "98%", label: "Accuracy*", Icon: ShieldCheck, color: "text-rose" },
  { value: "3000+", label: "Skin conditions", Icon: ScanFace, color: "text-navy" },
  { value: "MCI", label: "Registered doctors", Icon: Stethoscope, color: "text-emerald-600" },
];

const Hero = () => {
  return (
    <section className='px-4 pt-4 sm:px-6 lg:px-8'>
      <div className='relative mx-auto max-w-[1400px]'>
        <div className='hero-gradient relative overflow-hidden rounded-[24px] lg:min-h-[600px]'>
          <div className='relative z-10 max-w-[600px] px-6 pb-8 pt-12 sm:px-10 sm:pt-16 lg:px-12 lg:pb-0 lg:pt-[72px]'>
            <span className='inline-block rounded-lg border border-coral/70 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-white sm:text-[15px]'>
              AI + dermatologist-verified skin diagnosis
            </span>
            <h1 className='mt-6 text-[40px] font-bold leading-[1.04] tracking-[-1px] text-white sm:text-[52px] lg:text-[58px]'>
              A skin health revolution in India.
            </h1>
            <p className='mt-5 max-w-md text-[17px] leading-7 text-white/75'>
              Upload a photo, get a 98% accurate image diagnosis in seconds, and a treatment plan
              from a registered dermatologist — at a fraction of the cost.
            </p>
            <Link
              href='/diagnose'
              className='mt-8 flex h-[52px] w-full max-w-[360px] items-center justify-center rounded-xl bg-coral text-[17px] font-bold uppercase tracking-wide text-ink transition hover:bg-coral-deep hover:text-white'
            >
              Start my diagnosis
            </Link>
          </div>

          <div className='relative mx-auto -mb-1 mt-4 w-[78%] max-w-[420px] lg:hidden'>
            <Image src='/smiling_lady.png' alt='Smiling woman with healthy skin' width={481} height={455} priority className='w-full' />
          </div>

          <div className='pointer-events-none absolute bottom-0 right-[4%] hidden h-[94%] lg:block xl:right-[8%]'>
            <Image src='/line.svg' alt='' aria-hidden width={150} height={58} className='absolute -top-2 left-[8%] opacity-90' />
            <Image
              src='/smiling_lady.png'
              alt='Smiling woman with healthy skin'
              width={481}
              height={455}
              priority
              className='h-full w-auto'
            />
          </div>

          <p className='absolute right-3 top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[10px] tracking-wide text-white/55 [writing-mode:vertical-rl] lg:block'>
            *Accuracy as per DrDermx internal validation of image-based diagnosis
          </p>

          <div className='hidden h-[215px] lg:block' />
        </div>

        <div className='no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-7 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:gap-4 lg:overflow-visible lg:rounded-tr-[40px] lg:bg-[#ebe8e1] lg:pb-0 lg:pl-6 lg:pr-6 lg:pt-5'>
          {STATS.map(({ value, label, Icon, color }) => (
            <div key={label} className='stat-card relative flex min-w-[124px] flex-1 flex-col items-center rounded-[22px] px-3 pb-11 pt-6 text-center shadow-[0_6px_20px_rgba(0,0,0,0.06)] lg:w-[132px] lg:flex-none'>
              <p className='text-[26px] font-extrabold leading-none text-ink'>{value}</p>
              <p className='mt-2 text-[14px] font-medium text-ink/75'>{label}</p>
              <span className={`absolute -bottom-5 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md ${color}`}>
                <Icon className='size-5' />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='h-8 lg:h-0' />
    </section>
  );
};

export default Hero;
