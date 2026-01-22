"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToggle } from "@/hooks/useToggle";
import ToggleSwitch from "@/components/shared/ToggleSwitch";

const metrics = [
  { value: "2,456", label: "Views", color: "text-[#2D367C]" },
  { value: "342", label: "Conversions", color: "text-[#16A34A]" },
  { value: "13.9%", label: "Conversion Rate", color: "text-[#2563EB]" },
  { value: "1,854", label: "Dismissed", color: "text-[#EA580C]" },
];

const AnalyticsPerformance = () => {
  const [popupViews, togglePopupViews] = useToggle(false);
  const [buttonClicks, toggleButtonClicks] = useToggle(false);
  const [emailSignups, toggleEmailSignups] = useToggle(false);
  const toggles = [
    {
      label: "Track Popup Views",
      subtitle: "Counts each time the popup is displayed",
      checked: popupViews,
      toggle: togglePopupViews,
    },
    {
      label: "Track Button Clicks",
      subtitle: "Logs user interactions with buttons",
      checked: buttonClicks,
      toggle: toggleButtonClicks,
    },
    {
      label: "Track Email Signups",
      subtitle: "Measures successful email submissions",
      checked: emailSignups,
      toggle: toggleEmailSignups,
    },
  ];
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Analytics & Performance
          <p className="opacity-60 text-sm lg:text-base">
            Monitor popup performance and conversion rates
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-center mt-5 ">
          {metrics.map(({ value, label, color }) => (
            <div className="border rounded-md p-4" key={label}>
              <p className={`text-3xl font-semibold ${color}`}>{value}</p>
              <p className="text-sm opacity-60">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex flex-col gap-4 w-full">
            {toggles.map(({ label, subtitle, checked, toggle }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div>
                    <p>{label}</p>
                    <p className="text-sm opacity-60">{subtitle}</p>
                  </div>
                </div>
                <ToggleSwitch checked={checked} onChange={toggle} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPerformance;
