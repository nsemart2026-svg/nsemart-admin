'use client'
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlinePrinter } from "react-icons/ai";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/shared/Select";
import { DatePickerForm } from "@/components/shared/DatePickerForm";
import Link from "next/link";

const AddNewCoupons = () => {
  return (
    <div className="p-2 md:p-4 lg:p-5 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/coupons" className="flex items-center text-xs text-gray-600">
            <IoMdArrowBack className="mr-1" /> Back to Coupons
          </Link>
          <h2 className="text-2xl font-semibold">Add New Coupons</h2>
        </div>
        <button className="text-white bg-black px-3 py-2 rounded flex items-center gap-2">
          <AiOutlinePrinter /> Save Coupon
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <form className="border p-4 md:p-6 lg:p-8 bg-white rounded-xl flex-1">
          <h2 className="font-semibold text-xl mb-1">Coupon Details</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Create a new promotional coupon code.
          </p>

          <div className="space-y-2">
            <div>
              <label className="block mb-1 font-semibold">Coupon Code*</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="border border-gray-200 px-3 py-2 rounded bg-gray-50 hover:bg-gray-100"
                >
                  Generate
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Description*</label>
              <textarea
                rows={3}
                className="w-full border p-2 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Describe what this coupon offers"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block mb-1 font-semibold">Discount Type*</label>
                <Select options={["% Percentage"]} />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Discount Value* (%)</label>
                <input
                  placeholder="20"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  Minimum Order Amount ($)
                </label>
                <input
                  placeholder="0"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  Maximum Discount ($)
                </label>
                <input
                  placeholder="100"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold">Usage Limit</label>
                <Switch />
              </div>
              <input
                placeholder="1000"
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Start Date</label>
                <DatePickerForm />
              </div>
              <div>
                <label className="block mb-1 font-semibold">End Date</label>
                <DatePickerForm />
              </div>
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-6 w-full lg:w-[320px]">
          <div className="border p-5 bg-white rounded-lg space-y-3">
            <div>
              <h2 className="font-semibold text-lg">Activation</h2>
              <p className="text-sm text-gray-500">
                Control when this coupon becomes active.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Active Status</h3>
                <p className="text-sm text-gray-500">
                  Make this coupon available for use
                </p>
              </div>
              <Switch />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Current Status</h2>
              <p className="text-sm w-fit bg-green-200 px-2 rounded-xl">Active</p>
            </div>
          </div>
          <div className="border p-5 bg-white rounded-lg">
            <h2 className="text-lg font-semibold">Coupon Preview</h2>
          </div>
          <div className="border p-5 bg-white rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Coupon Guidelines</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Use descriptive coupon codes</li>
              <li>Set appropriate usage limits</li>
              <li>Define clear validity periods</li>
              <li>Test before activation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewCoupons;
