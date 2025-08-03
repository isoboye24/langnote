'use client';

import React, { useEffect, useState } from 'react';
import { Word, WordGroup } from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';
import { getWordGroupById } from '@/lib/actions/user/word-group.actions';
import {
  getAllFilteredUserFavoriteWords,
  getAllFilteredUserKnownWords,
  getAllFilteredUserLastTwoWeeksWords,
  getAllFilteredUserLastWeeksWords,
  getAllFilteredUserWord,
  getAllFilteredUserWords,
  getAllPartOfSpeechNamesInGroup,
  getMonthlyFilteredUserWord,
  toggleFavoriteWord,
} from '@/lib/actions/user/word.actions';
import UserWordListsItems from './user-word-list-item';
import { Button } from '../button';
import Link from 'next/link';
import { SmallCirclesWithIcon } from './small-circle-with-icon-center';
import { ArrowLeft, BookType, Brain, RotateCcw, Star } from 'lucide-react';
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
  const [value, setValue] = useState('');
  type Option = { key: number; value: string };
  const [months, setMonths] = useState<Option[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedMonthName, setSelectedMonthName] = useState('');
  const [selectedYear, setSelectedYear] = useState(0);

  const [year, setYear] = useState<number[]>([]);
  type TimeFilter =
    | 'ALL'
    | 'LAST_WEEK'
    | 'TWO_WEEKS'
    | 'MONTH_AND_YEAR'
    | 'FAVORITE'
    | 'KNOWN';
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
    if (!value) {
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
            case 'MONTH_AND_YEAR':
              getWords(
                await getMonthlyFilteredUserWord({
                  activeType,
                  bookId,
                  groupId,
                  month: selectedMonth,
                  year: selectedYear,
                  page,
                  pageSize,
                })
              );
              break;

            case 'FAVORITE':
              getWords(
                await getAllFilteredUserFavoriteWords({
                  activeType,
                  bookId,
                  groupId,
                  page,
                  pageSize,
                })
              );
              break;
            case 'KNOWN':
              getWords(
                await getAllFilteredUserKnownWords({
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
    }
  }, [
    value,
    timeFilter,
    activeType,
    bookId,
    groupId,
    page,
    selectedMonth,
    selectedYear,
  ]);

  useEffect(() => {
    if (value) {
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
                await getAllFilteredUserWord({
                  word: value,
                  activeType,
                  bookId,
                  groupId,
                })
              );
              break;
            case 'LAST_WEEK':
              getWords(
                await getAllFilteredUserWord({
                  word: value,
                  activeType,
                  bookId,
                  groupId,
                })
              );
              break;
            case 'TWO_WEEKS':
              getWords(
                await getAllFilteredUserWord({
                  word: value,
                  activeType,
                  bookId,
                  groupId,
                })
              );
              break;
            case 'MONTH_AND_YEAR':
              getWords(
                await getMonthlyFilteredUserWord({
                  activeType,
                  bookId,
                  groupId,
                  month: selectedMonth,
                  year: selectedYear,
                  page,
                  pageSize,
                })
              );
              break;
            case 'FAVORITE':
              getWords(
                await getAllFilteredUserWord({
                  word: value,
                  activeType,
                  bookId,
                  groupId,
                })
              );
              break;
            case 'KNOWN':
              getWords(
                await getAllFilteredUserWord({
                  word: value,
                  activeType,
                  bookId,
                  groupId,
                })
              );
              break;
          }
        } catch (error) {
          console.error('Failed to fetch words or word group:', error);
        }
      };

      fetchUserWord();
    }
  }, [
    value,
    timeFilter,
    activeType,
    bookId,
    groupId,
    page,
    selectedMonth,
    selectedYear,
  ]);

  useEffect(() => {
    fetch('/api/months')
      .then((res) => res.json())
      .then((data) => {
        const months = Object.entries(data).map(([key, value]) => ({
          key: Number(key),
          value: value as string,
        }));
        setMonths(months);
      });
  }, []);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await fetch('/api/years', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bookId, groupId }),
        });
        const years = await res.json();
        setYear(years);
      } catch (error) {
        console.error('Failed to fetch years:', error);
      }
    };

    if (bookId && groupId) {
      fetchYears();
    }
  }, [bookId, groupId]);

  return (
    <>
      <div className="wrapper">
        <div className="flex-between">
          <div className="">
            <Button
              onClick={() => router.back()}
              className="bg-orange-800 hover:bg-orange-700 dark:bg-teal-700 hover:dark:bg-teal-500 transition duration-500 ease-in-out text-gray-100"
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
            <Button className="bg-orange-800 hover:bg-orange-700 dark:bg-teal-700 hover:dark:bg-teal-500 transition duration-500 ease-in-out text-gray-100">
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

        {/* Filters */}
        <div className="justify-items-center">
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5 bg-orange-200 md:bg-orange-100 dark:bg-slate-800 md:dark:bg-slate-950 rounded-2xl py-5">
              <div className="bg-orange-200 dark:bg-slate-800 px-2 md:p-5 rounded-2xl ">
                <h1 className="text-sm md:text-base lg:text-lg text-center dark:text-slate-400">
                  Filter by date:
                </h1>
                <div className="flex gap-2 justify-between py-3 w-full bg-transparent ">
                  {/* <div className=" "> */}
                  {/* Dropdown 1 */}
                  <div>
                    <select
                      className="w-full p-2 border border-orange-800 dark:border-slate-700 rounded-md text-sm md:text-base dark:text-slate-400"
                      value={selectedMonth}
                      onChange={(e) => {
                        const monthInt = parseInt(e.target.value);
                        setSelectedMonth(monthInt);

                        const monthName =
                          months.find((option) => option.key + 1 === monthInt)
                            ?.value || '';
                        setSelectedMonthName(monthName);
                      }}
                    >
                      <option value="">Month</option>
                      {months.map((option) => (
                        <option
                          key={option.key}
                          value={option.key + 1}
                          className="dark:bg-slate-900 bg-orange-100 hover:bg-orange-200 dark:hover:bg-slate-800"
                        >
                          {option.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown 2 */}
                  <div>
                    <select
                      className="w-full p-2 border border-orange-800 dark:border-slate-700 rounded-md text-sm md:text-base dark:text-slate-400"
                      value={selectedYear}
                      onChange={(e) =>
                        setSelectedYear(parseInt(e.target.value))
                      }
                    >
                      <option value="">Year</option>
                      {year.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="dark:bg-slate-900 bg-orange-100 hover:bg-orange-200 dark:hover:bg-slate-800 px-2"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center items-center">
                    <button
                      className="w-full bg-orange-800 hover:bg-orange-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white dark:text-slate-400 font-semibold py-1 px-2 rounded-md cursor-pointer transition ease-in-out duration-500 text-sm md:text-base"
                      onClick={() => setTimeFilter('MONTH_AND_YEAR')}
                    >
                      Search
                    </button>
                  </div>
                  {/* </div> */}
                </div>
              </div>
              <div className="bg-orange-200 dark:bg-slate-800 rounded-2xl grid grid-cols-1 gap-3 justify-items-center p-0 md:p-5">
                <h1 className="dark:text-slate-400 text-sm md:text-base lg:text-lg text-center">
                  Filter by button:
                </h1>
                <div className="flex gap-5 lg:gap-8 ">
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
                  <div className="" onClick={() => setTimeFilter('FAVORITE')}>
                    <SmallCirclesWithIcon
                      icon={Star}
                      tooltipText="Favorite Words"
                    />
                  </div>
                  <div className="" onClick={() => setTimeFilter('KNOWN')}>
                    <SmallCirclesWithIcon
                      icon={Brain}
                      tooltipText="Known Words"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow rounded-2xl bg-orange-50 dark:bg-gray-800 p-10 mt-10">
          {/* Mobile: dropdown */}
          <div className="block lg:hidden text-sm md:text-base text-orange-800 dark:text-slate-400 mb-3 md:mb-5 text-center">
            {timeFilter === 'ALL' ? (
              ''
            ) : timeFilter === 'LAST_WEEK' ? (
              <p>saved a week ago</p>
            ) : timeFilter === 'TWO_WEEKS' ? (
              <p>saved 2 week ago</p>
            ) : timeFilter === 'MONTH_AND_YEAR' ? (
              <p>
                saved in {selectedMonthName} {selectedYear}
              </p>
            ) : timeFilter === 'FAVORITE' ? (
              <p>Favorite words</p>
            ) : (
              <p>Known words</p>
            )}
          </div>
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
          {value ? (
            ''
          ) : (
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
          )}

          {/* search input */}
          <div className="mb-10">
            <div className="flex flex-col justify-center gap-3 items-center">
              {totalCount > 10 && (
                <input
                  type="text"
                  className={`border px-3 py-2 rounded-2xl border-orange-800 w-60 md:100`}
                  placeholder="Search..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}
              <div className="flex gap-3 justify-center items-center">
                <span className="font-bold">{value}</span>
                {value.length > 0 && (
                  <Button
                    className=" dark:text-gray-200 text-orange-900 pointer bg-transparent hover:bg-transparent hover:underline"
                    onClick={() => setValue('')}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            </div>
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
                    onToggleStar={async () => {
                      const res = await toggleFavoriteWord(word.id);
                      if (res.success) {
                        // Optimistically update UI without refetching all
                        setWords((prev) =>
                          prev.map((w) =>
                            w.id === word.id
                              ? { ...w, favorite: !w.favorite }
                              : w
                          )
                        );
                      } else {
                        alert('Failed to toggle star.');
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
          {!value && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
          <div className="mt-10 text-end pr-4 md:pr-8 text-orange-800 dark:text-orange-200">
            Total Words: <strong>{totalCount}</strong>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListOfWords;
