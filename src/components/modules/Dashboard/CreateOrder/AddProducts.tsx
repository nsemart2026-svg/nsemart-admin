"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/shared/SearchInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import React from "react";
import { Product } from "@/types/Product";

interface AddProductsProps {
  products: Product[];
  selectedProducts: any[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<any[]>>;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  handleSelectPriceType: (
    productId: string,
    type: "retail" | "wholesale"
  ) => void;
}

const AddProducts = ({
  products,
  selectedProducts,
  setSelectedProducts,
  setSearchTerm,
  searchTerm,
  handleSelectPriceType,
}: AddProductsProps) => {
  const [globalPriceType, setGlobalPriceType] = React.useState<
    "retail" | "wholesale"
  >("retail");

  // ✅ পেজিনেশনের জন্য নতুন State
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6; // ✅ প্রতি পৃষ্ঠায় ৬টি আইটেম

  // ✅ সার্চ করলে প্রথম পৃষ্ঠায় ফেরত আসার জন্য
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, products.length]);

  // পেজিনেশন ক্যালকুলেশন
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const getDisplayPrice = (product: Product) => {
    if (globalPriceType === "retail") {
      return product.productInfo.salePrice && product.productInfo.salePrice > 0
        ? product.productInfo.salePrice
        : product.productInfo.price;
    } else {
      return product.productInfo.wholeSalePrice &&
        product.productInfo.wholeSalePrice > 0
        ? product.productInfo.wholeSalePrice
        : product.productInfo.price;
    }
  };

  const handleAddProduct = (product: Product) => {
    const displayPrice = getDisplayPrice(product);

    if (!displayPrice || displayPrice <= 0) {
      toast.error("Invalid product price!");
      return;
    }

    const exists = selectedProducts.find((p) => p.productId === product._id);
    if (exists) {
      toast.error("Product already added!");
      return;
    }

    setSelectedProducts((prev) => [
      ...prev,
      {
        productId: product._id,
        quantity: 1,
        priceType: globalPriceType,
        price: displayPrice,
      },
    ]);

    handleSelectPriceType(product._id, globalPriceType);
    toast.success(
      `${product.description.name} added (${globalPriceType} price)`
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.filter((p) => p.productId !== productId)
    );
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Header and Controls... আগের মতো অপরিবর্তিত */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold opacity-90 flex items-center gap-2">
            Add Products
            {selectedProducts.length > 0 && (
              <span className="text-base font-medium text-rose-600">
                ({selectedProducts.length} selected)
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-70">Price Type:</span>
            <Select
              value={globalPriceType}
              onValueChange={(value: "retail" | "wholesale") =>
                setGlobalPriceType(value)
              }
            >
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail Price</SelectItem>
                <SelectItem value="wholesale">Wholesale Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SearchInput
          placeholder="Search products by name or SKU..."
          className="mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {products.length === 0 ? (
          <p className="text-center text-sm opacity-60">No products found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-h-[350px]">
              {currentProducts.map((product) => {
                const displayPrice = getDisplayPrice(product);
                const isSelected = selectedProducts.find(
                  (p) => p.productId === product._id
                );
                return (
                  <div
                    key={product._id}
                    className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition-shadow bg-white h-[180px]"
                  >
                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 line-clamp-2 text-base">
                            {product.description.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1.5">
                            SKU: {product.productInfo.sku}
                          </p>
                        </div>
                        <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600 ml-2 whitespace-nowrap">
                          Stock: {product.productInfo.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <p className="text-[#023337] text-xl font-bold">
                        ৳ {displayPrice}
                      </p>
                      {isSelected ? (
                        <Button
                          onClick={() => handleRemoveProduct(product._id)}
                          variant="outline"
                          size="sm"
                          className="bg-rose-600 text-white hover:bg-rose-500 hover:text-white border-rose-600"
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAddProduct(product)}
                          variant="outline"
                          size="sm"
                          className="hover:bg-[#042f7be7] hover:text-white"
                        >
                          + Add
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ✅ পেজিনেশন কন্ট্রোল */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center pt-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AddProducts;
