import { getBanners } from "@/src/app/actions/home.action";
import BannerSlider from "./banner-slider";

export default async function BannerGrid({ lang }: { lang: string }) {
  const res = await getBanners(lang);
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
    <section>
      <BannerSlider data={res?.data} />
    </section>
  );
}
