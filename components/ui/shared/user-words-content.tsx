'use client';

import React, { useEffect, useState } from 'react';
import { Word, WordGroup } from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';
import SearchInput from '@/components/ui/search-input';
import { getWordGroupById } from '@/lib/actions/user/word-group.actions';
import {
  getAllFilteredUserLastMonthWords,
  getAllFilteredUserLastThreeMonthsWords,
  getAllFilteredUserLastTwoWeeksWords,
  getAllFilteredUserLastWeeksWords,
  getAllFilteredUserWords,
  getAllPartOfSpeechNamesInGroup,
} from '@/lib/actions/user/word.actions';
import UserWordListsItems from './user-word-list-item';
import { Button } from '../button';
import Link from 'next/link';
import { SmallCirclesWithIcon } from './small-circle-with-icon-center';
import { ArrowLeft, BookType, Calendar1, RotateCcw, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ListOfWords = ({
  bookId,
  groupId,
}: {
  bookId: string;
  groupId: string;
}) => {
  const router = useRouter();
  const [words, setWords] = useState<Word[]>([]);
  const [wordGroup, setWordGroup] = useState<WordGroup | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterTypes] = useState<string[]>(['All']);
  const [activeType, setActiveType] = useState('All');
  type TimeFilter =
    | 'ALL'
    | 'LAST_WEEK'
    | 'TWO_WEEKS'
    | 'LAST_MONTH'
    | 'THREE_MONTHS';
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('ALL');

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
      try {
        const wordGroupWithIdRes = await getWordGroupById(groupId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const getWords = (wordsRes: any) => {
          if (wordsRes.success && wordGroupWithIdRes.success) {
            setWords(wordsRes.data as Word[]);
            setWordGroup(wordGroupWithIdRes.data as WordGroup);

            const count = wordsRes.total ?? 0;
            setTotalCount(count);
            setTotalPages(Math.ceil(count / pageSize));
          }
        };

        switch (timeFilter) {
          case 'ALL':
            getWords(
              await getAllFilteredUserWords({
                activeType,
                bookId,
                groupId,
                page,
                pageSize,
              })
            );
            break;
          case 'LAST_WEEK':
            getWords(
              await getAllFilteredUserLastWeeksWords({
                activeType,
                bookId,
                groupId,
                page,
                pageSize,
              })
            );
            break;
          case 'TWO_WEEKS':
            getWords(
              await getAllFilteredUserLastTwoWeeksWords({
                activeType,
                bookId,
                groupId,
                page,
                pageSize,
              })
            );
            break;
          case 'LAST_MONTH':
            getWords(
              await getAllFilteredUserLastMonthWords({
                activeType,
                bookId,
                groupId,
                page,
                pageSize,
              })
            );
            break;
          case 'THREE_MONTHS':
            getWords(
              await getAllFilteredUserLastThreeMonthsWords({
                activeType,
                bookId,
                groupId,
                page,
                pageSize,
              })
            );
            break;
        }
      } catch (error) {
        console.error('Failed to fetch words or word group:', error);
      }
    };

    fetchUserWord();
  }, [timeFilter, activeType, bookId, groupId, page]);

  const onSearch = () => {};

  return (
    <>
      <div className="wrapper">
        <div className="flex-between">
          <div className="">
            <Button
              onClick={() => router.back()}
              className="bg-orange-800 hover:bg-orange-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          <div
            className=" hidden md:block text-xl md:text-2xl text-center font-bold"
            translate="no"
          >
            {wordGroup?.groupName ?? ''}
          </div>
          <div className="">
            <Button className="bg-orange-500 hover:bg-Orange-300 dark:bg-teal-700">
              <Link
                href={`/user/books/${bookId}/${groupId}/create-word`}
                className="text-gray-100"
              >
                Create Word
              </Link>
            </Button>
          </div>
        </div>
        <div
          className="block md:hidden text-xl mt-5 md:text-2xl text-center font-bold"
          translate="no"
        >
          {wordGroup?.groupName ?? ''}
        </div>

        <div className="">
          <div className="mt-10 justify-items-center">
            <div className="grid grid-cols-1 gap-3 mb justify-items-center">
              <div className="flex gap-5 md:gap-10 lg:gap-20 ">
                <div onClick={() => setTimeFilter('LAST_WEEK')}>
                  <SmallCirclesWithIcon
                    icon={RotateCcw}
                    tooltipText="Last week"
                  />
                </div>
                <div onClick={() => setTimeFilter('TWO_WEEKS')}>
                  <SmallCirclesWithIcon
                    icon={BookType}
                    tooltipText="Last 2 weeks"
                  />
                </div>
                <div onClick={() => setTimeFilter('LAST_MONTH')}>
                  <SmallCirclesWithIcon
                    icon={Calendar1}
                    tooltipText="Last Month"
                  />
                </div>
                <div onClick={() => setTimeFilter('THREE_MONTHS')}>
                  <SmallCirclesWithIcon
                    icon={Calendar1}
                    tooltipText="Last 3 Month"
                  />
                </div>

                <div
                  className="hidden md:block"
                  onClick={() => setTimeFilter('THREE_MONTHS')}
                >
                  <SmallCirclesWithIcon
                    icon={Star}
                    tooltipText="Favorite Words"
                  />
                </div>
                <div
                  className="hidden md:block"
                  onClick={() => setTimeFilter('THREE_MONTHS')}
                >
                  <SmallCirclesWithIcon icon={Star} tooltipText="Known Words" />
                </div>
              </div>
              <div className="flex gap-5 md:gap-10 lg:gap-20">
                <div
                  className="block md:hidden"
                  onClick={() => setTimeFilter('THREE_MONTHS')}
                >
                  <SmallCirclesWithIcon
                    icon={Star}
                    tooltipText="Favorite Words"
                  />
                </div>
                <div
                  className="block md:hidden"
                  onClick={() => setTimeFilter('THREE_MONTHS')}
                >
                  <SmallCirclesWithIcon icon={Star} tooltipText="Known Words" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow rounded-2xl bg-orange-50 dark:bg-gray-800 p-10 mt-10">
          {/* Mobile: dropdown */}
          <div className="sm:hidden mb-6 text-center">
            <select
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              value={activeType}
              onChange={(e) => {
                setPage(1); // reset pagination
                setActiveType(e.target.value);
              }}
            >
              {filterType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {/* Desktop: button group */}
          <div className="hidden sm:flex space-x-6 mb-15 justify-center">
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
                    : 'text-gray-800 dark:text-gray-400 hover:text-orange-500'
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
