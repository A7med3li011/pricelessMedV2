import getLang from "@/src/app/[locale]/helpers/getLang";
import HealthGrid from "./health-grid";

export default async function HealthContent() {
  const lang = await getLang();

  return (
    <section className="mt-10">
      <HealthGrid lang={lang} />
    </section>
  );
}
