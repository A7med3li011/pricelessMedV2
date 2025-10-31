"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqArrowProps {
  switcher: boolean;
  setSwitcher: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FaqArrow({ switcher, setSwitcher }: FaqArrowProps) {
  return (
    <button
      className="bg-[#F5F6F6] text-[#717678] p-2 rounded-full  cursor-pointer"
      onClick={() => setSwitcher((prev) => !prev)}
    >
      {!switcher ? <ChevronUp /> : <ChevronDown />}
    </button>
  );
}
