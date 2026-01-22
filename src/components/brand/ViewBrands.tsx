'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { IBrand } from '@/types/brands';


export default function ViewBrandDetails({ brand }: { brand: IBrand }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasReadToBottom, setHasReadToBottom] = useState(false);

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
        <Button variant="outline" size="sm">
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Brand Details
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
                  {brand.images?.[0]?.image ? (
                    <Image
                      src={brand.images[0].image}
                      alt={brand.name}
                      fill
                      className="object-cover border"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                      No Banner
                    </div>
                  )}

                  {/* Logo/Icon */}
                  <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
                    {brand.icon?.url ? (
                      <Image
                        src={brand.icon.url}
                        alt={brand.icon.name}
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-300" />
                    )}
                  </div>
                </div>

                {/* Brand Info */}
                <div className="mt-16 px-6 text-center space-y-3">
                  <h2 className="text-xl font-semibold">{brand.name}</h2>

                  {brand.icon?.url && (
                    <div>
                      <a
                        href={brand.icon.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        🔗 Icon
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="border-t px-6 py-4 sm:items-center">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
