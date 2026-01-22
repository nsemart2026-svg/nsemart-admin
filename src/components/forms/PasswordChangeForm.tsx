"use client";

import { useState } from "react";
import { CircleQuestionMark, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import InputField from "../shared/InputField";

export default function PasswordChangeForm() {
  const [showPassword, setShowPassword] = useState(false);

  const fields = [
    {
      key: "current",
      label: "Current Password",
      placeholder: "Enter current password",
    },
    {
      key: "new",
      label: "New Password",
      placeholder: "Enter new password",
    },
    {
      key: "reenter",
      label: "Re-enter Password",
      placeholder: "Re-enter new password",
    },
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Change Password</h2>
        <a
          href="#"
          className="text-sm text-[#6467F2] flex items-center gap-1
        underline underline-offset-4"
        >
          Need help
          <CircleQuestionMark size={18} />
        </a>
      </div>

      {fields.map(({ key, label, placeholder }, index) => (
        <div key={key} className="relative">
          <InputField
            label={label}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            icon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            onIconClick={() => setShowPassword(!showPassword)}
          />

          {index === 0 && (
            <a href="#" className="text-sm text-[#6467F2] block mt-1">
              Forgot Current Password? Click here
            </a>
          )}
        </div>
      ))}
      <Button className="w-full"> Save Change</Button>
    </div>
  );
}
