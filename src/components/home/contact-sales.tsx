import HeadTitle from "../ui/head-title";
import networkImage from "../../../public/assets/home/network.png";
import Image from "next/image";
import Link from "next/link";
export default function ContantSales() {
  return (
    <section className=" containter py-10">
      <section className="flex justify-center flex-col items-center gap-y-3">
        <HeadTitle title={"ARE YOU A HOSPITAL OR A CLINIC?"} />
        <p className="font-bold text-2xl text-center md:text-4xl tracking-[-1.5%] ">
          Join our growing netrowk
        </p>
        <p className="text-center text-xs sm:text-sm w-2/3 text-[#717678] leading-6">
          We have 1,000+ healthcare providers across the UAE who are attracting
          new patients, filling appointments, and building loyalty through
          PricelessMed.
        </p>
      </section>
      <section className=" w-fit mx-auto mt-10">
        <Image
          width={800}
          height={400}
          src={networkImage}
          alt="network"
          className="rounded-lg"
          placeholder="blur"
        />
      </section>

      <section className="">
        <Link
          href={"/"}
          className="text-[#13ACFC] border-[1px] border-[#13ACFC] rounded-full px-3 py-2 text-xs font-semibold   block my-7   w-fit mx-auto "
        >
          Contact sales team
        </Link>
      </section>
    </section>
  );
}
