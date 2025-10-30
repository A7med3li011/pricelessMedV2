"use client";
import Image from "next/image";
import womenImage from "../../../public/assets/home/Photo.svg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

const data = [
  {
    image: womenImage,
    name: "sara ali",
    location: "alex, egypt",
    text: "That urgent care discount really helped us get through when we didn't have health insurance. And when you compare it to the annual fees, you feel so good.",
  },
  {
    image: womenImage,
    name: "khaled ali",
    location: "alex, egypt",
    text: "That urgent care discount really helped us get through when we didn't have health insurance. And when you compare it to the annual fees, you feel so good.",
  },
  {
    image: womenImage,
    name: "nader ali",
    location: "alex, egypt",
    text: "That urgent care discount really helped us get through when we didn't have health insurance. And when you compare it to the annual fees, you feel so good.",
  },
  {
    image: womenImage,
    name: "rehamm ali",
    location: "alex, egypt",
    text: "That urgent care discount really helped us get through when we didn't have health insurance. And when you compare it to the annual fees, you feel so good.",
  },
  {
    image: womenImage,
    name: "nour ali",
    location: "alex, egypt",
    text: "That urgent care discount really helped us get through when we didn't have health insurance. And when you compare it to the annual fees, you feel so good.",
  },
];

export default function HomeSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center'
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 bg-gradient">
      <section className="container h-full">
        <div className="overflow-hidden mb-8" ref={emblaRef}>
          <div className="flex">
            {data.map((testimonial, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0"
              >
                <section className="p-4 sm:p-6 md:p-8 lg:p-10 bg-[linear-gradient(to_bottom,#5F5B5B_0%,#B58B7B_50%,#999390_100%)] backdrop-blur-2xl rounded-xl shadow-sm h-auto min-h-[400px] md:min-h-[500px] lg:h-[550px] flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-10">
                  <section className="relative h-[120px] w-[120px] sm:h-[150px] sm:w-[150px] md:h-[180px] md:w-[180px] flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </section>
                  <section className="flex-1 text-center md:text-left">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed tracking-tight mb-4 md:mb-5 text-white">
                      {testimonial.text}
                    </p>
                    <div>
                      <h3 className="font-semibold text-sm md:text-base uppercase text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300 capitalize">
                        {testimonial.location}
                      </p>
                    </div>
                  </section>
                </section>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Navigation and Pagination */}
        <div className="flex items-center justify-center gap-6 mt-6 w-1/3 mx-auto">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full transition-colors flex items-center justify-center text-black cursor-pointer"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="flex-1 flex items-center justify-center gap-1  min-h-[20px]">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer  ${
                  index === selectedIndex
                    ? "w-8 bg-[#b58b7b]"
                    : "w-2.5 bg-[#B48C7C]/50 hover:bg-[#B48C7C]/80 "
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full transition-colors flex items-center justify-center text-black cursor-pointer"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
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
