"use client";
import currancy from "../../../../public/assets/home/currancy.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { PopularService } from "@/src/types/tag.types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

interface PopularSliderProps {
  data: PopularService[];
}

export default function PopularSlider({ data }: PopularSliderProps) {
  return (
    <section className="">
      <section className=" h-full ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom-popular",
            type: "bullets",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            480: { slidesPerView: 1.5, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="testimonial-slider mb-8"
        >
          {data.map((ele, index) => (
            <SwiperSlide key={index}>
              <section className="rounded-lg bg-white overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col ">
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
                      <section className="w-4 h-4 sm:w-5 sm:h-5 relative flex-shrink-0">
                        <Image
                          src={currancy}
                          alt="currancy"
                          fill
                          className="object-contain"
                        />
                      </section>
                      <p className="text-[#5E5E5E] line-through decoration-red-500 decoration-1">
                        {ele?.price}
                      </p>
                    </section>
                  </section>
                  <section className="min-h-[60px] sm:min-h-[70px] font-semibold text-sm sm:text-base pb-2 sm:pb-3 border-b border-[#DDDDDD] flex-1">
                    <p className="mb-1 line-clamp-2">{ele?.upperText}</p>
                    <p className="text-xs sm:text-sm font-normal text-gray-600 line-clamp-1">
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation and Pagination */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 max-w-xs sm:max-w-sm mx-auto px-4">
          <button
            className="swiper-button-prev-custom w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-center text-gray-700 hover:text-[#8A44D9] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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

          {/* Pagination dots will appear here */}
          <div
            className="swiper-pagination-custom-popular flex-1 flex items-center justify-center min-h-[20px]"
          ></div>

          <button
            className="swiper-button-next-custom w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-center text-gray-700 hover:text-[#8A44D9] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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

      <style jsx global>{`
        .swiper-pagination-custom-popular .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: #d1d5db !important;
          opacity: 1 !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
          margin: 0 3px !important;
        }

        @media (min-width: 640px) {
          .swiper-pagination-custom-popular .swiper-pagination-bullet {
            width: 10px !important;
            height: 10px !important;
          }
        }

        .swiper-pagination-custom-popular .swiper-pagination-bullet:hover {
          background: #9ca3af !important;
        }

        .swiper-pagination-custom-popular .swiper-pagination-bullet-active {
          background: #8a44d9 !important;
          width: 28px !important;
          border-radius: 4px !important;
        }

        @media (min-width: 640px) {
          .swiper-pagination-custom-popular .swiper-pagination-bullet-active {
            width: 32px !important;
          }
        }

        .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
}