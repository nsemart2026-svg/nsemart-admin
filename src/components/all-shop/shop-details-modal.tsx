/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import Image from "next/image";

interface ShopDetailsModalProps {
  shop: any; // API theke asha shop object
  isOpen: boolean;
  onClose: () => void;
}

export function ShopDetailsModal({ shop, isOpen, onClose }: ShopDetailsModalProps) {
  if (!shop) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl  p-4 sm:p-6  sm:m-0  ">
        <DialogHeader className="relative">
          <DialogTitle className="text-lg md:text-xl font-semibold">
            {shop.basicInfo?.name}
          </DialogTitle>
        </DialogHeader>

        {/* Cover Image */}
        {shop.coverImage && (
          <div className="w-full h-32 relative rounded-md overflow-hidden">
            <Image
              src={shop.coverImage}
              alt={shop.basicInfo?.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Logo */}
        {shop.logo && (
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-20 bg-black md:h-20 relative rounded-full overflow-hidden mx-auto -mt-20 border-2 border-white shadow-md">
            <Image
              src={shop.logo}
              alt={shop.basicInfo?.name}
              fill
              className="object-cover"
            />
          </div>
        )}

            <div className="overflow-y-auto bg-[#F9FAFB] max-h-[40vh] p-2 sm:p-4 ">
                     {/* Description */}
                     <p className="font-semibold bg-[#DBEAFE]">Description:</p>
        <p className="text-gray-700 text-sm sm:text-base mt-4  sm:text-left">
          {shop.basicInfo?.description}
        </p>

        {/* Info Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm sm:text-base text-gray-600">
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Slug:</p>
            <p>{shop.basicInfo?.slug}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Status:</p>
            <p>{shop.status}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Approved:</p>
            <p>{shop.isApproved ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Commission Rate:</p>
            <p>{shop.commissionRate}%</p>
          </div>

          <div>
            <p className="font-semibold bg-[#DBEAFE]">Street:</p>
            <p>{shop.shopAddress?.streetAddress}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">City:</p>
            <p>{shop.shopAddress?.city}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">State:</p>
            <p>{shop.shopAddress?.state}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Country:</p>
            <p>{shop.shopAddress?.country}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Zip Code:</p>
            <p>{shop.shopAddress?.zip}</p>
          </div>

          <div>
            <p className="font-semibold bg-[#DBEAFE]">Contact No:</p>
            <p>{shop.shopSetting?.contactNo || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Website:</p>
            <p>{shop.shopSetting?.websiteUrl || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Notification Email:</p>
            <p>{shop.notificationEmail?.notificationEmail}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Notifications Enabled:</p>
            <p>{shop.notificationEmail?.isEnabled ? "Yes" : "No"}</p>
          </div>

          <div>
            <p className="font-semibold bg-[#DBEAFE]">Current Balance:</p>
            <p>${shop.currentBalance}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Products Count:</p>
            <p>{shop.products?.length}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Orders Count:</p>
            <p>{shop.orders?.length}</p>
          </div>
          <div>
            <p className="font-semibold bg-[#DBEAFE]">Coupons Count:</p>
            <p>{shop.coupons?.length}</p>
          </div>
        </div>









            </div>

   
      </DialogContent>
    </Dialog>
  );
}
