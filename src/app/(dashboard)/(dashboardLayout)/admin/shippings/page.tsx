import ShippingCategories from "@/components/modules/Dashboard/Shipping/ShippingCategories";
import StatsCards from "@/components/shared/StatsCards";
import ShippingManagementTable from "@/components/tables/ShippingManagementTable";
import { Button } from "@/components/ui/button";
import { categoryData, statsData } from "@/data/shipping-data";
import { Plus } from "lucide-react";
import React from "react";

const Shipping = () => {
  return (
    <div className="py-6 p-2 sm:p-4">
      <div className="flex justify-end mb-4">
        <Button>
          <Plus /> Add Shipping method
        </Button>
      </div>
      <StatsCards items={statsData} />
      <ShippingCategories items={categoryData} />
      <ShippingManagementTable />
    </div>
  );
};

export default Shipping;
