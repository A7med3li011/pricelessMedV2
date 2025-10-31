import { getBlogs, getHospitalService } from "@/src/app/actions/home.action";

import BlogsSlider from "./blogs-slider";

export default async function BlogsGrid({ lang }: { lang: string }) {
  const res = await getBlogs(lang);
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
        <p className="text-gray-500">No Service available</p>
      </section>
    );
  }

  return (
    <section className="">
      <BlogsSlider data={res?.data} />
    </section>
  );
}
