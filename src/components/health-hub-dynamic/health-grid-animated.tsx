"use client";
import HealthCard from "./health-card";
import { Blog } from "@/src/types/tag.types";

export default function HealthGridAnimated({ data }: { data: Blog[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {data.map((ele) => (
        <li className="shadow-xl rounded-lg overflow-hidden" key={ele._id}>
          <HealthCard data={ele} />
        </li>
      ))}
    </ul>
  );
}
