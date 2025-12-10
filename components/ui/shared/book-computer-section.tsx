import React from 'react';
// import Picture from '@/public/images/booksAndComputer.jpg';
// import Image from 'next/image';
import { Brain, LaptopMinimalCheck, Search, Smartphone } from 'lucide-react';

const BookComputerSection = () => {
  const easyToIcons = [
    { id: 1, icon: <Search size={20} />, title: 'Search' },
    { id: 2, icon: <Brain size={20} />, title: 'Memorize' },
    { id: 3, icon: <LaptopMinimalCheck size={20} />, title: 'Save' },
    { id: 4, icon: <Smartphone size={20} />, title: 'Carry along' },
  ];
  return (
    <div className="px-0 md:px-20 py-0 md:py-20">
      {/* <h1 className="text-2xl md:text-4xl text-black dark:text-gray-300 text-center font-bold mb-0  md:mb-5">
        4 S Comparison
      </h1> */}
      <div className="p-0 md:pt-10 xl:p-20 flex flex-col-reverse md:grid grid-cols-1 text-white gap-5">
        {/* <div className="">
          <Image
            className="rounded-0 md:rounded-full w-full lg:w-[700px] h-[220px] lg:h-[400px]"
            src={Picture}
            alt="book and computer image"
          />
        </div> */}
        <div className="mt-10 mb-5 md:mb-0 md:mt-0 flex flex-col ">
          {/* make each of them with an icon */}
          <div className="text-xl text-start text-black dark:text-gray-300 px-5 md:px-0">
            <div className="flex flex-wrap w-full gap-5 items-center justify-center md:justify-start">
              {easyToIcons.map((easy) => (
                <div
                  key={easy.id}
                  className=" flex flex-col md items-center justify-center  bg-orange-200 rounded-bl-xl rounded-t-xl p-3 lg:p-5"
                >
                  <div className="flex gap-3 lg:gap-5">
                    <div className="flex justify-center items-center">
                      <div className="h-10 w-10 lg:w-15 lg:h-15 rounded-full flex items-center justify-center border-1 border-orange-500 mb-2">
                        <div className="text-orange-300">{easy.icon}</div>
                      </div>
                    </div>
                    <div className=" ">
                      <div className="text-sm mb-2 text-gray-900">
                        Simple to{' '}
                      </div>
                      <div className="text-sm xl:text-lg mt-1.5 text-center font-semibold bg-orange-500 px-1 py-0.5 rounded-sm text-gray-100">
                        {easy.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookComputerSection;
