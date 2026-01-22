"use client";

import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/Product";
import Link from "next/link";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useGetAllShopsQuery } from "@/redux/featured/shop/shopApi";

export default function ProductTable({
  products,
  onAction,
}: {
  products: Product[];
  onAction: (action: string, id: string) => void;
}) {
  const { data: shopData, isLoading: isShopDataLoading } =
    useGetAllShopsQuery();
  const currentUser: any = useAppSelector(selectCurrentUser);
  const filterShop = shopData.filter(
    (shop: any) => shop.vendorId?._id === currentUser?._id
  );
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[650px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 px-2 py-1 text-xs sm:text-sm">
              Check Box
            </TableHead>{" "}
            <TableHead className="w-12 px-2 py-1 text-xs sm:text-sm">
              No.
            </TableHead>
            <TableHead className="px-2 py-1 text-xs sm:text-sm">
              Product Name
            </TableHead>
            <TableHead className="px-2 py-1 text-xs sm:text-sm">
              Created Date
            </TableHead>
            <TableHead className="px-2 py-1 text-xs sm:text-sm">
              Order
            </TableHead>
            <TableHead className="w-20 px-2 py-1 text-center text-xs sm:text-sm">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products
            .filter((shop: any) => shop.shopId?._id === filterShop)
            .map((product, index) => (
              <TableRow key={product._id} className="hover:bg-gray-50">
                <TableCell className="px-2 py-1">
                  <Checkbox
                    value={product._id}
                    aria-label={`Select ${product?.description?.name}`}
                  />
                </TableCell>
                <TableCell className="px-2 py-1 text-xs sm:text-sm">
                  {index + 1}
                </TableCell>
                <TableCell className="px-2 py-1">
                  <div className="flex items-center gap-3">
                    {product.featuredImg ? (
                      <Image
                        src={product.featuredImg}
                        alt={product?.description?.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                        priority={false}
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gray-200 rounded-md" />
                    )}
                    <span className="font-medium text-sm truncate">
                      {product?.description?.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-2 py-1 text-sm whitespace-nowrap">
                  {new Date(product.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-2 py-1 text-sm">
                  {product.description?.status}
                </TableCell>
                <TableCell className="px-2 py-1">
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/edit-product/${product._id}`}>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1"
                      onClick={() => onAction("delete", product._id)}
                      aria-label={`Delete ${product?.description?.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
