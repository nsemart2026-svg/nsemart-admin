/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Dispatch, SetStateAction, useRef, useState } from 'react';
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
import { ITag } from '@/types/tags';
import Image from 'next/image';

export default function ViewTagDetails({
  tag
}: {
    tag: ITag;
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
            View tag Details
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
                      tag?.image ||
                      'https://via.placeholder.com/600x200?text=No+Banner'
                    }
                    alt="Banner"
                    className="w-full h-full object-cover border"
                  />
                </div>

                {/* Tag Details Card */}
                <div className="mt-1 w-full mx-auto rounded-2xl bg-gradient-to-br from-white/80 to-gray-50/70 shadow-xl border border-gray-200 backdrop-blur p-8 space-y-6">
                  {/* Title */}
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {tag.name}
                    </h2>
                    <span className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                      {tag.type}
                    </span>
                  </div>

                  {/* Details */}
                  <p className="text-gray-600 text-base leading-relaxed">
                    {tag.details || 'No details available for this tag.'}
                  </p>

                  {/* Icon Section */}
                  {tag.icon?.url && (
                    <div className="flex flex-col items-center gap-3 pt-4 border-t">
                      {/* Icon Preview */}
                      <div className="w-16 h-16 rounded-xl border shadow-md flex items-center justify-center bg-white">
                        <Image
                          src={tag.icon.url}
                          alt={tag.icon.name || 'Tag Icon'}
                          className="w-10 h-10 object-contain"
                        />
                      </div>

                      {/* Icon Info */}
                      <div className="text-center space-y-1">
                        {tag.icon.name && (
                          <p className="text-sm font-medium text-gray-800">
                            {tag.icon.name}
                          </p>
                        )}
                        <a
                          href={tag.icon.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                          🔗 View Icon
                        </a>
                      </div>
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
