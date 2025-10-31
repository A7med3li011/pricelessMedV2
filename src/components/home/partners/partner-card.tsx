import Image from "next/image";
import { Partner } from "@/src/types/tag.types";

export default function PartnterCard({ data }: { data: Partner }) {
  return (
    <section className="px-3 py-2 my-2">
      <section className="h-[100px] relative w-6/12 mx-auto grayscale hover:grayscale-0 transition-all duration-300 ">
        <Image
          src={data?.imageUrl}
          fill
          alt={data?.organization}
          className="object-contain"
        />
      </section>
    </section>
  );
}
