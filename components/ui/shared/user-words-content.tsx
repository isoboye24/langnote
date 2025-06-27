'use client';
import React, { useEffect, useState } from 'react';

import { Word, WordGroup } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/shared/pagination';
import SearchInput from '@/components/ui/search-input';
import { getWordGroupById } from '@/lib/actions/user/word-group.actions';
import { getAllUserWords } from '@/lib/actions/user/word.actions';
import UserWordListsItems from './user-word-list-item';

const ListOfWords = ({
  bookId,
  groupId,
}: {
  bookId: string;
  groupId: string;
}) => {
  const [words, setWords] = useState<Word[]>([]);
  const [wordGroup, setWordGroup] = useState<WordGroup | null>(null);
  const [viewMeaning, setViewMeaning] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchUserWord = async () => {
      const wordGroupWithIdRes = await getWordGroupById(groupId);
      const wordsRes = await getAllUserWords(page, pageSize, bookId, groupId);

      if (wordsRes.success && wordGroupWithIdRes.success) {
        setWords(wordsRes.data as Word[]);
        setWordGroup(wordGroupWithIdRes.data as WordGroup);

        const count = wordsRes.total ?? 0;
        setTotalCount(count);
        setTotalPages(Math.ceil(count / pageSize));
      }
    };

    fetchUserWord();
  }, [bookId, groupId, page]);

  const onSearch = () => {};

  return (
    <div className="wrapper">
      <div className="shadow mb-10 mt-10 bg-teal-100 dark:bg-teal-800 p-5 rounded-3xl">
        <div className="text-2xl text-center font-bold" translate="no">
          {wordGroup?.groupName ?? ''}
        </div>
      </div>
      <div className="shadow rounded-2xl bg-gray-50 dark:bg-gray-800 p-10 mt-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[3fr_1fr] mb-10 justify-items-center md:justify-items-start">
          <div className="">
            <SearchInput onSearch={onSearch} />
          </div>
          <div className="justify-items-end">
            <Button
              className={
                viewMeaning
                  ? 'bg-teal-500 text-gray-100'
                  : 'bg-red-500 text-gray-100'
              }
              onClick={() => setViewMeaning(!viewMeaning)}
            >
              {viewMeaning ? 'Hide Meaning' : 'Show meaning'}
            </Button>
          </div>
        </div>
        <div className="">
          {words.map((word) => (
            <div key={word.id} className="mb-2">
              <UserWordListsItems
                word={word.word}
                meaning={word.meaning || ''}
                star={word.favorite || false}
                viewMeaning={viewMeaning}
              />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <div className="mt-10 text-end pr-4 md:pr-8 text-green-500">
          Total: {totalCount}
        </div>
      </div>
    </div>
  );
};

export default ListOfWords;
