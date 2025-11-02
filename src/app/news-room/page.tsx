import HealthContent from "@/src/components/health-hub/health-hub-content";
import NewsContent from "@/src/components/news/news-content";
import AnimatedSection from "@/src/components/ui/animated-section";
import HeadTitle from "@/src/components/ui/head-title";
import MainHeader from "@/src/components/ui/main-header";
import { Suspense } from "react";

export default function newsRoomPage() {
  return (
    <section className=" bg-gradient ">
      <section className="py-20 container">
        <AnimatedSection>
          <HeadTitle title={`Latest updates`} />
          <MainHeader text={`Newsroom`} />
        </AnimatedSection>
        <Suspense>
          <NewsContent />
        </Suspense>
      </section>
    </section>
  );
}
