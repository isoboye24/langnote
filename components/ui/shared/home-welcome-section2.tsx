import React from 'react';
import Picture from '@/public/images/language-ai1.jpg';
import Image from 'next/image';

const HomeWelcomeSection2 = () => {
  return (
    <div className="px-2 md:px-10 py-0 md:py-10">
      <div className="flex flex-col-reverse lg:grid grid-cols-2 px-7 py-15 lg:px-7 lg:py-20 text-white gap-3 md:gap-5 xl:gap-10">
        <div className="flex flex-col justify-center items-center ">
          <div className="flex flex-col justify-center items-center ">
            <div className="text-lg lg:text-2xl xl:text-3xl text-gray-200 mt-10 lg:mt-0">
              Welcome to
            </div>
            <div className="text-xl lg:text-3xl xl:text-4xl text-gray-200 text-center mt-">
              <strong className="text-green-400">LangNote</strong> for{' '}
              <strong className="text-2xl lg:text-4xl xl:text-5xl text-orange-400">
                language learners
              </strong>
              .
            </div>
          </div>
        </div>
        <div className="">
          <Image
            className="rounded-sm md:rounded-lg w-full lg:w-[700px] h-[220px] md:h-[500px] lg:h-[400px]"
            src={Picture}
            alt="language image"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeWelcomeSection2;
