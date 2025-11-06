import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import TagGrid from "./tag-grid";
import { cookies } from "next/headers";
import { TagGridSkeleton } from "./tag-skeleton";

export default async function Tags({ t }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";

  return (
    <section className="py-20 my-10 bg-gradient">
      <section className="text-center  sm:w-2/3 mx-auto px-10">
        <HeadTitle title={t("tags.subtitle")} />
        <section>
          <p className="font-bold text-xl md:text-3xl  md:tracking-[-1.5%] mb-3 mt-5">
            {t("tags.line1")}
          </p>
          <p className="font-bold text-xl md:text-3xl  md:tracking-[-1.5%] mb-3">
            {t("tags.line2")}
          </p>
        </section>
      </section>

      <Suspense fallback={<TagGridSkeleton />}>
        <TagGrid lang={lang} />
      </Suspense>
    </section>
  );
}
