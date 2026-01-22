"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, Check, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/redux/featured/settings/settingsApi";

export default function GeneralSettings() {
  const { data: settingsData } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] = useUpdateSettingsMutation();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreviews, setBannerPreviews] = useState<string[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFiles, setBannerFiles] = useState<File[]>([]);
  const [saved, setSaved] = useState(false);

  // ======================
  // Load existing settings
  // ======================
  useEffect(() => {
    if (settingsData) {
      setLogoPreview(settingsData.logo || null);
      setBannerPreviews(settingsData.sliderImages || []);
    }
  }, [settingsData]);

  // ======================
  // File size & dimension check
  // ======================
const MAX_LOGO_SIZE = 3 * 1024 * 1024; // 3MB
  const MAX_BANNER_SIZE = 3 * 1024 * 1024; // 3 MB

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "banner",
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ Size validation
    if (type === "logo" && file.size > MAX_LOGO_SIZE) {
      toast.error("Logo file too large! Max allowed size is 500KB.");
      return;
    }
    if (type === "banner" && file.size > MAX_BANNER_SIZE) {
      toast.error("Banner file too large! Max allowed size is 3MB.");
      return;
    }

    // ✅ For banner
    if (type === "banner") {
      const url = URL.createObjectURL(file);
      const newPreviews = [...bannerPreviews];
      const newFiles = [...bannerFiles];

      if (typeof index === "number") {
        newPreviews[index] = url;
        newFiles[index] = file;
      } else if (newPreviews.length < 3) {
        newPreviews.push(url);
        newFiles.push(file);
      } else {
        toast.error("Maximum 3 banners allowed!");
        return;
      }

      setBannerPreviews(newPreviews);
      setBannerFiles(newFiles);
      setSaved(false);
      return;
    }

    // ✅ For logo
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
    setLogoFile(file);
    setSaved(false);
  };

  // ======================
  // Save settings
  // ======================
  const handleSave = async () => {
    try {
      const formData = new FormData();

      if (logoFile) formData.append("logo", logoFile);
      bannerFiles.forEach((file) => formData.append("sliderImages", file));

      const res = await updateSettings(formData).unwrap();

      toast.success(res.message || "Settings updated successfully!");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      const message =
        err?.data?.message ||
        (err?.message?.includes("File size too large")
          ? "File size too large."
          : "Failed to update settings!");
      toast.error(message);
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Appearance Settings</h1>
          <p className="text-gray-600 text-lg">
            Manage your website logo and homepage banner images.
          </p>
        </div>

        {/* Website Logo */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl bg-white">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-xl font-semibold flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ImageIcon className="w-5 h-5 text-blue-600" />
              </div>
              Website Logo (Max 500KB)
            </CardTitle>
          </CardHeader>
          <CardContent className="w-xl">
            <div className="relative">
              {logoPreview ? (
                <div className="relative h-60 border border-gray-300 rounded-xl bg-gray-50 overflow-hidden">
                  {logoPreview.startsWith('http') || logoPreview.startsWith('blob:') || logoPreview.startsWith('data:') ? (
                    <Image
                      src={logoPreview}
                      alt="Logo"
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Invalid logo URL
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-all flex items-end justify-center pb-3">
                    <label className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Replace Logo
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "logo")}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-blue-500 transition-all flex flex-col items-center justify-center gap-3">
                  <Upload className="w-8 h-8 text-blue-500" />
                  <p className="font-semibold text-gray-700">Upload Logo</p>
                  <p className="text-sm text-gray-400">PNG, JPG, SVG up to 3MB</p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "logo")}
                  />
                </label>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Banner Uploads */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl bg-white">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-xl font-semibold flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ImageIcon className="w-5 h-5 text-blue-600" />
              </div>
              Homepage Banner (Max 3, 3MB each, 1920×600 px)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {bannerPreviews.map((banner, index) => {
                // Validate URL before rendering
                const isValidUrl = banner && (banner.startsWith('http') || banner.startsWith('blob:') || banner.startsWith('data:'));
                
                return (
                <div
                  key={index}
                  className="relative h-60 border border-gray-300 rounded-xl bg-gray-50 overflow-hidden"
                >
                  {isValidUrl ? (
                    <Image
                      src={banner}
                      alt={`Banner ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Invalid image URL
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-all flex items-end justify-center pb-4">
                    <label className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Replace
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "banner", index)}
                      />
                    </label>
                  </div>
                </div>
                );
              })}

              {bannerPreviews.length < 3 && (
                <label className="cursor-pointer h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-blue-500 transition-all flex flex-col items-center justify-center gap-3">
                  <Upload className="w-8 h-8 text-blue-500" />
                  <p className="font-semibold text-gray-700">Add New Banner</p>
                  <p className="text-sm text-gray-400">
                    JPG or PNG — 1920×600 px, up to 3MB
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "banner")}
                  />
                </label>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-md flex items-center gap-3"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Saving...
              </>
            ) : saved ? (
              <>
                <Check className="w-5 h-5" />
                Saved!
              </>
            ) : (
              <>Save Changes</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
