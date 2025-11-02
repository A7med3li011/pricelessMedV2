import { LatestNews } from "@/src/app/actions/home.action";

import AnimatedSection from "../ui/animated-section";
import NewsBanner from "./news-banner";
import NewsGridAnimated from "./news-grid-animated";

export default async function NewsGrid({ lang }: { lang: string }) {
  const res = await LatestNews(lang);
  if (!res.success || !res.data) {
    return (
      <section className="text-center py-10">
        <p className="text-red-500">
          {res.error?.message || "Something went wrong while loading Service"}
        </p>
      </section>
    );
  }

  if (res.data.length === 0) {
    return (
      <section className="text-center py-10">
        <p className="text-gray-500">No blogs available</p>
      </section>
    );
  }

  return (
    <section>
      <AnimatedSection animation="slideLeft" duration={0.9}>
        <NewsBanner data={res.data[res.data.length - 1]} />
      </AnimatedSection>
      <NewsGridAnimated data={res.data} />
      {/* </ul> */}
    </section>
  );
}
