import { Eye, Pen, Star } from 'lucide-react';
import React, { useState } from 'react';
import DeleteDialog from './delete-dialog';
import { deleteUserWord } from '@/lib/actions/user/word.actions';
import Link from 'next/link';
import { Button } from '../button';

const UserWordListsItems = ({
  word,
  meaning,
  star,
  gender,
  id,
  bookId,
  groupId,
}: {
  word: string;
  meaning: string;
  star: boolean;
  gender?: string;
  id: string;
  bookId: string;
  groupId: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="" onClick={() => setShow(!show)}>
      <div className="flex flex-between">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <div
              className="text-teal-500 font-semibold text-base"
              translate="no"
            >
              {word}
            </div>
            <div className="">{gender}</div>
          </div>
          {show && <div className="text-sm italic">{meaning}</div>}
        </div>
        <div className="block md:hidden">
          {show && (
            <div className="flex gap-0.5">
              <Star
                className={`w-4 h-4 md:w-6 md:h-6 mr-2  transition-colors ${
                  star === true
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-teal-400'
                }`}
              />
              <Link href={`/user/books/${bookId}/${groupId}/view/${id}`}>
                <Button className="w-3 h-3 md:w-6 md:h-6 bg-transparent text-teal-500">
                  <Eye />
                </Button>
              </Link>
              <Link href={`/user/books/${bookId}/${groupId}/${id}`}>
                <Button className="w-3 h-3 md:w-6 md:h-6 bg-transparent text-teal-500">
                  <Pen className="w-3 h-3 md:w-6 md:h-6" />
                </Button>
              </Link>
              <DeleteDialog
                className="w-0 h-5 md:w-6 md:h-6"
                id={id}
                action={deleteUserWord}
              />
            </div>
          )}
        </div>
        <div className="hidden md:block">
          <div className="flex gap-0.5">
            <Star
              className={`w-4 h-4 md:w-6 md:h-6 mr-2  transition-colors ${
                star === true
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-teal-400'
              }`}
            />
            <Link href={`/user/books/${bookId}/${groupId}/view/${id}`}>
              <Button className="w-3 h-3 md:w-6 md:h-6 bg-transparent text-teal-500">
                <Eye />
              </Button>
            </Link>
            <Link href={`/user/books/${bookId}/${groupId}/${id}`}>
              <Button className="w-3 h-3 md:w-6 md:h-6 bg-transparent text-teal-500">
                <Pen className="w-3 h-3 md:w-6 md:h-6" />
              </Button>
            </Link>
            <DeleteDialog
              className="w-0 h-5 md:w-6 md:h-6"
              id={id}
              action={deleteUserWord}
            />
          </div>
        </div>
      </div>
      <hr className="mt-2 border-1 border-teal-100 dark:border-teal-800" />
    </div>
  );
};

export default UserWordListsItems;
