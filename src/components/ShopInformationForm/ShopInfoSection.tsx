/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Store, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShopImageUploader } from './ShopImageUploder';
import { useGetAllVendorsQuery } from '@/redux/featured/allVendors/allvendorsApi';
import { useGetAllCategoriesQuery } from '@/redux/featured/categories/categoryApi';


export default function ShopInfoSection({
  formData,
  handleInputChange,
  setLogo,
  setCover,
  title
}: {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  setLogo: React.Dispatch<React.SetStateAction<File | null>>;
  setCover: React.Dispatch<React.SetStateAction<File | null>>;
  title : any
}) {
  const { data: allVendors, isLoading } = useGetAllVendorsQuery();
  const { data: allCategories, isLoading: CategoriesLoading } =
    useGetAllCategoriesQuery();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
            <Store className="h-4 w-4 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {/* Shop Information */}
            {title}
          </h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Basic details about your shop
        </p>
      </div>
      <div className="p-6 space-y-6">
        {/* Logo Uploader */}
        <div className="space-y-2">
          <ShopImageUploader setLogo={setLogo} setCover={setCover} />
        </div>

        {/* Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-md:mt-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Select Vendor
            </Label>
            <Select
              onValueChange={(value) => handleInputChange("vendorId", value)}
              value={formData.vendorId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a vendor" />
              </SelectTrigger>
              <SelectContent>
                {isLoading ? (
                  <SelectItem value="Loading" className="animate-pulse">
                    Vendors Id Loading...
                  </SelectItem>
                ) : (
                  allVendors?.map(vendor => (
                    <SelectItem key={vendor._id} value={vendor._id}>
                      {vendor._id}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Shop Name *
            </Label>
            <Input
              placeholder="Enter shop name"
              value={formData.shopName}
              onChange={(e) => handleInputChange("shopName", e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Category *
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger className="border-gray-300 w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CategoriesLoading ? (
                  <SelectItem value="Loading" className="animate-pulse">
                    Categories Loading....
                  </SelectItem>
                ) : (
                  allCategories?.map(category => (
                    <SelectItem key={category._id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Description
          </Label>
          <Textarea
            className="min-h-[100px] border-gray-300 resize-none"
            placeholder="Describe your shop and what you sell..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <p className="text-xs text-gray-500">
            This will be displayed on your home page
          </p>
        </div>
      </div>
    </div>
  );
}
