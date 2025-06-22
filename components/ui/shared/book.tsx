'use client';

import React from 'react';
import Link from 'next/link';
import { Pen } from 'lucide-react';
import { Button } from '../button';
import DeleteDialog from './delete-dialog';
import { deleteBook } from '@/lib/actions/user/book.actions';

const Book = ({
  title,
  language,
  groups,
  color1 = '#4f46e5',
  color2 = '#9333ea',
  id,
}: {
  title: string;
  language: string;
  groups: number;
  color1?: string;
  color2?: string;
  id?: string;
}) => {
  return (
    <div
      className="relative w-60 h-70 md:w-45 rounded-md overflow-hidden shadow-xl border"
      style={{
        background: `linear-gradient(135deg, ${color1}, ${color2})`,
      }}
    >
      {/* Top Title */}
      <div className="absolute top-4 left-4 right-4 text-white text-lg font-bold tracking-wide">
        {title}
      </div>

      {/* Subtext (Language) */}
      <div className="absolute top-12 left-4 right-4 text-white text-sm italic">
        {language}
      </div>

      {/* Center Decorative Section */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-white text-gray-700 rounded-full px-3 py-2 shadow-md text-xs font-semibold">
          Groups: {groups}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <Link href={`/user/books/${id}`}>
          <Button className="bg-white text-gray-800 hover:bg-gray-100">
            <Pen size={16} />
          </Button>
        </Link>
        <DeleteDialog id={id!} action={deleteBook} />
      </div>
    </div>
  );
};

export default Book;
