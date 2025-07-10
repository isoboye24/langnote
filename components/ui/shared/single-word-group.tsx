'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { Pen } from 'lucide-react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DeleteDialog from './delete-dialog';
import {
  deleteWordGroup,
  getWordGroupCountById,
} from '@/lib/actions/user/word-group.actions';

const SingleWordGroup = ({
  groupName,
  color,
  bookId,
  groupId,
}: {
  groupName: string;
  color: string;
  bookId: string;
  groupId: string;
}) => {
  const router = useRouter();
  const [totalWords, setTotalWords] = useState(0);

  useEffect(() => {
    const fetchCases = async () => {
      const wordCount = await getWordGroupCountById(groupId);

      setTotalWords(wordCount!);
    };

    fetchCases();
  }, [groupId]);

  const handleCardClick = () => {
    router.push(`/user/books/${bookId}/${groupId}`);
  };

  return (
    <div className="" onClick={handleCardClick}>
      <div className="grid grid-cols-[12px_1fr] w-full h-full rounded shadow-md ">
        <div className="w-full h-full" style={{ backgroundColor: color }} />
        <div className="grid grid-cols-[1fr_120px] bg-gray-200 dark:bg-gray-800 pr-2">
          <div className=" text-sm md:text-base font-semibold p-2 truncate">
            {groupName}
          </div>
          <div className="justify-items-end flex ">
            <div className="flex-1 mt-2.5 text-sm font-semibold text-center">
              ({totalWords})
            </div>
            <div className="flex-1">
              <Link
                href={`/user/books/${bookId}/update/${groupId}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Button className="bg-transparent p-1 hover:bg-gray-400 dark:hover:bg-gray-600 h-full ">
                  <Pen className="text-gray-900 dark:text-gray-300 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="flex-1 " onClick={(e) => e.stopPropagation()}>
              <DeleteDialog
                className="ml-0"
                id={groupId!}
                action={deleteWordGroup}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleWordGroup;
