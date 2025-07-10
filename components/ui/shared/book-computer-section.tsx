import React from 'react';
import Picture from '@/public/images/booksAndComputer.jpg';
import Image from 'next/image';
import { Brain, LaptopMinimalCheck, Search, Smartphone } from 'lucide-react';

const BookComputerSection = () => {
  const easyToIcons = [
    { id: 1, icon: <Search />, title: 'Search' },
    { id: 2, icon: <Brain />, title: 'Memorize' },
    { id: 3, icon: <LaptopMinimalCheck />, title: 'Save' },
    { id: 4, icon: <Smartphone />, title: 'Carry along' },
  ];
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
          <div className="text-lg text-center text-black px-10 md:px-0">
            <div className="">Easy to </div>
            <div className="grid grid-cols-2 gap-3">
              {easyToIcons.map((easy) => {
                return (
                  <div key={easy.id}>
                    <div className="">{easy.icon}</div>
                    <div className="">{easy.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookComputerSection;
