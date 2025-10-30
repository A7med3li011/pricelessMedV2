"use client";
import Image from "next/image";
import { Banner } from "@/src/types/tag.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BannerSliderProps {
  data: Banner[];
}

export default function BannerSlider({ data }: BannerSliderProps) {
  function handleClick(link: string | undefined) {
    if (!link) return;
    window.open(link, "_blank");
  }
  return (
    <section className="mt-10">
      <section className="container  h-full ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
            640: { slidesPerView: 2, spaceBetween: 20 }, // Small tablets
            1024: { slidesPerView: 3, spaceBetween: 30 }, // Laptops
            1280: { slidesPerView: 3, spaceBetween: 40 }, // Desktops
          }}
          className="testimonial-slider "
        >
          {data.map((ele, index) => (
            <SwiperSlide key={index}>
              <section
                onClick={() => handleClick(ele?.link)}
                className="relative cursor-pointer"
              >
                <section className="relative w-full  h-[500px]  rounded-lg overflow-hidden">
                  <Image
                    src={ele.imageUrl}
                    fill
                    alt={ele?.title}
                    className="object-center"
                  />
                </section>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation and Pagination */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 max-w-md mx-auto px-4">
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

          <div
            className="swiper-pagination-custom flex-1 flex items-center justify-center min-h-[20px]"
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
        .swiper-pagination-custom .swiper-pagination-bullet {
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
          .swiper-pagination-custom .swiper-pagination-bullet {
            width: 10px !important;
            height: 10px !important;
            margin: 0 4px !important;
          }
        }

        .swiper-pagination-custom .swiper-pagination-bullet:hover {
          background: #9ca3af !important;
        }

        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #8a44d9 !important;
          width: 28px !important;
          border-radius: 4px !important;
        }

        @media (min-width: 640px) {
          .swiper-pagination-custom .swiper-pagination-bullet-active {
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
