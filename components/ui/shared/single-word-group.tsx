'use client';
import React from 'react';
import { Button } from '../button';
import { Pen, Trash2 } from 'lucide-react';

import { useRouter } from 'next/navigation';

const SingleWordGroup = ({
  groupName,
  color,
}: {
  groupName: string;
  color: string;
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/user/books/words`);
  };

  return (
    <div className="" onClick={handleCardClick}>
      <div className="grid grid-cols-[12px_1fr] w-full h-full rounded shadow-md ">
        <div className="w-full h-full" style={{ backgroundColor: color }} />
        <div className="grid grid-cols-[1fr_80px] bg-gray-200 dark:bg-gray-800">
          <div className="  text-sm md:text-base font-semibold p-2 truncate">
            {groupName}
          </div>
          <div className="justify-items-end flex ">
            <div className="flex-1">
              <Button className="bg-transparent p-1 hover:bg-gray-400 dark:hover:bg-gray-600">
                <Pen className="text-gray-900 dark:text-gray-300 w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <Button className="bg-transparent p-1 hover:bg-gray-400 dark:hover:bg-gray-600">
                <Trash2 className="text-red-500 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleWordGroup;
