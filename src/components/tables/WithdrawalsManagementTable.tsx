"use client";

import React, { useState } from "react";
import { Check, Clock, Loader, AlertCircle, X, RefreshCw } from "lucide-react";

import { IWithdrawal } from "@/types/withdrawals";
import {
  useGetWithdrawalsQuery,
  useUpdateWithdrawalsMutation,
} from "@/redux/featured/withdrawals/withdrawalsApi";

// ✅ Allowed statuses
type Status = "approved" | "on-hold" | "processing" | "pending" | "rejected";
const allowedStatuses: Status[] = [
  "approved",
  "on-hold",
  "processing",
  "pending",
  "rejected",
];

// Helper type for status update
type StatusUpdate = Pick<IWithdrawal, "status">;

const WithdrawalAdmin = () => {
  const [activeTab, setActiveTab] = useState<Status | "all">("all");
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetWithdrawalsQuery();
  const [updateWithdrawal] = useUpdateWithdrawalsMutation();

  const statusConfig = {
    approved: {
      label: "Approved",
      color: "bg-emerald-100 text-emerald-700 border-emerald-300",
      icon: Check,
      tabColor: "bg-emerald-500",
    },
    "on-hold": {
      label: "On Hold",
      color: "bg-amber-100 text-amber-700 border-amber-300",
      icon: AlertCircle,
      tabColor: "bg-amber-500",
    },
    processing: {
      label: "Processing",
      color: "bg-blue-100 text-blue-700 border-blue-300",
      icon: Loader,
      tabColor: "bg-blue-500",
    },
    pending: {
      label: "Pending",
      color: "bg-gray-100 text-gray-700 border-gray-300",
      icon: Clock,
      tabColor: "bg-gray-500",
    },
    rejected: {
      label: "Rejected",
      color: "bg-red-100 text-red-700 border-red-300",
      icon: X,
      tabColor: "bg-red-500",
    },
  };

  const handleStatusChange = async (id: string, newStatus: Status) => {
    try {
      await updateWithdrawal({
        id,
        data: { status: newStatus },
      }).unwrap();

      refetch();
    } catch (error: any) {
      alert(
        error?.data?.message || "Failed to update status. Please try again."
      );
    }
  };

  // ✅ Filter withdrawals: keep only valid statuses
  const withdrawals: IWithdrawal[] =
    response?.data?.filter((w) =>
      allowedStatuses.includes(w.status as Status)
    ) || [];

  // Filtered by tab
  const filteredWithdrawals: IWithdrawal[] =
    activeTab === "all"
      ? withdrawals
      : withdrawals.filter((w) => w.status === activeTab);

  const getStatusCount = (status: Status | "all") => {
    if (status === "all") return withdrawals.length;
    return withdrawals.filter((w) => w.status === status).length;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading withdrawals...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-slate-800 font-semibold mb-2">
            Failed to load withdrawals
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Withdrawal Management
            </h1>
            <p className="text-slate-600">
              Manage and process user withdrawal requests
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-4 font-medium transition-all flex items-center gap-2 border-b-2 ${
                activeTab === "all"
                  ? "border-indigo-500 text-indigo-600 bg-indigo-50"
                  : "border-transparent text-slate-600 hover:bg-slate-50"
              }`}
            >
              All
              <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-sm font-semibold">
                {getStatusCount("all")}
              </span>
            </button>
            {allowedStatuses.map((status) => {
              const config = statusConfig[status];
              return (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`px-6 py-4 font-medium transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                    activeTab === status
                      ? "border-indigo-500 text-indigo-600 bg-indigo-50"
                      : "border-transparent text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {config.label}
                  <span
                    className={`${config.tabColor} text-white px-2 py-0.5 rounded-full text-sm font-semibold`}
                  >
                    {getStatusCount(status)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    ID
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    User
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    Payment Method
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    Time
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredWithdrawals.length > 0 ? (
                  filteredWithdrawals.map((withdrawal, idx) => {
                    const isValidStatus = allowedStatuses.includes(
                      withdrawal.status as Status
                    );
                    const config = isValidStatus
                      ? statusConfig[withdrawal.status as Status]
                      : statusConfig.pending;
                    const Icon = config.icon || Clock;

                    return (
                      <tr
                        key={withdrawal._id}
                        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                          idx % 2 === 0 ? "bg-white" : "bg-slate-25"
                        }`}
                      >
                        <td className="py-4 px-6 font-mono text-sm text-slate-600">
                          {withdrawal._id?.slice(-8) || "N/A"}
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p>
                              {typeof withdrawal?.user === "object"
                                ? withdrawal?.user?.name
                                : "Unknown"}
                            </p>
                            <p>
                              {typeof withdrawal?.user === "object"
                                ? withdrawal?.user?.email
                                : "N/A"}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-slate-800">
                          ${withdrawal.amount?.toLocaleString() || 0}
                        </td>
                        <td className="py-4 px-6 text-slate-600 capitalize">
                          {withdrawal.paymentMethod?.replace("-", " ") || "N/A"}
                        </td>
                        <td className="py-4 px-6 text-slate-600 text-sm">
                          {withdrawal.createdAt
                            ? formatDate(withdrawal.createdAt)
                            : "N/A"}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${
                              isValidStatus
                                ? config.color
                                : "bg-red-100 text-red-700 border-red-300"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {isValidStatus ? config.label : "Invalid Status"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={
                              isValidStatus ? withdrawal.status : "pending"
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                withdrawal._id!,
                                e.target.value as Status
                              )
                            }
                            className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
                          >
                            {allowedStatuses.map((status) => (
                              <option key={status} value={status}>
                                {statusConfig[status].label}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-16 text-slate-500"
                    >
                      <AlertCircle className="w-12 h-12 mx-auto mb-3" />
                      No withdrawals found
                      <p className="text-sm text-slate-400 mt-1">
                        Try selecting a different status filter
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredWithdrawals.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-slate-400 mb-2">
                <AlertCircle className="w-12 h-12 mx-auto mb-3" />
              </div>
              <p className="text-slate-600 font-medium">No withdrawals found</p>
              <p className="text-slate-500 text-sm mt-1">
                Try selecting a different status filter
              </p>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {allowedStatuses.map((status) => {
            const config = statusConfig[status];
            const count = getStatusCount(status);
            const totalAmount = withdrawals
              .filter((w) => w.status === status)
              .reduce((sum, w) => sum + w.amount, 0);

            return (
              <div
                key={status}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-4"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center mb-3`}
                >
                  <config.icon className="w-5 h-5" />
                </div>
                <p className="text-slate-600 text-sm mb-1">{config.label}</p>
                <p className="text-2xl font-bold text-slate-800">{count}</p>
                <p className="text-slate-500 text-xs mt-1">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalAdmin;
