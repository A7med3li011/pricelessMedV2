import HeadTitle from "../ui/head-title";
import networkImage from "../../../public/assets/home/network.png";
import Image from "next/image";
import Link from "next/link";
import MainHeader from "../ui/main-header";
export default function ContantSales({ t }) {
  return (
    <section className=" container py-10">
      <section className="flex justify-center flex-col items-center gap-y-3">
        <HeadTitle title={t("contactSales.title")} />

        <MainHeader text={t("contactSales.subtitle")} />

        <p className="text-center text-xs sm:text-sm w-2/3 text-[#717678] leading-6">
          {t("contactSales.description")}
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
          {t("contactSales.button")}
        </Link>
      </section>
    </section>
  );
}
