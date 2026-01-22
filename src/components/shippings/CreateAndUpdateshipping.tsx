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
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetAllCategoriesQuery } from "@/redux/featured/categories/categoryApi";
import {
  useCreateShippingMutation,
  useUpdateShippingMutation,
} from "@/redux/featured/shipping/shippingApi";

type ShippingFormValues = {
  name: string;
  type?: "dropdown" | "color" | "text" | "number";
  amount?: number; // relation id (optional)
  global?: string;
};

export default function CreateAndUpdateShipping({
  children,
  type,
  updateShipping,
  statsRefetch,
  refetch,
}: {
  children: string;
  type?: "edit" | "create";
  updateShipping?: any;
  statsRefetch?: any;
  refetch?: any;
}) {
  const [updateShippingData, { isLoading: updateLoading }] =
    useUpdateShippingMutation();
  const [createShipping, { isLoading: crateLoading }] =
    useCreateShippingMutation();
  const { data: Categories, isLoading: CategoryLoading } =
    useGetAllCategoriesQuery();
  const [open, setOpen] = useState(false);

  const methods = useForm<ShippingFormValues>({
    defaultValues: {
      name: "",
      type: "text",
      amount: 0,
      global: "0",
    },
  });

  const { handleSubmit, register, control, reset } = methods;

  useEffect(() => {
    if (updateShipping) {
      reset({
        name: updateShipping.name || "",
        type: updateShipping.type || "text",
        amount: updateShipping.amount || 0,
        global: updateShipping.global || "0",
      });
    }
  }, [updateShipping, reset]);

  const onSubmit = async (data: ShippingFormValues) => {
    const submitToast = toast.loading(
      type === "edit" ? "Updating Shipping..." : "Creating Shipping..."
    );

    try {
      const payload = {
        name: data.name,
        type: data.type || "",
        amount: Number(data.amount) || 0,
        global: data.global,
      };

      if (!data.global) {
        return toast.error("Global is required");
      }
      if (!data.name) {
        return toast.error("name is required");
      }
      if (!data.type) {
        return toast.error("Type is required");
      }
      if (type === "edit" && updateShipping?._id) {
        await updateShippingData({
          id: updateShipping._id,
          updatedData: payload,
        }).unwrap();
        refetch();
        toast.success("Shipping updated successfully!", { id: submitToast });
      } else {
        try {
          const res = await createShipping(payload).unwrap();
          refetch();
          toast.success("Shipping created successfully!", { id: submitToast });
        } catch (error) {}
      }

      setOpen(false);
      reset();
      // statsRefetch()
      // refetch?.();
    } catch (error: any) {
      const errorMessage =
        error?.data?.errorSources?.[0]?.message ||
        error?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(errorMessage, { id: submitToast });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            {type === "edit" ? "Edit Shipping" : "Add Shipping"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Add new Shipping details here.
        </DialogDescription>

        <div className="overflow-y-auto max-h-[400px]">
          <div className="px-6 pt-4 pb-6">
            <FormProvider {...methods}>
              <form
                id="add-Shipping"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 mt-3 "
              >
                {/* Shipping Name */}
                <div className="space-y-2">
                  <Label>Shipping Name</Label>
                  <Input
                    placeholder="Shipping Name"
                    {...register("name", { required: true })}
                  />
                </div>
                {/* Type */}
                <div className="space-y-2">
                  <Label>Type</Label>
                  <select
                    {...register("type", { required: true })}
                    className="w-full rounded border px-3 py-2"
                  >
                    <option value="free">Free</option>
                    <option value="fixed">Fixed</option>
                    <option value="percentage">Percentage</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    placeholder="Type Amount"
                    {...register("amount", { required: true })}
                  />
                </div>{" "}
                <div className="space-y-2">
                  <Label>Select Global</Label>
                  <select
                    {...register("global", { required: true })}
                    className="w-full rounded border px-3 py-2"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                  </select>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button form="add-Shipping" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
