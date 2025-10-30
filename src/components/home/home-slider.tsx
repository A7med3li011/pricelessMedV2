"use client";
import Image from "next/image";
import womenImage from "../../../public/assets/home/Photo.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  return (
    <section className="py-20 bg-gradient">
      <section className="container  h-full ">
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
            el: ".swiper-pagination-custom",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="testimonial-slider mb-8"
        >
          {data.map((testimonial, index) => (
            <SwiperSlide key={index}>
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation and Pagination */}
        <div className="flex items-center justify-center gap-6 mt-6 w-1/3 mx-auto">
          <button className="swiper-button-prev-custom w-10 h-10 rounded-full transition-colors flex items-center justify-center text-black cursor-pointer">
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

          <div
            className="swiper-pagination-custom flex-1 flex items-center justify-center min-h-[20px]"
            suppressHydrationWarning
          ></div>

          <button className="swiper-button-next-custom w-10 h-10 rounded-full transition-colors flex items-center justify-center text-black cursor-pointer">
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

      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
          margin: 0 4px !important;
        }

        .swiper-pagination-custom .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.7) !important;
        }

        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #b58b7b !important;
          width: 32px !important;
          border-radius: 5px !important;
        }

        .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
}
