"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Slide01 from "../../../public/Slider_01.png";
import Slide02 from "../../../public/Slider_02.png";
import Slide03 from "../../../public/Slider_03.png";
import Slide04 from "../../../public/Slider_04.png";
import Autoplay from "embla-carousel-autoplay";

export function ImageCarousel() {
  const [api, setApiState] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const setApi = React.useCallback((api: CarouselApi) => {
    setApiState(api);
  }, []);

  const sliderImages = [Slide01, Slide02, Slide03, Slide04];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleDotClick = React.useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api]
  );

  return (
    <div className='flex flex-col h-full justify-between'>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        setApi={setApi}
        className='w-full h-full'
      >
        <CarouselContent className='h-full'>
          {sliderImages.map((slide, index) => (
            <CarouselItem key={index} className='h-full'>
              <div className='p-1 h-full'>
                <div className='rounded-lg h-full flex items-center justify-center'>
                  <Image
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className='w-full object-contain'
                    priority={index === 0}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot navigation */}
      <div className='flex gap-2 justify-center mt-4'>
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type='button'
            onClick={() => handleDotClick(index)}
            className={cn(
              "h-3 w-3 rounded-full transition-colors",
              current === index ? "bg-primary" : "bg-gray-300"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
