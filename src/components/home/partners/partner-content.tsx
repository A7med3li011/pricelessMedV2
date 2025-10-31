import getLang from "@/src/app/helpers/getLang";

import PartnerGrid from "./partner-grid";
export default async function PartnerContent() {
  const lang = await getLang();

  return (
    <section className="mb-20">
      <PartnerGrid lang={lang} />
    </section>
  );
}
