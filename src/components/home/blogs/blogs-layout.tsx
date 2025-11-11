import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";

import BlogsContent from "./blogs-content";

export default function BlogsLayOut({ t }) {
  return (
    <section className="bg-gradient py-20 mb-10">
      <section className="container">
        <section className="">
          <HeadTitle title={t("blogs.title")} />
          <MainHeader text={t("blogs.subtitle")} />
        </section>
        <Suspense>
          <BlogsContent />
        </Suspense>
      </section>
    </section>
  );
}
