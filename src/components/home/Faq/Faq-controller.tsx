import { getFAQ } from "@/src/app/actions/home.action";
import FaqItem from "./faq-item";
import { getTranslations } from "next-intl/server";
import getLang from "@/src/app/[locale]/helpers/getLang";

export default async function FaqController() {
  const lang = await getLang();
  const t = await getTranslations({ locale: lang, namespace: "contact" });

  const response = await getFAQ(lang);

  const leng = response.data?.length || 0;
  // Handle error state
  if (!response.success || !response.data) {
    return (
      <div className="w-full px-5 sm:px-0 sm:w-2/3 md:w-6/12 mx-auto mt-20 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 font-semibold mb-2">{t("faq.error")}</p>
          <p className="text-red-500 text-sm">
            {response.error?.message || t("faq.errorMessage")}
          </p>
        </div>
      </div>
    );
  }

  // Handle empty data state
  if (response.data.length === 0) {
    return (
      <div className="w-full px-5 sm:px-0 sm:w-2/3 md:w-6/12 mx-auto mt-20 text-center">
        <p className="text-gray-500">{t("faq.noData")}</p>
      </div>
    );
  }

  return (
    <ul className=" w-full px-5 sm:px-0 sm:w-2/3 md:w-6/12 mx-auto mt-20">
      {response.data.map((ele, index) => (
        <li
          className={`py-5 border-b-[2px] border-b-[#dfdfdf] ${
            index === leng - 1 ? "border-b-transparent" : ""
          }`}
          key={index}
        >
          <FaqItem data={ele} />
        </li>
      ))}
    </ul>
  );
}
