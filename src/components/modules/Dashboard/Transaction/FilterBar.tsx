'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Search, ChevronDown } from 'lucide-react';

export function FilterBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('All');
  const [dateRange, setDateRange] = useState('Filter by date range');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // future: filter data or trigger fetch
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    // future: apply status filter
  };

  const handleDateRangeChange = (newRange: string) => {
    setDateRange(newRange);
    // future: apply date range filter
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
      {/* Left: Search & Status */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 w-56 shadow-sm bg-white dark:bg-muted"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1 shadow-sm">
              Status: {status} <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {['All', 'Pending', 'Completed', 'Failed'].map((s) => (
              <DropdownMenuItem key={s} onSelect={() => handleStatusChange(s)}>
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right: Date Range Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1 shadow-sm">
            {dateRange} <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {['Today', 'Last 7 Days', 'Last 30 Days', 'This Month'].map((range) => (
            <DropdownMenuItem key={range} onSelect={() => handleDateRangeChange(range)}>
              {range}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
