import React from "react";
import InputField from "../shared/InputField";
import { Select } from "../shared/Select";
import { Textarea } from "../shared/Textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Receipt } from "lucide-react";

const ExpenseDetailsForm = () => {
  return (
    <div className="p-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 font-semibold text-2xl">
          <Receipt size={20} />
          Expense Details
        </div>
        <p className="text-sm opacity-60 mt-1">
          Enter the details of your new expense entry
        </p>
      </div>

      {/* Form */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {/* Description */}
        <InputField
          label="Description *"
          placeholder="e.g., Office Rent, Marketing Campaign"
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

        {/* Vendor/Supplier */}
        <InputField
          label="Vendor/Supplier"
          placeholder="e.g., Office Supply Store"
        />

        {/* Payment Method */}
        <Select
          label="Payment Method"
          options={["Credit Card", "Bank Transfer", "Cash"]}
        />

        {/* Notes */}
        <div className="md:col-span-2">
          <Textarea
            label="Notes"
            placeholder="Add any additional notes or receipts information..."
            rows={4}
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 md:col-span-2">
          <Checkbox id="recurring" />
          <Label htmlFor="recurring" className="opacity-80">
            This is a recurring expense
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetailsForm;
