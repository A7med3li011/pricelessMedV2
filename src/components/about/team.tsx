import AD from "../../../public/assets/about/AD.svg";
import AN from "../../../public/assets/about/AN.svg";
import BF from "../../../public/assets/about/BF.svg";
import HA from "../../../public/assets/about/HA.svg";
import SB from "../../../public/assets/about/SB.svg";
import OD from "../../../public/assets/about/OD.svg";
import JN from "../../../public/assets/about/JN.svg";
import NA from "../../../public/assets/about/NA.svg";
import HeadTitle from "../ui/head-title";
import MainHeader from "../ui/main-header";
import Image from "next/image";
export default function Team({ t }: { t: (key: string) => string }) {
  const data = [
    {
      image: BF,
      name: "Basma Fouda",
      title: t("manging"),
    },
    {
      image: AN,
      name: "Ahmed Nabil",
      title: t("coFounder"),
    },
    {
      image: JN,
      name: "Jisna Naseer",
      title: t("admin"),
    },
    {
      image: AD,
      name: "Dr Anant Dojaki",
      title: t("chief"),
    },
    {
      image: SB,
      name: "Soraya Boodoo",
      title: t("BSD"),
    },
    {
      image: NA,
      name: "Nahla",
      title: t("Designer"),
    },
    {
      image: OD,
      name: "Ola Adam",
      title: t("cooprate"),
    },
    {
      image: HA,
      name: "Hafeez Ahmed",
      title: t("BD"),
    },
  ];

  return (
    <section className="mt-10 py-15">
      <section className="sm:w-2/5  mx-auto">
        <HeadTitle title={t("teamTitle")} />
        <MainHeader text={t("teamHeader")} />
      </section>
      <section>
        <ul className="grid grid-cols-1 sm:grid-cols-3  lg:grid-cols-4 gap-5 mt-15">
          {data.map((ele, index) => (
            <li key={index} className="">
              <section className=" ">
                <section className="relative w-[100px] mx-auto rounded-full overflow-hidden h-[100px] mb-3">
                  <Image
                    src={ele.image}
                    alt={ele.name}
                    fill
                    className="bg-cover bg-center"
                  />
                </section>
                <section>
                  <p className="font-semibold mb-2">{ele.name}</p>
                  <p className=" text-sm w-2/3 text-[#717678] leading-5  mx-auto">
                    {ele.title}
                  </p>
                </section>
              </section>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
