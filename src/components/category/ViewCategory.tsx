/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
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
import { ICategory } from "@/types/Category";
import Image from "next/image";

export default function ViewCategoryDetails({
  category,
}: {
  category: ICategory;
}) {
  const [hasReadToBottom, setHasReadToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const content = contentRef.current;
    if (!content) return;

    const scrollPercentage =
      content.scrollTop / (content.scrollHeight - content.clientHeight);
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            View Category Details
          </DialogTitle>
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="overflow-y-auto max-h-[500px]"
          >
            <DialogDescription asChild>
              <div className="flex flex-col items-center pb-6">
                {/* Banner */}
                <div className="relative w-full h-36 bg-gray-200">
                  <Image
                    src={
                      category.bannerImg instanceof File
                        ? URL.createObjectURL(category.bannerImg)
                        : category.bannerImg ||
                          "https://via.placeholder.com/600x200?text=No+Banner"
                    }
                    alt="Banner"
                    fill
                    className="object-cover border"
                  />
                  {/* Avatar */}
                  <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
                    {category.image ? (
                      <Image
                        src={
                          category.image instanceof File
                            ? URL.createObjectURL(category.image)
                            : category.image ||
                              "https://via.placeholder.com/600x200?text=No+Banner"
                        }
                        alt="Avatar"
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-300" />
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="mt-16 px-6 text-center space-y-3">
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <p className="text-sm text-gray-600">{category.details}</p>

                  {category.icon?.url && (
                    <div>
                      <a
                        href={category.icon.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        🔗 Icon
                      </a>
                    </div>
                  )}

                  {category.subCategories &&
                    category.subCategories.length > 0 && (
                      <div className="mt-4 text-left">
                        <strong>Sub Categories:</strong>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {category.subCategories.map((sub: any, i: number) => (
                            <li key={i}>
                              {typeof sub === "string" ? sub : sub.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="border-t px-6 py-4 sm:items-center">
          <DialogClose asChild>
            <Button type="button" >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
