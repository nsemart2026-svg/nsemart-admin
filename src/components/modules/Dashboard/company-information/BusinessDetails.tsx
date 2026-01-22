import { Select } from "@/components/shared/Select";
import { Textarea } from "@/components/shared/Textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const BusinessDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Business Details
          <p className="opacity-60 text-sm lg:text-base">
            Industry and business classification information
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          label="Industry"
          options={[
            "Technology",
            "Healthcare",
            "Finance",
            "Education",
            "Real Estate",
            "Transportation",
          ]}
        />
        <Textarea
          label="Business Description"
          placeholder="Describe your business activities and services..."
        />
        <Select
          label="Number of Employees"
          options={["1-10", "11-50", "51-200", "201-500", "501-1000", "1001+"]}
        />
        <Select
          label="Annual Revenue"
          options={[
            "Less than $100K",
            "$100K - $500K",
            "$500K - $1M",
            "$1M - $5M",
            "$5M - $10M",
            "Over $10M",
          ]}
        />{" "}
        <Select label="Annual Revenue" options={["USA", "BD"]} />
      </CardContent>
    </Card>
  );
};

export default BusinessDetails;
