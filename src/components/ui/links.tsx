"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { title: "service", referance: "/service" },
  { title: "health Hub", referance: "/health-hub" },
  { title: "newsroom", referance: "/news-room" },
  { title: "about", referance: "/about" },
  { title: "contact", referance: "/contact-us" },
];
type LinksProps = {
  light?: boolean; // optional, defaults to false
};
export default function Links({ light = false }: LinksProps) {
  const path = usePathname();
  console.log(path);

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
