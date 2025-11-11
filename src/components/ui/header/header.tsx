// "use client";

// import Image from "next/image";
// import logo from "../../../../public/assets/Logo.png";
// import Link from "next/link";
// import { Menu, User } from "lucide-react";
// import HeaderAuth from "./headerAuth";
// import { useEffect, useRef, useState } from "react";
// import Links from "../links";
// import LocaleSwitcher from "../locale-switcher";

// export default function Header() {
//   const [toggle, setToggle] = useState(false);
//   const popRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (popRef.current && !popRef.current.contains(e.target as Node)) {
//         setToggle(false);
//       }
//     }

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <header className="flex   items-center justify-between py-3 container">
//       <Link href={"/"}>
//         <Image
//           src={logo}
//           width={201}
//           height={39}
//           alt="pricelessMedd"
//           priority
//         />
//       </Link>
//       <section className="hidden items-center lg:flex">
//         <Links />
//       </section>

//       <section>
//         <LocaleSwitcher />
//       </section>
//       <section
//         ref={popRef}
//         onClick={() => setToggle(true)}
//         className=" items-center gap-x-3 text-[15px] hidden lg:flex  border-[1px] border-[#DDDDDD] py-2 px-4 rounded-full cursor-pointer relative"
//       >
//         <span>
//           <User size={18} />
//         </span>
//         <span>Login or sign up</span>

//         {toggle && <HeaderAuth />}
//       </section>
//       <section className="flex lg:hidden border-[1px] border-[#DDDDDD] p-2 rounded-full cursor-pointer">
//         <Menu size={20} />
//       </section>
//     </header>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import logo from "../../../../public/assets/Logo.png";
import Links from "../links";
import LocaleSwitcher from "../locale-switcher";
import HeaderAuth from "./headerAuth";

export default function Header() {
  const t = useTranslations("common");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const authPopupRef = useRef<HTMLDivElement>(null);
  const authButtonRef = useRef<HTMLButtonElement>(null);

  // Close auth popup
  const closeAuthPopup = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  // Toggle auth popup
  const toggleAuthPopup = useCallback(() => {
    setIsAuthOpen((prev) => !prev);
  }, []);

  // Close auth popup when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        authPopupRef.current &&
        authButtonRef.current &&
        !authPopupRef.current.contains(e.target as Node) &&
        !authButtonRef.current.contains(e.target as Node)
      ) {
        closeAuthPopup();
      }
    }

    if (isAuthOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isAuthOpen, closeAuthPopup]);

  // Handle Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && isAuthOpen) {
        closeAuthPopup();
        authButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isAuthOpen, closeAuthPopup]);

  return (
    <header className="bg-white mb-2">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Logo */}
          <Link href="/">
            <Image
              src={logo}
              width={201}
              height={39}
              alt="pricelessMedd"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center flex-1 justify-center"
            aria-label="Main navigation"
          >
            <Links />
          </nav>

          {/* Right Section - Desktop & Mobile */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <LocaleSwitcher />

            {/* Auth Button - Desktop */}
            <div className="hidden lg:block relative">
              <button
                ref={authButtonRef}
                onClick={toggleAuthPopup}
                aria-expanded={isAuthOpen}
                aria-haspopup="true"
                aria-label="Login or sign up"
                className="flex items-center gap-3 text-[15px] border border-gray-300 hover:border-gray-400 py-2 px-4 rounded-full cursor-pointer transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
              >
                <User size={18} className="text-gray-600" aria-hidden="true" />
                <span className="font-medium text-gray-700">
                  {t("loginSignup")}
                </span>
              </button>

              {/* Auth Popup */}
              {isAuthOpen && (
                <div
                  ref={authPopupRef}
                  className="absolute top-full right-0 mt-2 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <HeaderAuth />
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="flex lg:hidden items-center justify-center border border-gray-300 hover:border-gray-400 p-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
              aria-label="Open mobile menu"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
