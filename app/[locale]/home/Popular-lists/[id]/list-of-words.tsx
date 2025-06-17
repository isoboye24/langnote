'use client';
import React, { useEffect, useState } from 'react';

import { getPopularCategoryById } from '@/lib/actions/admin/popular-list-category.actions';
import { getGroupOfPopularListWords } from '@/lib/actions/admin/popular-lists-words';
import { PopularListCategory } from '@prisma/client';
import WordListsItems from '@/components/ui/shared/word-lists-item';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/shared/pagination';

const ListOfWords = ({ id }: { id: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [words, setWords] = useState<Record<string, any[]>>();
  const [category, setCategory] = useState<PopularListCategory | null>(null);
  const [viewMeaning, setViewMeaning] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchPartsOfSpeech = async () => {
      const categoryWithIdRes = await getPopularCategoryById(id);
      const wordsRes = await getGroupOfPopularListWords(page, pageSize);

      if (wordsRes.success && categoryWithIdRes.success) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setWords(wordsRes.data as Record<string, any[]>);

        setCategory(categoryWithIdRes.data as PopularListCategory);

        const matchedTotal = wordsRes.totals?.find(
          (item) => item.popularCategoryId === categoryWithIdRes.data?.id
        );

        const count = matchedTotal ? matchedTotal.count : 0;
        setTotalCount(count);
        setTotalPages(Math.ceil(count / pageSize));
      }
    };

    fetchPartsOfSpeech();
  }, [id, page]);

  return (
    <div className="wrapper">
      <div className="shadow mb-10 mt-10 bg-teal-100 dark:bg-teal-800 p-5 rounded-3xl">
        <div className="text-2xl text-center font-bold" translate="no">
          {category?.popularCategory ?? ''}
        </div>
      </div>
      <div className="shadow rounded-2xl bg-gray-50 dark:bg-gray-800 p-10 mt-10">
        <div className="flex justify-end mb-10 ">
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
        <div className="">
          {category &&
            words?.[category.popularCategory]?.map((word) => (
              <div key={word.id} className="mb-2">
                <WordListsItems
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
