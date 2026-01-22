"use client";

import { Search, MoreHorizontal, ListFilter, SquarePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FilterTab {
  name: string;
  count: number;
  active: boolean;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeFilter: string;
  setActiveFilter: (name: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const FilterBar: React.FC<FilterTabsProps> = ({
  tabs,
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full pb-4 border-b border-gray-200">
      {/* Filter Tabs - hidden on small screens */}
      <div className="hidden md:flex flex-nowrap gap-4 overflow-x-auto scrollbar-hide">
        {tabs.map(({ name, count }) => (
          <button
            key={name}
            onClick={() => setActiveFilter(name)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-semibold transition-colors border-b-2 ${
              activeFilter === name
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:border-gray-400 hover:text-gray-700'
            }`}
            type="button"
            aria-pressed={activeFilter === name}
          >
            {name} ({count})
          </button>
        ))}
      </div>

      {/* Dropdown for small screens */}
      <div className="block md:hidden w-full">
        <select
          value={activeFilter}
          onChange={e => setActiveFilter(e.target.value)}
          className="w-[170px] px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm bg-white text-gray-700
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
             transition-all duration-300 ease-in-out hover:border-gray-400 hover:shadow-md"
        >
          {tabs.map(({ name, count }) => (
            <option key={name} value={name}>
              {name} ({count})
            </option>
          ))}
        </select>
      </div>

      {/* Search & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
        <div className="relative flex-1 min-w-[180px] w-full sm:w-auto">
          <Input
            placeholder="Search your product"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled
          className="w-full sm:w-auto whitespace-nowrap flex justify-center sm:justify-start "
        >
          <ListFilter />
        </Button>

        <Link href={'/admin/add-product'}>
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto whitespace-nowrap flex justify-center sm:justify-start "
          >
            <SquarePlus />
          </Button>
        </Link>

        <Button
          variant="outline"
          size="sm"
          disabled
          className="w-full sm:w-auto whitespace-nowrap flex justify-center sm:justify-start "
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
