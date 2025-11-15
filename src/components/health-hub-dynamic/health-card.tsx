import Image from "next/image";
// import { motion } from "framer-motion";
import { Link } from "@/src/i18n/navigation";

import placeHolder from "../../../public/assets/place-holder.svg";
interface BlogData {
  imageUrl: string;
  title: string;
  date: string;
  _id: string;
}

interface HealthCardProps {
  data: BlogData;
}

export default function HealthCard({ data }: HealthCardProps) {
  return (
    <Link href={"/"}>
      <section className="cursor-pointer group">
        <section className="relative w-full h-52 overflow-hidden rounded-lg">
          <Image
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            src={data?.imageUrl || placeHolder}
            alt={data?.title}
            fill
            // onError={handleImageError}
          />
        </section>
        <section className="px-3 py-2 bg-white transition-all duration-300 group-hover:translate-y-[-2px]">
          <p className="font-normal text-sm mb-1 text-[#8A44D9]">Blogs</p>
          <p className="font-semibold text-[15px] mb-3 leading-6 tracking-[-0.2px] h-13 transition-colors duration-300 group-hover:text-[#8A44D9]">
            {data?.title.slice(0, 50)}...
          </p>
          <p className="text-xs text-[#717678] pb-2">{data?.date}</p>
        </section>
      </section>
    </Link>
  );
}
