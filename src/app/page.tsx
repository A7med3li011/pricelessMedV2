import Image from "next/image";
import mainImage from "../../public/assets/home/main_home.png";
import type { Metadata } from "next";

import Link from "next/link";
import HomeSearch from "../components/home/home-search";
import Works from "../components/home/works";
import SavingHome from "../components/home/save-home";
import ContantSales from "../components/home/contact-sales";
import HomeSlider from "../components/home/home-slider";
import { Suspense } from "react";
import Tags from "../components/home/tags/tags-layout";
import BannerLayout from "../components/home/banners/banner-layout";

import PopularLayout from "../components/home/popular-service/popular-layout";
import HospitalLayOut from "../components/home/new-hospitals-clinics/hospital-layout";
import MapLayout from "../components/home/map/map-layout";
import FaqLauout from "../components/home/Faq/faq-layout";
import LanguageButton from "../components/ui/test";
import NewsLayout from "../components/home/new/news-layout";
import ServiceGrid from "../components/home/services/service-grid";
import BlogsLayOut from "../components/home/blogs/blogs-layout";
import PartnerLayout from "../components/home/partners/partner-layout";

export const metadata: Metadata = {
  title: "PriceLess Med - Save AED 3,000+ on Healthcare | Affordable Medical Services in UAE",
  description:
    "Say goodbye to costly healthcare in UAE. Save over AED 3,000 annually on medical checkups, specialist care, hospital services, and treatments. Browse services from trusted healthcare partners across Dubai, Abu Dhabi, and UAE. Join today and start saving!",
  keywords: [
    "affordable healthcare UAE",
    "medical cost savings",
    "cheap doctor Dubai",
    "healthcare discounts UAE",
    "hospital offers Dubai",
    "medical checkup deals",
    "specialist appointments UAE",
    "preventive care savings",
    "Dubai clinics",
    "Abu Dhabi hospitals",
  ],
  openGraph: {
    title: "Say goodbye to costly healthcare - Save AED 3,000+ annually",
    description:
      "Save over AED 3,000+ annually on everything from checkups to specialist care in UAE. Browse trusted healthcare services and join today.",
    type: "website",
    url: "https://pricelessmed.com",
    images: [
      {
        url: "/assets/home/main_home.png",
        width: 1200,
        height: 630,
        alt: "PriceLess Med - Affordable Healthcare Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Say goodbye to costly healthcare - Save AED 3,000+ annually",
    description:
      "Save over AED 3,000+ annually on everything from checkups to specialist care in UAE.",
    images: ["/assets/home/main_home.png"],
  },
  alternates: {
    canonical: "https://pricelessmed.com",
  },
};

export default async function Home() {
  return (
    <section className="">
      <section className="relative h-screen  md:rounded-md overflow-hidden sm:container ">
        <Image
          src={mainImage}
          // quality={100}
          alt="Main home background"
          fill
          className="object-cover object-center "
          priority
          placeholder="blur"
        />
        <section className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#222222]/40 w-full"></section>

        <section className="  relative  z-40  top-3/5 text-white ps-5 md:ps-10  2xl:w-1/3">
          <h1 className="font-bold text-xl md:text-3xl lg:text-5xl lg: lg:leading-14 lg:tracking-[-1.5px] tracking-wide ">
            Say goodbye to costly healthcare
          </h1>
          <p className="leading-7 my-5 lg:my-7">
            Save AED 3,000+ annually on everything from checkups to specialist
            care.
          </p>

          <section className="flex items-center gap-x-5">
            <Link
              href={"/"}
              className="py-2 px-3 rounded-full bg-white text-[#13ACFC]  border-[2px] border-white text-sm font-semibold"
            >
              Join today
            </Link>
            <Link
              href={"/"}
              className="py-2 px-3 rounded-full bg-transparent text-white border-[2px] border-white  text-sm font-semibold"
            >
              Browse services
            </Link>
          </section>
        </section>
      </section>

      <HomeSearch />
      <Works />
      <BannerLayout />
      <ServiceGrid />
      <Suspense fallback={<div className="py-20 my-10 bg-gradient" />}>
        <Tags />
      </Suspense>
      <PartnerLayout />
      <PopularLayout />

      <MapLayout />
      <HospitalLayOut />
      <NewsLayout />
      <HospitalLayOut />
      <BlogsLayOut />
      <FaqLauout />
      <SavingHome />
      <ContantSales />
      <Suspense
        fallback={
          <div className="py-20 bg-[linear-gradient(258.69deg,rgba(237,236,247,0.5)_-0.13%,rgba(218,242,255,0.5)_95.76%)]" />
        }
      >
        <HomeSlider />
      </Suspense>

      {/* <LanguageButton /> */}
    </section>
  );
}
