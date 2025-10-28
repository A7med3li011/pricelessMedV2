import { getTags } from "@/src/app/actions/home.action";
import TagCard from "./tag-card";
import { Tag } from "@/src/types/tag.types";

export default async function TagGrid() {
  const res = await getTags("en");

  console.log(res);
  if (!res?.success) {
    return <section>SomeThing Went Wrong ....!</section>;
  }

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 containter gap-5 my-10">
      {res?.data?.data?.map((ele: Tag, index: number) => (
        <li key={index} className="bg-white py-3 px-3  rounded-lg">
          <TagCard data={ele} />
        </li>
      ))}
    </ul>
  );
}
