"use client";
import { Hospital, MapPin, Search } from "lucide-react";
import CustomButton from "../ui/customButton";
import { useEffect, useState } from "react";
import SearchHomeFacility from "@/src/app/actions/search.action";

export default function HomeSearch() {
  const [switcher, setSwitcher] = useState("hospital");
  const [facilityText, setFacilityText] = useState("");
  const [data, setData] = useState([]);

  async function getFacilities() {
    const faci = await SearchHomeFacility(switcher, facilityText);
    if (faci.success) {
      setData(faci.data);
    }
  }

  useEffect(() => {
    async function callendpoint() {
      getFacilities();
    }
    callendpoint();
  }, [switcher, facilityText]);
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
        <section className="flex items-center py-3 px-5 gap-x-3 border-b-[1px] md:border-e-[1px] lg:border-b-0 lg:border-e-[1px] border-[#DDDDDD] relative">
          <span>
            <Hospital />
          </span>
          <input
            type="text"
            value={facilityText}
            onChange={(e) => setFacilityText(e.target.value)}
            placeholder="Select hospital or clinic"
            className="py-1 focus:outline-none"
          />
          {facilityText ? (
            <section className=" absolute top-full h-[300px] overflow-scroll bg-white shadow-2xl inset-0 pt-5">
              <section className=" capitalize flex items-center justify-center  gap-x-3 bg-[#F5F6F6] p-2  rounded-full w-4/5 mx-auto">
                <button
                  onClick={() => setSwitcher("hospital")}
                  className={`text-center  w-1/2 rounded-full py-2 px-3 transition-colors duration-500 cursor-pointer ${
                    switcher === "hospital" ? "bg-white" : "text-[#717678]"
                  }`}
                >
                  Hospital
                </button>
                <button
                  onClick={() => setSwitcher("clinic")}
                  className={`text-center  w-1/2 rounded-full py-2 px-3  transition-colors duration-500 cursor-pointer ${
                    switcher === "clinic" ? "bg-white" : "text-[#717678]"
                  }`}
                >
                  Clinic
                </button>
              </section>
              <ul className="py-4 w-4/5 mx-auto">
                {data.map((ele, index) => (
                  <li key={index} className="flex items-center gap-x-3 mb-5">
                    <p>
                      <Hospital />
                    </p>
                    <section className="text-sm">
                      <p className="mb-1">
                        {ele?.organization} {ele?.facilityType}
                      </p>
                      <p className="text-xs flex items-center gap-x-1">
                        <span>{ele?.area}</span>
                        <span className="w-1 h-1 bg-gray-300 inline-block rounded-full"></span>
                        <span>{ele?.city}</span>
                      </p>
                    </section>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
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
