import React from "react";
import { Button } from "../ui/button";
import ReusableTable from "./ReusableTable";
import { shippingColumns, shippingData } from "@/data/shipping-data";
import SearchInput from "../shared/SearchInput";

export type ShippingItem = {
  name: string;
  carrier: string;
  cost: string;
  duration: string;
  region: string;
  orders: number;
  status: "Active" | "Inactive";
};

const ShippingManagementTable = () => {
  return (
    <section className="mt-8 space-y-4 bg-white p-4 rounded-md">
      <div>
        <h3 className="text-2xl font-semibold mb-2">Shipping Carriers</h3>
        <p className="text-sm text-muted-foreground">
          Overview of integrated shipping partners
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center my-8">
        <SearchInput
          placeholder="Search shipping methods..."
          className="w-full"
        />
        <div className="flex gap-2 text-gray-500">
          <Button variant="outline">Filter by Type</Button>
          <Button variant="outline">Sort by Usage</Button>
        </div>
      </div>

      <ReusableTable<ShippingItem>
        data={shippingData}
        columns={shippingColumns}
      />
    </section>
  );
};

export default ShippingManagementTable;
