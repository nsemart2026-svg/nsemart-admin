import StatsCards from "@/components/shared/StatsCards";
import IncomeManagementTable from "@/components/tables/IncomeManagementTable";
import { Button } from "@/components/ui/button";
import { statsData } from "@/data/IncomeManagementData";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const IncomeManagement = () => {
  return (
    <div className="my-6 p-2 sm:p-4">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h3 className="text-3xl font-semibold mb-2 opacity-90">
            Income Management
          </h3>
          <p className="text-sm opacity-60 ">
            Track and manage all income sources
          </p>
        </div>
        <Link href={"/add-income"}>
          <Button>
            <Plus /> Add New Income
          </Button>
        </Link>
      </div>
      <StatsCards items={statsData} />
      <IncomeManagementTable />
    </div>
  );
};

export default IncomeManagement;
