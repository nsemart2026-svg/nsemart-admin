import InputField from "@/components/shared/InputField";
import { Select } from "@/components/shared/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const BasicInformation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Basic Information
          <p className="opacity-60 text-sm lg:text-base">
            Core company details and identification
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InputField label="Company Name" placeholder="Your Company Name" />
        <InputField label="Legal Name" placeholder="Legal Company Name" />
        <InputField label="Tax ID / EIN" placeholder="123456789" />
        <InputField
          label="Registration Number"
          placeholder="Company Registration Number"
        />{" "}
        <Select
          label="Company Type"
          options={[
            "Sole Proprietorship",
            "Partnership",
            "Limited Liability Company (LLC)",
            "Corporation (Inc.)",
            "Non-Profit Organization",
            "Public Limited Company (PLC)",
            "Cooperative",
            "Joint Venture",
            "Franchise",
            "Holding Company",
          ]}
        />
        <InputField
          label="Founded Date"
          placeholder="Claim Offer"
          type="date"
        />
      </CardContent>
    </Card>
  );
};

export default BasicInformation;
