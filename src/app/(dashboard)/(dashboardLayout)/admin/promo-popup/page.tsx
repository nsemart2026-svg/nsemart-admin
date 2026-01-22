import ABTesting from "@/components/modules/Dashboard/promo-popup/ABTesting";
import AnalyticsPerformance from "@/components/modules/Dashboard/promo-popup/AnalyticsPerformance";
import DesignStyling from "@/components/modules/Dashboard/promo-popup/DesignStyling";
import DeviceTargeting from "@/components/modules/Dashboard/promo-popup/DeviceTargeting";
import DisplaySettings from "@/components/modules/Dashboard/promo-popup/DisplaySettings";
import MainPopupConfig from "@/components/modules/Dashboard/promo-popup/MainPopupConfig";
import TargetingRules from "@/components/modules/Dashboard/promo-popup/TargetingRules";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const PromoPopupSettings = () => {
  return (
    <div className="py-6 p-2 sm:p-4">
      {/* Header */}
      <span>
        <h2 className="text-2xl lg:text-3xl font-semibold opacity-90">
          Promo Popup Settings
        </h2>
        <p className="opacity-60 text-sm lg:text-base">
          Configure promotional popups and overlays
        </p>
      </span>

      {/* popup settings */}
      <div className="flex flex-col gap-6 mt-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <MainPopupConfig />
          <DisplaySettings />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <DesignStyling />
          <DeviceTargeting />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TargetingRules />
          <ABTesting />
        </div>
        <AnalyticsPerformance />
      </div>
      <div className="flex justify-end mt-5">
        <Button>
          <Save /> Save Popup Settings
        </Button>
      </div>
    </div>
  );
};

export default PromoPopupSettings;
