import glass from "../../../public/assets/home/galss.png";
import devision from "../../../public/assets/home/devision.png";
import calendar from "../../../public/assets/home/calendar.png";
import Image from "next/image";
import MainHeader from "../ui/main-header";

export default function Works({ t }) {
  const arr = [
    {
      image: glass,
      title: t("works.steps_one.title"),
      desc: t("works.steps_one.description"),
    },
    {
      image: calendar,
      title: t("works.steps_two.title"),
      desc: t("works.steps_two.description"),
    },
    {
      image: devision,
      title: t("works.steps_three.title"),
      desc: t("works.steps_three.description"),
    },
  ];
  return (
    <section className="lg:w-2/3 mx-auto my-10 ">
      <section className="text-center">
        <p className="text-sm my-3 bg-gradient-to-b from-[#13ACFC] to-[#8A44D9] font-semibold bg-clip-text text-transparent">
          {t("works.badge")}
        </p>

        <MainHeader text={t("works.header")} />
        <h2 className="font-bold text-xl md:text-4xl  md:tracking-[-1.5] my-5"></h2>
      </section>

      <section className=" h-auto mt-15">
        <ul className="grid md:grid-cols-3 items-center gap-x-3 gap-y-5">
          {arr.map((ele, index) => (
            <li
              key={index}
              className="flex items-center flex-col justify-center gap-y-3 "
            >
              <section className=" flex items-center">
                <Image
                  src={ele.image}
                  alt={ele.title}
                  height={30}
                  width={30}
                  placeholder="blur"
                />
              </section>
              <p className="font-semibold text-center ">{ele.title}</p>
              <p className="text-xs text-center  leading-6 tracking-[0px] font-medium   px-3 text-[#717678]">
                {ele.desc}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
