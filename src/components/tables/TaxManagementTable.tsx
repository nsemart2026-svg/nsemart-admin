import { taxColumns, taxData } from "@/data/tax-data";
import { Button } from "../ui/button";
import ReusableTable from "./ReusableTable";
import SearchInput from "../shared/SearchInput";
import { Input } from "../ui/input";

export type TaxRateItem = {
  name: string;
  rate: string;
  type: string;
  region: string;
  products: number;
  status: "Active" | "Inactive";
};

const TaxManagementTable = () => {
  return (
    <section className="mt-8 space-y-4 bg-white p-4 rounded-md">
      <div>
        <h3 className="text-2xl font-semibold mb-2">Tax Management</h3>
        <p className="text-sm text-muted-foreground">
          Overview of different tax rate categories
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center my-8">
        <SearchInput placeholder="Search shops" className="w-full" />
        <div className="flex gap-2 text-gray-500">
          <Input placeholder="Search..." className="w-full bg-white" />
          <div className="flex gap-2">
            <Button variant="outline">Filter by Type</Button>
            <Button variant="outline">Sort by Usage</Button>
          </div>
        </div>
      </div>

      <ReusableTable<TaxRateItem> data={taxData} columns={taxColumns} />
    </section>
  );
};

export default TaxManagementTable;
