/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Eye, Save } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Term, useCreateTermMutation } from "@/redux/featured/terms/termApi";

type TermFormData = {
  name: string;
  description: string;
  type: "global" | "shop" | string;
  isPublished: boolean;
};

export default function AddTermPage() {
  const [isPublished, setIsPublished] = useState(false);
  const [createTerm, { isLoading }] = useCreateTermMutation();

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<TermFormData>();

  const onSubmit = async (data: TermFormData) => {
    try {
      const payload: Partial<Term> = {
        name: data.name,                 
        description: data.description,
        type: data.type as "global" | "shop",
        issuedBy: 1001,                  
        isApproved: isPublished          
      };


      await createTerm(payload).unwrap();

      toast.success("Term created successfully!");
      reset();
      setIsPublished(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create term");
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 lg:py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 min-w-0">
          <Link href="admin/all-terms" className="inline-flex items-center text-base font-medium text-[#1A1A2E] hover:underline">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Terms
          </Link>
          <span className="text-xl md:text-3xl font-semibold whitespace-nowrap">Add New Term</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
          <Button variant="outline" className="w-[124px] h-[40px] text-sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="w-[124px] h-[40px] text-sm bg-[#1A1A2E] text-white hover:bg-[#111827]"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Term"}
          </Button>
        </div>
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 xl:grid-cols-3 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-[24px] font-bold">Term Details</CardTitle>
            <p className="text-sm text-muted-foreground">Create a new term or condition entry.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>
              <Input id="name" {...register("name", { required: true })} placeholder="Enter the term name" />
              {errors.name && <p className="text-xs text-red-500">Name is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                className="h-[138px]"
                rows={6}
                {...register("description", { required: true })}
                placeholder="Enter the description"
              />
              {errors.description && <p className="text-xs text-red-500">Description is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Category*</Label>
              <Select onValueChange={(value: "global" | "shop") => setValue("type", value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="shop">Shop</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-xs text-red-500">Category is required</p>}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Publishing Options</CardTitle>
              <p className="text-sm text-muted-foreground">Control visibility of this term.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="publish-status">Publish Status</Label>
                <Switch id="publish-status" checked={isPublished} onCheckedChange={setIsPublished} />
              </div>
              <div>
                <p className="text-xs text-[#979797]">Make this term visible to users</p>
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
