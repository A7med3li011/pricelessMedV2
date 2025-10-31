"use client";
import { useState } from "react";
import FaqArrow from "./faq-arrow";
import { FAQ } from "@/src/types/tag.types";

interface FaqItemProps {
  data: FAQ;
}

export default function FaqItem({ data }: FaqItemProps) {
  const [switcher, setSwitcher] = useState(false);
  return (
    <section>
      <section className="flex items-center  justify-between ">
        <p className=" sm:w-2/3  font-semibold sm:text-[18px] ">
          {data?.question}
        </p>
        <FaqArrow switcher={switcher} setSwitcher={setSwitcher} />
      </section>
      {switcher ? (
        <p className="w-4/5 py-3 font-light tracking-[0px]  text-sm  leading-6 text-[#717678]">
          {data?.answer.replace(/<[^>]+>/g, "")}
        </p>
      ) : null}
    </section>
  );
}
