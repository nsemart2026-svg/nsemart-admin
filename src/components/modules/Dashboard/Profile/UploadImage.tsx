/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Image, Cloud, Images } from "lucide-react";
import { Button } from "@/components/ui/button";

const UploadImage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center p-6 
     "
    >
      <div className="mb-4 flex items-center justify-center">
        <Image size={60}/>
      </div>

      {/* Buttons Below */}
      <div className="flex flex-col lg:flex-row gap-4">
        <Button variant={"outline"}>
          <Images />
          <span>Upload from Gallery</span>
        </Button>
        <Button variant={"outline"}>
          <Cloud />
          <span>Upload from Drive</span>
        </Button>
      </div>
    </div>
  );
};

export default UploadImage;
