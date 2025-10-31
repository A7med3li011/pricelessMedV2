import { getPartners } from "@/src/app/actions/home.action";
import PartnterCard from "./partner-card";

export default async function PartnerGrid({ lang }: { lang: string }) {
  const res = await getPartners(lang);
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
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {res.data.map((ele, index) => (
        <li className="" key={index}>
          <PartnterCard data={ele} />
        </li>
      ))}
    </ul>
  );
}
