import getLang from "@/src/app/[locale]/helpers/getLang";
import FaqController from "./Faq-controller";

export default async function FaqContent() {
  const lang = await getLang();

  return (
    <section>
      <FaqController lang={lang} />
    </section>
  );
}
