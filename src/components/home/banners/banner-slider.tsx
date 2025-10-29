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
                <section className="relative w-full  h-[500px] bg-amber-300 rounded-lg overflow-hidden">
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
      </section>
    </section>
  );
}
