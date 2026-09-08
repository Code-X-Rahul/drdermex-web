"use client";

import { ReactNode, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

const CarouselSection = ({ eyebrow, title, description, children, tone = "light", className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  const btn = cn(
    "flex size-11 items-center justify-center rounded-full border transition",
    dark ? "border-white/40 text-white hover:bg-white hover:text-ink" : "border-ink/30 text-ink hover:bg-ink hover:text-white"
  );

  return (
    <section className={cn("mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10", className)}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        tone={tone}
        aside={
          <div className='hidden shrink-0 gap-3 sm:flex'>
            <button type='button' aria-label='Previous' onClick={() => scroll(-1)} className={btn}>
              <ChevronLeft className='size-5' />
            </button>
            <button type='button' aria-label='Next' onClick={() => scroll(1)} className={btn}>
              <ChevronRight className='size-5' />
            </button>
          </div>
        }
      />
      <div
        ref={ref}
        className='no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10'
      >
        {children}
      </div>
    </section>
  );
};

export default CarouselSection;
