"use client";
import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

type LinksProps = {
  light?: boolean; // optional, defaults to false
};
export default function Links({ light = false }: LinksProps) {
  const t = useTranslations("menu");
  const links = [
    { title: t("service"), referance: "/service" },
    { title: t("healthHub"), referance: "/health-hub" },
    { title: t("newsroom"), referance: "/news-room" },
    { title: t("about"), referance: "/about" },
    { title: t("contact"), referance: "/contact-us" },
  ];
  const path = usePathname();

  return (
    <section>
      <ul className="items-center flex">
        {links.map((ele, index) => (
          <li
            className={`transition-colors duration-500 ${
              light
                ? "text-white font-light text-xs sm:text-base "
                : "text-black font-normal text-[15px] "
            } sm:px-3 px-2  capitalize ${
              path.includes(ele.referance) ? "text-sky-400  " : ""
            }    `}
            key={index}
          >
            <Link href={ele.referance}>{ele.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
