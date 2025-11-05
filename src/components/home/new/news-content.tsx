import getLang from "@/src/app/[locale]/helpers/getLang";
import NewsGrid from "./news-grid";

export default async function NewsContent() {
  const lang = await getLang();

  return (
    <section className="mb-20">
      <NewsGrid lang={lang} />
    </section>
  );
}
