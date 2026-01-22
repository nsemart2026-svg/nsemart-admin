"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, ShoppingCart, PlusSquare } from "lucide-react";

export default function OrderManagementTile() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Order Management</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Link
          href="/sr/orders"
          className="group inline-flex items-center gap-2 text-sm md:text-base"
        >
          <ShoppingCart className="size-4" />
          Orders
          <ArrowRight className="size-4 transition group-hover:translate-x-1 ml-auto" />
        </Link>
        <Link
          href="/sr/create-order"
          className="group inline-flex items-center gap-2 text-sm md:text-base"
        >
          <PlusSquare className="size-4" />
          Create Order
          <ArrowRight className="size-4 transition group-hover:translate-x-1 ml-auto" />
        </Link>
      </CardContent>
    </Card>
  );
}
