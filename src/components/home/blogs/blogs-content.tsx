import getLang from "@/src/app/helpers/getLang";

import BlogsGrid from "./blogs-grid";

export default async function BlogsContent() {
  const lang = await getLang();
  return (
    <section>
      <BlogsGrid lang={lang} />
    </section>
  );
}
