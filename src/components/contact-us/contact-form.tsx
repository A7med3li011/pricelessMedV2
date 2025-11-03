"use cleint";

import CustomButton from "../ui/customButton";

export default function ContactForm() {
  return (
    <form className="w-full px-5 sm:px-0 sm:w-2/3 md:w-6/12 mx-auto mt-20 text-center ">
      <section className="flex items-center justify-between flex-col md:flex-row gap-5">
        <input
          type="text"
          className="border-[1px] focus:outline-none  border-[#DDDDDD] py-3 px-2  rounded-lg w-full md:w-[48%]"
          placeholder="First name"
        />
        <input
          type="text"
          className="border-[1px] focus:outline-none  border-[#DDDDDD] py-3 px-2  rounded-lg w-full md:w-[48%]"
          placeholder="Last name"
        />
      </section>
      <section className="flex items-center justify-between flex-col md:flex-row gap-5 my-4">
        <input
          type="text"
          className="border-[1px] focus:outline-none  border-[#DDDDDD] py-3 px-2  rounded-lg w-full md:w-[48%]"
          placeholder="Email address"
        />
        <input
          type="text"
          className="border-[1px] focus:outline-none  border-[#DDDDDD] py-3 px-2  rounded-lg w-full md:w-[48%]"
          placeholder="phone number"
        />
      </section>
      <section>
        <textarea
          placeholder="Can you share more about your needs or challenges?"
          className="border-[1px] focus:outline-none  border-[#DDDDDD] py-3 px-2  rounded-lg w-full"
          rows={10}
        ></textarea>
      </section>

      <CustomButton
        text="Get in touch"
        style="bg-[#8A44D9] text-white py-2 px-3 text-sm mt-5 rounded-full cursor-pointer"
      />
    </form>
  );
}
