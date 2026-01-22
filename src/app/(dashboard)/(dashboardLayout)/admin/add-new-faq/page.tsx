"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { useCreateFaqMutation } from "@/redux/featured/faqs/faqs";

type FaqFormData = {
  question: string;
  answer: string;
  category: "global" | "shop"; // আগের general/billing/technical নয়
  isPublished: boolean;
};

export default function AddFaqPage() {
  const [isPublished, setIsPublished] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [createFaq] = useCreateFaqMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FaqFormData>();

  const onSubmit = async (data: FaqFormData) => {
    setStatus("loading");
    try {
      await createFaq({
        title: data.question,
        description: data.answer,
        type: data.category,
        issuedBy: "admin123",
      }).unwrap();

      setStatus("success");
      alert("FAQ created successfully!");
      reset();
      setIsPublished(false);
    } catch (err) {
      setStatus("error");
      alert("Failed to create FAQ");
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 lg:py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 min-w-0">
          <Link
            href="/faqs"
            className="inline-flex items-center text-base font-medium text-[#1A1A2E] hover:underline"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to FAQs
          </Link>
          <span className="text-xl md:text-3xl font-semibold whitespace-nowrap">
            Add New FAQ
          </span>
        </div>
        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
          <Button variant="outline" className="w-[124px] h-[40px] text-sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={status === "loading"}
            className="w-[124px] h-[40px] text-sm bg-[#1A1A2E] text-white hover:bg-[#111827]"
          >
            <Save className="w-4 h-4 mr-2" />
            {status === "loading" ? "Saving..." : "Save FAQ"}
          </Button>
        </div>
      </div>

      {/* Form Grid */}
      <form
        className="grid grid-cols-1 xl:grid-cols-3 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-[24px] font-bold">FAQ Details</CardTitle>
            <p className="text-sm text-muted-foreground">
              Create a new frequently asked question and answer.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question*</Label>
              <Input
                id="question"
                {...register("question", { required: true })}
                placeholder="Enter the question"
              />
              {errors.question && (
                <p className="text-xs text-red-500">Question is required</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">Answer*</Label>
              <Textarea
                id="answer"
                className="h-[138px]"
                rows={6}
                {...register("answer", { required: true })}
                placeholder="Enter the detailed answer"
              />
              {errors.answer && (
                <p className="text-xs text-red-500">Answer is required</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select
                onValueChange={(value: "global" | "shop") =>
                  setValue("category", value)
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="shop">Shop</SelectItem>
                </SelectContent>
              </Select>

              {errors.category && (
                <p className="text-xs text-red-500">Category is required</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Publishing Options
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Control when and how this FAQ appears.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="publish-status">Publish Status</Label>
                <Switch
                  id="publish-status"
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                />
              </div>
              <div>
                <p className="text-xs text-[#979797]">
                  Make this FAQ visible to users
                </p>
                <div className="text-xs w-[48px] mt-1 inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-lg">
                  {isPublished ? "Live" : "Draft"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
