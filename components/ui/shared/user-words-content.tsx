'use client';

import React, { useEffect, useState } from 'react';
import { Word, WordGroup } from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';
import SearchInput from '@/components/ui/search-input';
import { getWordGroupById } from '@/lib/actions/user/word-group.actions';
import {
  getAllFilteredUserWords,
  getAllPartOfSpeechNamesInGroup,
} from '@/lib/actions/user/word.actions';
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
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterTypes] = useState<string[]>(['All']);
  const [activeType, setActiveType] = useState('All');

  const pageSize = 10;

  useEffect(() => {
    const fetchFilterTypes = async () => {
      try {
        const response = await getAllPartOfSpeechNamesInGroup({
          bookId,
          groupId,
        });
        const names = response.map((entry) => entry.name);
        setFilterTypes(['All', ...names]);
      } catch (error) {
        console.error('Failed to fetch part of speech types:', error);
      }
    };

    fetchFilterTypes();
  }, [bookId, groupId]);

  useEffect(() => {
    const fetchUserWord = async () => {
      const wordGroupWithIdRes = await getWordGroupById(groupId);
      const wordsRes = await getAllFilteredUserWords({
        activeType,
        bookId,
        groupId,
        page,
        pageSize,
      });

      try {
        if (wordsRes.success && wordGroupWithIdRes.success) {
          setWords(wordsRes.data as Word[]);
          setWordGroup(wordGroupWithIdRes.data as WordGroup);

          const count = wordsRes.total ?? 0;
          setTotalCount(count);
          setTotalPages(Math.ceil(count / pageSize));
        }
      } catch (error) {
        console.error('Failed to fetch words or word group:', error);
      }
    };

    fetchUserWord();
  }, [activeType, bookId, groupId, page]);

  const onSearch = () => {};

  return (
    <>
      <div className="wrapper">
        <div className="shadow mb-10 bg-teal-100 dark:bg-teal-800 p-5 rounded-3xl">
          <div className="text-2xl text-center font-bold" translate="no">
            {wordGroup?.groupName ?? ''}
          </div>
        </div>
        <div className="shadow rounded-2xl bg-gray-50 dark:bg-gray-800 p-10 mt-10">
          <div className="flex space-x-6 mb-15 justify-center ">
            {filterType.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setPage(1); // reset pagination
                  setActiveType(type);
                }}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  activeType === type
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-orange-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="mb-10 justify-items-center">
            <SearchInput className="" onSearch={onSearch} />
          </div>

          <div className="">
            {words.map((word) => {
              return (
                <div key={word.id} className="mb-2">
                  <UserWordListsItems
                    word={word.word}
                    meaning={word.meaning || ''}
                    star={word.favorite || false}
                    id={word.id}
                    bookId={word.bookId}
                    groupId={word.wordGroupId}
                  />
                </div>
              );
            })}
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
    </>
  );
};

export default ListOfWords;
