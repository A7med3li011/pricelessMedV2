export default function HealthHubSkeleton() {
  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="animate-pulse">
            {/* Image skeleton */}
            <div className="relative w-full h-52 bg-gray-200 rounded-sm" />

            {/* Content skeleton */}
            <div className="px-3 py-2 bg-white">
              <div className="h-4 w-12 bg-gray-200 rounded mb-1" />
              <div className="space-y-2 mb-3">
                <div className="h-5 bg-gray-200 rounded w-full" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
              </div>
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
