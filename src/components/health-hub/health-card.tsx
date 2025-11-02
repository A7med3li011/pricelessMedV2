"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogData {
  imageUrl: string;
  title: string;
  date: string;
}

interface HealthCardProps {
  data: BlogData;
}

export default function HealthCard({ data }: HealthCardProps) {
  return (
    <motion.section
      className=" cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <section className=" relative w-full h-52 overflow-hidden">
        <Image
          className=" object-cover object-center "
          src={data?.imageUrl}
          alt={data?.title}
          fill
        />
      </section>
      <section className="px-3 py-2 bg-white ">
        <p className="font-normal text-sm mb-1">Blogs</p>
        <p className="font-semibold text-[15px] mb-3 leading-6 tracking-[-0.2px] h-13 ">
          {data?.title.slice(0, 50)}...
        </p>
        <p className="text-xs text-[#717678] pb-2">{data?.date}</p>
      </section>
    </motion.section>
  );
}
