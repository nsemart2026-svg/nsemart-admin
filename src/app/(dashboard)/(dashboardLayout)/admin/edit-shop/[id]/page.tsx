/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import ShopInfoSection from "@/components/ShopInformationForm/ShopInfoSection";
import OperationalSettingsSection from "@/components/ShopInformationForm/OperationalSettingsSection";
import ContactInfoSection from "@/components/ShopInformationForm/ContactInfoSection";
import BusinessAddressSection from "@/components/ShopInformationForm/BusinessAddressSection";
import FormActions from "@/components/ShopInformationForm/FormActions";

import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useGetSingleShopQuery, useUpdateShopMutation ,  } from "@/redux/featured/shop/shopApi";

export default function EditShop() {
    const params = useParams();
  const shopId = params?.id  as string ;
  const currentUser = useAppSelector(selectCurrentUser);

  const { data: shopData, isLoading: shopLoading } = useGetSingleShopQuery(shopId );
  const [updateShop, { isLoading }] = useUpdateShopMutation();

  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    vendorId: "",
    logo: "",
    coverImage: "",
    shopName: "",
    category: "",
    description: "",
    currency: "",
    timezone: "",
    email: "",
    phone: "",
    website: "",
    streetAddress: "",
    state: "",
    zipCode: "",
    country: "",
    city: "",
  });

  // Populate formData when shopData is loaded

  useEffect(() => {
    if (shopData) {
      setFormData({
        vendorId: shopData.vendorId || "",
        logo: shopData?.logo || "",
        coverImage: shopData?.coverImage || "",
        shopName: shopData.basicInfo?.name || "",
        category: shopData.category || "",
        description: shopData.basicInfo?.description || "",
        currency: shopData.shopSetting?.currency || "",
        timezone: shopData.shopSetting?.timezone || "",
        email: shopData.notificationEmail?.notificationEmail || "",
        phone: shopData.shopSetting?.contactNo || "",
        website: shopData.shopSetting?.websiteUrl || "",
        streetAddress: shopData.shopAddress?.streetAddress || "",
        state: shopData.shopAddress?.state || "",
        zipCode: shopData.shopAddress?.zip || "",
        country: shopData.shopAddress?.country || "",
        city: shopData.shopAddress?.city || "",
      });
    }
  }, [shopData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.shopName.trim()) return toast.error("Shop name is required");

    const submitToast = toast.loading("Updating shop...");

    const payload = {
      vendorId: formData.vendorId,
      basicInfo: {
        name: formData.shopName,
        description: formData.description,
        slug: formData.shopName.toLowerCase().replace(/\s+/g, "-"),
      },
      shopAddress: {
        streetAddress: formData.streetAddress,
        state: formData.state,
        zip: formData.zipCode,
        country: formData.country,
        city: formData.city,
      },
      notificationEmail: {
        notificationEmail: formData.email,
        isEnabled: true,
      },
      shopSetting: {
        contactNo: formData.phone,
        websiteUrl: formData.website,
        currency: formData.currency,
        timezone: formData.timezone,
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(payload));
    if (logo) newFormData.append("shopLogofile", logo);
    if (cover) newFormData.append("shopCoverFile", cover);

    try {
      await updateShop({
        shopId,
        userId: currentUser?._id || "",
        formData: newFormData,
      }).unwrap();

      toast.success("Shop updated successfully!", { id: submitToast });
    } catch (error: any) {
      toast.dismiss(submitToast);
      const errorMessage =
        error?.data?.errorSources?.[0]?.message ||
        error?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    toast(
      (t) => (
        <div className="flex flex-col space-y-2 py-6">
          <p>Are you sure you want to cancel?</p>
          <p className="text-sm text-gray-500">All changes will be lost</p>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100"
            >
              No, keep editing
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                toast.success("Edit canceled");
              }}
              className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
            >
              Yes, cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  if (shopLoading) return <p>Loading shop data...</p>;

  return (
    <div className="w-full mx-auto md:p-6 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <ShopInfoSection
          title="Edit Shop "
          formData={formData}
      
          handleInputChange={handleInputChange}
          setLogo={setLogo}
          setCover={setCover}
        />
        <OperationalSettingsSection
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <ContactInfoSection
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <BusinessAddressSection
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <FormActions
        clicks = {"Edit Shop"}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

