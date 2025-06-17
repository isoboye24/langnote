'use client';

import { PaginationProps } from '@/types';
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

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded-md border text-sm ${
            i === currentPage
              ? 'bg-teal-600 text-white font-semibold'
              : 'bg-white hover:bg-gray-100 text-gray-800'
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mt-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-100 disabled:opacity-50 dark:text-gray-900"
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-100 disabled:opacity-50 dark:text-gray-900"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
