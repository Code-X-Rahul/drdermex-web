import Image from "next/image";

const Science = () => {
  return (
    <section className='navy-gradient relative mt-24 overflow-hidden pb-40 pt-20 sm:mt-32 sm:pt-28'>
      <div className='pointer-events-none absolute -right-20 -top-24 size-[420px] rounded-full bg-white/5 blur-3xl' />
      <div className='mx-auto grid max-w-[1400px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-10'>
        <div>
          <p className='text-[15px] font-extrabold uppercase tracking-[0.06em] text-coral sm:text-[17px]'>It’s all in the image</p>
          <h2 className='mt-2 text-[32px] font-bold leading-[1.1] tracking-[-0.5px] text-white sm:text-[44px]'>
            Deep-learning imaging, checked by real dermatologists
          </h2>
          <p className='mt-6 max-w-lg text-[17px] leading-7 text-white/75'>
            Skin diseases affect millions globally and one third of India’s population. Traditional
            diagnosis is often invasive, inaccessible or inaccurate. DrDermx turns a phone photo into
            data insights for patients, doctors and frontline health workers — with a dermatologist
            in the loop every time.
          </p>
          <div className='mt-8 flex flex-wrap gap-3'>
            {["Upload self photo", "AI diagnosis", "Doctor verifies", "Report on your phone"].map((s, i) => (
              <span key={s} className='flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[14px] font-medium text-white'>
                <span className='flex size-5 items-center justify-center rounded-full bg-coral text-[11px] font-extrabold text-ink'>{i + 1}</span>
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className='flex justify-center lg:justify-end'>
          <Image src='/workFlow.svg' alt='DrDermx workflow: upload, AI diagnosis, doctor verification, report' width={480} height={428} className='w-full max-w-[480px]' />
        </div>
      </div>
    </section>
  );
};

export default Science;
