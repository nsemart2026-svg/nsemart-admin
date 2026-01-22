'use client'
import ExpenseDetailsForm from "@/components/forms/ExpenseDetailsForm";
import QuickActions from "@/components/modules/Dashboard/add-expense/QuickActions";
import ReceiptUpload from "@/components/modules/Dashboard/add-expense/ReceiptUpload";
import TipsBox from "@/components/modules/Dashboard/add-expense/TipsBox";
import { addExpenseTips } from "@/data/tips-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddExpensePage = () => {
  return (
    <div className="my-6 p-2 sm:p-4">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <Link
          className="text-sm opacity-80 hover:underline flex items-center gap-1"
          href={"/expense-management"}
        >
          {" "}
          <ArrowLeft size={16} /> Back to Expenses
        </Link>

        <div>
          <h1 className="text-3xl font-semibold">Add New Expense</h1>
          <p className="opacity-60">Record a new business expense</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 ">
        <div className="lg:col-span-2 space-y-6 bg-white border rounded-lg ">
          <ExpenseDetailsForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
          <QuickActions saveButtonText="Save Expense" />
          <ReceiptUpload />
          <TipsBox tips={addExpenseTips} />
        </div>
      </div>
    </div>
  );
};

export default AddExpensePage;
