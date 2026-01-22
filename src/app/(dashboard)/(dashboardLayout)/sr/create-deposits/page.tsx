"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DollarSign, CreditCard, FileText, MessageSquare } from "lucide-react";
import { IWithdrawal } from "@/types/withdrawals";
import { useCreateWithdrawalsMutation } from "@/redux/featured/withdrawals/withdrawalsApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import toast from "react-hot-toast";

const CreateWithdrawalForm: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?._id;
  const [isLoading, setIsLoading] = React.useState(false);
  const [createWithdrawals] = useCreateWithdrawalsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IWithdrawal>({
    defaultValues: {
      amount: 0,
      paymentMethod: "cash-on",
      description: "",
      note: "",
      status: "pending",
    },
  });

const onSubmit = async (data: IWithdrawal) => {
  if (!userId) {
    toast.error("User not found. Please login again.");
    return;
  }

  try {
    setIsLoading(true);

    const payload: IWithdrawal = {
      user: userId,
      amount: data.amount,
      paymentMethod: "cash-on",
      status: "pending",
      description: data.description,
      note: data.note,
    };

    const response = await createWithdrawals(payload).unwrap();

    // ✅ Show toast based on response
    if (response?.message?.toLowerCase().includes("insufficient")) {
      toast.error("Insufficient balance!");
    } else {
      toast.success("Withdrawal request created successfully!");
    }

    reset();
    console.log("Created withdrawal:", response);
  } catch (error: any) {
    // If server returns insufficient balance as an error
    if (error?.data?.message?.toLowerCase().includes("insufficient")) {
      toast.error("Insufficient balance!");
    } else {
      toast.error(error?.data?.message || "Failed to create withdrawal!");
    }
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-lg mb-3">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Withdrawal</h2>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="space-y-5">
            {/* Amount */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <DollarSign className="w-4 h-4 text-gray-500" />
                Amount
              </label>
              <input
                type="number"
                step="0.01"
                {...register("amount", {
                  required: "Amount is required!",
                  min: { value: 0.01, message: "Amount must be greater than 0!" },
                  valueAsNumber: true,
                })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                placeholder="Enter amount"
              />
              {errors.amount && <p className="text-red-600 text-sm">{errors.amount.message}</p>}
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <CreditCard className="w-4 h-4 text-gray-500" />
                Payment Method
              </label>
              <select
                {...register("paymentMethod", { required: "Payment method is required!" })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all bg-white"
              >
                <option value="cash-on">Cash On</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-red-600 text-sm">{errors.paymentMethod.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4 text-gray-500" />
                Description
              </label>
              <textarea
                {...register("description", { required: "Description is required!" })}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                placeholder="Enter description"
              />
              {errors.description && (
                <p className="text-red-600 text-sm">{errors.description.message}</p>
              )}
            </div>

            {/* Note */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                Note
              </label>
              <textarea
                {...register("note", { required: "Note is required!" })}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                placeholder="Enter note"
              />
              {errors.note && <p className="text-red-600 text-sm">{errors.note.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Submit Withdrawal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWithdrawalForm;
