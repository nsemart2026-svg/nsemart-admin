import BackupSettings from "@/components/modules/Dashboard/maintenance-settings/BackupSettings";
import CleanupSettings from "@/components/modules/Dashboard/maintenance-settings/CleanupSettings";
import MaintenanceMode from "@/components/modules/Dashboard/maintenance-settings/MaintenanceMode";
import MonitoringSettings from "@/components/modules/Dashboard/maintenance-settings/MonitoringSettings";
import SystemHealth from "@/components/modules/Dashboard/maintenance-settings/SystemHealth";
import UpdateSettings from "@/components/modules/Dashboard/maintenance-settings/UpdateSettings";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React from "react";

const MaintenanceSettings = () => {
  return (
    <div className="py-6 p-2 sm:p-4">
      {/* Header */}
      <span>
        <h2 className="text-2xl lg:text-3xl font-semibold opacity-90">
          Maintenance Settings
        </h2>
        <p className="opacity-60 text-sm lg:text-base">
          Configure system maintenance and monitoring
        </p>
      </span>

      {/* Information */}
      <div className="flex flex-col gap-6 mt-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <MaintenanceMode />
          <SystemHealth />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <BackupSettings />
          <UpdateSettings />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <MonitoringSettings />
          <CleanupSettings />
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Button>
          <Save /> Save Maintenance Settings
        </Button>
      </div>
    </div>
  );
};

export default MaintenanceSettings;
