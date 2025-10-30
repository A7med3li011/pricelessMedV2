import { getPopularService } from "@/src/app/actions/home.action";
import PopularSlider from "./popular-slider";

export default async function BannerGrid({ lang }: { lang: string }) {
  const res = await getPopularService(lang);
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
      <PopularSlider data={res?.data} />
    </section>
  );
}
