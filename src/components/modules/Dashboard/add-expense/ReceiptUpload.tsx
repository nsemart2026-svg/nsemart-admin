import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import React from "react";

const ReceiptUpload = () => {
  return (
    <div className="border rounded-lg p-6 space-y-4 text-center bg-white ">
      <h2 className="font-semibold text-2xl">Receipt Upload</h2>
      <div
        className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center 
      gap-2 text-muted-foreground"
      >
        <Receipt size={48} />
        <Button variant={"outline"}>Upload Receipt</Button>
        <p className="text-xs">Drag and drop or click to upload</p>
      </div>
    </div>
  );
};

export default ReceiptUpload;
