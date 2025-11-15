import NewsCard from "./news-card";

interface BlogData {
  imageUrl: string;
  title: string;
  date: string;
}

export default function NewsGridAnimated({ data, pressRelease }: { data: BlogData[]; pressRelease: string }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {data.map((ele, index) => (
        <li className="shadow-xl rounded-lg overflow-hidden" key={index}>
          <NewsCard data={ele} pressRelease={pressRelease} />
        </li>
      ))}
    </ul>
  );
}
