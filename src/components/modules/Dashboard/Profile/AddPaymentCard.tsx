import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import React from "react";

const AddPaymentCard = () => {
  return (
    <>
      {/* Form */}
      <div className="space-y-4 border-t-2">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-4 pt-5">
          <InputField
            label="Name on Card"
            placeholder="Mastercard"
            defaultValue="Mastercard"
          />
          <InputField
            label="Card Number"
            placeholder="8434 3594 4444"
            defaultValue="843-4359 -4444"
          />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-4">
          <InputField
            label="Expiry date"
            placeholder="MM/YY"
            defaultValue="12/27"
            icon={<HelpCircle size={16} className="text-gray-400" />}
          />
          <InputField
            label="Security Code"
            placeholder="123"
            defaultValue="123"
            icon={<HelpCircle size={16} className="text-gray-400" />}
          />
          <InputField
            label="Country"
            placeholder="Country"
            defaultValue="America"
            flag
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button>Save</Button>
      </div>
    </>
  );
};

export default AddPaymentCard;
