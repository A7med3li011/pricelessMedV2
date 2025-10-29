export default function TagSkeleton() {
  return (
    <section className="flex items-center justify-center flex-col animate-pulse">
      <section className="mb-4">
        <div className="w-20 h-20 bg-gray-200 rounded-md" />
      </section>
      <div className="w-16 h-4 bg-gray-200 rounded" />
    </section>
  );
}

export function TagGridSkeleton() {
  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 containter gap-5 my-10">
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className="bg-white py-3 px-3 rounded-lg">
          <TagSkeleton />
        </li>
      ))}
    </ul>
  );
}
