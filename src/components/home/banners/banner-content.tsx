import getLang from "@/src/app/helpers/getLang";
import BannerGrid from "./banner.grid";

export default async function BannerContent() {
  const lang = await getLang();
  return (
    <section className="container">
      <BannerGrid lang={lang} />
    </section>
  );
}
