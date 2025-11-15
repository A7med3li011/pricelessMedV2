"use client";
import Image from "next/image";
import { Partner } from "@/src/types/tag.types";
import { useState } from "react";
import placeHolder from "../../../../public/assets/place-holder.svg";

export default function PartnterCard({ data }: { data: Partner }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <section className="px-3 py-2">
      <section className="h-[100px] relative w-10/12 mx-auto grayscale hover:grayscale-0 transition-all duration-300">
        <Image
          src={imageError ? placeHolder : data?.imageUrl || placeHolder}
          fill
          alt={data?.organization}
          className="object-contain"
          onError={handleImageError}
        />
      </section>
    </section>
  );
}
