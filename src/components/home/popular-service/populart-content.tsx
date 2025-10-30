import getLang from "@/src/app/helpers/getLang";
import PopularGrid from "./popular-grid";

export default async function PopularContent() {
  const lang = await getLang();
  return (
    <section>
      <PopularGrid lang={lang} />
    </section>
  );
}
