"use client";

import React from "react";

interface SearchBoxProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultsCount: number;
}

export default function SearchBox({
  searchQuery,
  onSearchChange,
  resultsCount,
}: SearchBoxProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-2 w-[300px]">
      <div className="relative">
        <input
          type="text"
          placeholder="Search facilities..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      {searchQuery && (
        <div className="mt-2 text-xs text-gray-600">
          {resultsCount} {resultsCount === 1 ? "result" : "results"} found
        </div>
      )}
    </div>
  );
}
