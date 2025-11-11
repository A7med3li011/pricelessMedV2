import ContactForm from "@/src/components/contact-us/contact-form";
import FaqSkeleton from "@/src/components/contact-us/faq-skeleton";
import FaqContent from "@/src/components/home/Faq/faq-content";
import HeadTitle from "@/src/components/ui/head-title";
import MainHeader from "@/src/components/ui/main-header";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function contactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return (
    <section className="">
      <section className="bg-gradient py-20">
        <section className="container ">
          <section className="text-center w-2/3 md:w-6/12 mx-auto">
            <HeadTitle title={t("title")} />

            <MainHeader text={t("description")} />
          </section>
          <Suspense fallback={<FaqSkeleton />}>
            <FaqContent />
          </Suspense>
        </section>
      </section>
      <section>
        <section className="bg-white py-20 container">
          <section className="text-center w-2/3 md:w-6/12 mx-auto">
            <HeadTitle title={t("title")} />

            <MainHeader text={t("subtitle")} />
          </section>
          <p className="text-center mb-1 text-sm text-[#717678] tracking-[0px]">
            {t("description2")}
          </p>
          <p className="text-center text-sm text-[#717678] tracking-[0px]">
            {t("description3")}
          </p>

          <ContactForm />
        </section>
      </section>
    </section>
  );
}
