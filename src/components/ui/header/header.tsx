"use client";

import Image from "next/image";
import logo from "../../../../public/assets/Logo.png";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import HeaderAuth from "./headerAuth";
import { useEffect, useRef, useState } from "react";
import Links from "../links";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const popRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setToggle(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex   items-center justify-between py-3 container">
      <section className="">
        <Image
          src={logo}
          width={201}
          height={39}
          alt="pricelessMedd"
          priority
        />
      </section>
      <section className="hidden items-center lg:flex">
        <Links />
      </section>
      <section
        ref={popRef}
        onClick={() => setToggle(true)}
        className=" items-center gap-x-3 text-[15px] hidden lg:flex  border-[1px] border-[#DDDDDD] py-2 px-4 rounded-full cursor-pointer relative"
      >
        <span>
          <User size={18} />
        </span>
        <span>Login or sign up</span>

        {toggle && <HeaderAuth />}
      </section>
      <section className="flex lg:hidden border-[1px] border-[#DDDDDD] p-2 rounded-full cursor-pointer">
        <Menu size={20} />
      </section>
    </header>
  );
}
