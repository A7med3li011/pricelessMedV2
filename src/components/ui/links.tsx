import Link from "next/link";

const links = [
  { title: "service", referance: "/" },
  { title: "health Hub", referance: "/" },
  { title: "newsroom", referance: "/" },
  { title: "about", referance: "/" },
  { title: "contact", referance: "/" },
];
type LinksProps = {
  light?: boolean; // optional, defaults to false
};
export default function Links({ light = false }: LinksProps) {
  return (
    <section>
      <ul className="items-center flex">
        {links.map((ele, index) => (
          <li
            className={`${
              light
                ? "text-white font-light text-xs sm:text-base "
                : "text-black font-normal text-[15px]"
            } sm:px-3 px-2  capitalize    `}
            key={index}
          >
            <Link href={ele.referance}>{ele.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
