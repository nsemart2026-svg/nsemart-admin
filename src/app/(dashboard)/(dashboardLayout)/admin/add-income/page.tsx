'use client';
import IncomeDetailsForm from '@/components/forms/IncomeDetailsForm';
import QuickActions from '@/components/modules/Dashboard/add-expense/QuickActions';
import TipsBox from '@/components/modules/Dashboard/add-expense/TipsBox';
import { addIncomeTips } from '@/data/tips-data';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const AddNewIncome = () => {
  return (
    <div className="my-6 p-2 sm:p-4">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <Link
          className="text-sm opacity-80 hover:underline flex items-center gap-1"
          href={'/income-management'}
        >
          {' '}
          <ArrowLeft size={16} /> Back to Income
        </Link>

        <div>
          <h1 className="text-3xl font-semibold">Add New Income</h1>
          <p className="opacity-60">Record a new income entry</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 ">
        <div className="lg:col-span-2 space-y-6 bg-white border rounded-lg ">
          <IncomeDetailsForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
          <QuickActions saveButtonText="Save Income" />

          <TipsBox tips={addIncomeTips} />
        </div>
      </div>
    </div>
  );
};

export default AddNewIncome;
