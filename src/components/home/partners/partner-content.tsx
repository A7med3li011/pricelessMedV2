import getLang from "@/src/app/[locale]/helpers/getLang";

import PartnerGrid from "./partner-grid";
export default async function PartnerContent() {
  const lang = await getLang();

  return (
    <section className="my-20">
      <PartnerGrid lang={lang} />
    </section>
  );
}
