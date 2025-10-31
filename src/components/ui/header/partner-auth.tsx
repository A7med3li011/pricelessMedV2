import CustomButton from "../customButton";

export default function PartnerAuth() {
  return (
    <section>
      <input
        placeholder="Email address"
        className="mt-5 border-[1px]  border-[#DDDDDD] w-full p-4  rounded-md focus:outline-0"
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
