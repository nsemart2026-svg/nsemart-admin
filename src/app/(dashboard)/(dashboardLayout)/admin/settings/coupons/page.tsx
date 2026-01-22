"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Percent, DollarSign, Loader2, Edit2 } from "lucide-react";
import {
  ICoupon,
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetCouponsQuery,
  useUpdateCouponMutation,
} from "@/redux/featured/coupons/couponApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import toast from "react-hot-toast";

const initialFormState = {
  code: "",
  description: "",
  discountAmount: "",
  minimumPurchaseAmount: "",
  expireDate: "",
};

export default function CouponsDemo() {
  const [couponType, setCouponType] = useState<"percentage" | "fixed" | "free-shipping">("percentage");
  const [formData, setFormData] = useState(initialFormState);
  const [editingCoupon, setEditingCoupon] = useState<ICoupon | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // RTK Query hooks
  const { data: coupons = [], isLoading, refetch } = useGetCouponsQuery();
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();
  const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ------------------- CREATE COUPON -------------------
  const handleCreateCoupon = async () => {
    if (
      !formData.code ||
      !formData.minimumPurchaseAmount ||
      !formData.expireDate ||
      (couponType !== "free-shipping" && !formData.discountAmount)
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const description =
        formData.description ||
        (couponType === "percentage"
          ? `${formData.discountAmount}% discount`
          : couponType === "fixed"
          ? `৳${formData.discountAmount} discount`
          : "Free Shipping");

      const payload: Partial<ICoupon> = {
        code: formData.code.toUpperCase(),
        description: description,
        type: couponType,
        discountAmount:
          couponType === "free-shipping" ? 0 : Number(formData.discountAmount),
        minimumPurchaseAmount: Number(formData.minimumPurchaseAmount),
        expireDate: formData.expireDate,
      };

      const response = await createCoupon(payload).unwrap();
      toast.success(response.message || "Coupon created successfully!");

      setFormData(initialFormState);
      setCouponType("percentage");
      refetch();
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to create coupon");
      console.error("Create coupon error:", error);
    }
  };

  // ------------------- DELETE COUPON -------------------
  const handleDeleteCoupon = async (id: string, code: string) => {
    if (!confirm(`Are you sure you want to delete coupon "${code}"?`)) return;

    try {
      const response = await deleteCoupon(id).unwrap();
      toast.success(response.message || "Coupon deleted successfully!");
      refetch();
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to delete coupon");
      console.error("Delete coupon error:", error);
    }
  };

  // ------------------- EDIT COUPON -------------------
  const openEditModal = (coupon: ICoupon) => {
    setEditingCoupon(coupon);
    setCouponType(coupon.type as "percentage" | "fixed" | "free-shipping");
    setFormData({
      code: coupon.code,
      description: coupon.description || "",
      discountAmount: coupon.discountAmount ? String(coupon.discountAmount) : "",
      minimumPurchaseAmount: String(coupon.minimumPurchaseAmount),
      expireDate: coupon.expireDate.split("T")[0],
    });
    setIsEditModalOpen(true);
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsEditModalOpen(open);
    if (!open) {
      setEditingCoupon(null);
      setFormData(initialFormState);
      setCouponType("percentage");
    }
  };

  const handleUpdateCoupon = async () => {
    if (!editingCoupon) return;

    if (
      !formData.code ||
      !formData.minimumPurchaseAmount ||
      !formData.expireDate ||
      (couponType !== "free-shipping" && !formData.discountAmount)
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const description =
        formData.description ||
        (couponType === "percentage"
          ? `${formData.discountAmount}% discount`
          : couponType === "fixed"
          ? `৳${formData.discountAmount} discount`
          : "Free Shipping");

      const payload: Partial<ICoupon> = {
        code: formData.code.toUpperCase(),
        description: description,
        type: couponType,
        discountAmount:
          couponType === "free-shipping" ? 0 : Number(formData.discountAmount),
        minimumPurchaseAmount: Number(formData.minimumPurchaseAmount),
        expireDate: formData.expireDate,
      };

      const response = await updateCoupon({
        id: editingCoupon._id!,
        data: payload,
      }).unwrap();
      toast.success(response.message || "Coupon updated successfully!");
      setIsEditModalOpen(false);
      refetch();
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to update coupon");
      console.error("Update coupon error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 text-black">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Coupons & Vouchers</h1>
          <p className="text-gray-600 text-lg">
            Manage discount coupons for your customers.
          </p>
        </div>

        {/* Coupon Form */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Create New Coupon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="font-medium mb-2 block">Coupon Code *</Label>
                <Input
                  placeholder="e.g. SAVE10"
                  className="h-12"
                  value={formData.code}
                  onChange={(e) =>
                    handleChange("code", e.target.value.toUpperCase())
                  }
                />
              </div>
              <div>
                <Label className="font-medium mb-2 block">Coupon Type *</Label>
                <Select
                  value={couponType}
                  onValueChange={(value) =>
                    setCouponType(value as "percentage" | "fixed" | "free-shipping")
                  }
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage Discount</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="free-shipping">Free Shipping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="font-medium mb-2 block">
                Description (Optional)
              </Label>
              <Input
                placeholder="Brief description of the coupon"
                className="h-12"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            {/* Discount input only for percentage or fixed */}
            {couponType !== "free-shipping" && (
              <div>
                <Label className="font-medium mb-2 block">
                  Discount {couponType === "percentage" ? "(%)" : "(৳)"} *
                </Label>
                <Input
                  type="number"
                  placeholder={
                    couponType === "percentage"
                      ? "Enter percentage (e.g. 10)"
                      : "Enter fixed amount (e.g. 500)"
                  }
                  className="h-12"
                  value={formData.discountAmount}
                  onChange={(e) => handleChange("discountAmount", e.target.value)}
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="font-medium mb-2 block">
                  Minimum Purchase (৳) *
                </Label>
                <Input
                  type="number"
                  placeholder="e.g. 10000"
                  className="h-12"
                  value={formData.minimumPurchaseAmount}
                  onChange={(e) =>
                    handleChange("minimumPurchaseAmount", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="font-medium mb-2 block">Expiry Date *</Label>
                <Input
                  type="date"
                  className="h-12"
                  value={formData.expireDate}
                  onChange={(e) => handleChange("expireDate", e.target.value)}
                />
              </div>
            </div>

            <Button
              className="bg-blue-600 hover:bg-blue-700 h-12 px-6 text-lg font-semibold flex items-center gap-2"
              onClick={handleCreateCoupon}
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Creating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" /> Add Coupon
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Coupon List */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Existing Coupons ({coupons.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : coupons.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No coupons found. Create your first coupon above!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-gray-50 text-gray-700 border-b">
                    <tr>
                      <th className="p-3">Code</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Discount</th>
                      <th className="p-3">Min Purchase</th>
                      <th className="p-3">Expiry</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((coupon) => (
                      <tr key={coupon._id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-semibold">{coupon.code}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {coupon.type === "percentage" ? (
                              <>
                                <Percent className="w-4 h-4 text-blue-600" />
                                <span className="text-blue-600">Percentage</span>
                              </>
                            ) : coupon.type === "fixed" ? (
                              <>
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span className="text-green-600">Fixed</span>
                              </>
                            ) : (
                              <span className="text-purple-600 font-semibold">
                                Free Shipping
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          {coupon.type === "percentage"
                            ? `${coupon.discountAmount}%`
                            : coupon.type === "fixed"
                            ? `৳${coupon.discountAmount}`
                            : "-"}
                        </td>
                        <td className="p-3">৳{coupon.minimumPurchaseAmount}</td>
                        <td className="p-3">
                          {new Date(coupon.expireDate).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-right flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openEditModal(coupon)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteCoupon(coupon._id!, coupon.code)}
                            disabled={isDeleting}
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Input
              placeholder="Coupon Code"
              value={formData.code}
              onChange={(e) => handleChange("code", e.target.value.toUpperCase())}
            />
            <Select
              value={couponType}
              onValueChange={(value) =>
                setCouponType(value as "percentage" | "fixed" | "free-shipping")
              }
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage Discount</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
                <SelectItem value="free-shipping">Free Shipping</SelectItem>
              </SelectContent>
            </Select>

            {couponType !== "free-shipping" && (
              <div>
                <Label className="font-medium mb-2 block">
                  Discount {couponType === "percentage" ? "(%)" : "(৳)"} *
                </Label>
                <Input
                  placeholder={
                    couponType === "percentage"
                      ? "Enter percentage (e.g. 10)"
                      : "Enter fixed amount (e.g. 500)"
                  }
                  type="number"
                  value={formData.discountAmount}
                  onChange={(e) => handleChange("discountAmount", e.target.value)}
                />
              </div>
            )}

            <Input
              placeholder="Minimum Purchase"
              type="number"
              value={formData.minimumPurchaseAmount}
              onChange={(e) => handleChange("minimumPurchaseAmount", e.target.value)}
            />
            <Input
              placeholder="Expiry Date"
              type="date"
              value={formData.expireDate}
              onChange={(e) => handleChange("expireDate", e.target.value)}
            />

            <Button className="w-full" onClick={handleUpdateCoupon} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Coupon"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
