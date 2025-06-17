import { Star } from 'lucide-react';
import React from 'react';

const WordListsItems = ({
  word,
  meaning,
  star,
  gender,
  viewMeaning,
}: {
  word: string;
  meaning: string;
  star: boolean;
  gender?: string;
  viewMeaning: boolean;
}) => {
  return (
    <div className="">
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
          {viewMeaning && <div className="text-sm italic">{meaning}</div>}
        </div>
        <div className="">
          <Star
            className={`w-6 h-6 mr-2  transition-colors ${
              star === true
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-teal-400'
            }`}
          />
        </div>
      </div>
      <hr className="mt-2 border-1 border-teal-100 dark:border-teal-800" />
    </div>
  );
};

export default WordListsItems;
