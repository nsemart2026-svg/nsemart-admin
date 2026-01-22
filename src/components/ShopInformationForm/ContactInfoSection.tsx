/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ContactInfoSection({ formData, handleInputChange }: {
  formData: any,
  handleInputChange: (field: string, value: string) => void
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
            <Phone className="h-4 w-4 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">How customers can reach you</p>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              type="email"
              placeholder="shop@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Phone</Label>
            <Input
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="border-gray-300"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Website Link (optional)</Label>
          <Input
            type="url"
            placeholder="https://www.yourshop.com"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className="border-gray-300"
          />
        </div>
      </div>
    </div>
  )
}