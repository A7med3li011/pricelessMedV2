"use client";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/src/types/tag.types";
import { useState } from "react";
import placeHolder from "../../../../public/assets/place-holder.svg";

interface TagCardProps {
  data: Tag;
}

export default function TagCard({ data }: TagCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <Link href={"/"} className="flex items-center justify-center flex-col ">
      <section className="mb-4">
        <Image
          src={imageError ? placeHolder : data?.imageUrl || placeHolder}
          alt={data?.title}
          width={80}
          height={80}
          priority
          onError={handleImageError}
        />
      </section>
      <p className="text-sm font-light">{data.title}</p>
    </Link>
  );
}
