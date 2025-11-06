import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";
import FaqContent from "./faq-content";
import { Link } from "@/src/i18n/navigation";

export default function FaqLauout({ t }) {
  return (
    <section>
      <section className="text-center w-2/3 md:w-6/12 mx-auto">
        <HeadTitle title={t("faq.title")} />

        <MainHeader text={t("faq.subtitle")} />
      </section>
      <Suspense fallback={<p>loadfing</p>}>
        <FaqContent />
      </Suspense>

      <section className="text-center mx-auto w-1/3 font-semibold mt-10">
        <p className=" tracking-[-0.2px] font-semibold">
          {" "}
          {t("faq.moreQuestions")}
        </p>
        <Link
          href={`/contact-us`}
          className="text-[#13ACFC] py-2  px-3  block w-fit mx-auto my-7 hover:bg-[#13ACFC] hover:text-white  transition-colors duration-500 hover:border-white border-[1px] border-[#13ACFC] rounded-full text-sm"
        >
          {t("faq.contact")}
        </Link>
      </section>
    </section>
  );
}
