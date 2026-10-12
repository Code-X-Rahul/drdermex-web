import Image from "next/image";

const STEPS = [
  { label: "Upload self photo of skin problem", icon: "/workflow-upload.png", pos: "left-1/2 top-0 -translate-x-1/2" },
  { label: "Doctors verify reports and prepare prescription", icon: "/workflow-doctor.png", pos: "bottom-0 right-0" },
  { label: "Patient gets report on their mobile or computer", icon: "/workflow-report.png", pos: "bottom-0 left-0" },
];

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
            {["Upload self photo", "Doctor verifies", "Report on your phone"].map((s, i) => (
              <span key={s} className='flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[14px] font-medium text-white'>
                <span className='flex size-5 items-center justify-center rounded-full bg-coral text-[11px] font-extrabold text-ink'>{i + 1}</span>
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className='flex justify-center lg:justify-end'>
          <div className='relative aspect-[480/440] w-full max-w-[480px]' role='img' aria-label='DrDermx workflow: upload, doctor verification, report'>
            <svg viewBox='0 0 480 440' className='absolute inset-0 size-full text-white/40' fill='none' aria-hidden>
              <defs>
                <marker id='wf-arrow' viewBox='0 0 10 10' refX='8' refY='5' markerWidth='7' markerHeight='7' orient='auto-start-reverse'>
                  <path d='M1 1 9 5 1 9' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
                </marker>
              </defs>
              <g stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeDasharray='2 7' markerEnd='url(#wf-arrow)'>
                <path d='M290 62 Q415 95 400 250' />
                <path d='M330 345 Q240 400 150 345' />
                <path d='M80 250 Q65 95 190 62' />
              </g>
            </svg>
            {STEPS.map((s) => (
              <div key={s.label} className={`absolute flex w-[170px] flex-col items-center gap-2 ${s.pos}`}>
                <Image src={s.icon} alt='' width={64} height={63} className='size-16' />
                <p className='rounded bg-[#2F4858] px-2 py-1 text-center text-[13px] font-semibold leading-snug text-white'>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Science;
