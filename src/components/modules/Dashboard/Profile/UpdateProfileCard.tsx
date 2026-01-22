import ProfileForm from "@/components/forms/ProfileForm";
import { ReusableDialog } from "@/components/shared/ReusableDialog";
import { Textarea } from "@/components/shared/Textarea";
import { Button } from "@/components/ui/button";
import { SquarePen, WandSparkles } from "lucide-react";
import React from "react";

const UpdateProfileCard = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <div className="flex justify-between">
        <h2 className="font-bold opacity-80 text-lg">Profile Update</h2>
        <ReusableDialog
          trigger={
            <Button
              variant="outline"
              className="flex items-center gap-2 opacity-60"
            >
              <SquarePen />
              Edit
            </Button>
          }
          contentClassName="max-h-[500px] xl:max-h-[800px] overflow-y-scroll
              w-11/12 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl"
        >
          <ProfileForm mode="edit" />
        </ReusableDialog>
      </div>
      <ProfileForm mode="view" />

      {/* biography */}
      <div className="relative ">
        <Textarea
          label="Biography"
          placeholder="Enter a biography about you"
          rows={4}
          disabled={true}
        />
        <ReusableDialog
          title="Biography"
          trigger={
            <WandSparkles className="absolute bottom-4 right-4 opacity-60" />
          }
          contentClassName="w-11/12 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl"
        >
          <>
            <Textarea placeholder="Enter a biography about you" rows={10} />
            <div className="flex justify-end">
              <Button>Save</Button>
            </div>
          </>
        </ReusableDialog>
      </div>
    </div>
  );
};

export default UpdateProfileCard;
