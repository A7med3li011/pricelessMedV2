import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";

import HospitalContent from "./hospital-content";

export default function HospitalLayOut({ t }) {
  return (
    <section className="bg-gradient py-20 mb-10">
      <section className="container">
        <section className="">
          <HeadTitle title={t("hospital.title")} />
          <MainHeader text={t("hospital.subtitle")} />
        </section>
        <Suspense>
          <HospitalContent />
        </Suspense>
      </section>
    </section>
  );
}
