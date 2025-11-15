import { getNewsDynamic } from "@/src/app/actions/home.action";
import { getTranslations } from "next-intl/server";

import AnimatedSection from "../ui/animated-section";
import NewsBanner from "./news-banner";
import NewsGridAnimated from "./news-grid-animated";
import { PaginationProvider } from "../providers/pagination-provider";
import HealthHubSkeleton from "../health-hub-dynamic/health-hub-skeleton";
import Pagination from "../ui/pagination";

export default async function NewsGrid({
  lang,
  page,
  pageLimit,
}: {
  lang: string;
  page: number;
  pageLimit: number;
}) {
  const t = await getTranslations({ locale: lang, namespace: "home.news" });
  const res = await getNewsDynamic(lang,page,pageLimit);
  if (!res.success || !res.data) {
    return (
      <section className="text-center py-10">
        <p className="text-red-500">
          {res.error?.message || t("error")}
        </p>
      </section>
    );
  }

  if (res.data.length === 0) {
    return (
      <section className="text-center py-10">
        <p className="text-gray-500">{t("noNews")}</p>
      </section>
    );
  }

  return (
    <section>
      <PaginationProvider alternative={<HealthHubSkeleton />}>
        <AnimatedSection animation="slideLeft" duration={0.9}>
          <NewsBanner data={res.data[res.data.length - 1]} pressRelease={t("pressRelease")} />
        </AnimatedSection>
        <AnimatedSection animation="fade">
          <NewsGridAnimated data={res.data} pressRelease={t("pressRelease")} />
        </AnimatedSection>
        <Pagination
          page={res.pagination?.currentPage}
          pageLimit={8}
          totalRecords={res?.pagination?.totalRecords || 0}
          totalPages={res?.pagination?.totalPages}
        />
      </PaginationProvider>
    </section>
  );
}
