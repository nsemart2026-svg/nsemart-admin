/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { useUpdateProductMutation } from "@/redux/featured/products/productsApi";

export type Option = {
  value: string;
  label: string;
  disable?: boolean;
};

type FormValues = {
  quantity: string;
};

export default function UpdateStock({
  children,
  Productdata: product,
  refetch,
  InventoryStatusRefetch,
}: {
  children: string;
  Productdata: any;
  refetch?: any;
  InventoryStatusRefetch?: any;
}) {
  const [open, setOpen] = useState(false);
  const [updateProductQuentity, { isLoading }] = useUpdateProductMutation();
  const methods = useForm<FormValues>({
    defaultValues: {
      quantity: "",
    },
  });

  const { handleSubmit, register, setValue, watch, reset } = methods;

  const ProductsData = {
    shopId: product.shopId,
    featuredImg: product.featuredImg,
    gallery: product.gallery || "",
    video: product.video || "",
    brandAndCategories: {
      brand: product.brandAndCategories.brand?._id || "",
      categories: product.brandAndCategories.categories.map(
        (cat: any) => cat._id
      ),
      tags: product.brandAndCategories.tags.map((tag: any) => tag._id),
    },
    description: {
      name: product.description.name || "",
      slug: product.description.slug || "",
      unit: product.description.unit || "",
      description: product.description.description || "",
      status: product.description.status || "",
    },
    productType: product.productType,
    productInfo: {
      price: product.productInfo.price || "",
      salePrice: product.productInfo.salePrice || 0,
      quantity: product.productInfo.quantity,
      sku: product.productInfo.sku || "",
      width: product.productInfo.width || "",
      height: product.productInfo.height || "",
      length: product.productInfo.length || "",
      isExternal: product.productInfo.isExternal || false,
      external: {
        productUrl: product.productInfo.external?.productUrl || "",
        buttonLabel: product.productInfo.external?.buttonLabel || "Buy now",
      },
      status: product.description.status,
    },
    specifications:
      product?.specifications && product?.specifications.length > 0
        ? product?.specifications
        : [{ key: "", value: "" }],
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const newQuantity =
        Number(product.productInfo.quantity) + Number(data.quantity);

      const newFormData = new FormData();

      const payload = {
        ...ProductsData,
        productInfo: {
          ...product.productInfo,
          quantity: newQuantity,
        },
      };

      newFormData.append("data", JSON.stringify(payload));

      const res = await updateProductQuentity({
        id: product._id,
        formData: newFormData,
      }).unwrap();

      reset();
      setOpen(false);
      refetch?.();
      InventoryStatusRefetch?.();
    } catch (error) {}
  };

  const types = [
    "Marketing",
    "Status",
    "Promotion",
    "Quality",
    "Feature",
    "Exclusivity",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent className="flex  flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Add Product Stock
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Add new Tag details here.
        </DialogDescription>

        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6 ">
            <div className="max-h-[300px]">
              <FormProvider {...methods}>
                <form
                  id="update-stock"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 mt-3"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {/* Current Quantity */}
                    <div className="flex-1 space-y-2">
                      <Label>Current Quantity</Label>
                      <Input
                        value={product.productInfo.quantity}
                        readOnly
                        className="bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    {/* Update Quantity */}
                    <div className="flex-1 space-y-2">
                      <Label>Update Quantity</Label>
                      <Input
                        type="number"
                        placeholder="Enter new quantity"
                        {...register("quantity", { required: true })}
                      />
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button form="update-stock" type="submit">
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
