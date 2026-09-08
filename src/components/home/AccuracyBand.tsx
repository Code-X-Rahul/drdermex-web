import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Microscope, ScanFace, Stethoscope } from "lucide-react";

const CHIPS = [
  { Icon: ScanFace, label: "3000+ skin conditions" },
  { Icon: Microscope, label: "Deep-learning imaging" },
  { Icon: Stethoscope, label: "Verified by MCI dermatologists" },
];

const SAMPLES = [
  { src: "/acne.png", label: "Acne", note: "Image-based" },
  { src: "/acne2.jpeg", label: "Inflammatory lesion", note: "Dermatologist-verified" },
];

const AccuracyBand = () => {
  return (
    <section className='navy-gradient relative mt-20 pb-32 pt-16 sm:pt-20'>
      <div className='mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr,1.1fr] lg:px-10'>
        <div>
          <p className='text-[15px] font-extrabold uppercase tracking-[0.06em] text-coral sm:text-[17px]'>Proven accuracy</p>
          <h2 className='mt-2 text-[40px] font-bold leading-none tracking-[-1px] text-white sm:text-[52px]'>98% accurate diagnosis*</h2>
          <div className='mt-7 flex flex-wrap gap-3'>
            {CHIPS.map(({ Icon, label }) => (
              <span key={label} className='flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[14px] font-medium text-white'>
                <Icon className='size-4' />
                {label}
              </span>
            ))}
          </div>
          <Link href='#how-it-works' className='mt-10 inline-flex items-center gap-2 border-b border-white pb-0.5 text-[15px] font-bold text-white'>
            See how it works <ArrowRight className='size-4' />
          </Link>
        </div>

        <div className='grid grid-cols-2 gap-5'>
          {SAMPLES.map((s) => (
            <div key={s.label} className='rounded-[20px] bg-cream p-3 pb-4'>
              <div className='relative aspect-square overflow-hidden rounded-[14px]'>
                <Image src={s.src} alt={s.label} fill className='object-cover' sizes='(min-width:1024px) 300px, 45vw' />
              </div>
              <p className='mt-3 text-center text-[15px] font-bold text-ink'>{s.label}</p>
              <p className='text-center text-[12px] font-semibold uppercase tracking-wide text-ink/50'>{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccuracyBand;
