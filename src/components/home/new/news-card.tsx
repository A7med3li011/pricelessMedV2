import Image from "next/image";
import { News } from "@/src/types/tag.types";

export default function Newcard({ data }: { data: News }) {
  return (
    <section className=" shadow-xs rounded-md border-[1px] border-[#DDDDDD] rounded-md  overflow-hidden  cursor-pointer">
      <section className="relative w-full h-56">
        <Image
          className=" aspect-square   object-cover object-top  "
          src={data?.imageUrl}
          fill
          alt={data.title}
        />
      </section>
      <section className="py-3  px-3">
        <p className="text-xs font-light">Press Release</p>
        <p className="font-semibold text-sm h-15 py-3 ">
          {data?.title.slice(0, 30)}...
        </p>
        <p className="text-xs text-[#717678]">{data?.date}</p>
      </section>
    </section>
  );
}
