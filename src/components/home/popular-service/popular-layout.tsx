import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";
import PopularContent from "./populart-content";

export default function PopularLayout({ t }) {
  return (
    <section className="bg-gradient py-20 mb-10">
      <section className="container">
        <section>
          <HeadTitle title={t("popular.title")} />
          <MainHeader text={t("popular.subtitle")} />
        </section>

        <Suspense>
          <PopularContent />
        </Suspense>
      </section>
    </section>
  );
}
