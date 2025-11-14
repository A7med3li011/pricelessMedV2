import HealthContent from "@/src/components/health-hub-dynamic/health-hub-content";
import HealthHubSkeleton from "@/src/components/health-hub/health-hub-skeleton";
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

export default async function HealthHubPage({
  searchParams,
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.blogs" });

  return (
    <section className=" bg-gradient ">
      <section className="py-20 container">
        <AnimatedSection>
          <HeadTitle title={t("title")} />
          <MainHeader text={t("subtitle")} />
        </AnimatedSection>
        <Suspense fallback={<HealthHubSkeleton />}>
          <HealthContent searchParams={searchParams} />
        </Suspense>
      </section>
    </section>
  );
}
