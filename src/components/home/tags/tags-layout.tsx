import { Suspense } from "react";
import HeadTitle from "../../ui/head-title";
import TagGrid from "./tag-grid";

export default function Tags() {
  return (
    <section className="py-20 my-10 bg-gradient">
      <section className="text-center  sm:w-2/3 mx-auto px-10">
        <HeadTitle title={"FOR EVERY NEED"} />
        <section>
          <p className="font-bold text-xl md:text-3xl  md:tracking-[-1.5%] mb-3 mt-5">
            Comprehensive care from
          </p>
          <p className="font-bold text-xl md:text-3xl  md:tracking-[-1.5%] mb-3">
            checkups to specialized treatment
          </p>
        </section>
      </section>

      <Suspense>
        <TagGrid />
      </Suspense>
    </section>
  );
}
