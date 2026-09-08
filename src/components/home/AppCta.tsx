"use client";

import Image from "next/image";
import { useScroll } from "@/context/ScrollContext";
import { APP_STORE_URL, PLAY_STORE_URL, DOCTOR_PLAY_STORE_URL } from "@/constants/links";

const Badge = ({ href, src, alt }: { href: string; src: string; alt: string }) => (
  <a href={href} target='_blank' rel='noreferrer' className='shrink-0'>
    <Image src={src} alt={alt} width={135} height={42} className='h-[42px] w-auto' />
  </a>
);

const AppCta = () => {
  const { downloadSectionRef } = useScroll();

  return (
    <section className='relative z-10 -mt-14 rounded-t-[40px] bg-white pt-20 sm:pt-24'>
      <div ref={downloadSectionRef} className='mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10'>
        <div className='relative overflow-hidden rounded-[28px] bg-cream px-7 pb-0 pt-10 sm:px-12 sm:pt-14 lg:min-h-[420px] lg:pb-14'>
          <div className='relative z-10 max-w-lg'>
            <h2 className='text-[32px] font-bold leading-[1.1] tracking-[-0.5px] text-ink sm:text-[44px]'>
              Have questions? A dermatologist is one tap away.
            </h2>
            <p className='mt-4 text-[17px] leading-7 text-ink/70'>
              Diagnose, consult and track — all from the DrDermx app.
            </p>

            <p className='mt-8 text-xs font-extrabold uppercase tracking-[0.18em] text-ink/45'>For patients</p>
            <div className='mt-3 flex gap-3'>
              <Badge href={PLAY_STORE_URL} src='/playstore.png' alt='Get it on Google Play' />
              <Badge href={APP_STORE_URL} src='/appstore.svg' alt='Download on the App Store' />
            </div>

            <p className='mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-ink/45'>For doctors & health workers</p>
            <div className='mt-3 flex gap-3'>
              <Badge href={DOCTOR_PLAY_STORE_URL} src='/playstore.png' alt='DrDermx for Professionals on Google Play' />
            </div>
          </div>

          <Image
            src='/Health_Workers.png'
            alt='DrDermx app for dermatologists, GPs, frontline workers, dieticians and yoga teachers'
            width={520}
            height={560}
            className='relative mx-auto mt-6 w-[80%] max-w-[420px] lg:absolute lg:bottom-0 lg:right-8 lg:mt-0 lg:w-[42%] lg:max-w-[540px]'
          />
        </div>
      </div>
    </section>
  );
};

export default AppCta;
