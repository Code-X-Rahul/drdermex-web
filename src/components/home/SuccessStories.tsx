"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STORIES = [
  { src: "/stock-photos/testimonial-1.png", alt: "Vikram, 38: I used to style my hair to hide my forehead. Not anymore." },
  { src: "/stock-photos/testimonial-2.png", alt: "Priya, 29: My parting kept getting wider. Now I leave my hair open again." },
  { src: "/stock-photos/testimonial-3.png", alt: "Manish, 36: The change is truly incredible. This program has restored my hair and my spirit!" },
  { src: "/stock-photos/testimonial-4.png", alt: "Prija, 28: It's changed my perspective on everything. Consistency paid off!" },
  { src: "/stock-photos/testimonial-5.png", alt: "Rahul, 34: I trusted the journey and the results speak for themselves" },
];

/** Distance between two neighbouring cards, i.e. one swipe step. */
const stepOf = (el: HTMLElement) => {
  const [a, b] = [el.children[0], el.children[1]] as HTMLElement[];
  return a && b ? b.offsetLeft - a.offsetLeft : 0;
};

const SuccessStories = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const step = stepOf(el);
      const max = el.scrollWidth - el.clientWidth;
      const count = max <= 1 || !step ? 1 : Math.ceil(max / step - 0.05) + 1;
      setPages(count);
      setPage(Math.min(count - 1, Math.round(el.scrollLeft / (step || 1))));
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: i * stepOf(el), behavior: "smooth" });
  };

  return (
    <section className='mx-auto max-w-[1400px] px-5 pb-6 pt-10 sm:px-8 sm:pt-16 lg:px-10'>
      <h2 className='text-center text-[30px] font-bold leading-[1.12] tracking-[-0.5px] text-ink sm:text-[40px]'>
        Our Success Stories
      </h2>

      <div
        ref={ref}
        className='no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-5 px-5 sm:-mx-8 sm:mt-10 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:gap-5 lg:px-0'
      >
        {STORIES.map(({ src, alt }, i) => (
          <div key={src} className='w-[44%] shrink-0 snap-start sm:w-[30%] md:w-[24%] lg:w-0 lg:min-w-0 lg:flex-1'>
            <Image
              src={src}
              alt={alt}
              width={630}
              height={1117}
              sizes='(min-width: 1024px) 260px, (min-width: 640px) 30vw, 44vw'
              priority={i < 2}
              className='h-auto w-full'
            />
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className='mt-6 flex justify-center gap-2'>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type='button'
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn("h-1.5 rounded-full transition-all", i === page ? "w-10 bg-ink" : "w-6 bg-ink/15")}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SuccessStories;
