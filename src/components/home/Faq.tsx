"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

const FAQS = [
  { q: "What is DrDermx?", a: "DrDermx is a dermatology platform that provides expert skin disease diagnosis and holistic skin health solutions. It combines image-based assessments with consultations from Medical Council registered Dermatologists to offer accurate, personalised treatment plans." },
  { q: "How does DrDermx work?", a: "Upload an image of your skin condition. Our system provides a preliminary diagnosis, and experienced dermatologists assess it and give expert recommendations, including treatment plans and lifestyle advice." },
  { q: "What skin conditions can DrDermx diagnose?", a: "Around 3000+ conditions, including acne and acne scars, wrinkles, hair loss, pigmentation (melasma, dark spots), eczema, psoriasis, fungal infections of skin and nail, phrynoderma, scabies, pellagra, Hansen’s disease and chronic urticaria." },
  { q: "Are the doctors on DrDermx qualified?", a: "Yes. All dermatologists on DrDermx are Medical Council registered, having completed MBBS with 2–3 years of MD/DNB or a Diploma in Skin and Venereal Diseases." },
  { q: "Is DrDermx only for individuals, or can doctors use it too?", a: "Both. Individuals get expert dermatology care; general practitioners, other specialists and frontline health workers use it to diagnose and manage skin diseases." },
  { q: "Do I need an appointment to use DrDermx?", a: "No. DrDermx provides instant analysis, and you can consult a dermatologist without booking a traditional appointment." },
  { q: "Does DrDermx provide personalised treatment plans?", a: "Yes. After diagnosis, our dermatologists provide personalised plans including prescriptions, skincare routines, and diet and yoga recommendations." },
  { q: "Is DrDermx a replacement for in-person dermatology visits?", a: "For severe or complex cases an in-person visit may still be necessary. DrDermx helps with early detection, differential diagnosis and effective management of common skin concerns." },
  { q: "How secure is my data on DrDermx?", a: "All your personal and medical information is encrypted and stored securely, ensuring confidentiality at every step." },
  { q: "How can I get started with DrDermx?", a: "Start a diagnosis on this website or in the app: upload an image of your skin concern and receive expert-driven analysis and guidance from qualified dermatologists." },
];

const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className='mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:px-10'>
      <div className='grid gap-10 lg:grid-cols-[0.8fr,1.2fr] lg:gap-16'>
        <SectionHeading
          eyebrow='FAQ'
          title='Questions, answered'
          description='We’d be happy to help with whatever else you want to know — just reach us on WhatsApp.'
        />
        <div className='divide-y divide-ink/10 border-y border-ink/10'>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type='button'
                  onClick={() => setOpen(isOpen ? null : i)}
                  className='flex w-full items-center justify-between gap-6 py-5 text-left'
                >
                  <span className='text-[17px] font-bold text-ink'>{f.q}</span>
                  <ChevronDown className={cn("size-5 shrink-0 text-ink/60 transition", isOpen && "rotate-180")} />
                </button>
                <div className={cn("grid transition-all duration-200", isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")}>
                  <p className='overflow-hidden text-[15px] leading-7 text-ink/70'>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
