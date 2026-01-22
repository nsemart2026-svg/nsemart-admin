'use client';

import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="w-full max-w-full bg-white  h-10 border  rounded-md flex items-center px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#C9C9C926] transition">
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow bg-transparent outline-none text-sm placeholder-gray-400"
      />
      <Search className="w-4 h-4 text-gray-500" />
    </div>
  );
}
