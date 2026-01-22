"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
}: PaginationControlsProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const delta = 2;

  let start = Math.max(1, currentPage - delta);
  let end = Math.min(totalPages, currentPage + delta);

  if (currentPage <= delta) {
    end = Math.min(totalPages, 5);
  }

  if (currentPage + delta > totalPages) {
    start = Math.max(1, totalPages - 4);
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      {/* Previous */}
      <Button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
        variant="ghost"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {start > 1 && (
          <>
            <PageButton page={1} isActive={currentPage === 1} onClick={onPageChange} />
            {start > 2 && <span className="text-gray-400 px-1">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <PageButton
            key={page}
            page={page}
            isActive={currentPage === page}
            onClick={onPageChange}
          />
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="text-gray-400 px-1">1...</span>}
            <PageButton
              page={totalPages}
              isActive={currentPage === totalPages}
              onClick={onPageChange}
            />
          </>
        )}
      </div>

      {/* Next */}
      <Button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
        variant="ghost"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

function PageButton({
  page,
  isActive,
  onClick,
}: {
  page: number;
  isActive: boolean;
  onClick: (page: number) => void;
}) {
  return (
    <button
      onClick={() => onClick(page)}
      className={`w-8 h-8 rounded-md border text-sm transition 
        ${isActive
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
    >
      {page}
    </button>
  );
}
