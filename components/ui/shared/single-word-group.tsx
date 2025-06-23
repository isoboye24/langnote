'use client';
import React from 'react';
import { Button } from '../button';
import { Pen, Trash2 } from 'lucide-react';

// import { useRouter } from 'next/navigation';

const SingleWordGroup = ({
  groupName,
  color,
}: {
  groupName: string;
  color: string;
}) => {
  //   const router = useRouter();

  //   const handleCardClick = () => {
  //     router.push(`/user/books/${id}`);
  //   };

  return (
    <div className="grid grid-cols-[12px_12fr] w-30 h-20 md:w-40 md:h-20 shadow-md ">
      <div className="" style={{ backgroundColor: `${color}` }}></div>
      <div className="grid grid-rows-[6fr_2fr] gap-0 ">
        <div className="bg-amber-700 rounded-tr-2xl pl-1 py-3 pr-3 dark:bg-amber-100 text-gray-200 dark:text-gray-800 text-sm md:text-base font-semibold overflow-hidden text-wrap">
          {groupName}
        </div>
        <div className="flex-between px-2 bg-amber-300 dark:bg-amber-200">
          <Button className="bg-transparent">
            <Pen className="text-gray-900" />
          </Button>
          <Button className="bg-transparent">
            <Trash2 className="text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleWordGroup;
