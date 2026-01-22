/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getNames, getCodes } from "country-list";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BusinessAddressSection({
  formData,
  handleInputChange,
}: {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
}) {
  const countryNames = getNames();
  const countryCodes = getCodes();
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
            <MapPin className="h-4 w-4 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Business Address
          </h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Your shops physical location
        </p>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Street Address
          </Label>
          <Input
            placeholder="123 Main Street"
            value={formData.streetAddress}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
            className="border-gray-300"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              State/Province
            </Label>
            <Input
              placeholder="NY"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              ZIP/Postal Code
            </Label>
            <Input
              placeholder="10001"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">City</Label>
            <Input
              placeholder="US"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Country *
            </Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((code, i) => (
                  <SelectItem key={code} value={code.toLowerCase()}>
                    {countryNames[i]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
