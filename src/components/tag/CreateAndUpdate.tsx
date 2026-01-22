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
import { Textarea } from "@/components/ui/textarea";
import { useForm, FormProvider } from "react-hook-form";
import { ImagePlusIcon, XIcon } from "lucide-react";
import { FileWithPreview, useFileUpload } from "@/hooks/use-file-upload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  useCreatetagMutation,
  useUpdateTagMutation,
} from "@/redux/featured/tags/tagsApi";
import Image from "next/image";
import { createTagFrontendSchema } from "./tagscema";
import z from "zod";

export type Option = {
  value: string;
  label: string;
  disable?: boolean;
};

type TagFormValues = {
  name: string;
  details: string;
  type: string;
  iconName?: string;
  iconUrl?: string;
};

export default function CreateAndUpdateTag({
  children,
  type,
  updateTag,
  refetch,
  tagStatusRefetch,
}: {
  children: string;
  type?: string;
  updateTag?: any;
  refetch?: any;
  tagStatusRefetch?: any;
}) {
  const [createTag, { isLoading, isSuccess }] = useCreatetagMutation();
  const [updatetag, { isLoading: EditLoading }] = useUpdateTagMutation();
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const [iconImg, setIconImg] = useState<FileWithPreview | null>(null);
  const [open, setOpen] = useState(false);
  const [deletedImage, setDeletedImage] = useState<string>("");
  // TypeScript type
  type TagFormValues = z.infer<typeof createTagFrontendSchema>;
  const methods = useForm<TagFormValues>({
    defaultValues: {
      name: "",
      type: "",
      details: "",
      iconName: "",
      iconUrl: "",
    },
  });

  const { handleSubmit, register, setValue, watch, reset } = methods;

  useEffect(() => {
    if (updateTag) {
      reset({
        name: updateTag.name || "",
        details: updateTag.details || "",
        type: updateTag.type || "",
        iconName: updateTag.icon?.name || "",
        iconUrl: updateTag.icon?.url || "",
      });
    }
  }, [updateTag, reset]);

  useEffect(() => {
    if (!updateTag) return;

    if (image && updateTag.image) {
      setDeletedImage(updateTag.image);
    }
  }, [image, updateTag]);

  const onSubmit = async (data: TagFormValues) => {
    const submitToast = toast.loading(
      type === "edit" ? "Updating Tag..." : "Creating Tag..."
    );

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("details", data.details);
      formData.append("type", data.type || "");
      formData.append("icon[name]", data.iconName || "");
      // Only append icon file if user uploaded a new one
      if (iconImg?.file) formData.append("icon", iconImg.file as File);
      else if (updateTag?.icon?.url)
        formData.append("iconUrl", updateTag.icon.url);

      if (image?.file) formData.append("image", image.file as File);
      else if (updateTag?.image) formData.append("image", updateTag.image);

      if (updateTag) formData.append("deletedImage", deletedImage || "");

      if (type === "edit" && updateTag?._id) {
        await updatetag({ id: updateTag._id, updatedData: formData }).unwrap();
        toast.success("Tag updated successfully!", { id: submitToast });
      } else {
        await createTag(formData).unwrap();
        toast.success("Tag created successfully!", { id: submitToast });
        tagStatusRefetch?.();
      }

      setOpen(false);
      reset();
      setImage(null);
      setIconImg(null);
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
            {type === "edit" ? "Edit Tag" : "Add Tag"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Add new Tag details here.
        </DialogDescription>

        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6 ">
            <div className="max-h-[300px]">
              <BannerImage setImage={setImage} updateTag={updateTag} />
              <FormProvider {...methods}>
                <form
                  id="add-Tag"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 mt-3"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1 space-y-2">
                      <Label>Tag Name</Label>
                      <Input
                        placeholder="Tag Name"
                        {...register("name", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Tag Type</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("type", value, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {(types ?? []).length > 0 ? (
                          types.map((type, index) => (
                            <SelectItem key={index} value={type}>
                              {type}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="no-brands">
                            No tags available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Details</Label>
                    <Textarea
                      placeholder="Tag Details"
                      {...register("details", { required: true })}
                    />
                  </div>

                  <div className="*:not-first:mt-2">
                    <div className="flex-1 space-y-2">
                      <Label>Icon Name (Optional)</Label>
                      <Input
                        placeholder="Icon name"
                        {...register("iconName")}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Upload Icon (Optional)</Label>
                      <IconUpload
                        setIconImg={setIconImg}
                        updateTag={updateTag}
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
          <Button form="add-Tag" type="submit">
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function IconUpload({
  setIconImg,
  updateTag,
}: {
  setIconImg: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
  updateTag?: any;
}) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      initialFiles: [],
    });

  useEffect(() => {
    if (files.length > 0) setIconImg(files[0]);
    else setIconImg(null);
  }, [files, setIconImg]);

  const currentImage = files[0]?.preview || null;

  const imageUrl =
    currentImage ||
    updateTag?.icon?.url ||
    "https://via.placeholder.com/80?text=No+Icon";

  return (
    <div className="relative h-24 w-24 rounded-full border overflow-hidden bg-gray-100">
      {/* Icon Preview */}
      <Image
        src={imageUrl}
        alt="Icon preview"
        fill
        className="object-cover"
        sizes="96px"
      />

      {/* Overlay buttons */}
      <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
        <button
          type="button"
          className="flex items-center justify-center rounded-full bg-black/70 text-white w-7 h-7"
          onClick={openFileDialog}
        >
          <ImagePlusIcon size={14} />
        </button>
        {currentImage && (
          <button
            type="button"
            className="flex items-center justify-center rounded-full bg-black/70 text-white w-7 h-7"
            onClick={() => removeFile(files[0]?.id)}
          >
            <XIcon size={14} />
          </button>
        )}
      </div>

      {/* Hidden Input */}
      <input {...getInputProps()} className="sr-only" />
    </div>
  );
}
function BannerImage({
  setImage,
  updateTag,
}: {
  setImage: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
  updateTag?: any;
}) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      initialFiles: [],
    });

  useEffect(() => {
    if (files && files.length > 0) {
      setImage(files[0]);
    } else {
      setImage(null);
    }
  }, [files, setImage]);

  const currentImage = files[0]?.preview || null;

  return (
    <div className="h-32">
      <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden">
        {currentImage ? (
          <Image
            className="size-full object-cover"
            src={currentImage}
            alt={
              files[0]?.preview
                ? "Preview of uploaded image"
                : "Default profile background"
            }
            width={512}
            height={96}
          />
        ) : updateTag ? (
          <Image
            className="size-full object-cover"
            src={
              updateTag?.image ||
              "https://via.placeholder.com/512x96?text=No+Banner"
            }
            alt="Tag Banner"
            width={512}
            height={96}
          />
        ) : (
          <Image
            className="size-full object-cover"
            src="https://via.placeholder.com/512x96?text=No+Banner"
            alt="Default Banner"
            width={512}
            height={96}
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
            onClick={openFileDialog}
            aria-label={currentImage ? "Change image" : "Upload image"}
          >
            <ImagePlusIcon size={16} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove image"
            >
              <XIcon size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload image file"
      />
    </div>
  );
}
