'use client';

import React from 'react';
import Link from 'next/link';
import { Pen, Trash2 } from 'lucide-react';
import { Button } from '../button';

const Book = ({
  title,
  language,
  topics,
  color1 = '#4f46e5',
  color2 = '#9333ea',
}: {
  title: string;
  language: string;
  topics: number;
  color1?: string;
  color2?: string;
}) => {
  return (
    <div
      className="relative w-[200px] h-[300px] rounded-md overflow-hidden shadow-xl border"
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
        <div className="bg-white text-gray-700 rounded-full px-6 py-4 shadow-md text-sm font-semibold">
          Pages: {topics}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <Link href={`/user/books/update`}>
          <Button className="bg-white text-gray-800 hover:bg-gray-100">
            <Pen size={16} />
          </Button>
        </Link>
        <Link href={`/user/books/delete`}>
          <Button className="bg-white text-gray-800 hover:bg-gray-100">
            <Trash2 size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Book;
