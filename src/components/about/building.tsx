import buildingImage from "../../../public/assets/about/planing.svg";
import boardgImage from "../../../public/assets/about/board.svg";
import MainHeader from "../ui/main-header";
import Image from "next/image";

export default function Building({ t }: { t: (key: string) => string }) {
  return (
    <section className="bg-gradient mt-15 py-15   mx-auto">
      <MainHeader text={t("build")} />

      <section className=" flex   items-center flex-col  lg:flex-row  justify-center  gap-20 text-start mt-15  ">
        <section className=" md:w-[450px] ">
          <section className=" relative w-full h-[300px] mb-3">
            <Image
              src={buildingImage}
              alt="building"
              fill
              className="object-cover object-center"
            />
          </section>
          <p className="font-semibold mb-2">{t("image1Title")}</p>
          <p className="text-sm text-[#717678] leading-6 tracking-normal">
            {t("image1Desc")}
          </p>
        </section>
        <section className="md:w-[450px] ">
          <section className=" relative w-full h-[300px] mb-3">
            <Image
              src={boardgImage}
              alt="building"
              fill
              className="object-cover object-center"
            />
          </section>
          <p className="font-semibold mb-2">{t("image2Title")}</p>
          <p className="text-sm text-[#717678] leading-6 tracking-normal">
            {t("image2Desc")}
          </p>
        </section>
      </section>
    </section>
  );
}
