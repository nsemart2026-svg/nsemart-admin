"use client";
import { useState } from "react";
import { subDays } from "date-fns";
import SearchInput from "../shared/SearchInput";
import DateFilterPopover from "../modules/Dashboard/pending-deposit/DateFilterPopover";
import ReusableTable from "./ReusableTable";
import {
  incomeManagementColumns,
  IncomeManagementData,
} from "@/data/IncomeManagementData";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
export type IncomeManagementItem = {
  source: string;
  category: string;
  amount: string;
  date: string;
  status: "Received" | "Pending";
};
const IncomeManagementTable = () => {
  const [selectedRange, setSelectedRange] = useState<[Date, Date]>([
    subDays(new Date(), 6),
    new Date(),
  ]);

  const handleRangeChange = (range: [Date, Date]) => {
    setSelectedRange(range);
  };

  return (
    <section className="bg-white p-4 rounded-md mt-8">
      <h3 className="text-2xl font-semibold">Income Records</h3>
      <p className="text-sm opacity-60">
        View and manage all your income entries
      </p>
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center my-8">
        <SearchInput placeholder="Search income..." className="w-full" />
        <Button variant={"outline"}>
          <Filter /> Filter
        </Button>
        <DateFilterPopover
          selectedRange={selectedRange}
          onSelectRange={handleRangeChange}
        />
      </div>

      <ReusableTable
        data={IncomeManagementData}
        columns={incomeManagementColumns}
        footer={
          <TableRow className="text-lg font-bold">
            <TableCell colSpan={2}>Net Income</TableCell>{" "}
            <TableCell className="">$45,500</TableCell>{" "}
            <TableCell colSpan={3}></TableCell>
          </TableRow>
        }
      />
    </section>
  );
};

export default IncomeManagementTable;
