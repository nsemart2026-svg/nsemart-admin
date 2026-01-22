"use client";

import { useState } from "react";
import { subDays } from "date-fns";
import {
  PendingDepositsData,
  pendingDepositsItemsColumns,
} from "@/data/PendingDepositsData";
import SearchInput from "../shared/SearchInput";
import ReusableTable from "./ReusableTable";
import DateFilterPopover from "../modules/Dashboard/pending-deposit/DateFilterPopover";

const PendingDepositTable = () => {
  const [selectedRange, setSelectedRange] = useState<[Date, Date]>([
    subDays(new Date(), 6),
    new Date(),
  ]);

  const handleRangeChange = (range: [Date, Date]) => {
    setSelectedRange(range);
  };

  return (
    <section className="bg-white p-4 rounded-md">
      <h3 className="text-2xl font-semibold">Pending Deposits</h3>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center my-8">
        <SearchInput
          placeholder="Search transaction id..."
          className="w-full"
        />
        <DateFilterPopover
          selectedRange={selectedRange}
          onSelectRange={handleRangeChange}
        />
      </div>

      <ReusableTable
        data={PendingDepositsData}
        columns={pendingDepositsItemsColumns}
      />
    </section>
  );
};

export default PendingDepositTable;
