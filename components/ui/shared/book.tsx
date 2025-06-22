import Link from 'next/link';
import React from 'react';
import { Button } from '../button';
import { Pen, Trash2 } from 'lucide-react';

const Book = ({
  title,
  language,
  topics,
  color = 'from-indigo-500 to-purple-600',
}: {
  title: string;
  language: string;
  topics: number;
  color?: string;
}) => {
  // const editBook = () => {};
  // const deleteBook = () => {};
  return (
    <Link
      href={`/user/books/book`}
      className={`w-35 h-50 md:w-35 md:h-50 lg:w-50 lg:h-60 xl:w-60 xl:h-80 bg-gradient-to-br ${color} text-white rounded-2xl shadow-lg p-4 flex flex-col justify-between`}
    >
      <div>
        <h2 className="text-md font-bold break-words mb-2">{title}</h2>
        <p className="text-xs italic mb-3">Lang: {language}</p>
        <p className="text-xs">Pages: {topics}</p>
      </div>

      <div className=" flex-between">
        <Button className="bg-transparent">
          <Link href={`/user/books/update`}>
            <Pen />
          </Link>
        </Button>
        <Button className="bg-transparent">
          <Link href={`/user/books/delete`}>
            <Trash2 />
          </Link>
        </Button>
      </div>
    </Link>
  );
};

export default Book;
