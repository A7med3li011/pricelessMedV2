import getLang from "@/src/app/[locale]/helpers/getLang";
import HealthGrid from "./health-grid";

export default async function HealthContent({ searchParams }) {
  const lang = await getLang();
  const { page, pageLimit } = await searchParams;

  return (
    <section className="mt-10">
      <HealthGrid lang={lang} page={page} pageLimit={pageLimit} />
    </section>
  );
}
