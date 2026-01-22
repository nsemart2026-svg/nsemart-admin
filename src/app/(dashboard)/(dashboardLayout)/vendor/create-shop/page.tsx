/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import BusinessAddressSection from "@/components/ShopInformationForm/BusinessAddressSection";
import ContactInfoSection from "@/components/ShopInformationForm/ContactInfoSection";
import FormActions from "@/components/ShopInformationForm/FormActions";
import OperationalSettingsSection from "@/components/ShopInformationForm/OperationalSettingsSection";
import ShopInfoSection from "@/components/ShopInformationForm/ShopInfoSection";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useCreateShopMutation } from "@/redux/featured/shop/shopApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ShopInformationForm() {
  const [createShop, { isLoading }] = useCreateShopMutation();
  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const currentUser : any = useAppSelector(selectCurrentUser);

  

  const [formData, setFormData] = useState({
    vendorId: "",
    logo: "",
    coverImage: "",
    shopName: "",
    category: "",
    description: "",
    currency: "",
    timezone: "",
    email: "shop@gmail.com",
    phone: "(404) 555-0120",
    website: "https://www.myshop.com",
    streetAddress: "123 main road",
    state: "NY",
    zipCode: "10001",
    country: "",
    city: "",
  });

  // ✅ Automatically set vendorId when currentUser changes
  useEffect(() => {
    if (currentUser?._id) {
      setFormData((prev) => ({
        ...prev,
        vendorId: currentUser._id.toString(),
      }));
    }
  }, [currentUser]);

  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.shopName.trim()) return toast.error("Shop name is required");
    if (!formData.category) return toast.error("Please select a category");
    if (!formData.currency) return toast.error("Please select a currency");
    if (!formData.timezone) return toast.error("Please select a timezone");
    if (!formData.country) return toast.error("Please select a country");
    if (!logo) return toast.error("Please upload a logo!");
    if (!cover) return toast.error("Please upload a cover image!");

    const submitToast = toast.loading("Creating shop...");

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
    newFormData.append("shopLogofile", logo);
    newFormData.append("shopCoverFile", cover);

    try {
      await createShop({
        userId: currentUser?._id,
        formData: newFormData,
      }).unwrap();

      toast.success("Shop created successfully!", { id: submitToast });
      setFormData((prev) => ({
        ...prev,
        vendorId: currentUser?._id?.toString() || "",
        logo: "",
        coverImage: "",
        shopName: "",
        category: "",
        description: "",
        currency: "",
        timezone: "",
        email: "shop@gmail.com",
        phone: "(404) 555-0120",
        website: "https://www.myshop.com",
        streetAddress: "123 main road",
        state: "NY",
        zipCode: "10001",
        country: "",
        city: "",
      }));
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
                setFormData({
                  vendorId: currentUser?._id?.toString() || "",
                  logo: "",
                  coverImage: "",
                  shopName: "",
                  category: "",
                  description: "",
                  currency: "",
                  timezone: "",
                  email: "shop@gmail.com",
                  phone: "(404) 555-0120",
                  website: "https://www.myshop.com",
                  streetAddress: "123 main road",
                  state: "NY",
                  zipCode: "10001",
                  country: "",
                  city: "",
                });
                toast.dismiss(t.id);
                toast.success("Form reset successfully");
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

  return (
    <div className="w-full mx-auto md:p-6 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <ShopInfoSection
          title={"Shop Information"}
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
          clicks={"Create Shop"}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
