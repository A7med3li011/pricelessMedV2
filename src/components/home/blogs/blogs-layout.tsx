import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import MainHeader from "../../ui/main-header";

import BlogsContent from "./blogs-content";

export default function BlogsLayOut() {
  return (
    <section className="bg-gradient py-20 mb-10">
      <section className="container">
        <section className="">
          <HeadTitle title={`Tips & Insights`} />
          <MainHeader text={`Health Hub`} />
        </section>
        <Suspense>
          <BlogsContent />
        </Suspense>
      </section>
    </section>
  );
}
