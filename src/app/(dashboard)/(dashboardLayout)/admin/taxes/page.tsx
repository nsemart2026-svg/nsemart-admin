import StatsCards from "@/components/shared/StatsCards";
import TaxCategories from "@/components/modules/Dashboard/Tax/TaxCategories";
import TaxManagementTable from "@/components/tables/TaxManagementTable";
import { Button } from "@/components/ui/button";
import { categoryData, statsData } from "@/data/tax-data";
import { Plus } from "lucide-react";
import React from "react";

const TaxManagement = () => {
  return (
    <div className="py-6 p-2 sm:p-4">
      <div className="flex justify-end mb-4">
        <Button>
          <Plus /> Add Tax Rate
        </Button>
      </div>
      <StatsCards items={statsData} />
      <TaxCategories items={categoryData} />
      <TaxManagementTable />
    </div>
  );
};

export default TaxManagement;
