"use client";

import { Select } from "@/components/shared/Select";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useState, useEffect } from "react";

// ✅ Updated type for full parent state
export type PaymentAndShippingType = {
  paymentMethod: string;
  shippingMethod?: string; // included to match parent state
};

interface Props {
  setPaymentAndShipping: React.Dispatch<
    React.SetStateAction<PaymentAndShippingType>
  >;
  initialData?: PaymentAndShippingType;
}

// Only payment fields for now; you can add shipping later
const paymentFields = [
  {
    label: "Payment Method",
    key: "paymentMethod" as const,
    options: ["cash-on"],
  },
];

const PaymentAndShipping = ({ setPaymentAndShipping, initialData }: Props) => {
  // ✅ formData matches full parent state
  const [formData, setFormData] = useState<PaymentAndShippingType>({
    paymentMethod: initialData?.paymentMethod || "",
    shippingMethod: initialData?.shippingMethod || "",
  });

  // ✅ Keep parent state in sync
  useEffect(() => {
    setPaymentAndShipping((prev) => ({
      ...prev,
      paymentMethod: formData.paymentMethod,
      shippingMethod: formData.shippingMethod,
    }));
  }, [formData, setPaymentAndShipping]);

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-8">
          <CreditCard size={20} /> Payment
        </h2>

        <div className="flex flex-col gap-6">
          {paymentFields.map((field) => (
            <Select
              key={field.key}
              label={field.label}
              options={field.options}
              value={formData[field.key]}
              required
              onChange={(value: string) =>
                setFormData((prev) => ({ ...prev, [field.key]: value }))
              }
            />
          ))}

          {/* You can add shipping method here later if needed */}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentAndShipping;
