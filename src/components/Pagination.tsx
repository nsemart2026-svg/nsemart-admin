/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface pages {
  setCurrentPage: any;
  currentPage: any;
  meta: any;
}

export default function PaginationView({
  setCurrentPage,
  currentPage,
  meta,
}: pages) {
  const getLimitedPages = (totalPages: number, currentPage: number) => {
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);
    if (end - start + 1 < 3) {
      if (start === 1) {
        end = Math.min(totalPages, start + 2);
      } else if (end === totalPages) {
        start = Math.max(1, end - 2);
      }
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div>
      {meta?.totalPage > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev: any) => prev - 1)}
                className={`cursor-pointer border ${
                  currentPage === 1 && "opacity-30 pointer-events-none"
                }`}
              />
            </PaginationItem>
            {getLimitedPages(meta?.totalPage, currentPage).map((page) => (
              <PaginationItem
                key={page}
                onClick={() => setCurrentPage(page)}
                className="cursor-pointer"
              >
                <PaginationLink isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev: any) => prev + 1)}
                className={`cursor-pointer border ${
                  currentPage === meta?.totalPage &&
                  "opacity-30 pointer-events-none"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
