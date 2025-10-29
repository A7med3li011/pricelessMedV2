import { getTags } from "@/src/app/actions/home.action";
import TagCard from "./tag-card";
import { Tag } from "@/src/types/tag.types";

export default async function TagGrid({ lang }: { lang: string }) {
  const res = await getTags(lang);

  if (!res.success || !res.data) {
    return (
      <section className="text-center py-10">
        <p className="text-red-500">
          {res.error?.message || "Something went wrong while loading tags"}
        </p>
      </section>
    );
  }

  if (res.data.length === 0) {
    return (
      <section className="text-center py-10">
        <p className="text-gray-500">No tags available</p>
      </section>
    );
  }

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container gap-5 my-10">
      {res.data.map((ele: Tag, index: number) => (
        <li
          key={ele.id || index}
          className="bg-white py-3 px-3  rounded-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-md "
        >
          <TagCard data={ele} />
        </li>
      ))}
    </ul>
  );
}
