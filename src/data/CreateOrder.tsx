/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";

export type Product = {
  name: string;
  sku: string;
  price: number;
  stock: number;
};

export const products: Product[] = [
  { name: "iPhone 14 Pro", sku: "IPH14P001", price: 999, stock: 25 },
  { name: "Samsung Galaxy S23", sku: "SAM23001", price: 899, stock: 15 },
  { name: "MacBook Pro M2", sku: "MBP22001", price: 1299, stock: 8 },
  { name: "AirPods Pro", sku: "APR22001", price: 249, stock: 45 },
];

// order Items data

export const orderItemsData = [
  {
    name: "iPhone 14 Pro",
    sku: "IPH14P001",
    price: "$999.00",
    quantity: 1,
    total: "$999.00",
  },
  {
    name: "AirPods Pro",
    sku: "APR22001",
    price: "$249.00",
    quantity: 2,
    total: "$498.00",
  },
];

export const orderItemsColumns = [
  { header: "Product", accessor: "name" },
  { header: "sku", accessor: "sku" },
  { header: "price", accessor: "price" },
  { header: "total", accessor: "total" },
  {
    header: "Quantity",
    accessor: "quantity",
    render: (_: any, row : any) => {
      const quantity = row.quantity;

      return (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            −
          </Button>
          <div className="w-8 text-center">{quantity}</div>
          <Button size="sm" variant="outline">
            +
          </Button>
        </div>
      );
    },
  },

  {
    header: "Actions",
    accessor: "actions",
    render: () => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Remove
        </Button>
      </div>
    ),
  },
];
