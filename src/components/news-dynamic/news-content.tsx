import getLang from "@/src/app/[locale]/helpers/getLang";
import NewsGrid from "./news-grid";

interface NewsContentProps {
  searchParams: Promise<{
    page?: string;
    pageLimit?: string;
  }>;
}

export default async function NewsContent({ searchParams }: NewsContentProps) {
  const lang = await getLang();
  const { page, pageLimit } = await searchParams;

  return (
    <section className="mt-10">
      <NewsGrid
        lang={lang}
        page={page ? parseInt(page) : 1}
        pageLimit={pageLimit ? parseInt(pageLimit) : 8}
      />
    </section>
  );
}
