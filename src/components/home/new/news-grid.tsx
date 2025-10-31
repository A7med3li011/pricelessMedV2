import { LatestNews } from "@/src/app/actions/home.action";
import Newcard from "./news-card";

export default async function NewsGrid({ lang }: { lang: string }) {
  const res = await LatestNews(lang);
  if (!res.success || !res.data) {
    return (
      <section className="text-center py-10">
        <p className="text-red-500">
          {res.error?.message || "Something went wrong while loading News"}
        </p>
      </section>
    );
  }

  if (res.data.length === 0) {
    return (
      <section className="text-center py-10">
        <p className="text-gray-500">No Service available</p>
      </section>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {res.data.map((ele, index) => (
        <li key={index}>
          <Newcard data={ele} />
        </li>
      ))}
    </ul>
  );
}
