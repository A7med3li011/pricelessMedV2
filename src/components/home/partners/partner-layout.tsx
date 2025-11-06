import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";
import PartnerContent from "./partner-content";

export default function PartnerLayout({ t }) {
  return (
    <section className="container">
      <section className="text-center w-2/3 md:w-6/12 mx-auto">
        <HeadTitle title={t("partner.title")} />

        <MainHeader text={t("partner.subtitle")} />
      </section>
      <Suspense>
        <PartnerContent />
      </Suspense>
    </section>
  );
}
