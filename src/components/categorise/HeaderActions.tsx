"use client";

import { Plus,} from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function HeaderActions() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Link href={'/admin/add-new-product'}>
          <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>
    </div>
  );
}
