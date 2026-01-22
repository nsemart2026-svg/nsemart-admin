"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Product = {
  name: string;
  price: string;
  purchases: number;
  purchaseChange: string;
  performance: "Growing" | "Declining";
  profit: string;
  profitChange: string;
  img: string;
  performanceValue: number;
};

const products: Product[] = [
  {
    name: "Wireless Earbuds Pro",
    price: "$89.99",
    purchases: 342,
    purchaseChange: "+12%",
    performance: "Growing",
    profit: "$15,390",
    profitChange: "+8.2%",
    img: "https://i.ibb.co/LXx7Tv9Y/Wireless-Earbuds-Pro.png",
    performanceValue: 80,
  },
  {
    name: "Smart Watch Series 5",
    price: "$199.99",
    purchases: 287,
    purchaseChange: "+5.4%",
    performance: "Growing",
    profit: "$28,798",
    profitChange: "+3.7%",
    img: "https://i.ibb.co/4wFkdJ1r/Smart-Watch-Series-5.png",
    performanceValue: 70,
  },
  {
    name: "Bluetooth Speaker",
    price: "$59.99",
    purchases: 156,
    purchaseChange: "-2.1%",
    performance: "Declining",
    profit: "$4,680",
    profitChange: "-1.5%",
    img: "https://i.ibb.co/20f5DZ1S/Bluetooth-Speaker.png",
    performanceValue: 20,
  },
  {
    name: "Noise Cancelling Headphones",
    price: "$249.99",
    purchases: 203,
    purchaseChange: "+18.3%",
    performance: "Growing",
    profit: "$25,300",
    profitChange: "+15.8%",
    img: "https://i.ibb.co/rGVRnHV/Noise-Cancelling-Headphones.png",
    performanceValue: 75,
  },
  {
    name: "Wireless Charging Pad",
    price: "$29.99",
    purchases: 412,
    purchaseChange: "+7.6%",
    performance: "Growing",
    profit: "$6,180",
    profitChange: "+4.2%",
    img: "https://i.ibb.co/rGVRnHV/Noise-Cancelling-Headphones.png",
    performanceValue: 65,
  },
];

export default function ListedProducts() {
  const [filter, setFilter] = useState<"Last 30 days" | "Most Popular">("Last 30 days");

  // Optional: Filter products based on active filter
  const filteredProducts =
    filter === "Most Popular"
      ? [...products].sort((a, b) => b.purchases - a.purchases)
      : products;

  return (
    <Card className="w-full border border-gray-200 rounded-lg shadow-sm">
      <CardContent className="p-4 overflow-x-auto">
        {/* Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b">
          <h2 className="text-base font-semibold text-gray-800">Listed Products</h2>
          <div className="flex gap-2 mt-2 sm:mt-0">
            {["Last 30 days", "Most Popular"].map((btn) => (
              <Button
                key={btn}
                onClick={() => setFilter(btn as "Last 30 days" | "Most Popular")}
                variant="outline"
                className={`rounded-full border-gray-300 ${
                  filter === btn
                    ? " bg-gray-50  text-gray-600 hover:bg-gray-100 "
                    : "bg-gray-50  text-gray-600 hover:bg-gray-100"
                }`}
              >
                {btn}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b bg-gray-50">
              <th className="py-4 px-6 font-medium">PRODUCT</th>
              <th className="py-4 px-6 font-medium">PRICE</th>
              <th className="py-4 px-6 font-medium">PURCHASES</th>
              <th className="py-4 px-6 font-medium">PERFORMANCE</th>
              <th className="py-4 px-6 font-medium">PROFIT</th>
              <th className="py-4 px-6 font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, idx) => (
              <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-4 px-6 flex items-center space-x-3">
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <span className="font-medium text-gray-800">{product.name}</span>
                </td>
                <td className="px-6 text-gray-700">{product.price}</td>
                <td className="px-6">
                  <div className="text-gray-800">{product.purchases}</div>
                  <div
                    className={`text-xs flex items-center ${
                      product.purchaseChange.startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {product.purchaseChange}
                    {product.purchaseChange.startsWith("-") ? " ↓" : " ↑"}
                  </div>
                </td>
                <td className="px-6 min-w-[150px]">
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          product.performance === "Declining"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${product.performanceValue}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        product.performance === "Declining"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {product.performance}
                    </span>
                  </div>
                </td>
                <td className="px-6">
                  <div className="text-gray-800">{product.profit}</div>
                  <div
                    className={`text-xs flex items-center ${
                      product.profitChange.startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {product.profitChange}
                    {product.profitChange.startsWith("-") ? " ↓" : " ↑"}
                  </div>
                </td>
                <td className="px-6">
                  <a
                    href="#"
                    className="text-blue-600 hover:underline flex items-center space-x-1"
                  >
                    <span>Details</span>
                    <ExternalLink size={14} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View More */}
        <div className="flex justify-center mt-4 lg:hidden">
          <a
            href="#"
            className="text-blue-600 hover:underline flex items-center space-x-1"
          >
            <span>View all products</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
