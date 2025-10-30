"use client";
import currancy from "../../../../public/assets/home/currancy.svg";
import { PopularService } from "@/src/types/tag.types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface PopularSliderProps {
  data: PopularService[];
}

export default function PopularSlider({ data }: PopularSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="">
      <section className="h-full">
        <div className="overflow-hidden mb-8" ref={emblaRef}>
          <div className="flex gap-4 xs:gap-4 sm:gap-5 md:gap-6">
            {data.map((ele, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] xs:flex-[0_0_calc(66.666%-11px)] sm:flex-[0_0_calc(50%-10px)] md:flex-[0_0_calc(40%-14px)] lg:flex-[0_0_calc(33.333%-16px)] xl:flex-[0_0_calc(25%-18px)] min-w-0"
              >
                <section className="rounded-lg bg-white overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                  <span className="bg-[#8A44D9] text-white px-2.5 py-1 absolute z-10 text-xs sm:text-sm font-medium rounded-md left-[-3px] rounded-t-none shadow-sm">
                    save {ele?.discount}%
                  </span>
                  <section className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={ele?.imageUrl}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      alt={ele?.upperText}
                      priority={index < 4}
                    />
                  </section>
                  <section className="px-3 sm:px-4 py-3 flex-1 flex flex-col">
                    <section className="flex gap-x-2 sm:gap-x-3 items-center text-base sm:text-lg mb-2">
                      <section className="flex items-center gap-x-1">
                        <section className="w-4 h-4 sm:w-5 sm:h-5 relative flex-shrink-0">
                          <Image
                            src={currancy}
                            alt="currancy"
                            fill
                            className="object-contain"
                          />
                        </section>
                        <p className="text-[#8A44D9] font-semibold">
                          {ele?.discountPrice}
                        </p>
                      </section>
                      <section className="flex items-center gap-x-1 grayscale text-sm sm:text-base">
                        <section className="w-1 h-1 sm:w-5 sm:h-5 relative ">
                          <Image
                            src={currancy}
                            alt="currancy"
                            fill
                            className="object-contain"
                          />
                        </section>
                        <p className="text-[#5E5E5E] line-through  decoration-1">
                          {ele?.price}
                        </p>
                      </section>
                    </section>
                    <section className="h-[60px] sm:h-[70px] font-normal text-sm sm:text-[15px] pb-2 sm:pb-3 border-b border-[#DDDDDD]  flex-1">
                      <p className="mb-2 line-clamp-2">{ele?.upperText}</p>
                      <p className="text-xs sm:text-sm font-light
                       text-gray-600 line-clamp-1">
                        {ele?.lowerText}
                      </p>
                    </section>

                    <section className="text-xs sm:text-sm py-2 sm:py-3 text-[#717678] flex items-center">
                      <span className="truncate">{ele?.tag}</span>
                      <span className="w-1 h-1 mx-2 rounded-full inline-block bg-[#717678] flex-shrink-0"></span>
                      <span className="truncate">
                        {ele?.facilityCity} {ele?.facilityArea}
                      </span>
                    </section>
                  </section>
                </section>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Navigation and Pagination */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 w-1/4 md:w-2/12 me-auto px-4 ">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="w-4 h-4 sm:w-4 sm:h-4 rounded-full  shadow-sm hover:shadow-md transition-all flex items-center justify-center text-gray-700 hover:text-[#8A44D9] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="flex-1 flex items-center justify-center gap-[3px] sm:gap-1 min-h-[20px]">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === selectedIndex
                    ? "w-7 sm:w-8 bg-[#8A44D9]"
                    : "w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="w-4 h-4 sm:w-4 sm:h-4 rounded-full bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-center text-gray-700 hover:text-[#8A44D9] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </section>
    </section>
  );
}
