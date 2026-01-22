"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const products = [
  {
    image: "https://i.ibb.co.com/xSDw0L4G/image-31.png",
    name: "Sony WH-1000XM5",
    category: "Electronics",
    stock: "Available",
    sales: 45000,
  },
  {
    image: "https://i.ibb.co.com/BVN9Hhfr/Frame-1000004962.png",
    name: "iPhone 14",
    category: "Electronics",
    stock: "Sold Out",
    sales: 38450.99,
  },
  {
    image: "https://i.ibb.co.com/kVbdz0CS/Frame-1000004963.png",
    name: "Levi's 501 Jeans",
    category: "Apparel",
    stock: "Sold Out",
    sales: 35250,
  },
  {
    image: "https://i.ibb.co.com/jPxFVsgm/Frame-1000004992.png",
    name: "Nike Air Zoom Pegasus",
    category: "Footwear",
    stock: "Available",
    sales: 31876.23,
  },
];

export default function TopSellingProducts() {
  return (
    <div className="w-full max-w-full  bg-white dark:bg-card rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Top Selling Products</h2>
        <Button className="bg-black text-white hover:bg-zinc-800" size="sm">
          This Year
        </Button>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="p-4 whitespace-nowrap">Product</th>
              <th className="p-4 whitespace-nowrap">Product Name</th>
              <th className="p-4 whitespace-nowrap">Category</th>
              <th className="p-4 whitespace-nowrap">Stock</th>
              <th className="p-4 whitespace-nowrap text-right">Total Sales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product, idx) => (
              <tr key={idx}>
                <td className="p-4">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </td>
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">
                  <span
                    className={
                      product.stock === "Available"
                        ? "text-green-600 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="p-4 text-right text-muted-foreground">
                  ${product.sales.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
