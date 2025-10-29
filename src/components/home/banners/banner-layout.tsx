import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";
import BannerContent from "./banner-content";
import { BannerSliderSkeleton } from "./tag-skeleton";

export default function BannerLayout() {
  return (
    <section className=" bg-gradient py-20">
      <section className="text-center">
        <HeadTitle title={`Special deals`} />
        <MainHeader text={`Special deals`} />
      </section>
      <Suspense fallback={<BannerSliderSkeleton />}>
        <BannerContent />
      </Suspense>
    </section>
  );
}
