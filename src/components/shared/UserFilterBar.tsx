'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type UserFilterBarProps = {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  title?: string;
};

export function UserFilterBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  title = 'User Directory',
}: UserFilterBarProps) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 flex-wrap">
      <h2 className="text-2xl font-bold text-foreground w-full lg:w-auto">
        {title}
      </h2>

      <div className="flex flex-col md:flex-row w-full lg:w-auto items-stretch md:items-center gap-2 sm:gap-4">
        <div className="relative w-full sm:w-full md:w-[400px] lg:max-w-[600px] xl:max-w-[800px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white h-[48px] w-full"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border h-[48px] px-3 py-2 rounded-md text-sm bg-background w-full sm:w-auto"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}
