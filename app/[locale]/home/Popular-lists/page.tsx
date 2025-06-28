'use client';

import React, { useEffect, useState } from 'react';
import PopularList from '../../../../components/ui/popular-list';

import { getAllPopularCategoriesToSelect } from '@/lib/actions/admin/popular-list-category.actions';
import { getAllPopularListWordsToSelect } from '@/lib/actions/admin/popular-lists-words';
import { PopularListCategory, PopularListWord } from '@prisma/client';
import Link from 'next/link';

const PopularLists = () => {
  const [categories, setCategories] = useState<PopularListCategory[]>([]);
  const [words, setWords] = useState<PopularListWord[]>([]);

  useEffect(() => {
    const fetchPartsOfSpeech = async () => {
      const wordsRes = await getAllPopularListWordsToSelect();
      const response = await getAllPopularCategoriesToSelect();

      if (response.success && wordsRes.success) {
        setCategories(response.data as PopularListCategory[]);
        setWords(wordsRes.data as PopularListWord[]);
      }
    };

    fetchPartsOfSpeech();
  }, []);

  return (
    <div className="bg-blue-50 dark:bg-gray-900 p-10 rounded-md">
      <div className="text-center text-3xl mb-10 font-bold">Popular Lists</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const totalWords = words.filter(
            (word) => word.popularCategoryId === category.id
          );

          return (
            totalWords.length > 9 && (
              <div key={category.id}>
                <Link href={`/home/Popular-lists/${category.id}`}>
                  <PopularList
                    lightIcon={category.lightImageIcon}
                    darkIcon={category.darkImageIcon}
                    category={category.popularCategory}
                    totalWords={totalWords.length}
                  />
                </Link>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default PopularLists;
