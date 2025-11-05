import getLang from "@/src/app/[locale]/helpers/getLang";

import HospitalGrid from "./hospital-grid";

export default async function HospitalContent() {
  const lang = await getLang();
  return (
    <section>
      <HospitalGrid lang={lang} />
    </section>
  );
}
