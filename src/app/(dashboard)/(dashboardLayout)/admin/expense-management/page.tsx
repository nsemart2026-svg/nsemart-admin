"use client";
import StatsCards from "@/components/shared/StatsCards";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ExpenseManagementTable from "@/components/tables/ExpenseManagementTable";
import { statsData } from "@/data/expense-management-data";
import Link from "next/link";

const ExpenseManagement = () => {
  return (
    <div className="my-6 p-2 sm:p-4">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h3 className="text-3xl font-semibold mb-2 opacity-90">
            Expense Management
          </h3>
          <p className="text-sm opacity-60">
            Track and manage all business expenses
          </p>
        </div>
        <Link href={"/add-expense"}>
          <Button>
            <Plus /> Add New Expense
          </Button>
        </Link>
      </div>
      <StatsCards items={statsData} />
      <ExpenseManagementTable />
    </div>
  );
};

export default ExpenseManagement;
