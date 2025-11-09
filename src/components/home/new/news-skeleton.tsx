export default function NewsSkeleton() {
  return (
    <section className="mb-20">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <li key={index}>
            <section className="h-full flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse">
              {/* Image skeleton */}
              <section className="relative w-full h-56 bg-gray-200" />

              {/* Content skeleton */}
              <section className="flex flex-col flex-grow p-5">
                {/* Category skeleton */}
                <div className="h-3 w-24 bg-gray-200 rounded mb-2" />

                {/* Title skeleton - 2 lines */}
                <div className="flex-grow space-y-2 mb-3">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>

                {/* Date skeleton */}
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </section>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
