import HealthContent from "@/src/components/health-hub/health-hub-content";
import AnimatedSection from "@/src/components/ui/animated-section";
import HeadTitle from "@/src/components/ui/head-title";
import MainHeader from "@/src/components/ui/main-header";
import { Suspense } from "react";

export default function HealthHubPage() {
  return (
    <section className=" bg-gradient ">
      <section className="py-20 container">
        <AnimatedSection>
          <HeadTitle title={`Tips & Insights`} />
          <MainHeader text={`Health Hub`} />
        </AnimatedSection>
        <Suspense>
          <HealthContent />
        </Suspense>
      </section>
    </section>
  );
}
