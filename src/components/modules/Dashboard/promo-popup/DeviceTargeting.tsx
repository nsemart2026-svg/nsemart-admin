"use client";
import { Select } from "@/components/shared/Select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { useToggle } from "@/hooks/useToggle";
import { Monitor, Smartphone } from "lucide-react";
const DeviceTargeting = () => {
  const [desktopEnabled, toggleDesktop] = useToggle(true);
  const [tabletEnabled, toggleTablet] = useToggle(false);
  const [mobileEnabled, toggleMobile] = useToggle(false);

  const devices = [
    {
      icon: Monitor,
      label: "Desktop",
      subtitle: "Enable popup for desktop devices",
      checked: desktopEnabled,
      toggle: toggleDesktop,
    },
    {
      icon: Smartphone,
      label: "Tablet",
      subtitle: "Enable popup for tablet devices",
      checked: tabletEnabled,
      toggle: toggleTablet,
    },
    {
      icon: Smartphone,
      label: "Mobile",
      subtitle: "Enable popup for mobile devices",
      checked: mobileEnabled,
      toggle: toggleMobile,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Device Targeting
          <p className="opacity-60 text-sm lg:text-base">
            Configure popup display for different devices
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {devices.map(({ icon: Icon, label, subtitle, checked, toggle }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon size={20} className="opacity-60" />
              <div>
                <p>{label}</p>
                <p className="text-sm opacity-60">{subtitle}</p>
              </div>
            </div>
            <ToggleSwitch checked={checked} onChange={toggle} />
          </div>
        ))}
        <Select
          label="Mobile Popup Size"
          options={["Small", "Medium", "Large"]}
        />
      </CardContent>
    </Card>
  );
};

export default DeviceTargeting;
