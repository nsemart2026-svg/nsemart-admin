import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import { Select } from "@/components/shared/Select";

const existingLinks = [
  {
    name: "Google",
    profileName: "Wade G",
    profileLink: "https://google.com/wadeg",
    icon: "/google.png",
  },
  {
    name: "Facebook",
    profileName: "Wade FB",
    profileLink: "https://facebook.com/wadefb",
    icon: "/facebook.png",
  },
];

const AddSocial = () => {
  return (
    <div className="space-y-4">
      {/* Social media icons side-by-side */}
      <div className="flex gap-4">
        {existingLinks.map((link, index) => (
          <div key={index} className="relative">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border">
              <Image
                src={link.icon}
                alt={link.name}
                fill
                className="object-cover p-2"
              />
            </div>
            <X size={16} className="absolute top-0 right-0" />
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className="space-y-4 border-t pt-4">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <Select
            label="Social Media Name"
            options={["facebook", "twitter", "linkedin", "instagram"]}
          />
          <InputField
            label="Profile Name"
            id="name"
            placeholder="Your profile name"
          />
        </div>
        <InputField
          label="Profile Link"
          id="link"
          placeholder="https://example.com/profile"
          type="url"
        />

        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default AddSocial;
