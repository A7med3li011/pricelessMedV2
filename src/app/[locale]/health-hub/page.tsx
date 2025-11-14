import HealthContent from "@/src/components/health-hub-dynamic/health-hub-content";
import HealthHubSkeleton from "@/src/components/health-hub/health-hub-skeleton";
import AnimatedSection from "@/src/components/ui/animated-section";
import HeadTitle from "@/src/components/ui/head-title";
import MainHeader from "@/src/components/ui/main-header";
import { Suspense } from "react";
interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
  };
}
export default function HealthHubPage({ searchParams }: PageProps) {
  // console.log(searchParams);
  return (
    <section className=" bg-gradient ">
      <section className="py-20 container">
        <AnimatedSection>
          <HeadTitle title={`Tips & Insights`} />
          <MainHeader text={`Health Hub`} />
        </AnimatedSection>
        <Suspense fallback={<HealthHubSkeleton />}>
          <HealthContent searchParams={searchParams} />
        </Suspense>
      </section>
    </section>
  );
}
