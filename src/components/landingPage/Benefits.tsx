import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import MainWrapper from "../wrappers/MainWrapper";

const BENEFITS = [
  {
    name: "Early Detection",
    description: "A proactive approach to skin health.",
  },
  {
    name: "Improved Outcomes",
    description: "Accelerate your skin's journey to wellness.",
    isDisabled: true,
  },
  {
    name: "Mass Screening",
    description: "A new era of accessible skincare.",
  },
  {
    name: "Empowered Healthcare Workers",
    description: "Empowering professionals, transforming lives.",
  },
];

const Benefits = () => {
  return (
    <MainWrapper className='py-20 px-6 lg:px-0 lg:pt-4 grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex flex-col gap-8'>
        <p className='text-[40px] font-bold text-secondary'>Benefits</p>
        <div className='flex flex-col gap-4'>
          {BENEFITS.map((benefit) => (
            <button
              disabled={benefit.isDisabled}
              className='px-4 py-4 flex items-center justify-between shadowLarge rounded-md border border-[#F5F5F5] disabled:border-primary group'
              key={benefit.name}
            >
              <div className='flex flex-col gap-2 items-start'>
                <p className='text-secondary text-xl leading-[17px] font-bold group-disabled:text-primary'>
                  {benefit.name}
                </p>
                <p className='text-sm leading-5 text-tertiary'>{benefit.description}</p>
              </div>
              <ArrowRight className={"text-[#D9D9D9] group-disabled:text-primary"} size={20} />
            </button>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-center relative '>
        <Image
          src={"/shape.png"}
          alt='Screen 1'
          width={300}
          height={300}
          className='pointer-events-none absolute top-1/2 left-0 -translate-y-1/2'
        />
        <Image
          src={"/screen1.png"}
          alt='Screen 1'
          width={210}
          height={456}
          className='pointer-events-none screen1Shadow'
        />
        <Image
          src={"/appointmentCardIcon.png"}
          alt='Screen 1'
          width={200}
          height={49}
          className='pointer-events-none absolute top-[100px] right-20 cardShadow'
        />
        <Image
          src={"/patientCardIcon.png"}
          alt='Screen 1'
          width={200}
          height={49}
          className='pointer-events-none absolute top-1/2 -translate-y-1/2 left-[100px] cardShadow'
        />
        <Image
          src={"/imgDiagnosis.png"}
          alt='Screen 1'
          width={200}
          height={49}
          className='pointer-events-none absolute bottom-6 right-24 cardShadow'
        />
      </div>
    </MainWrapper>
  );
};

export default Benefits;
