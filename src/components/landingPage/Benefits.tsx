"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import MainWrapper from "../wrappers/MainWrapper";

const BENEFITS = [
  {
    name: "Early Detection",
    description: "A proactive approach to skin health.",
    image: "Early_Detection.png",
  },
  {
    name: "Improved Outcomes",
    description: "Accelerate your skin's journey to wellness.",
    image: "Improved_Outcomes.png",
  },
  {
    name: "Mass Screening",
    description: "A new era of accessible skincare.",
    image: "Mass_Screening.png",
  },
  {
    name: "Empowered Healthcare Workers",
    description: "Empowering professionals, transforming lives.",
    image: "Health_Workers.png",
  },
];

const Benefits = () => {
  const [selectedImage, setSelectedImage] = useState("Health_Workers.png");

  return (
    <MainWrapper className='py-20 px-6 lg:px-0 lg:pt-4 grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex flex-col gap-8'>
        <p className='text-[40px] font-bold text-secondary'>Benefits</p>
        <div className='flex flex-col gap-4'>
          {BENEFITS.map((benefit) => {
            const isActive = selectedImage === benefit.image;
            return (
              <button
                key={benefit.name}
                onClick={() => setSelectedImage(benefit.image)}
                disabled={isActive}
                className={`px-4 py-4 flex items-center justify-between rounded-md transition-all duration-200 
                  ${
                    isActive
                      ? "border-2 border-primary shadowLarge"
                      : "border border-[#F5F5F5] shadowLarge hover:border-gray-300"
                  } group`}
              >
                <div className='flex flex-col gap-2 items-start'>
                  <p
                    className={`text-xl leading-[17px] font-bold ${
                      isActive ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {benefit.name}
                  </p>
                  <p className='text-sm leading-5 text-tertiary'>{benefit.description}</p>
                </div>
                <ArrowRight
                  className={`${isActive ? "text-primary" : "text-[#D9D9D9]"}`}
                  size={20}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className='flex items-center justify-center relative'>
        <Image
          src={`/${selectedImage}`}
          alt={selectedImage}
          width={700}
          height={700}
          className='pointer-events-none'
        />
      </div>
    </MainWrapper>
  );
};

export default Benefits;
