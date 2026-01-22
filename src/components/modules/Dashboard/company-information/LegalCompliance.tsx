import InputField from "@/components/shared/InputField";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

const legalData = [
  {
    value: "Active",
    textColor: "text-green-600",
    bgColor: "bg-green-100",
    title: "Terms of Service",
    lastUpdate: "Last updated: Jan 1, 2024",
  },
  {
    value: "Active",
    textColor: "text-purple-600",
    bgColor: "bg-purple-100",
    title: "Privacy Policy",
    lastUpdate: "Last updated: Jan 1, 2024",
  },
  {
    value: "Needs Update",
    textColor: "text-gray-800",
    bgColor: "bg-gray-200",
    title: "Cookie Policy",
    lastUpdate: "Last updated: Dec 15, 2023",
  },
  {
    value: "Pending",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-100",
    title: "Data Processing Agreement",
    lastUpdate: "Not configured",
  },
];

const LegalCompliance = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Legal & Compliance
          <p className="opacity-60 text-sm lg:text-base">
            Legal documents and compliance information
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5 ">
          {legalData.map(({ value, title, textColor, bgColor, lastUpdate }) => (
            <div
              className="border rounded-md p-4 flex justify-between items-center"
              key={title}
            >
              <span>
                <p className="text-sm ">{title}</p>
                <p className="text-xs opacity-60">{lastUpdate}</p>
              </span>
              <Badge
                className={`${textColor} ${bgColor} font-medium px-2 rounded-full text-xs`}
              >
                {value}
              </Badge>
            </div>
          ))}
        </div>
        <InputField
          label="Business License Number"
          placeholder="contact@company.com"
        />
        <InputField
          label="Primary Contact Email"
          placeholder="contact@company.com"
        />
      </CardContent>
    </Card>
  );
};

export default LegalCompliance;
