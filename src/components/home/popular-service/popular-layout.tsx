import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";
import PopularContent from "./populart-content";

export default function PopularLayout() {
  return (
    <section className="bg-gradient py-20 mb-10">
      <section className="container">
        <section className="">
          <HeadTitle title={`BEST DEALS`} />
          <MainHeader text={`Popular healthcare services`} />
        </section>
        <Suspense>
          <PopularContent />
        </Suspense>
      </section>
    </section>
  );
}
