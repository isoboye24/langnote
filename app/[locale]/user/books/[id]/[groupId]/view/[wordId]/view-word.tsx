'use client';

import React, { useState } from 'react';
import { Word } from '@prisma/client';

const ViewCurrentWord = ({ word, group }: { word?: Word; group?: string }) => {
  const [activeType, setActiveType] = useState('Meaning');
  const tabs = ['Meaning', 'Synonyms', 'Antonyms'];

  return (
    <div className="wrapper">
      <div className="mb-5 font-bold text-teal-500">{word?.word}</div>
      <div className="">
        <div className="flex justify-center md:justify-start text-base md:text-lg xl:text-2xl gap-4 md:gap-8 mb-5 lg:mb-8">
          {tabs &&
            tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`transition-colors duration-200 ${
                  activeType === t
                    ? 'text-amber-500 font-semibold border-b-2 border-orange-300'
                    : 'text-black hover:text-amber-500 dark:text-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
        </div>
      </div>

      <div className="border-orange-200 overflow-y-scroll bg-white h-40 border-2 p-3 mb-5 text-black">
        {activeType == 'Meaning' ? (
          <div className="">{word?.meaning}</div>
        ) : activeType == 'Synonyms' ? (
          <div className="">{word?.synonym}</div>
        ) : (
          <div className="">{word?.antonym}</div>
        )}
      </div>

      {word?.favorite && (
        <div className="mb-10">
          <div className="font-bold ">Examples</div>
          <div className="bg-white h-40">
            <div className="text-black overflow-y-scroll"></div>
          </div>
        </div>
      )}

      <div className="bg-orange-200 p-5 rounded-md text-center">
        <span className="mr-2 text-gray-600">Group:</span>
        <span className="font-semibold text-black">{group}</span>
      </div>
    </div>
  );
};

export default ViewCurrentWord;
