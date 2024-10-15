import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const renderPagination = () => {
    const pages = [];

    // Show the first page
    if (currentPage > 3) {
      pages.push(
        <PaginationItem>
          <PaginationLink href="#" key={1} onClick={() => handlePageClick(1)}>
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (currentPage > 4) {
        pages.push(<span key="left-ellipsis">...</span>); // Left ellipsis
      }
    }

    // Show 2 pages before the current page, the current page, and 2 pages after it
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(
        <PaginationItem>
          <PaginationLink
            href="#"
            key={i}
            onClick={() => handlePageClick(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    // Show the last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push(<span key="right-ellipsis">...</span>); // Right ellipsis
      }
      pages.push(
        <PaginationItem>
          <PaginationLink
            href="#"
            key={totalPages}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageClick(currentPage - 1)}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {renderPagination()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageClick(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
