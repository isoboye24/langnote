'use client';

import React, { useEffect, useState } from 'react';
import SingleBook from '@/components/ui/shared/book';
import { Book } from '@prisma/client';
import { getAllBooks } from '@/lib/actions/user/book.actions';
import Pagination from '@/components/ui/shared/pagination';
import { useSession } from 'next-auth/react';
import { getTotalWordGroup } from '@/lib/actions/user/word-group.actions';
const BookList = () => {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [groupCounts, setGroupCounts] = useState<Record<string, number>>({});

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchBooks = async () => {
      const response = await getAllBooks(page, pageSize, userId);

      if (response.success) {
        setBooks(response?.data as Book[]);
        setTotalCount(Number(response.total));
        setTotalPages(Math.ceil(Number(response.total) / pageSize));
      }
    };

    fetchBooks();
  }, [userId, page]);

  useEffect(() => {
    const fetchGroupCounts = async () => {
      const counts: Record<string, number> = {};
      await Promise.all(
        books.map(async (book) => {
          const total = await getTotalWordGroup(book.id);
          counts[book.id] = typeof total === 'number' ? total : 0;
        })
      );
      setGroupCounts(counts);
    };

    fetchGroupCounts();
  }, [books]);

  return (
    <div className="">
      <div className="flex gap-4 flex-wrap justify-center items-center md:justify-start md:items-start mb-20">
        {books.map((book) => {
          return (
            <div key={book.id}>
              <SingleBook
                title={book.title}
                language={book.language}
                groups={groupCounts[book.id] || 0}
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
