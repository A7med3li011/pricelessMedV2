import { getBlogs } from "@/src/app/actions/home.action";
import HealthBanner from "./health-banner";
import HealthCard from "./health-card";
import HealthGridAnimated from "./health-grid-animated";
import AnimatedSection from "../ui/animated-section";

export default async function HealthGrid({ lang }: { lang: string }) {
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
        <p className="text-gray-500">No blogs available</p>
      </section>
    );
  }

  return (
    <section>
      <AnimatedSection animation="slideLeft" duration={0.9}>
        <HealthBanner data={res.data[res.data.length - 1]} />
      </AnimatedSection>
      <HealthGridAnimated data={res.data} />
      {/* </ul> */}
    </section>
  );
}
