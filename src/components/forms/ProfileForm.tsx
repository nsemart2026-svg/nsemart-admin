import { Button } from "../ui/button";
import ProfileFormHeader from "../modules/Dashboard/Profile/ProfileFormHeader";
import ProfileFormBasicInfo from "../modules/Dashboard/Profile/ProfileFormBasicInfo";

interface ProfileFormProps {
  mode?: "view" | "edit";
}

export default function ProfileForm({ mode = "view" }: ProfileFormProps) {
  const isViewMode = mode === "view";

  return (
    <>
      <ProfileFormHeader isViewMode={isViewMode} />

      <ProfileFormBasicInfo isViewMode={isViewMode} />

      {/* Save Button */}
      {!isViewMode && (
        <div className="flex justify-center mt-6 ">
          <Button>Save Changes</Button>
        </div>
      )}
    </>
  );
}
