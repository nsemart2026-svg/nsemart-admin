"use client";

import { ChartCard } from "@/components/modules/Dashboard/Customers/ChartCard";
import { DataTable } from "@/components/modules/Dashboard/Customers/DataTable";
import { SearchBar } from "@/components/modules/Dashboard/Customers/SearchBar";
import { StatCard } from "@/components/shared/StatCard";
import { StatCardLight } from "@/components/shared/StatCardLight";

const CustomersPage = () => {
  return (
    <main className="px-6  space-y-6 py-6  mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-4">
          <StatCard />
          <StatCardLight />
          <StatCardLight title="Visitor" value="250k" changePercent={2.5} />
        </div>

        <div className="flex-1 col-span-3">
          <ChartCard />
        </div>
      </div>
      <SearchBar></SearchBar>
      <DataTable />
    </main>
  );
};

export default CustomersPage;
