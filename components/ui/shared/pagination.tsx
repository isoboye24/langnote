'use client';

import { PaginationProps } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const pageRange = 1;

    const createButton = (page: number) => (
      <button
        key={page}
        onClick={() => goToPage(page)}
        className={`px-2 md:px-3 py-0.5 md:py-1 rounded-xs md:rounded-md border text-xs md:text-sm ${
          page === currentPage
            ? 'bg-teal-600 text-white font-semibold'
            : 'bg-white hover:bg-gray-100 text-gray-800'
        }`}
      >
        {page}
      </button>
    );

    const addEllipsis = (key: string) => (
      <span key={key} className="hidden md:block px-2 text-gray-500 text-sm">
        ...
      </span>
    );

    const showLeftDots = currentPage > 2 + pageRange;
    const showRightDots = currentPage < totalPages - (1 + pageRange);

    pages.push(createButton(1));

    if (showLeftDots) {
      pages.push(addEllipsis('left-ellipsis'));
    }

    for (
      let i = Math.max(2, currentPage - pageRange);
      i <= Math.min(totalPages - 1, currentPage + pageRange);
      i++
    ) {
      pages.push(createButton(i));
    }

    if (showRightDots) {
      pages.push(addEllipsis('right-ellipsis'));
    }

    if (totalPages > 1) {
      pages.push(createButton(totalPages));
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mt-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-1 md:px-3 py-0.5 md:py-1 rounded-sm md:rounded-md border text-xs md:text-sm bg-white hover:bg-gray-100 disabled:opacity-50 dark:text-gray-900"
      >
        <div className="">
          <ChevronLeft size={20} />
        </div>
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-1 md:px-3 py-0.5 md:py-1 rounded-sm md:rounded-md border text-xs md:text-sm bg-white hover:bg-gray-100 disabled:opacity-50 dark:text-gray-900"
      >
        <div className="">
          <ChevronRight size={20} />
        </div>
      </button>
    </div>
  );
};

export default Pagination;
