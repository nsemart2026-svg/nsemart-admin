// app/settings/page.tsx
"use client";


import { SelectField, TextField, ToggleField } from "@/components/modules/Dashboard/general-settings/form-fields";
import { SettingsCard } from "@/components/modules/Dashboard/general-settings/SettingsCard";
import { Button } from "@/components/ui/button";


export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">
     <div className="flex flex-col">
         <h1 className="text-2xl font-bold">General Settings</h1>
      <p className="text-[16px] text-muted-foreground">Configure basic application settings</p>
     </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Information */}
        <SettingsCard title="Site Information" description="Basic information about your website">
          <TextField label="Site Name" defaultValue="EcomAdmin" />
          <TextField label="Site Tagline" placeholder="Enter site tagline" />
          <TextField label="Site Description" placeholder="Enter site description" />
          <TextField label="Admin Email" placeholder="admin@example.com" />
        </SettingsCard>

        {/* Regional Settings */}
        <SettingsCard title="Regional Settings" description="Configure timezone and locale settings">
          <SelectField label="Timezone" placeholder="Select timezone" options={["GMT", "UTC", "Asia/Dhaka"]} />
          <SelectField label="Default Language" placeholder="Select language" options={["English", "Bangla"]} />
          <SelectField label="Default Currency" placeholder="Select currency" options={["USD", "BDT", "EUR"]} />
          <SelectField label="Date Format" placeholder="Select date format" options={["DD/MM/YYYY", "MM/DD/YYYY"]} />
        </SettingsCard>

        {/* System Preferences */}
        <SettingsCard title="System Preferences" description="Configure system behavior settings">
          <ToggleField label="Enable Debug Mode" description="Show debug information" />
          <ToggleField label="Auto Backup" description="Automatically backup data" />
          <ToggleField label="Email Notifications" description="Send system notifications via email" />
          <ToggleField label="Maintenance Mode" description="Enable maintenance mode" />
        </SettingsCard>

        {/* Performance Settings */}
        <SettingsCard title="Performance Settings" description="Configure performance optimization settings">
          <TextField label="Cache Duration (minutes)" defaultValue="60" />
          <TextField label="Session Timeout (minutes)" defaultValue="30" />
          <ToggleField label="Enable Compression" description="Compress responses to reduce bandwidth" />
          <ToggleField label="Enable CDN" description="Use Content Delivery Network" />
        </SettingsCard>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-gray-900 hover:bg-gray-800">Save Changes</Button>
      </div>
    </div>
  );
}
