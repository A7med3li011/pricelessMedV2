import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";
import NewsContent from "./news-content";
import CustomButton from "../../ui/customButton";

export default function NewsLayout({ t }) {
  return (
    <section className="container py-15 my-10">
      <HeadTitle title={t("news.title")} />
      <MainHeader text={t("news.subtitle")} />

      <Suspense fallback={<div>loading </div>}>
        <NewsContent />
      </Suspense>
      <CustomButton
        text={t("news.button")}
        style={`text-[#13ACFC] py-2  px-3  my-7 border-[1px] border-[#13ACFC] rounded-full text-sm block mx-auto w-fit`}
      />
    </section>
  );
}
