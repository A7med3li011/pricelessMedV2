import { getHospitalService } from "@/src/app/actions/home.action";

import HospitalSlider from "./hospital-slider";

export default async function HospitalGrid({ lang }: { lang: string }) {
  const res = await getHospitalService(lang);
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
      <HospitalSlider data={res?.data} />
    </section>
  );
}
