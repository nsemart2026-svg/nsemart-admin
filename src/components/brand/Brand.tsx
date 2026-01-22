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
import toast from "react-hot-toast";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ImagePlusIcon, XIcon } from "lucide-react";
import { FileWithPreview, useFileUpload } from "@/hooks/use-file-upload";
import {
  useCreateBrandMutation,
  useUpdateBrandMutation,
} from "@/redux/featured/brands/brandsApi";

type TImageItem = {
  layout: "grid" | "slider";
  image: string;
};

type BrandFormValues = {
  name: string;
  iconName?: string;
  iconUrl?: string;
  images: TImageItem[];
};

export default function Brand({
  children,
  type,
  editBrand,
  refetch,
}: {
  children: string;
  type?: string;
  editBrand?: any;
  refetch: any;
}) {
  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();

  const [iconImg, setIconImg] = useState<FileWithPreview | null>(null);
  const [images, setImages] = useState<FileWithPreview[]>([]);
  const [open, setOpen] = useState(false);

  const methods = useForm<BrandFormValues>({
    defaultValues: {
      name: "",
      iconName: "",
      iconUrl: "",
      images: [],
    },
  });

  const { handleSubmit, register, reset, setValue } = methods;

  useEffect(() => {
    if (editBrand) {
      reset({
        name: editBrand.name || "",
        iconName: editBrand.icon?.name || "",
        iconUrl: editBrand.icon?.url || "",
        images: editBrand.images || [],
      });
    }
  }, [editBrand, reset]);

  const onSubmit = async (data: BrandFormValues) => {
    if (!data.name || data.name.trim() === "") {
      toast.error("Brand name is required!");
      return;
    }

    const toastId = toast.loading(
      type === "edit" ? "Updating brand..." : "Creating brand..."
    );

    try {
      // Ensure payload matches backend schema
      const payload = {
        name: data.name,
        icon: {
          name: data.iconName || editBrand?.icon?.name || "Default Icon",
          url: iconImg?.file
            ? "uploaded_file_url_placeholder" // replace with real upload logic
            : editBrand?.icon?.url || "",
        },
        images:
          data.images.length > 0
            ? data.images.map((img) => ({
                layout: img.layout || "grid",
                image: img.image,
              }))
            : editBrand?.images?.map((img: any) => ({
                layout: img.layout || "grid",
                image: img.image,
              })) || [],
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      if (iconImg?.file) formData.append("icon", iconImg.file as File);
      images.forEach((img, i) => formData.append(`images[${i}]`, img.file as File));

      if (type === "edit" && editBrand?._id) {
        await updateBrand({ id: editBrand._id, data: formData }).unwrap();
        toast.success("Brand updated successfully!", { id: toastId });
      } else {
        await createBrand(formData).unwrap();
        toast.success("Brand created successfully!", { id: toastId });
      }

      setOpen(false);
      reset();
      setIconImg(null);
      setImages([]);
      refetch?.();
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!", {
        id: toastId,
      });
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
            {type === "edit" ? "Edit Brand" : "Add Brand"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Add or edit brand details.
        </DialogDescription>

        <div className="overflow-y-auto px-6 py-4">
          <FormProvider {...methods}>
            <form
              id="add-brand"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* Brand Name */}
              <div>
                <Label>Brand Name</Label>
                <Input
                  placeholder="Enter brand name"
                  {...register("name", { required: true })}
                />
              </div>

              {/* Icon Name */}
              <div>
                <Label>Icon Name (optional)</Label>
                <Input placeholder="Icon name" {...register("iconName")} />
              </div>

              {/* Icon Upload */}
              <div>
                <Label>Upload Icon Image</Label>
                <IconUpload setIconImg={setIconImg} editBrand={editBrand} />
              </div>

              {/* Images Section */}
              <div className="space-y-2">
                <Label>Brand Images</Label>
                <ImagesUpload
                  setImages={setImages}
                  editBrand={editBrand}
                  setValue={setValue}
                />
              </div>
            </form>
          </FormProvider>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button form="add-brand" type="submit">
            {isCreating || isUpdating ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 🔹 Icon Upload Component
function IconUpload({
  setIconImg,
  editBrand,
}: {
  setIconImg: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
  editBrand?: any;
}) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      multiple: false,
    });

  useEffect(() => {
    if (files.length > 0) setIconImg(files[0]);
    else setIconImg(null);
  }, [files, setIconImg]);

  const currentImage = files[0]?.preview;
  const imageUrl =
    currentImage ||
    editBrand?.icon?.url ||
    "https://via.placeholder.com/64?text=Icon";

  return (
    <div className="relative w-20 h-20 flex items-center justify-center overflow-hidden rounded-md bg-muted cursor-pointer">
      <Image
        src={imageUrl}
        alt="Brand Icon"
        className="object-cover w-full h-full"
        width={80}
        height={80}
      />
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 hover:opacity-100 transition">
        <button
          type="button"
          onClick={openFileDialog}
          className="rounded-full bg-white/80 p-1 hover:bg-white"
        >
          <ImagePlusIcon size={16} className="text-black" />
        </button>
        {currentImage && (
          <button
            type="button"
            onClick={() => removeFile(files[0].id)}
            className="rounded-full bg-white/80 p-1 hover:bg-white"
          >
            <XIcon size={16} className="text-black" />
          </button>
        )}
      </div>
      <input {...getInputProps()} className="sr-only" />
    </div>
  );
}

// 🔹 Multiple Brand Images Upload
function ImagesUpload({
  setImages,
  editBrand,
  setValue,
}: {
  setImages: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  editBrand?: any;
  setValue: any;
}) {
  const [{ files }, { openFileDialog, removeFile, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      multiple: true,
    });

  useEffect(() => {
    if (files.length > 0) {
      setImages(files);
      setValue(
        "images",
        files.map((f) => ({ layout: "grid", image: f.preview }))
      );
    } else {
      setImages([]);
      setValue("images", []);
    }
  }, [files, setImages, setValue]);

  const existingImages = editBrand?.images || [];

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {existingImages.map((img: any, idx: number) => (
          <div key={idx} className="relative w-20 h-20">
            <Image
              src={img.image}
              alt="Existing"
              className="object-cover rounded-md"
              width={80}
              height={80}
            />
            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1 rounded">
              {img.layout}
            </span>
          </div>
        ))}

        {files.map((file) => (
          <div
            key={file.id}
            className="relative w-20 h-20 rounded-md overflow-hidden"
          >
            {file.preview && (
              <Image
                src={file.preview as string}
                alt="Upload preview"
                className="object-cover w-full h-full"
                width={80}
                height={80}
                unoptimized
              />
            )}
            <button
              type="button"
              onClick={() => removeFile(file.id)}
              className="absolute top-1 right-1 bg-white/80 p-1 rounded-full"
            >
              <XIcon size={12} className="text-black" />
            </button>
          </div>
        ))}

        <div
          onClick={openFileDialog}
          className="w-20 h-20 flex items-center justify-center border rounded-md cursor-pointer hover:bg-muted"
        >
          <ImagePlusIcon size={20} />
        </div>
      </div>

      <input {...getInputProps()} className="sr-only" />
    </div>
  );
}
