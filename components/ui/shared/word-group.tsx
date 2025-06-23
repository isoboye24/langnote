'use client';

import React from 'react';
import Link from 'next/link';
import { Pen } from 'lucide-react';
import { Button } from '../button';
import DeleteDialog from './delete-dialog';
import { deleteBook } from '@/lib/actions/user/book.actions';
import { useRouter } from 'next/navigation';

const WordGroup = ({
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
  const router = useRouter();

  // Compute topValue before returning JSX
  let topValue = 4;
  if (title.length < 12) {
    topValue = 3;
  } else if (title.length < 24) {
    topValue = 4;
  } else {
    topValue = 6.5;
  }

  const handleCardClick = () => {
    router.push(`/user/books/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative w-60 h-70 md:w-45 rounded-md overflow-hidden shadow-xl border"
      style={{
        background: `linear-gradient(135deg, ${color1}, ${color2})`,
      }}
    >
      {/* Top Title */}
      <div className="absolute top-4 left-4 right-4 text-white text-lg font-bold tracking-wide text-center">
        {title}
      </div>

      {/* Subtext (Language) */}
      <div
        className="absolute left-4 right-4 text-white text-sm italic"
        style={{ top: `${topValue}rem` }}
      >
        {language}
      </div>

      {/* Center Decorative Section */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 text-center`}
      >
        <div className="bg-white text-gray-700 rounded-full px-2 py-2 shadow-md text-xs font-semibold">
          Groups: {groups}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <Link
          href={`/user/books/update/${id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Button className="bg-white text-gray-800 hover:bg-gray-100">
            <Pen size={16} />
          </Button>
        </Link>
        <div onClick={(e) => e.stopPropagation()}>
          <DeleteDialog id={id!} action={deleteBook} />
        </div>
      </div>
    </div>
  );
};

export default WordGroup;
