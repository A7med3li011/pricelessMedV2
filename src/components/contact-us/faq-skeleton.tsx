export default function FaqSkeleton() {
  return (
    <ul className="w-full px-5 sm:px-0 sm:w-2/3 md:w-6/12 mx-auto mt-20">
      {[1, 2, 3, 4, 5].map((item) => (
        <li
          key={item}
          className="py-5 border-b-[2px] border-b-[#dfdfdf] animate-pulse"
        >
          <div className="flex items-center justify-between gap-4">
            {/* Question skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-4/5" />
              <div className="h-5 bg-gray-200 rounded w-3/5" />
            </div>
            {/* Icon skeleton */}
            <div className="h-6 w-6 bg-gray-200 rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}
