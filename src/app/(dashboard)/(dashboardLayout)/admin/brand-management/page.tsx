'use client';

import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Brand from '@/components/brand/Brand';
import ViewBrandDetails from '@/components/brand/ViewBrands';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetAllBrandsQuery } from '@/redux/featured/brands/brandsApi';
import { selectBrands, setBrands } from '@/redux/featured/brands/brandsSlice';
import Image from 'next/image';
import { IBrand } from '@/types/brands';

export default function BrandManagement() {
  const { data: allBrands, isLoading, refetch } = useGetAllBrandsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useAppDispatch();

  const brands = useAppSelector(selectBrands);

  // Load brands into Redux
  useEffect(() => {
    if (allBrands) {
      dispatch(setBrands(allBrands));
    }
  }, [allBrands, dispatch]);

  // Filter brands by search term
  const filteredBrands = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return brands.filter(
      (b) =>
        b.name.toLowerCase().includes(term) ||
        b.icon?.name?.toLowerCase().includes(term)
    );
  }, [brands, searchTerm]);

  // Pagination
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);
  const startIdx = currentPage * ITEMS_PER_PAGE;
  const currentItems = filteredBrands.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="space-y-6 py-6">
      {/* Add Brand Button */}
      <div className="flex justify-end">
        <Brand refetch={refetch}>+ Add Brand</Brand>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0); // reset page when searching
            }}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button disabled variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button disabled variant="outline" size="sm">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Brand Cards */}
      <div className="relative w-full">
        {totalPages > 1 && (
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition ${
              currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            &#8592;
          </button>
        )}

        <div className="grid gap-4 px-4 py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {isLoading ? (
            <p>Loading brands...</p>
          ) : currentItems.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">No brands found.</p>
          ) : (
            currentItems.map((brand: IBrand) => (
              <Card key={brand._id} className="cursor-pointer transition hover:shadow-md">
                <CardContent className="flex flex-col gap-2 p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                        {brand.icon?.url && (
                          <Image
                            src={brand.icon.url}
                            alt={brand.icon.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                      <span className="font-medium">{brand.name}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <ViewBrandDetails brand={brand} />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition ${
              currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            &#8594;
          </button>
        )}
      </div>
    </div>
  );
}
