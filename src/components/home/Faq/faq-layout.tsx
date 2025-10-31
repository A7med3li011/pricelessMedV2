import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";
import FaqContent from "./faq-content";
import CustomButton from "../../ui/customButton";

export default function FaqLauout() {
  return (
    <section>
      <section className="text-center w-2/3 md:w-6/12 mx-auto">
        <HeadTitle title={`Frequently Asked Questions`} />

        <MainHeader
          text={`Everything you need to know about saving on healthcare `}
        />
      </section>
      <Suspense fallback={<p>loadfing</p>}>
        <FaqContent />
      </Suspense>

      <section className="text-center mx-auto w-1/3 font-semibold mt-10">
        <p className=" tracking-[-0.2px] font-semibold">Have more questions?</p>
        <CustomButton
          text={`Contact us`}
          style={`text-[#13ACFC] py-2  px-3  my-7 border-[1px] border-[#13ACFC] rounded-full text-sm`}
        />
      </section>
    </section>
  );
}
