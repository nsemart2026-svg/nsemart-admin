/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CreditCard, Shield } from "lucide-react";
import { MdOutlinePayment } from "react-icons/md";
import { ReactNode, useState } from "react";
import { FaCcPaypal } from "react-icons/fa6";

interface GatewayItemProps {
  icon: string | ReactNode;
  iconBg: string;
  iconColor: string;
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  active: boolean;
  onToggle: () => void;
}

export default function PaymentGatewaysCard() {
  const [gateways, setGateways] = useState([
    {
      id: "stripe",
      icon: <MdOutlinePayment className="w-4 h-4" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      name: "Stripe",
      description: "Accept credit and debit cards",
      status: "ACTIVE" as const,
      active: true,
    },
    {
      id: "paypal",
      icon: <FaCcPaypal className="w-4 h-4" />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      name: "PayPal",
      description: "PayPal and PayPal credit options",
      status: "INACTIVE" as const,
      active: false,
    },
    {
      id: "square",
      icon: <Shield />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      name: "Square",
      description: "In-person and online payments",
      status: "INACTIVE" as const,
      active: false,
    },
  ]);

  const handleToggle = (id: string) => {
    setGateways(
      gateways.map((gateway) =>
        gateway.id === id ? { ...gateway, active: !gateway.active } : gateway
      )
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Gateways
        </CardTitle>
        <CardDescription>
          Configure which payment methods to accept from customers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {gateways.map((gateway) => (
          <GatewayItem
            key={gateway.id}
            icon={gateway.icon}
            iconBg={gateway.iconBg}
            iconColor={gateway.iconColor}
            name={gateway.name}
            description={gateway.description}
            status={gateway.status}
            active={gateway.active}
            onToggle={() => handleToggle(gateway.id)}
          />
        ))}
      </CardContent>
    </Card>
  );
}

function GatewayItem({
  icon,
  iconBg,
  iconColor,
  name,
  description,
  status,
  active,
  onToggle,
}: GatewayItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg bg-white gap-3 sm:gap-0">
      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
        >
          {typeof icon === "string" ? (
            <span className={`${iconColor} font-bold text-xs sm:text-sm`}>
              {icon}
            </span>
          ) : (
            <span className={`${iconColor} text-sm`}>{icon}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{name}</p>
          <p className="text-sm text-gray-500 truncate">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-2 sm:gap-3 sm:pl-3">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
            active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {active ? "Enabled" : "Disabled"}
        </span>
        <Switch
          checked={active}
          onCheckedChange={onToggle}
          className={`flex-shrink-0 ${
            active
              ? "data-[state=checked]:bg-green-500"
              : "data-[state=unchecked]:bg-red-900"
          }`}
        />
      </div>
    </div>
  );
}
