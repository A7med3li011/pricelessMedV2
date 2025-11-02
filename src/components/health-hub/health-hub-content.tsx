import getLang from "@/src/app/helpers/getLang";
import HealthGrid from "./health-grid";
import { Suspense } from "react";

export default async function HealthContent() {
  const lang = await getLang();

  return (
    <section className="mt-10">
      <HealthGrid lang={lang} />
    </section>
  );
}
