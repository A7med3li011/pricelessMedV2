import Image from "next/image";
import placeHolder from "../../../public/assets/place-holder.svg";

interface BlogData {
  imageUrl: string;
  title: string;
  date: string;
}

interface NewsCardProps {
  data: BlogData;
  pressRelease: string;
}

export default function NewsCard({ data, pressRelease }: NewsCardProps) {
  return (
    <section className=" cursor-pointer">
      <section className=" relative w-full h-52 overflow-hidden">
        <Image
          className=" object-cover object-center transition-transform duration-500 ease-in-out hover:scale-110"
          src={data?.imageUrl || placeHolder}
          alt={data?.title}
          fill
        />
      </section>
      <section className="px-3 py-2 bg-white">
        <p className="font-normal text-sm mb-1">{pressRelease}</p>
        <p className="font-semibold text-[15px] mb-3 leading-6 tracking-[-0.2px] h-13">
          {data?.title.slice(0, 50)}...
        </p>
        <p className="text-xs text-[#717678] pb-2">{data?.date}</p>
      </section>
    </section>
  );
}
