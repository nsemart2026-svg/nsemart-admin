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
import {
  useCreateAttributeMutation,
  useUpdateAttributeMutation,
} from "@/redux/featured/attribute/attributeApi";
import { useGetAllCategoriesQuery } from "@/redux/featured/categories/categoryApi";

type AttributeFormValues = {
  name: string;
  type?: "dropdown" | "color" | "text" | "number";
  category?: string; // relation id (optional)
  required?: boolean;
  attributes: {
    value: string;
    meta: string;
  }[];
};

export default function CreateAndUpdateAttribute({
  children,
  type,
  updateAttribute,
  statsRefetch,
  refetch,
}: {
  children: string;
  type?: "edit" | "create";
  updateAttribute?: any;
  statsRefetch?: any;
  refetch?: any;
}) {
  const [createAttribute, { isLoading }] = useCreateAttributeMutation();
  const [updateAttributeOnDatabase, { isLoading: updateLoading }] =
    useUpdateAttributeMutation();
  const { data: Categories, isLoading: CategoryLoading } =
    useGetAllCategoriesQuery();
  const [open, setOpen] = useState(false);

  const methods = useForm<AttributeFormValues>({
    defaultValues: {
      name: "",
      type: "text",
      category: "",
      required: false,
      attributes: [{ value: "", meta: "" }],
    },
  });

  const { handleSubmit, register, control, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  useEffect(() => {
    if (updateAttribute) {
      reset({
        name: updateAttribute.name || "",
        type: updateAttribute.type || "text",
        category: updateAttribute.category?._id || "",
        required: updateAttribute.required || false,
        attributes: updateAttribute.attributes || [{ value: "", meta: "" }],
      });
    }
  }, [updateAttribute, reset]);

  const onSubmit = async (data: AttributeFormValues) => {
    const submitToast = toast.loading(
      type === "edit" ? "Updating Attribute..." : "Creating Attribute..."
    );

    try {
      const payload = {
        name: data.name,
        type: data.type,
        category: data.category || null,
        required: data.required,
        attributes: data.attributes,
      };

      if (type === "edit" && updateAttribute?._id) {
        await updateAttributeOnDatabase({
          id: updateAttribute._id,
          updateDetails: payload,
        }).unwrap();

        toast.success("Attribute updated successfully!", { id: submitToast });
      } else {
        await createAttribute(payload).unwrap();

        toast.success("Attribute created successfully!", { id: submitToast });
      }

      setOpen(false);
      reset();
      statsRefetch();
      refetch?.();
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
            {type === "edit" ? "Edit Attribute" : "Add Attribute"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Add new Attribute details here.
        </DialogDescription>

        <div className="overflow-y-auto max-h-[400px]">
          <div className="px-6 pt-4 pb-6">
            <FormProvider {...methods}>
              <form
                id="add-Attribute"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 mt-3 "
              >
                {/* Attribute Name */}
                <div className="space-y-2">
                  <Label>Attribute Name</Label>
                  <Input
                    placeholder="Attribute Name"
                    {...register("name", { required: true })}
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label>Type</Label>
                  <select
                    {...register("type")}
                    className="w-full rounded border px-3 py-2"
                  >
                    <option value="text">Text</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="color">Color</option>
                    <option value="number">Number</option>
                  </select>
                </div>

                {/* Category Dropdown */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    {...register("category")}
                    className="w-full rounded border px-3 py-2"
                  >
                    <option value="">Select Category</option>
                    {!CategoryLoading &&
                      Categories?.map((cat: any) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Dynamic Attributes */}
                <div className="space-y-4">
                  <Label>Attributes</Label>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-3 border p-3 rounded"
                    >
                      <Input
                        placeholder="Value (e.g. Red)"
                        {...register(`attributes.${index}.value`, {
                          required: true,
                        })}
                      />
                      <Input
                        placeholder="Meta (e.g. #FF0000)"
                        {...register(`attributes.${index}.meta`, {
                          required: true,
                        })}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => append({ value: "", meta: "" })}
                  >
                    + Add Attribute
                  </Button>
                  {/* Required */}
                  <div className="flex items-center gap-2">
                    <input type="checkbox" {...register("required")} />
                    <Label>Required</Label>
                  </div>
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
          <Button form="add-Attribute" type="submit">
            {isLoading || updateLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
