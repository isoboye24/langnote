'use client';

import React, { useEffect, useState } from 'react';
import { Word } from '@prisma/client';
import { getWordCaseById } from '@/lib/actions/admin/cases.actions';
import { getPartsOfSpeechById } from '@/lib/actions/admin/parts-of-speech.actions';
import { getGenderById } from '@/lib/actions/admin/gender.actions';
import { Star } from 'lucide-react';

const ViewCurrentWord = ({ word, group }: { word?: Word; group?: string }) => {
  const availableTabs = [
    word?.meaning && 'Meaning',
    word?.synonym && 'Synonyms',
    word?.antonym && 'Antonyms',
  ].filter(Boolean) as string[];

  const [activeType, setActiveType] = useState(availableTabs[0] || '');
  const [wordCase, setCaseWord] = useState('');
  const [gender, setGender] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');

  useEffect(() => {
    if (!word?.id) return;

    const fetchData = async () => {
      const [wordCaseData, speechPartData, genderData] = await Promise.all([
        getWordCaseById(word.wordCaseId),
        getPartsOfSpeechById(word.partOfSpeechId),
        getGenderById(word.genderId),
      ]);

      if (wordCaseData.success) {
        setCaseWord(wordCaseData.data?.caseName || '');
      }
      if (speechPartData.success) {
        setPartOfSpeech(speechPartData.data?.name || '');
      }
      if (genderData.success) {
        setGender(genderData.data?.genderName || '');
      }
    };

    fetchData();
  }, [word]);

  return (
    <div className="wrapper">
      <div className="mb-5 text-center flex flex-row justify-center items-center">
        <span className="font-bold text-teal-500 text-md md:text-xl mr-2">
          {word?.word}
        </span>
        {partOfSpeech.startsWith('Adj') ? (
          <span className="text-xs text-red-400">
            {partOfSpeech.slice(0, 3)}
          </span>
        ) : partOfSpeech.startsWith('Adv') ? (
          <span className="text-xs text-red-400">
            {partOfSpeech.slice(0, 3)}
          </span>
        ) : (
          <span className="text-xs text-red-400">{partOfSpeech.charAt(0)}</span>
        )}
        .
        <span className="ml-5">
          {
            <Star
              className={`w-3 h-3 md:w-4 md:h-4 mr-2  transition-colors ${
                word?.favorite === true
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-teal-400'
              }`}
            />
          }
        </span>
      </div>

      <div className="">
        <div className="">
          {availableTabs.length > 0 && (
            <div className="">
              <div className="flex text-sm md:text-lg xl:text-md gap-4 md:gap-8 mb-2 lg:mb-5">
                {availableTabs.map((t) => (
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
          )}
          <div className="border-orange-200 dark:border-gray-950 bg-white dark:bg-gray-900 rounded-md  border-2 p-3 mb-5 text-black dark:text-gray-400">
            {activeType === 'Meaning' && <div>{word?.meaning}</div>}
            {activeType === 'Synonyms' && <div>{word?.synonym}</div>}
            {activeType === 'Antonyms' && <div>{word?.antonym}</div>}
          </div>
        </div>
      </div>

      {word?.favorite && (
        <div className="mb-10">
          <div className="font-bold ">Examples</div>
          <div className="bg-white h-40">
            <div className="text-black overflow-y-scroll"></div>
          </div>
        </div>
      )}

      <div className="text-xs flex gap-2 md:gap-3">
        <div className="">
          <span className="mr-1 text-gray-600">Group:</span>
          <span className="font-semibold text-red-500">{group}</span>
        </div>
        <div className="">
          <span className="mr-1 text-gray-600">Case:</span>
          <span className="font-semibold text-blue-500">{wordCase}</span>
        </div>
        <div className="">
          <span className="mr-1 text-gray-600">Gender:</span>
          <span className="font-semibold text-green-500">{gender}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewCurrentWord;
