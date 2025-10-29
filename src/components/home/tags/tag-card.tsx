import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/src/types/tag.types";

interface TagCardProps {
  data: Tag;
}

export default function TagCard({ data }: TagCardProps) {
  return (
    <Link href={"/"} className="flex items-center justify-center flex-col">
      <section className="mb-4">
        <Image
          src={data?.imageUrl}
          alt={data?.title}
          width={80}
          height={80}
          priority
          placeholder="blur"
          blurDataURL="../../../../public/assets/home/network.png"
        />
      </section>
      <p className="text-sm font-light">{data.title}</p>
    </Link>
  );
}
