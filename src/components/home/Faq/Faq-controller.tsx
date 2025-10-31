import { getFAQ } from "@/src/app/actions/home.action";
import FaqItem from "./faq-item";

export default async function FaqController({ lang }: { lang: string }) {
  const response = await getFAQ(lang);

  const leng = response.data?.length || 0;
  // Handle error state
  if (!response.success || !response.data) {
    return (
      <div className="w-full px-5 sm:px-0 sm:w-2/3 md:w-6/12 mx-auto mt-20 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 font-semibold mb-2">Failed to load FAQs</p>
          <p className="text-red-500 text-sm">
            {response.error?.message ||
              "An unexpected error occurred. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  // Handle empty data state
  if (response.data.length === 0) {
    return (
      <div className="w-full px-5 sm:px-0 sm:w-2/3 md:w-6/12 mx-auto mt-20 text-center">
        <p className="text-gray-500">No FAQs available at the moment.</p>
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
