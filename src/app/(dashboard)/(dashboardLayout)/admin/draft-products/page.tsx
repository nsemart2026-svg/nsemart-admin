/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Monitor,
  Watch,
  Home,
  Dumbbell,
  Gamepad2,
  Heart,
  Book,
} from "lucide-react";
import { CategoryCards } from "@/components/categorise/CategoryCards";
import { FilterBar } from "@/components/categorise/FilterTabs";
import ProductTable from "@/components/categorise/ProductTable";
import PaginationControls from "@/components/categorise/PaginationControls";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectProducts,
  setProducts,
} from "@/redux/featured/products/productSlice";
import {
  selectCategories,
  setCategories,
} from "@/redux/featured/categories/categorySlice";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/featured/products/productsApi";
import { useGetAllCategoriesQuery } from "@/redux/featured/categories/categoryApi";
import { ICategory } from "@/types/Category";
import { Product } from "@/types/Product";
import HeaderActions from "@/components/categorise/HeaderActions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CategoryPage = () => {
  const router = useRouter();
  const { data: allProducts, refetch } = useGetAllProductsQuery({});
  const { data: allCategories } = useGetAllCategoriesQuery();
  const dispatch = useAppDispatch();
  const [deleteProduct] = useDeleteProductMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Product");
  const [currentPage, setCurrentPage] = useState(1);

  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    if (allCategories) {
      dispatch(setCategories(allCategories as ICategory[]));
    }
    if (allProducts) {
      dispatch(setProducts(allProducts as Product[]));
    }
  }, [allProducts, allCategories, dispatch]);

  const draftProducts = products.filter(
    (p) => p.description.status === "draft"
  );

  const itemsPerPage = 10;

  const filterTabs = useMemo(
    () => [
      {
        name: "All Product",
        count: draftProducts.length,
        active: activeFilter === "All Product",
      },
      {
        name: "Featured draftProducts",
        count: draftProducts.filter((p) =>
          p.brandAndCategories?.tags?.some((tag) => tag.name === "Featured")
        ).length,
        active: activeFilter === "Featured draftProducts",
      },
      {
        name: "On Sale",
        count: draftProducts.filter((p) =>
          p.brandAndCategories?.tags?.some((tag) => tag.name === "onSale")
        ).length,
        active: activeFilter === "On Sale",
      },
      {
        name: "Out of Stock",
        count: draftProducts.filter((p) => p.productInfo.quantity === 0).length,
        active: activeFilter === "Out of Stock",
      },
    ],
    [activeFilter, draftProducts]
  );

  const filtereddraftProducts = useMemo(() => {
    return draftProducts.filter((product) => {
      if (
        activeFilter === "Featured draftProducts" &&
        !product.brandAndCategories?.tags?.some(
          (tag) => tag.name === "Featured"
        )
      )
        return false;
      if (
        activeFilter === "On Sale" &&
        !product.brandAndCategories?.tags?.some((tag) => tag.name === "onSale")
      )
        return false;
      if (activeFilter === "Out of Stock" && product.productInfo.quantity !== 0)
        return false;

      if (
        searchQuery.trim() &&
        !product.description.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [activeFilter, draftProducts, searchQuery]);

  // Pagination: slice filtered draftProducts for current page
  const paginateddraftProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtereddraftProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filtereddraftProducts, currentPage]);

  // Reset current page if filtereddraftProducts length changes and currentPage is out of range
  useMemo(() => {
    const totalPages = Math.ceil(filtereddraftProducts.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filtereddraftProducts.length, currentPage]);

  const handleProductAction = (action: string, id: string) => {
    if (action === "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          try {
            const res = await deleteProduct(id).unwrap();

            Swal.fire({
              title: "Deleted!",
              text: `${res.message}`,
              icon: "success",
            });
            refetch();
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
            });
          }
        }
      });
    }

    if (action === "edit") {
      router.push(`/admin/edit-product/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full space-y-6">
        {/* <HeaderActions /> */}
        <CategoryCards categories={categories} />

        {/* Filter + Search Bar */}
        <FilterBar
          tabs={filterTabs}
          activeFilter={activeFilter}
          setActiveFilter={(filter) => {
            setActiveFilter(filter);
            setCurrentPage(1); // Reset page on filter change
          }}
          searchQuery={searchQuery}
          setSearchQuery={(query) => {
            setSearchQuery(query);
            setCurrentPage(1); // Reset page on search change
          }}
        />

        {/* Product Table */}
        <Card>
          <CardContent className="p-0">
            {filtereddraftProducts.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Product Not Found
              </div>
            ) : (
              <ProductTable
                products={paginateddraftProducts}
                onAction={handleProductAction}
              />
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        <PaginationControls
          currentPage={currentPage}
          totalItems={filtereddraftProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
