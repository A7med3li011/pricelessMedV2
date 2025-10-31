import Image from "next/image";
import { News } from "@/src/types/tag.types";

export default function Newcard({ data }: { data: News }) {
  return (
    <section className="group h-full flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer hover:border-blue-300">
      <section className="relative w-full h-56 overflow-hidden">
        <Image
          className="object-cover object-top object-center group-hover:scale-105 transition-transform duration-300"
          src={data?.imageUrl}
          fill
          alt={data.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </section>
      <section className="flex flex-col flex-grow p-5">
        <p className="text-xs font-medium   capitalize tracking-wider mb-2">
          Press Release
        </p>
        <h3 className="font-semibold text-base text-gray-900 leading-snug mb-3 flex-grow line-clamp-2">
          {data?.title}
        </h3>
        <p className="text-xs text-gray-500 font-medium">{data?.date}</p>
      </section>
    </section>
  );
}
