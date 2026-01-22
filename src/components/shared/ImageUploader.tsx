/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CirclePlus, CircleX, ImageIcon, Repeat2Icon } from "lucide-react";
import { MdImage, MdPhotoAlbum } from "react-icons/md";
import { Product } from "@/types/Product";

type ImageUploaderProps = {
  setFeaturedImage: React.Dispatch<React.SetStateAction<File | null>>;
  setGalleryImage: React.Dispatch<React.SetStateAction<File[]>>;
  EditableProcut?: Product;
  setDeletedImages?: any;
  deletedImages?: any
};

export const ImageUploader = ({
  setGalleryImage,
  setFeaturedImage,
  EditableProcut,
  setDeletedImages,
  deletedImages,
}: ImageUploaderProps) => {
  const [featuredImg, setFeaturedImg] = useState<File | null>(null);
  const [featuredPreview, setFeaturedPreview] = useState<string>('');

  const [gallery, setGallery] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  // main image upload
  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setFeaturedImg(file);
    setFeaturedPreview(URL.createObjectURL(file));
  };

  const handleFeaturedReplace = () => {
    setFeaturedImg(null);
    setFeaturedPreview('');
   if (EditableProcut && featuredImg) {
     const oldFeatured = EditableProcut.featuredImg;
     setDeletedImages((prev: string[]) => {
       const filtered = prev.filter(img => img !== oldFeatured);
       return [...filtered, oldFeatured];
     });
   }
  };

  // gallery upload
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));

    setGallery(prev => [...prev, ...newFiles]);
    setGalleryPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleGalleryRemove = (index: number) => {

    // for Edit only
    const removedImage = EditableProcut?.gallery?.[index];
    if (removedImage) {
      setDeletedImages((prev: string[]) => {
        if (prev.includes(removedImage)) return prev;
        return [...prev, removedImage];
      });
    }
   

    // for both edit and add product
    setGallery(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setGalleryImage(gallery);
    setFeaturedImage(featuredImg);
    const removedFeaturedImage = EditableProcut?.featuredImg;

    if (EditableProcut && featuredImg && removedFeaturedImage) {
      setDeletedImages((prev: string[]) => {
        if (prev.includes(removedFeaturedImage)) return prev;
        return [...prev, removedFeaturedImage];
      });
    }
  }, [gallery, featuredImg, setGalleryImage, setFeaturedImage, EditableProcut, setDeletedImages]);

  return (
    <div>
      {/* Featured Image */}
      <label className="block font-medium mb-2">Featured Image</label>
      <div className="border rounded-md p-4 ">
        <div className="flex justify-center">
          <div className="relative w-full h-64 border rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
            {featuredPreview ? (
              <Image
                src={featuredPreview}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src={EditableProcut?.featuredImg as string}
                alt="Preview"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-xs text-center mt-1.5">
          SVG, PNG, JPG (max. 4MB)
        </p>

        <div className="flex justify-between mt-4 gap-0.5">
          <label className="px-3 py-1 border rounded-md text-sm flex items-center gap-2 cursor-pointer">
            <ImageIcon className="hidden md:flex" /> Browse
            <input
              type="file"
              accept="image/*"
              onChange={handleFeaturedChange}
              className="hidden"
            />
          </label>

          <button
            type="button"
            className="px-3 py-1 border rounded-md text-sm flex items-center gap-2"
            onClick={handleFeaturedReplace}
          >
            <Repeat2Icon className="hidden md:flex" /> Replace
          </button>
        </div>
      </div>

      {/* Gallery Images */}
      <div className="flex justify-between items-center">
        <label className="block font-medium mt-6 mb-2">Gallery Images</label>
        <p className="text-muted-foreground text-xs text-center mt-1.5">
          SVG, PNG, JPG (max. 4MB)
        </p>
      </div>
      <div className="mt-2 flex gap-2 flex-wrap">
        {EditableProcut &&
          EditableProcut?.gallery
            ?.filter(img => !deletedImages.includes(img))
            .map((img, index) => (
              <div key={index} className="relative w-20 h-20 border">
                <Image
                  src={img}
                  alt={`gallery-${index}`}
                  fill
                  className="object-cover rounded"
                />
                <CircleX
                  className="absolute text-black/50 top-1 right-1 cursor-pointer"
                  onClick={() => handleGalleryRemove(index)}
                />
              </div>
            ))}

        {galleryPreviews.map((img, index) => (
          <div key={index} className="relative w-20 h-20 border">
            <Image
              src={img}
              alt={`gallery-${index}`}
              fill
              className="object-cover rounded"
            />
            <CircleX
              className="absolute text-black/50 top-1 right-1 cursor-pointer"
              onClick={() => handleGalleryRemove(index)}
            />
          </div>
        ))}

        {/* Add image */}
        <label
          className="w-40 h-20 border-dashed border-2 border-gray-300 rounded flex flex-col
          items-center justify-center text-sm cursor-pointer"
        >
          <CirclePlus className="bg-black text-white rounded-full" />
          Add Image
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};
