/* eslint-disable @typescript-eslint/no-unused-vars */
import AddProductForm from "@/components/forms/AddProductForm";
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
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full md:w-auto">
          <SearchInput
            placeholder="Search product to add"
            className="w-full md:w-72"
          />

          <div className="flex gap-2 ">
            {/* <Button type="submit"> Publish Product</Button>
            <Button variant={"outline"}>
              {" "}
              <Save /> Save to draft
            </Button> */}
            <Button variant={"outline"}>
              <CirclePlus />{" "}
            </Button>
          </div>
        </div>
      </div>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
