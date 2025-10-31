"use client";

import { useState } from "react";

import UserAuth from "./user-auth";
import PartnerAuth from "./partner-auth";
export default function HeaderAuth() {
  const [role, setRole] = useState("user");
  return (
    <section className=" absolute top-full mt-2 right-0 bg-white shadow-xl w-[409px]  border-[1px] border-[#DDDDDD] p-6 rounded-md z-50 ">
      <section className=" capitalize flex items-center justify-center  gap-x-3 bg-[#F5F6F6] p-2  rounded-full ">
        <button
          onClick={() => setRole("user")}
          className={`text-center  w-1/2 rounded-full py-3 px-4 transition-colors duration-500 cursor-pointer ${
            role === "user" ? "bg-white" : "text-[#717678]"
          }`}
        >
          user
        </button>
        <button
          onClick={() => setRole("partner")}
          className={`text-center  w-1/2 rounded-full py-3 px-4  transition-colors duration-500 cursor-pointer ${
            role === "partner" ? "bg-white" : "text-[#717678]"
          }`}
        >
          partner
        </button>
      </section>
      <section>
        <p className="font-medium text-[25px] tracking-[-0.2px]  leading-7 my-5">
          Log in or sign up
        </p>
        <p className="text-[15px] leading-7 text-[#717678]">
          Create an account or log in to access our network of health providers.
        </p>
      </section>
      {role == "user" ? <UserAuth /> : <PartnerAuth />}
    </section>
  );
}
