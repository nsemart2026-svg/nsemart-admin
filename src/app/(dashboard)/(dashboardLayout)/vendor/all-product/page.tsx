/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryCards } from "@/components/categorise/CategoryCards";
import { FilterBar } from "@/components/categorise/FilterTabs";
import HeaderActions from "@/components/categorise/HeaderActions";
import ProductTable from "@/components/categorise/ProductTable";
import PaginationControls from "@/components/categorise/PaginationControls";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/featured/products/productsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Swal from "sweetalert2";
import {
  selectProducts,
  setProducts,
} from "@/redux/featured/products/productSlice";
import { Product } from "@/types/Product";
import { useGetAllCategoriesQuery } from "@/redux/featured/categories/categoryApi";
import {
  selectCategories,
  setCategories,
} from "@/redux/featured/categories/categorySlice";
import { ICategory } from "@/types/Category";
import { useRouter } from "next/navigation";
import { useGetAllShopsQuery } from "@/redux/featured/shop/shopApi";
import { setTags } from "@/redux/featured/tags/tagsSlice";
import { setBrands } from "@/redux/featured/brands/brandsSlice";
import { setShops } from "@/redux/featured/shop/shopSlice";
import { useGetAllTagsQuery } from "@/redux/featured/tags/tagsApi";
import { useGetAllBrandsQuery } from "@/redux/featured/brands/brandsApi";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";

const CategoryPage = () => {
  const {
    data: allProducts,
    isLoading: ProductsLoading,
    refetch,
  } = useGetAllProductsQuery({});
  const router = useRouter();
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const currentUser: any = useAppSelector(selectCurrentUser);
  const userId = currentUser?._id;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Product");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    if (allCategories) {
      dispatch(setCategories(allCategories as ICategory[]));
    }

    if (allProducts) {
      let filtered = allProducts as Product[];

      if (userId) {
        filtered = filtered.filter(
          (product: any) => product.vendorId === userId
        );
      }

      dispatch(setProducts(filtered));
    }
  }, [allProducts, allCategories, dispatch, userId]);

  const filterTabs = useMemo(
    () => [
      {
        name: "All Product",
        count: products?.length || 0,
        active: activeFilter === "All Product",
      },
      {
        name: "Featured Products",
        count: products.filter((p) =>
          p.brandAndCategories?.tags?.some((tag) => tag.name === "Featured")
        ).length,
        active: activeFilter === "Featured Products",
      },
      {
        name: "On Sale",
        count: products.filter((p) =>
          p.brandAndCategories?.tags?.some((tag) => tag.name === "onSale")
        ).length,
        active: activeFilter === "On Sale",
      },
      {
        name: "Out of Stock",
        count: products.filter((p) => p.productInfo.quantity === 0).length,
        active: activeFilter === "Out of Stock",
      },
    ],
    [activeFilter, products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      if (
        activeFilter === "Featured Products" &&
        !product?.brandAndCategories?.tags?.some(
          (tag) => tag.name === "Featured"
        )
      )
        return false;
      if (
        activeFilter === "On Sale" &&
        !product?.brandAndCategories?.tags?.some((tag) => tag.name === "onSale")
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
  }, [products, activeFilter, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredProducts.length, currentPage]);

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

  const { data: tagsDatau, isLoading: isTagsLoading } =
    useGetAllTagsQuery(undefined);
  const { data: brandsu, isLoading: isBrandsLoading } =
    useGetAllBrandsQuery(undefined);
  const { data: shopDatau, isLoading: isShopDataLoading } =
    useGetAllShopsQuery();

  useEffect(() => {
    if (tagsDatau) {
      dispatch(setTags(tagsDatau));
    }
    if (brandsu) {
      dispatch(setBrands(brandsu));
    }
    if (shopDatau) {
      dispatch(setShops(shopDatau));
    }
    refetch();
  }, [dispatch, tagsDatau, brandsu, shopDatau, refetch]);

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6">
      <div className="w-full space-y-6">
        <HeaderActions />
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <CategoryCards categories={categories} />
        )}

        {/* Filter + Search Bar */}
        <FilterBar
          tabs={filterTabs}
          activeFilter={activeFilter}
          setActiveFilter={(filter) => {
            setActiveFilter(filter);
            setCurrentPage(1);
          }}
          searchQuery={searchQuery}
          setSearchQuery={(query) => {
            setSearchQuery(query);
            setCurrentPage(1);
          }}
        />

        {/* Product Table */}
        <Card>
          <CardContent className="p-0">
            {ProductsLoading ? (
              <span>Loading....</span>
            ) : filteredProducts.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Product Not Found
              </div>
            ) : (
              <ProductTable
                products={paginatedProducts}
                onAction={handleProductAction}
              />
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        <PaginationControls
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
