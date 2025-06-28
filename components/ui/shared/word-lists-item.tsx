import { Eye, Star } from 'lucide-react';
import React, { useState } from 'react';

const WordListsItems = ({
  word,
  meaning,
  star,
  gender,
}: {
  word: string;
  meaning: string;
  star: boolean;
  gender?: string;
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
        <div className="flex gap-1">
          <Eye
            className={`w-4 h-4 md:w-6 md:h-6 mr-2 pointer transition-colors text-teal-400`}
          />
          <Star
            className={`w-4 h-4 md:w-6 md:h-6 mr-2  transition-colors ${
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
