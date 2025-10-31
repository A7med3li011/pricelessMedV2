import Image from "next/image";
import emb from "../../../../public/assets/home/emb.svg";
import man from "../../../../public/assets/home/man.svg";
import oldMan from "../../../../public/assets/home/oldman.svg";
import CustomButton from "../../ui/customButton";

const data = [
  {
    image: oldMan,
    title: "Healthcare discounts",
    desc: "Access exclusive vouchers and deals from top clinics across the UAE.",
  },
  {
    image: man,
    title: "Surgical quotation",
    desc: "Get personalized quotes from leading hospitals based on your needs.",
  },
  {
    image: emb,
    title: "Emergency care",
    desc: "Access to emergency rooms and urgent care facilities across the UAE.",
  },
];

export default function ServiceGrid() {
  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 md:px-8 lg:px-16">
        {data.map((ele, index) => (
          <li
            key={index}
            className="group  rounded-2xl  transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
          >
            <section className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
              <Image
                fill
                src={ele.image}
                alt={ele.title}
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </section>
            <section className="p-6 px-1 md:px-1 md:p-8">
              <h3 className="text-sm md:text-[19px] font-bold text-gray-900 mb-3 capitalize">
                {ele.title}
              </h3>
              <p className="text-sm md:text-base text-[#717678] leading-relaxed ">
                {ele.desc}
              </p>
              <CustomButton
                text={`Contact us`}
                style={`text-[#13ACFC] py-2  px-3  my-7 border-[1px] border-[#13ACFC] rounded-full text-sm`}
              />
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
