import { Hospital, MapPin, Search } from "lucide-react";
import CustomButton from "../ui/customButton";

export default function HomeSearch() {
  return (
    <section className="w-full xl:w-2/3 mx-auto border-[1px] border-[#DDDDDD] my-5 rounded-lg lg:rounded-full text-xs sm:text-sm text-[#717678] container ">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_100px]">
        <section className="flex items-center py-3 px-5 gap-x-3 border-b-[1px] md:border-b-0 md:border-e-[1px] border-[#DDDDDD]">
          <span>
            <Search />
          </span>
          <span>Search treatment or services</span>
        </section>
        <section className="flex items-center py-3 px-5 gap-x-3 border-b-[1px] md:border-b-0 lg:border-e-[1px] border-[#DDDDDD]">
          <span>
            <MapPin />
          </span>
          <span>Select location</span>
          
        </section>
        <section className="flex items-center py-3 px-5 gap-x-3 border-b-[1px] md:border-e-[1px] lg:border-b-0 lg:border-e-[1px] border-[#DDDDDD]">
          <span>
            <Hospital />
          </span>
          <span>Select hospital or clinic</span>
        </section>
        <section className="flex items-center justify-center md:col-span-2 lg:col-span-1 py-3">
          <CustomButton
            text="search"
            style="bg-[#13ACFC] py-3 px-5 rounded-full cursor-pointer text-white w-full md:w-auto"
          />
        </section>
      </section>
    </section>
  );
}
