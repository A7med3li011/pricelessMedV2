import Image from "next/image";
import phoneFrame from "../../../public/assets/home/Frame_phone.png";
import appleStroe from "../../../public/assets/home/apple.svg";
import ggoolePlay from "../../../public/assets/home/play.svg";
import HeadTitle from "../ui/head-title";
export default function SavingHome() {
  return (
    <section className=" bg-[linear-gradient(258.69deg,rgba(237,236,247,0.5)_-0.13%,rgba(218,242,255,0.5)_95.76%)] pt-20">
      <section className="grid grid-cols-1 md:grid-cols-2 container items-center ">
        <section className="md:w-2/3">
          <HeadTitle title={` DOWNLOAD OUR APP`} />

          <p className="sm:text-4xl text-2xl font-bold">
            Save on healthcare wherever you are
          </p>
          <p className="text-xs leading-6 py-4 text-[#717678]">
            Discover discounted health services, manage your vouchers, and
            locate nearby participating providers. Download the app and start
            saving on your healthcare today.
          </p>

          <section className="flex items-center gap-x-3 my-3 ">
            <section className="w-[140px] h-[50px] relative">
              <Image
                className=" object-contain"
                fill
                src={appleStroe}
                alt="phone-frame"
              />
            </section>
            <section className="w-[140px] h-[50px] relative">
              <Image
                fill
                className=" object-center"
                src={ggoolePlay}
                alt="phone-frame"
              />
            </section>
            {/* <Image width={130} src={ggoolePlay} alt="phone-frame" /> */}
          </section>
        </section>
        <section className="relative h-[466px]">
          <Image
            fill
            src={phoneFrame}
            alt="phone-frame"
            className=" object-center"
            priority
            placeholder="blur"
          />
        </section>
      </section>
    </section>
  );
}
