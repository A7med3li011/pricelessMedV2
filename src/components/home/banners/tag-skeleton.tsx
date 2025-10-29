export default function BannerSkeleton() {
  return (
    <section className="animate-pulse">
      <section className="relative w-full h-[500px] bg-sky-300 opacity-20 rounded-lg overflow-hidden" />
    </section>
  );
}

export function BannerSliderSkeleton() {
  return (
    <section className="mt-10">
      <section className="container h-full">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <BannerSkeleton key={index} />
          ))}
        </section>
      </section>
    </section>
  );
}
