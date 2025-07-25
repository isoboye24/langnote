'use client';

import React, { useEffect, useState } from 'react';
import SingleBook from '@/components/ui/shared/book';
import { Book, Language } from '@prisma/client';
import { getAllBooks } from '@/lib/actions/user/book.actions';
import Pagination from '@/components/ui/shared/pagination';
import { useSession } from 'next-auth/react';
import { getTotalWordGroup } from '@/lib/actions/user/word-group.actions';
import { getAllLanguagesToSelect } from '@/lib/actions/admin/language.actions';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
const BookList = () => {
  const router = useRouter();
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
    <div className="wrapper">
      <div className="flex-between mb-15 md:mb-20">
        <div className="">
          <Button
            onClick={() => router.back()}
            className="bg-orange-800 hover:bg-orange-700 dark:bg-teal-700 hover:dark:bg-teal-500 transition duration-500 ease-in-out text-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
        <div className="">
          <a href={`/user/books/create`}>
            <Button className="bg-orange-800 hover:bg-orange-700 dark:bg-teal-700 hover:dark:bg-teal-500 transition duration-500 ease-in-out text-gray-100">
              Create Book
            </Button>
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:flex gap-4 md:flex-wrap justify-items-center md:justify-start md:items-start mb-20">
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
