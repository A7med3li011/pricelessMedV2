import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";
import BannerContent from "./banner-content";
import { BannerSliderSkeleton } from "./tag-skeleton";

export default function BannerLayout({ t }) {
  return (
    <section className=" bg-gradient py-20">
      <section className="text-center">
        <HeadTitle title={t("banner.title")} />
        <MainHeader text={t("banner.title")} />
      </section>
      <Suspense fallback={<BannerSliderSkeleton />}>
        <BannerContent />
      </Suspense>
    </section>
  );
}
