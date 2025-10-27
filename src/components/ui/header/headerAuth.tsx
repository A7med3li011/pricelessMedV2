"use client";

import Image from "next/image";
import { useState } from "react";
import apple from "../../../../public/assets/apple.png"
import facebook from "../../../../public/assets/facebook.png"
import google from "../../../../public/assets/google.png"
import CustomButton from "../customButton";
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

       <section className="flex items-center justify-between  border-[1px] border-[#DDDDDD] px-4 py-3 rounded-full mt-10">
          <section className="">
            <Image src={apple} priority alt="apple icon"/>
          </section>
          <p className=" w-3/4">Continue with Apple</p>
        </section>   
       <section className="flex items-center justify-between  border-[1px] border-[#DDDDDD] px-4 py-3 rounded-full mt-5">
          <section className="">
            <Image src={facebook} priority alt="apple icon"/>
          </section>
          <p className=" w-3/4">Continue with Facebook</p>
        </section>   
       <section className="flex items-center justify-between  border-[1px] border-[#DDDDDD] px-4 py-3 rounded-full mt-5">
          <section className="">
            <Image src={google} priority alt="apple icon"/>
          </section>
          <p className=" w-3/4">Continue with Google</p>
        </section>   


        <section className="flex items-center justify-between mt-10">
            <span className="w-[45%] h-[0.5px] bg-[#DDDDDD]"></span>
            <span className=" ">Or</span>
            <span className="w-[45%] h-[0.5px] bg-[#DDDDDD]"></span>
          </section>  


          <input placeholder="Enter phone number" className="mt-5 border-[1px]  border-[#DDDDDD] w-full p-4  rounded-md focus:outline-0"/>
           
           <CustomButton text={"Continue"} style={"text-center w-full cursor-pointer mt-5 bg-[#8A44D9] text-white font-medium text-[16px] py-3 px-4 rounded-full"} fun={()=>console.log("ahmed")}/>

    </section>
  );
}
