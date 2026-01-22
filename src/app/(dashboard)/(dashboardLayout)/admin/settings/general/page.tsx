"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { Loader2, Upload, Save } from "lucide-react";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/redux/featured/settings/settingsApi";
import { FaTrash } from "react-icons/fa";

interface GeneralSettings {
  enableHomepagePopup: boolean;
  popupTitle: string;
  popupImage: string;
  popupDescription: string;
  popupDelay: number;
  privacyPolicy: {
    title: string;
    description: string;
  };
  returnPolicy: {
    title: string;
    description: string;
  };
  contactAndSocial: {
    address: string;
    email: string;
    phone: string;
    facebookUrl: string[];
    instagramUrl: string[];
    whatsappLink: string[];
    youtubeUrl: string[];
  };
}

// Component for dynamic multi-inputs
const MultiInput = ({
  values,
  placeholder,
  onChange,
}: {
  values: string[];
  placeholder: string;
  onChange: (newValues: string[]) => void;
}) => {
  const handleValueChange = (index: number, val: string) => {
    const newArr = [...values];
    newArr[index] = val;
    onChange(newArr);
  };

  const handleAdd = () => onChange([...values, ""]);
  const handleRemove = (index: number) =>
    onChange(values.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      {values.map((val, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <Input
            placeholder={placeholder}
            value={val}
            onChange={(e) => handleValueChange(idx, e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleRemove(idx)}
            className="text-red-500 font-semibold"
          >
            <FaTrash />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="text-blue-500 font-semibold mt-1"
      >
        + Add another
      </button>
    </div>
  );
};

export default function GeneralSettingsPage() {
  const { data: settingsData, isLoading: isFetching } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  const [settings, setSettings] = useState<GeneralSettings>({
    enableHomepagePopup: false,
    popupTitle: "",
    popupImage: "",
    popupDescription: "",
    popupDelay: 2000,
    privacyPolicy: { title: "", description: "" },
    returnPolicy: { title: "", description: "" },
    contactAndSocial: {
      address: "",
      email: "",
      phone: "",
      facebookUrl: [],
      instagramUrl: [],
      whatsappLink: [],
      youtubeUrl: [],
    },
  });

  const [popupImageFile, setPopupImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (settingsData) {
      const parseLinks = (v: unknown): string[] => {
        if (!v) return [];
        if (Array.isArray(v)) return v.map((x) => String(x));
        if (typeof v === "string") return [v];
        return [];
      };

      setSettings({
        enableHomepagePopup: settingsData.enableHomepagePopup || false,
        popupTitle: settingsData.popupTitle || "",
        popupImage: settingsData.popupImage || "",
        popupDescription: settingsData.popupDescription || "",
        popupDelay: settingsData.popupDelay || 2000,
        privacyPolicy: {
          title: settingsData.privacyPolicy?.title || "",
          description: settingsData.privacyPolicy?.description || "",
        },
        returnPolicy: {
          title: settingsData.returnPolicy?.title || "",
          description: settingsData.returnPolicy?.description || "",
        },
        contactAndSocial: {
          address: settingsData.contactAndSocial?.address || "",
          email: settingsData.contactAndSocial?.email || "",
          phone: settingsData.contactAndSocial?.phone || "",
          facebookUrl: parseLinks(settingsData.contactAndSocial?.facebookUrl),
          instagramUrl: parseLinks(settingsData.contactAndSocial?.instagramUrl),
          whatsappLink: parseLinks(settingsData.contactAndSocial?.whatsappLink),
          youtubeUrl: parseLinks(settingsData.contactAndSocial?.youtubeUrl),
        },
      });
    }
  }, [settingsData]);

  const handleChange = (
    section: "privacyPolicy" | "returnPolicy" | "contactAndSocial",
    field: string,
    value: any
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, any>),
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPopupImageFile(file);
    const url = URL.createObjectURL(file);
    setSettings((prev) => ({ ...prev, popupImage: url }));
  };

  const handleSubmit = async () => {
    if (settings.enableHomepagePopup && !settings.popupImage) {
      toast.error("Please upload a popup image before saving!");
      return;
    }

    try {
      const formData = new FormData();

      if (popupImageFile) {
        formData.append("popupImage", popupImageFile);
      }

      formData.append("enableHomepagePopup", String(settings.enableHomepagePopup));
      formData.append("popupTitle", settings.popupTitle);
      formData.append("popupDescription", settings.popupDescription);
      formData.append("popupDelay", String(settings.popupDelay));

      formData.append("privacyPolicy[title]", settings.privacyPolicy.title);
      formData.append("privacyPolicy[description]", settings.privacyPolicy.description);

      formData.append("returnPolicy[title]", settings.returnPolicy.title);
      formData.append("returnPolicy[description]", settings.returnPolicy.description);

      // ✅ Append arrays properly, no JSON.stringify
      settings.contactAndSocial.facebookUrl.forEach(url =>
        formData.append("contactAndSocial[facebookUrl]", url)
      );
      settings.contactAndSocial.instagramUrl.forEach(url =>
        formData.append("contactAndSocial[instagramUrl]", url)
      );
      settings.contactAndSocial.whatsappLink.forEach(url =>
        formData.append("contactAndSocial[whatsappLink]", url)
      );
      settings.contactAndSocial.youtubeUrl.forEach(url =>
        formData.append("contactAndSocial[youtubeUrl]", url)
      );

      formData.append("contactAndSocial[address]", settings.contactAndSocial.address);
      formData.append("contactAndSocial[email]", settings.contactAndSocial.email);
      formData.append("contactAndSocial[phone]", settings.contactAndSocial.phone);

      const result = await updateSettings(formData).unwrap();

      if (result.success) {
        toast.success("Settings saved successfully!");
        setPopupImageFile(null);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to save settings!");
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">General Settings</h1>

      <Tabs defaultValue="popup" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-xl">
          <TabsTrigger value="popup">Popup</TabsTrigger>
          <TabsTrigger value="policy">Policies</TabsTrigger>
          <TabsTrigger value="contact">Contact & Social</TabsTrigger>
        </TabsList>

        {/* POPUP TAB */}
        <TabsContent value="popup" className="space-y-4 mt-6">
          <div className="flex items-center gap-4">
            <Switch
              checked={settings.enableHomepagePopup}
              onCheckedChange={(v) =>
                setSettings((prev) => ({ ...prev, enableHomepagePopup: v }))
              }
            />
            <span>Enable Homepage Popup</span>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Popup Title</label>
            <Input
              placeholder="Enter popup title"
              value={settings.popupTitle}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, popupTitle: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Popup Description</label>
            <Textarea
              placeholder="Enter popup description"
              value={settings.popupDescription}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, popupDescription: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Popup Delay (ms)</label>
            <Input
              type="number"
              placeholder="Delay before popup appears (in ms)"
              value={settings.popupDelay}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, popupDelay: Number(e.target.value) }))
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Popup Image</label>
            <div className="flex items-center gap-4">
              {settings.popupImage && (
                <Image
                  src={settings.popupImage}
                  alt="popup"
                  width={300}
                  height={150}
                  className="rounded-md border object-cover"
                />
              )}
              <label className="flex items-center gap-2 bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200">
                <Upload size={18} /> Upload Popup Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recommended size: 1920x600px, max 3MB
            </p>
          </div>
        </TabsContent>

        {/* POLICY TAB */}
        <TabsContent value="policy" className="space-y-4 mt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Privacy Policy Title</label>
            <Input
              placeholder="Privacy Policy Title"
              value={settings.privacyPolicy.title}
              onChange={(e) => handleChange("privacyPolicy", "title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Privacy Policy Description</label>
            <Textarea
              rows={6}
              placeholder="Privacy Policy Description"
              value={settings.privacyPolicy.description}
              onChange={(e) =>
                handleChange("privacyPolicy", "description", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Return Policy Title</label>
            <Input
              placeholder="Return Policy Title"
              value={settings.returnPolicy.title}
              onChange={(e) => handleChange("returnPolicy", "title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Return Policy Description</label>
            <Textarea
              rows={6}
              placeholder="Return Policy Description"
              value={settings.returnPolicy.description}
              onChange={(e) =>
                handleChange("returnPolicy", "description", e.target.value)
              }
            />
          </div>
        </TabsContent>

        {/* CONTACT TAB */}
        <TabsContent value="contact" className="space-y-4 mt-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Address</label>
            <Input
              placeholder="Enter your address"
              value={settings.contactAndSocial.address}
              onChange={(e) =>
                handleChange("contactAndSocial", "address", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <Input
              placeholder="Enter your email"
              value={settings.contactAndSocial.email}
              onChange={(e) =>
                handleChange("contactAndSocial", "email", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Phone</label>
            <Input
              placeholder="Enter your phone number"
              value={settings.contactAndSocial.phone}
              onChange={(e) =>
                handleChange("contactAndSocial", "phone", e.target.value)
              }
            />
          </div>

          {/* Multi-link inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Facebook URLs</label>
              <MultiInput
                values={settings.contactAndSocial.facebookUrl}
                placeholder="https://facebook.com/yourpage"
                onChange={(vals) => handleChange("contactAndSocial", "facebookUrl", vals)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Instagram URLs</label>
              <MultiInput
                values={settings.contactAndSocial.instagramUrl}
                placeholder="https://instagram.com/yourpage"
                onChange={(vals) => handleChange("contactAndSocial", "instagramUrl", vals)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">WhatsApp / Messenger Links</label>
              <MultiInput
                values={settings.contactAndSocial.whatsappLink}
                placeholder="https://wa.me/your-number"
                onChange={(vals) => handleChange("contactAndSocial", "whatsappLink", vals)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">YouTube URLs</label>
              <MultiInput
                values={settings.contactAndSocial.youtubeUrl}
                placeholder="https://youtube.com/@yourchannel"
                onChange={(vals) => handleChange("contactAndSocial", "youtubeUrl", vals)}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSubmit} disabled={isUpdating} className="mt-6">
        {isUpdating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        Save Settings
      </Button>
    </div>
  );
}
