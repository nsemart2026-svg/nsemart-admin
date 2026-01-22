import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Lock } from "lucide-react";

export default function SecuritySettingsCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Security Settings
        </CardTitle>
        <CardDescription>
          Configure payment security and fraud prevention
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SecuritySwitch
          icon={<Lock className="w-4 h-4 text-gray-500" />}
          label="3D Secure"
          description="Enable 3D Secure authentication"
          id="3d-secure"
        />

        <SecuritySwitch
          icon={<Shield className="w-4 h-4 text-gray-500" />}
          label="Fraud Detection"
          description="Enable automatic fraud detection"
          id="fraud-detection"
        />

        <SecuritySwitch
          icon={<Shield className="w-4 h-4 text-gray-500" />}
          label="Risk Assessment"
          description="Assess transaction risk levels"
          id="risk-assessment"
        />

        <RiskThresholdSetting />
      </CardContent>
    </Card>
  );
}

function SecuritySwitch({
  icon,
  label,
  description,
  id,
  defaultChecked = false,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  id: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        {icon}
        <div>
          <Label htmlFor={id} className="font-medium">
            {label}
          </Label>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Switch id={id} defaultChecked={defaultChecked} />
    </div>
  );
}

function RiskThresholdSetting() {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 font-medium">
        <Shield className="w-4 h-4 text-gray-500" />
        Risk Threshold
      </Label>
      <p className="text-sm text-gray-500">Select risk level</p>
      <Select>
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
