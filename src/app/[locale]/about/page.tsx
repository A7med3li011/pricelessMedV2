import HeadTitle from "@/src/components/ui/head-title";
import MainHeader from "@/src/components/ui/main-header";

import { getTranslations } from "next-intl/server";
import reciption from "../../../../public/assets/home/network.png";
import Image from "next/image";
import Building from "@/src/components/about/building";
import Team from "@/src/components/about/team";
import AnimatedSection from "@/src/components/ui/animated-section";
import NewsLayout from "@/src/components/home/new/news-layout";

export default async function aboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section>
      <section className="container text-center pt-15 ">
        <AnimatedSection className=" max-w-4xl mx-auto">
          <HeadTitle title={t("vision")} />
          <MainHeader text={t("mainHeader")} />
          <p className="w-full mx-auto  text-[#717678] text-sm leading-6 tracking-[0px]">
            {t("subHeader")}
          </p>
          <section className="relative w-full h-[400px] mt-10">
            <Image
              priority
              src={reciption}
              alt="reciption"
              fill
              className=" object-center object-cover"
            />
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade">
          <Building t={t} />
        </AnimatedSection>

        
        <AnimatedSection animation="scale">
          <Team t={t} />
        </AnimatedSection>
      </section>
      <section className=" bg-gradient">
        <NewsLayout t={t} />
      </section>
    </section>
  );
}
