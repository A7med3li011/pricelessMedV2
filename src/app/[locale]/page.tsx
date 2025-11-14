import Image from "next/image";
import mainImage from "@/public/assets/home/main_home.png";
import type { Metadata } from "next";

import Link from "next/link";
import HomeSearch from "../../components/home/home-search";
import Works from "../../components/home/works";
import SavingHome from "../../components/home/save-home";
import ContantSales from "../../components/home/contact-sales";
import HomeSlider from "../../components/home/home-slider";
import { Suspense } from "react";
import Tags from "../../components/home/tags/tags-layout";
import BannerLayout from "../../components/home/banners/banner-layout";

import PopularLayout from "../../components/home/popular-service/popular-layout";
import HospitalLayOut from "../../components/home/new-hospitals-clinics/hospital-layout";
import MapLayout from "../../components/home/map/map-layout";
import FaqLauout from "../../components/home/Faq/faq-layout";

import NewsLayout from "../../components/home/new/news-layout";
import ServiceGrid from "../../components/home/services/service-grid";
import BlogsLayOut from "../../components/home/blogs/blogs-layout";
import PartnerLayout from "../../components/home/partners/partner-layout";
import { getTranslations } from "next-intl/server";
import { createPageMetadata } from "@/src/utils/createPageMetadata";

export const generateMetadata = createPageMetadata("home");
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
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
            {t("hero.title")}
          </h1>
          <p className="leading-7 my-5 lg:my-7">{t("hero.description")}</p>

          <section className="flex items-center gap-x-5">
            <Link
              href={"/"}
              className="py-2 px-3 rounded-full bg-white text-[#13ACFC]  border-[2px] border-white text-sm font-semibold"
            >
              {t("hero.joinToday")}
            </Link>
            <Link
              href={"/"}
              className="py-2 px-3 rounded-full bg-transparent text-white border-[2px] border-white  text-sm font-semibold"
            >
              {t("hero.browseServices")}
            </Link>
          </section>
        </section>
      </section>

      <HomeSearch />
      <Works t={t} />
      <BannerLayout t={t} />
      <ServiceGrid t={t} />


      <Suspense fallback={<div className="py-20 my-10 bg-gradient" />}>
        <Tags t={t} />
      </Suspense>
      <PartnerLayout t={t} />
      <PopularLayout t={t} />

      <MapLayout />
      <HospitalLayOut t={t} />
      <NewsLayout t={t} />
      {/* <HospitalLayOut /> */}
      <BlogsLayOut t={t} />
      <FaqLauout t={t} />
      <SavingHome t={t} />
      <ContantSales t={t} />
      <Suspense
        fallback={
          <div className="py-20 bg-[linear-gradient(258.69deg,rgba(237,236,247,0.5)_-0.13%,rgba(218,242,255,0.5)_95.76%)]" />
        }
      >
        <HomeSlider />
      </Suspense>
    </section>
  );
}
