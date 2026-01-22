"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, DollarSign, Zap, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type IncomeFormData = {
  incomeSource: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
  description: string;
  isRecurring: boolean;
};

export default function AddIncomePage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IncomeFormData>();

  const onSubmit = async (data: IncomeFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/income", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save");
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 lg:py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 min-w-0">
          <Link
            href="/income"
            className="inline-flex items-center text-base font-medium text-[#1A1A2E] hover:underline"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Income
          </Link>
          <span className="text-xl md:text-3xl font-semibold whitespace-nowrap">
            Add New Income
          </span>
        </div>
      </div>

      {/* Form */}
      <form
        className="grid grid-cols-1 xl:grid-cols-3 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Left Side */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-6 h-6 text-[#1A1A2E]" />
              <CardTitle className="text-[24px] font-bold">
                Income Details
              </CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter the details of your new income entry
            </p>
          </CardHeader>

          {/* Updated Table-like Layout */}
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Income Source */}
              <div className="space-y-2">
                <Label>Income Source*</Label>
                <Input
                  placeholder="e.g., Product Sales, Service Fee"
                  {...register("incomeSource", { required: true })}
                />
                {errors.incomeSource && (
                  <p className="text-xs text-red-500">
                    Income source is required
                  </p>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label>Amount*</Label>
                <Input
                  type="number"
                  step="0.01"
                  defaultValue="0.00"
                  {...register("amount", { required: true })}
                />
                {errors.amount && (
                  <p className="text-xs text-red-500">Amount is required</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2 ">
                <Label>Category*</Label>
                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-xs text-red-500">Category is required</p>
                )}
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Date*</Label>
                <Input type="date" {...register("date", { required: true })} />
                {errors.date && (
                  <p className="text-xs text-red-500">Date is required</p>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-2 md:col-span-2">
                <Label>Payment Method</Label>
                <Select
                  onValueChange={(value) => setValue("paymentMethod", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  className="h-[100px]"
                  placeholder="Add any additional notes or description..."
                  {...register("description")}
                />
              </div>

              {/* Recurring Checkbox */}
              <div className="flex items-center space-x-2 md:col-span-2">
                <Checkbox
                  id="recurring"
                  onCheckedChange={(checked) =>
                    setValue("isRecurring", checked as boolean)
                  }
                />
                <Label htmlFor="recurring">This is a recurring income</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Side */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-[#1A1A2E]" />
                <CardTitle className="text-lg font-bold">
                  Quick Actions
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#1A1A2E] text-white hover:bg-[#111827]"
              >
                <Save className="w-4 h-4 mr-2" />
                {status === "loading" ? "Saving..." : "Save Income"}
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Save as Draft
              </Button>
              <Button type="button" variant="ghost" className="w-full ">
                Cancel
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-[#1A1A2E]" />
                <CardTitle className="text-lg font-bold">Tips</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Use clear, descriptive income source names</li>
                <li>Select the appropriate category for better reporting</li>
                <li>Include detailed descriptions for future reference</li>
                <li>Mark recurring income for automatic tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
