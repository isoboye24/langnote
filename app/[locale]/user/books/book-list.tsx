'use client';

import React, { useEffect, useState } from 'react';
import SingleBook from '@/components/ui/shared/book';
import { Book } from '@prisma/client';
import { getAllBooks } from '@/lib/actions/user/book.actions';
import Pagination from '@/components/ui/shared/pagination';
// import { getTotalWordGroup } from '@/lib/actions/user/word-group.actions';

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  // const [WordGroups, setWordGroups] = useState<WordGroup[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  // const [totalGroup, setTotalGroup] = useState(0);

  useEffect(() => {
    const fetchCases = async () => {
      const response = await getAllBooks(page, pageSize);

      if (response.success) {
        setBooks(response?.data as Book[]);
        // setTotalBooks(totalBooks?.data as Book[]);
        setTotalCount(Number(response.total));
        setTotalPages(Math.ceil(Number(response.total) / pageSize));
      }
    };

    fetchCases();
  }, [page]);
  return (
    <div className="">
      <div className="flex gap-4 flex-wrap justify-center items-center md:justify-start md:items-start mb-20">
        {books.map((book) => {
          // const group = wordGroup.find(
          //   (lang) => lang.id === gender.languageId
          // );
          return (
            <div key={book.id}>
              <SingleBook
                title={book.title}
                language={book.language}
                groups={0}
                color1={book.color1}
                color2={book.color2}
                id={book.id}
              />
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <div className="mt-10 text-end pr-4 md:pr-8 text-green-500">
        Total Books: {totalCount}
      </div>
    </div>
  );
};

export default BookList;
