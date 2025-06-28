'use client';

import React, { useEffect, useState } from 'react';
import SingleBook from '@/components/ui/shared/book';
import { Book, Language } from '@prisma/client';
import { getAllBooks } from '@/lib/actions/user/book.actions';
import Pagination from '@/components/ui/shared/pagination';
import { useSession } from 'next-auth/react';
import { getTotalWordGroup } from '@/lib/actions/user/word-group.actions';
import { getAllLanguagesToSelect } from '@/lib/actions/admin/language.actions';
const BookList = () => {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
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
      const langRes = await getAllLanguagesToSelect();

      if (response.success) {
        setBooks(response?.data as Book[]);
        setLanguages(langRes?.data as Language[]);
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
      <div className="grid grid-cols-2 md:flex gap-4 md:flex-wrap justify-center items-center md:justify-start md:items-start mb-20">
        {books.map((book) => {
          const language = languages.find(
            (lang) => lang.id === book.languageId
          );
          return (
            <div key={book.id}>
              <SingleBook
                title={book.title}
                language={language?.languageName || 'Unknown'}
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
