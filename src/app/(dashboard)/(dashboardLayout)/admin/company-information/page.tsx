'use client'
import BasicInformation from "@/components/modules/Dashboard/company-information/BasicInformation";
import BusinessDetails from "@/components/modules/Dashboard/company-information/BusinessDetails";
import ContactInformation from "@/components/modules/Dashboard/company-information/ContactInformation";
import KeyPersonnel from "@/components/modules/Dashboard/company-information/KeyPersonnel";
import LegalCompliance from "@/components/modules/Dashboard/company-information/LegalCompliance";
import PhysicalAddress from "@/components/modules/Dashboard/company-information/PhysicalAddress";
import SocialMediaLinks from "@/components/modules/Dashboard/company-information/SocialMediaLinks";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React from "react";

const CompanyInformation = () => {
  return (
    <div className="py-6 p-2 sm:p-4">
      {/* Header */}
      <span>
        <h2 className="text-2xl lg:text-3xl font-semibold opacity-90">
          Company Information
        </h2>
        <p className="opacity-60 text-sm lg:text-base">
          Manage company details and business information
        </p>
      </span>

      {/* Company Information */}
      <div className="flex flex-col gap-6 mt-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <BasicInformation />
          <ContactInformation />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PhysicalAddress />
          <BusinessDetails />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SocialMediaLinks />
          <KeyPersonnel />
        </div>
        <LegalCompliance />
      </div>
      <div className="flex justify-end mt-5">
        <Button>
          <Save /> Save Company Information
        </Button>
      </div>
    </div>
  );
};

export default CompanyInformation;
