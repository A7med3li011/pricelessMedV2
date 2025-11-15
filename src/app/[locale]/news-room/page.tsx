import HealthHubSkeleton from "@/src/components/health-hub/health-hub-skeleton";
import NewsContent from "@/src/components/news-dynamic/news-content";
import AnimatedSection from "@/src/components/ui/animated-section";
import HeadTitle from "@/src/components/ui/head-title";
import MainHeader from "@/src/components/ui/main-header";
import { getTranslations } from "next-intl/server";

import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function newsRoomPage({ searchParams, params }:PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.news" });
  return (
    <section className=" bg-gradient ">
      <section className="py-20 container">
        <AnimatedSection>
          <HeadTitle title={t("title")} />
          <MainHeader text={t("subtitle")} />
        </AnimatedSection>
        <Suspense fallback={<HealthHubSkeleton />}>
          <NewsContent searchParams={searchParams} />
        </Suspense>
      </section>
    </section>
  );
}
