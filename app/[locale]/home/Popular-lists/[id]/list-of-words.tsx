'use client';
import React, { useEffect, useState } from 'react';

import { getPopularCategoryById } from '@/lib/actions/admin/popular-list-category.actions';
import { getAllPopularListWordsToSelect } from '@/lib/actions/admin/popular-lists-words';
import { PopularListCategory, PopularListWord } from '@prisma/client';
import WordListsItems from '@/components/ui/shared/word-lists-item';

const ListOfWords = ({ id }: { id: string }) => {
  const [words, setWords] = useState<PopularListWord[]>([]);
  const [category, setCategory] = useState<PopularListCategory | null>(null);

  useEffect(() => {
    const fetchPartsOfSpeech = async () => {
      const categoryWithIdRes = await getPopularCategoryById(id);
      const wordsRes = await getAllPopularListWordsToSelect();

      if (wordsRes.success) {
        setWords(wordsRes.data as PopularListWord[]);
      }

      if (categoryWithIdRes.success) {
        setCategory(categoryWithIdRes.data as PopularListCategory);
      }
    };

    fetchPartsOfSpeech();
  }, [id]);

  return (
    <div className="wrapper">
      <div className="shadow mb-10 mt-10 bg-teal-100 dark:bg-teal-800 p-5 rounded-3xl">
        <div className="text-2xl text-center font-bold" translate="no">
          {category?.popularCategory ?? 'Unknown Category'}
        </div>
      </div>
      <div className="shadow rounded-2xl bg-gray-50 dark:bg-gray-800 p-10 mt-10">
        {words
          .filter((word) => word.popularCategoryId === category?.id)
          .map((word) => (
            <div key={word.id} className="mb-2">
              <WordListsItems
                word={word.word}
                meaning={word?.meaning || ''}
                star={word?.favorite || false}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListOfWords;
