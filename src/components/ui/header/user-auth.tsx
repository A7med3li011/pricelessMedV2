import CustomButton from "../customButton";
import apple from "../../../../public/assets/apple.png";
import facebook from "../../../../public/assets/facebook.png";
import google from "../../../../public/assets/google.png";
import Image from "next/image";
export default function UserAuth() {
  return (
    <section>
      {" "}
      <section className="flex items-center justify-between  border border-[#DDDDDD] px-4 py-3 rounded-full mt-10">
        <section className="">
          <Image src={apple} priority alt="apple icon" />
        </section>
        <p className=" w-3/4">Continue with Apple</p>
      </section>
      <section className="flex items-center justify-between  border border-[#DDDDDD] px-4 py-3 rounded-full mt-5">
        <section className="">
          <Image src={facebook} priority alt="apple icon" />
        </section>
        <p className=" w-3/4">Continue with Facebook</p>
      </section>
      <section className="flex items-center justify-between  border border-[#DDDDDD] px-4 py-3 rounded-full mt-5">
        <section className="">
          <Image src={google} priority alt="apple icon" />
        </section>
        <p className=" w-3/4">Continue with Google</p>
      </section>
      <section className="flex items-center justify-between mt-10">
        <span className="w-[45%] h-[0.5px] bg-[#DDDDDD]"></span>
        <span className=" ">Or</span>
        <span className="w-[45%] h-[0.5px] bg-[#DDDDDD]"></span>
      </section>
      <input
        placeholder="Enter phone number"
        className="mt-5 border  border-[#DDDDDD] w-full p-4  rounded-md focus:outline-0"
      />
      <CustomButton
        text={"Continue"}
        style={
          "text-center w-full cursor-pointer mt-5 bg-[#8A44D9] text-white font-medium text-[16px] py-3 px-4 rounded-full"
        }
        fun={() => console.log("ahmed")}
      />
    </section>
  );
}
