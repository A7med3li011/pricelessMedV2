import { getBlogsDynamic } from "@/src/app/actions/home.action";
import HealthBanner from "./health-banner";

import HealthGridAnimated from "./health-grid-animated";
import AnimatedSection from "../ui/animated-section";
import Pagination from "../ui/pagination";
import { PaginationProvider } from "../providers/pagination-provider";
import HealthHubSkeleton from "./health-hub-skeleton";
// import Pagination from "../ui/pagination";

export default async function HealthGrid({
  lang,
  page,
  pageLimit,
}: {
  lang: string;
  page: number;
  pageLimit: number;
}) {
  console.log(page, pageLimit);
  const res = await getBlogsDynamic(lang, page, pageLimit);
  if (!res.success || !res.data) {
    return (
      <section className="text-center py-10">
        <p className="text-red-500">
          {res.error?.message || "Something went wrong while loading Service"}
        </p>
      </section>
    );
  }

  if (res.data.length === 0) {
    return (
      <section className="text-center py-10">
        <p className="text-gray-500">No blogs available</p>
      </section>
    );
  }

  // console.log(res.pagination);

  return (
    <section>
      <PaginationProvider alternative={<HealthHubSkeleton />}>
        <AnimatedSection animation="slideLeft" duration={0.9}>
          <HealthBanner data={res.data[res.data.length - 1]} />
        </AnimatedSection>
        <AnimatedSection animation="slideLeft">
          <HealthGridAnimated data={res.data} />
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
