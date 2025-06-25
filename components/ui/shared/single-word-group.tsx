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
    <>
      <div
        className="flex flex-col-[12px_1fr] w-full h-full rounded shadow-md overflow-hidden"
        // style={{ minHeight: '100px' }}
      >
        <div className="w-2 h-full" style={{ backgroundColor: color }} />
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 dark:bg-amber-100 text-gray-200 dark:text-gray-800 text-sm md:text-base font-semibold p-2 truncate">
            {groupName}
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-amber-300 dark:bg-amber-200">
            <Button className="bg-transparent p-1">
              <Pen className="text-gray-900 w-4 h-4" />
            </Button>
            <Button className="bg-transparent p-1">
              <Trash2 className="text-red-500 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleWordGroup;
