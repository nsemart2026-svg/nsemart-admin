import InputField from "@/components/shared/InputField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const KeyPersonnel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Key Personnel
          <p className="opacity-60 text-sm lg:text-base">
            Important company contacts and leadership
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InputField label="CEO/President" placeholder="CEO Full Name" />
        <InputField label="CEO Email" placeholder="ceo@company.com" />
        <InputField label="CTO/Technical Lead" placeholder="CTO Full Name" />
        <InputField label="CTO Email" placeholder="cto@company.com" />
        <InputField
          label="Primary Contact"
          placeholder="Primary Contact Name"
        />
        <InputField
          label="Primary Contact Email"
          placeholder="contact@company.com"
        />
      </CardContent>
    </Card>
  );
};

export default KeyPersonnel;
