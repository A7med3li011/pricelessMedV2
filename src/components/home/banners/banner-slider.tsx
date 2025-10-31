"use client";
import Image from "next/image";
import { Banner } from "@/src/types/tag.types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

interface BannerSliderProps {
  data: Banner[];
}

export default function BannerSlider({ data }: BannerSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  function handleClick(link: string | undefined) {
    if (!link) return;
    window.open(link, "_blank");
  }

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
    <section className="mt-10">
      <section className="container h-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-2.5 sm:gap-5 lg:gap-8 xl:gap-10">
            {data.map((ele, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-21px)] xl:flex-[0_0_calc(33.333%-27px)] min-w-0"
              >
                <section
                  onClick={() => handleClick(ele?.link)}
                  className="relative cursor-pointer"
                >
                  <section className="relative w-full h-[500px] rounded-lg overflow-hidden">
                    <Image
                      src={ele.imageUrl}
                      fill
                      alt={ele?.title}
                      className=" object-cover"
                    />
                  </section>
                </section>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Navigation and Pagination */}
        {/* <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 max-w-md mx-auto px-4">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-center text-gray-700 hover:text-[#8A44D9] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-center text-gray-700 hover:text-[#8A44D9] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
        </div> */}
      </section>
    </section>
  );
}
