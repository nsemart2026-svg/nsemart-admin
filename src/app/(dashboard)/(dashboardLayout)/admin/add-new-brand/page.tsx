/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateBrandMutation } from "@/redux/featured/brands/brandsApi";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface IconField {
  name: string;
  file: File | null;
}

interface ImageField {
  layout: "grid" | "slider";
  file: File | null;
}

const CreateBrand = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<IconField>({ name: "", file: null });
  const [image, setImage] = useState<ImageField>({
    layout: "grid",
    file: null,
  });
  const [createBrand, { isLoading }] = useCreateBrandMutation();

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Brand name is required!");
      return;
    }

    try {
      const formData = new FormData();
      const paylod = {
        name , icon :{
          name : icon.name,
        }
      } 
      formData.append("data", JSON.stringify(paylod as any));

      if (icon.file) {
        formData.append("iconImage", icon.file);
      }

      if (image.file) {
        if ( image.layout === "grid" ) formData.append("gridImage", image.file);
        if (image.layout === "slider" ) formData.append("sliderImage", image.file);
      }


      await createBrand(formData as any).unwrap();
      toast.success("Brand created successfully!");

      // Reset form
      setName("");
      setIcon({ name: "", file: null });
      setImage({ layout: "grid", file: null });
    } catch (error) {
      console.error("Error creating brand:", error);
      toast.error("Failed to create brand!");
    }
  };

  return (
    <div className="flex  ">
      <div className="w-full   ">
        <CardContent className="">
          <div className="space-y-6">
            {/* Brand Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name
              </label>
              <Input
                placeholder="Enter brand name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

              <div className="flex gap-4 sm:flex-row flex-col">



            <div className="bg-gray-50 w-full  p-5 rounded-xl border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Brand Image</h3>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Layout
                  </label>
                  <Select
                    value={image.layout}
                    onValueChange={(value) =>
                      setImage({ ...image, layout: value as "grid" | "slider" })
                    }
                  >
                    <SelectTrigger className="h-10 px-3 bg-white w-full rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="slider">Slider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="sm:col-span-9 space-y-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Upload Image
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImage({ ...image, file: e.target.files?.[0] || null })
                    }
                    className="h-10 w-full rounded-lg border border-gray-300 bg-white focus:ring-1 "
                  />
                  {/* Preview */}
                  {image.file && (
                    <Image
                      src={URL.createObjectURL(image.file)}
                      alt="Brand Preview"
                      className="mt-2 h-32 w-auto rounded-lg border border-gray-300 object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Brand Icon */}
            <div className="bg-gray-50 w-full  p-5 rounded-xl border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Brand Icon (Optional)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Icon Name
                  </label>
                  <Input
                    placeholder="Enter icon name"
                    value={icon.name}
                    onChange={(e) => setIcon({ ...icon, name: e.target.value })}
                    className="h-10 rounded-lg border border-gray-300 bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Upload Icon
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setIcon({ ...icon, file: e.target.files?.[0] || null })
                    }
                    className="h-10 rounded-lg border border-gray-300 bg-white focus:ring-1 focus:ring-blue-500"
                  />
                  {/* Preview */}
                  {icon.file && (
                    <Image
                      src={URL.createObjectURL(icon.file)}
                      alt="Icon Preview"
                      className="mt-2 h-20 w-20 rounded-lg border border-gray-300 object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
              </div>
            {/* Brand Image */}

            {/* Submit Button */}
            <Button
              className="w-full h-12 mt-4 bg-black hover:bg-zinc-700 text-white font-semibold rounded-lg"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Brand"}
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default CreateBrand;
