import { ReusableDialog } from "@/components/shared/ReusableDialog";
import { CameraIcon, Clock4 } from "lucide-react";
import Image from "next/image";
import React from "react";
import UploadImage from "./UploadImage";
interface ProfileFormHeaderProps {
  isViewMode: boolean;
}

const ProfileFormHeader = ({ isViewMode }: ProfileFormHeaderProps) => {
  return (
    <>
      {/* Profile Image & Info */}
      {isViewMode ? (
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <div className="relative h-16 w-16 mx-auto rounded-full border overflow-hidden">
              <Image
                src="/default-profile.png"
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div>
              <h2 className="font-semibold text-lg opacity-90">Wade Warren</h2>
              <p className="text-sm opacity-60">System Admin</p>
              <button
                className="bg-green-100 text-xs px-[10px] py-[2px] rounded-full text-green-500
              flex items-center gap-1"
              >
                <Clock4 size={12} /> Active
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-4 relative">
          <ReusableDialog
            trigger={
              <>
                <div className="relative h-28 w-28 rounded-full border overflow-hidden cursor-pointer">
                  <Image
                    src="/default-profile.png"
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                  />
                  {/* Black overlay */}
                  <div className="absolute inset-0 bg-black/50"></div>

                  <div
                    className="absolute inset-0 flex items-center justify-center 
                  flex-col text-white text-xs"
                  >
                    <CameraIcon size={24} />
                    Upload Photo
                  </div>
                </div>
              </>
            }
            contentClassName="w-4/6 md:w-1/2 lg:w-11/12 mx-auto"
          >
            <UploadImage />
          </ReusableDialog>
        </div>
      )}
    </>
  );
};

export default ProfileFormHeader;
