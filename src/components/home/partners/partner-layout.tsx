import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";
import PartnerContent from "./partner-content";

export default function PartnerLayout() {
  return (
    <section className="container">
      <section className="text-center w-2/3 md:w-6/12 mx-auto">
        <HeadTitle title={`Most trusted hospitals`} />

        <MainHeader
          text={`Discover our network of trusted hospital partners `}
        />
      </section>
      <Suspense>
        <PartnerContent />
      </Suspense>
    </section>
  );
}
