'use client';

import React, { useState } from 'react';

const AboutTextSection = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr]">
        <div className="">
          <div className="bg-gray-100 dark:bg-slate-900 h-full w-10 rounded-br-full rounded-tr-full flex justify-center items-center"></div>
        </div>

        <div className="rounded-2xl shadow-2xl dark:bg-slate-900 dark:shadow-slate-900">
          <div className="p-10">
            <h1 className="text-center font-bold text-lg md:text-2xl mb-5 md:mt-10">
              Why Do You Need{' '}
              <strong className="text-green-500">LangNote</strong> ?
            </h1>

            <p className="text-base text-justify dark:text-gray-300">
              Imagine you arrived at your dream country and you want to learn a
              new language. You got admitted into language school where pen,
              (sometimes also pencil), notebook and textbooks are mandatory.
            </p>

            {/* Toggleable section */}
            <div
              className={`${
                showMore ? 'block' : 'hidden'
              } transition-all duration-300`}
            >
              <p className="text-base mt-4 text-justify dark:text-gray-300">
                After some months you realized that you have learnt so many
                words and you begin to think of putting all the words and
                sentences you know in a separate book (a.k.a your personal
                dictionary) where you can make reference to. So that whenever
                you come across such words you can refer to the book and see the
                meaning and the way you explanation them in your own words.
                Later, you realized that you can&apos;t easily find some words
                in that your personal dictionary.
              </p>
              <p className="text-base mt-4 text-justify dark:text-gray-300">
                This is where{' '}
                <strong className="text-green-500"> LangNote</strong> becomes
                indispensable. It is not only easy to create your book and save
                your words, but also easy to search for them and memorize. You
                also have the options to sort your saved words and create
                unlimited group of words.
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-3 lg:mt-6 text-green-600 font-semibold hover:underline transition"
              >
                {showMore ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-gray-100 dark:bg-slate-900 h-full w-10 rounded-bl-full rounded-tl-full flex justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutTextSection;
