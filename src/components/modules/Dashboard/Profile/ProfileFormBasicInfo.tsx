"use client";
import InputField from "@/components/shared/InputField";
import { ReusableDialog } from "@/components/shared/ReusableDialog";
import { Select } from "@/components/shared/Select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CirclePlus } from "lucide-react";
import AddPaymentCard from "./AddPaymentCard";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";
interface ProfileFormBasicInfoProps {
  isViewMode: boolean;
}

const ProfileFormBasicInfo = ({ isViewMode }: ProfileFormBasicInfoProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    "+1 406 555 0120"
  );
  return (
    <>
      {/* Basic Info */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mt-4">
        <InputField
          label="First Name"
          defaultValue="Wade"
          readOnly={isViewMode}
        />
        <InputField
          label="Last Name"
          defaultValue="Warren"
          readOnly={isViewMode}
        />
        <Select
          label="Gender"
          options={["Male", "Female", "Other"]}
          disabled={isViewMode}

        />

        <div className="flex flex-col">
          <label htmlFor="phone-number" className="block mb-1 opacity-85">
            Phone Number
          </label>
          <PhoneInput
            id="phone-number"
            international
            defaultCountry="US"
            value={phoneNumber}
            onChange={setPhoneNumber}
            disabled={isViewMode}
            className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2"
          />
        </div>
        <InputField
          label="E-mail"
          defaultValue="wade.warren@example.com"
          readOnly={isViewMode}
        />
        <InputField
          type="date"
          label="Date of Birth"
          defaultValue="1999-01-12"
          readOnly={isViewMode}
          icon={isViewMode ? <CalendarIcon size={16} /> : undefined}
        />
      </div>

      {/* Location & Credit */}
      <div className="grid grid-cols-1 gap-3 mt-4">
        <InputField
          label="Location"
          defaultValue="2972 Westheimer Rd. Santa Ana, Illinois 85486"
          readOnly={isViewMode}
        />
        <div className="flex items-center gap-3">
          <Select
            label="Credit Card"
          
            options={["843-4359-4444", "Credit card"]}
            disabled={isViewMode}
          />

          {!isViewMode && (
            <ReusableDialog
              title="Add New Card"
              trigger={
                <div className="flex justify-start mt-5 opacity-60">
                  <Button variant="outline">
                    <CirclePlus /> Add New Card
                  </Button>
                </div>
              }
              contentClassName="
              w-11/12 lg:w-[900px] mx-auto"
            >
              <AddPaymentCard />
            </ReusableDialog>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileFormBasicInfo;
