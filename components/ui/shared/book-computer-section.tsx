import React from 'react';
import Picture from '@/public/images/booksAndComputer.jpg';
import Image from 'next/image';

const BookComputerSection = () => {
  return (
    <div className="px-0 md:px-20 py-0 md:py-20">
      <div className="px-0 py-0 xl:px-20 xl:py-20 flex flex-col-reverse md:grid grid-cols-2 text-white gap-5">
        <div className="">
          <Image
            className="rounded-0 md:rounded-lg w-full lg:w-[700px] h-[220px] lg:h-[400px]"
            src={Picture}
            alt="book and computer image"
          />
        </div>
        <div className="mt-10 md:mt-0 flex flex-col gap-5 justify-center items-center">
          <h1 className="text-2xl md:text-4xl text-black text-center font-bold mb-5">
            4 E comparison
          </h1>

          {/* make each of them with an icon */}
          <ul className="text-lg text-center text-black px-10 md:px-0">
            <li>Easy to search</li>
            <li>Easy to memorize</li>
            <li>Easy to write down</li>
            <li>Easy to carry along</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookComputerSection;
