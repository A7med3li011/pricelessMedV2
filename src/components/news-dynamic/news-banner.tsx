import Image from "next/image";

interface BlogData {
  imageUrl: string;
  title: string;
  date: string;
}

interface NewsBannerProps {
  data: BlogData;
  pressRelease: string;
}

export default function NewsBanner({ data, pressRelease }: NewsBannerProps) {
  return (
    <section className="bg-white shadow-lg flex flex-col md:flex-row items-center gap-10 rounded-xl my-10  overflow-hidden">
      <section className="md:w-1/2 w-full relative h-[400px]">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className=" object-cover object-center "
        />
      </section>
      <section className="md:w-2/3 md:px-10 px-5 py-5 ">
        <p className="font-normal text-sm mb-1">{pressRelease}</p>
        <p className="font-bold md:text-[30px] text-xl mb-3 md:leading-10 leading-7 my-2 tracking-[-1.5%]">
          {data?.title}
        </p>
        <p className="text-sm text-[#717678]">{data?.date}</p>
      </section>
    </section>
  );
}
