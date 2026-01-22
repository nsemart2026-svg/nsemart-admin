/* eslint-disable @typescript-eslint/no-unused-vars */
import VendorAddProductForm from "@/components/forms/VendorAddProductForm";
import SearchInput from "@/components/shared/SearchInput";
import { Button } from "@/components/ui/button";
import { CirclePlus, Save } from "lucide-react";
const AddProductPage = () => {
  return (
    <div className="py-6 p-2 sm:p-4">
      {/* Top Bar */}
      <div
        className="flex flex-col xl:flex-row items-center justify-between 
      mb-6 gap-4"
      >
        <div className="text-2xl font-semibold">Add New Product</div>
      </div>
      <VendorAddProductForm />
    </div>
  );
};

export default AddProductPage;
