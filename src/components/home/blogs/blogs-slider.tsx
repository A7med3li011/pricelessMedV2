"use client";
import { Blog } from "@/src/types/tag.types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import placeHolder from "../../../../public/assets/place-holder.svg";

interface BlogsSliderProps {
  data: Blog[];
}

export default function BlogsSlider({ data }: BlogsSliderProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [imageErrors, setImageErrors] = useState<Set<string | number>>(
    new Set()
  );

  const handleImageError = (blogId: string | number) => {
    setImageErrors((prev) => new Set(prev).add(blogId));
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      direction: isRTL ? "rtl" : "ltr",
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
                className="flex-[0_0_100%] xs:flex-[0_0_calc(66.666%-11px)] sm:flex-[0_0_calc(50%-10px)] md:flex-[0_0_calc(40%-14px)] lg:flex-[0_0_calc(33.333%-16px)] xl:flex-[0_0_calc(25%-18px)] min-w-0 mx-3"
              >
                <section className="rounded-lg bg-white overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                  {/* <span className="bg-[#8A44D9] text-white px-2.5 py-1 absolute z-10 text-xs sm:text-sm font-medium rounded-md left-[-3px] rounded-t-none shadow-sm">
                    new
                  </span> */}
                  <section className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={
                        imageErrors.has(ele._id)
                          ? placeHolder
                          : ele?.imageUrl || placeHolder
                      }
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      alt={ele?.title || "Blog"}
                      priority={index < 4}
                      onError={() => handleImageError(ele._id)}
                    />
                  </section>
                  <section className="px-3 sm:px-4 py-3 flex-1 flex flex-col">
                    <section className="text-sm gap-1 pb-5">
                      {ele?.category && (
                        <p className="mb-1 text-sm text-[#8A44D9]">
                          {ele.category}
                        </p>
                      )}
                      <p className="font-semibold">
                        {ele?.title && ele.title.length > 30
                          ? `${ele.title.slice(0, 30)}...`
                          : ele?.title || "Untitled Blog"}
                      </p>
                    </section>

                    <section className="text-xs sm:text-sm py-1 text-[#717678] flex items-center justify-between">
                      <span className="truncate">{ele?.date || "No date"}</span>
                      {ele?.author && (
                        <span className="text-xs text-gray-500 ml-2">
                          {ele.author}
                        </span>
                      )}
                    </section>
                  </section>
                </section>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Navigation and Pagination */}
        <div
          className={`flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 w-1/3 md:w-2/12 px-4 ${
            isRTL ? "ms-auto" : "me-auto"
          }`}
        >
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
                d={
                  isRTL
                    ? "M8.25 4.5l7.5 7.5-7.5 7.5"
                    : "M15.75 19.5L8.25 12l7.5-7.5"
                }
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
                d={
                  isRTL
                    ? "M15.75 19.5L8.25 12l7.5-7.5"
                    : "M8.25 4.5l7.5 7.5-7.5 7.5"
                }
              />
            </svg>
          </button>
        </div>
      </section>
    </section>
  );
}
