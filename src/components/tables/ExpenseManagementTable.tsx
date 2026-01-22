import { subDays } from "date-fns";
import React, { useState } from "react";
import SearchInput from "../shared/SearchInput";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import DateFilterPopover from "../modules/Dashboard/pending-deposit/DateFilterPopover";
import ReusableTable from "./ReusableTable";
import { TableCell, TableRow } from "../ui/table";
import {
  ExpenseManagementColumns,
  ExpenseManagementData,
} from "@/data/expense-management-data";

export type ExpenseManagementItem = {
  description: string;
  category: string;
  amount: string;
  date: string;
  status: "Received" | "Pending";
};

const ExpenseManagementTable = () => {
  const [selectedRange, setSelectedRange] = useState<[Date, Date]>([
    subDays(new Date(), 6),
    new Date(),
  ]);

  const handleRangeChange = (range: [Date, Date]) => {
    setSelectedRange(range);
  };

  return (
    <section className="bg-white p-4 rounded-md mt-8">
      <h3 className="text-2xl font-semibold">Expense Records</h3>
      <p className="text-sm opacity-60">
        View and manage all your expense entries
      </p>
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center my-8">
        <SearchInput placeholder="Search expense..." className="w-full" />
        <Button variant={"outline"}>
          <Filter /> Filter
        </Button>
        <DateFilterPopover
          selectedRange={selectedRange}
          onSelectRange={handleRangeChange}
        />
      </div>

      <ReusableTable
        data={ExpenseManagementData}
        columns={ExpenseManagementColumns}
        footer={
          <TableRow className="text-lg font-bold">
            <TableCell colSpan={2}>Total Expense</TableCell>{" "}
            <TableCell className="">$9,160</TableCell>{" "}
            <TableCell colSpan={3}></TableCell>
          </TableRow>
        }
      />
    </section>
  );
};

export default ExpenseManagementTable;
