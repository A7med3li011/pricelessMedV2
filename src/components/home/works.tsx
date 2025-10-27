import glass from "../../../public/assets/home/galss.png";
import devision from "../../../public/assets/home/devision.png";
import calendar from "../../../public/assets/home/calendar.png";
import Image from "next/image";

const arr = [
  {
    image: glass,
    title: "Find your perfect deal",
    desc: "Explore hundreds of deals across dentistry, diagnostics, specialists, and wellness services at top-rated clinics.",
  },
  {
    image: calendar,
    title: "Connect with your clinic",
    desc: "View clinic details, location, and contact information. Reach out directly to book your appointment at a time that works for you.",
  },
  {
    image: devision,
    title: "Show up & save",
    desc: "Present your PricelessMed voucher at the clinic and enjoy savings of up to 70% on quality healthcare.",
  },
];

export default function Works() {
  return (
    <section className="lg:w-2/3 mx-auto my-10 ">
      <section className="text-center">
        <p className="text-sm my-3 bg-gradient-to-b from-[#13ACFC] to-[#8A44D9] font-semibold bg-clip-text text-transparent">
          How It Work
        </p>

        <h2 className="font-bold text-xl md:text-4xl  md:tracking-[-1.5] my-5">
          Your path to affordable healthcare
        </h2>
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
