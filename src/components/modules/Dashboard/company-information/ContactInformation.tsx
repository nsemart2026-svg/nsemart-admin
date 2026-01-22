import InputField from "@/components/shared/InputField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const ContactInformation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Contact Information
          <p className="opacity-60 text-sm lg:text-base">
            Company contact details and communication
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InputField label="Main Phone" placeholder="+1 (555) 123-4567" />
        <InputField label="Fax" placeholder="+1 (555) 123-4567" />
        <InputField label="Main Email" placeholder="info@company.com" />
        <InputField label="Support Email" placeholder="support@company.com" />
        <InputField label="Sales Email" placeholder="sales@company.com" />
        <InputField label="Website" placeholder="https://www.company.com" />
      </CardContent>
    </Card>
  );
};

export default ContactInformation;
