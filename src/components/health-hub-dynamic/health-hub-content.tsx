import getLang from "@/src/app/[locale]/helpers/getLang";
import HealthGrid from "./health-grid";
import { Suspense } from "react";

export default async function HealthContent({ searchParams }) {
  const lang = await getLang();
  const { page, pageLimit } = await searchParams;
  console.log(page, pageLimit);
  return (
    <section className="mt-10">
      <HealthGrid lang={lang} page={page} pageLimit={pageLimit} />
    </section>
  );
}
