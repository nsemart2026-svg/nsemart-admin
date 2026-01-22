import { DollarSign } from "lucide-react";
import React from "react";
import InputField from "../shared/InputField";
import { Select } from "../shared/Select";
import { Textarea } from "../shared/Textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const IncomeDetailsForm = () => {
  return (
    <div className="p-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 font-semibold text-2xl">
          <DollarSign size={20} />
          Income Details
        </div>
        <p className="text-sm opacity-60 mt-1">
          Enter the details of your new income entry
        </p>
      </div>

      {/* Form */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {/* Income Source */}
        <InputField
          label="Income Source *"
          placeholder="e.g., Product Sales, Service Fees"
        />

        {/* Amount */}
        <InputField label="Amount *" type="number" placeholder="0.00" />

        {/* Category */}
        <Select
          label="Category *"
          options={["Office", "Marketing", "Travel"]}
        />

        {/* Date */}
        <InputField label="Date *" type="date" />

        {/* Payment Method */}
        <Select label="Payment Method" options={["Credit Card", "DebitCard"]} />

        {/* Payment Method */}
        <Select
          label="Payment Method"
          options={["Credit Card", "Bank Transfer", "Cash"]}
        />

        {/* Description */}
        <div className="md:col-span-2">
          <Textarea
            label="Description"
            placeholder="Add any additional Description or notes..."
            rows={4}
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 md:col-span-2">
          <Checkbox id="recurring" />
          <Label htmlFor="recurring" className="opacity-80">
            This is a recurring Income
          </Label>
        </div>
      </div>
    </div>
  );
};

export default IncomeDetailsForm;
