'use client';

import React from 'react';
import Image from 'next/image';

const PopularList = ({
  lightIcon,
  darkIcon,
  category,
  totalWords,
}: {
  lightIcon: string;
  darkIcon: string;
  category: string;
  totalWords: number;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 grid grid-cols-[1fr_3fr] gap-4 rounded-xl">
      <div className="flex items-center justify-center">
        <div className="relative">
          <Image
            src={lightIcon}
            alt={category}
            width={100}
            height={100}
            className="block dark:hidden"
          />

          <Image
            src={darkIcon}
            alt={category}
            width={100}
            height={100}
            className="hidden dark:block"
          />
        </div>
      </div>
      <div className="grid grid-rows-2">
        <div className="font-bold text-base md:text-xl">{category}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {totalWords} {`Begriff${totalWords > 1 ? 'e' : ''}`}
        </div>
      </div>
    </div>
  );
};

export default PopularList;
