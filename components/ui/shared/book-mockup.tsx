import Image from 'next/image';
import React from 'react';

interface BookMockupProps {
  imageSrc: string;
  title?: string;
  subtitle?: string;
  footerText?: string;
  backgroundColor?: string;
}

const BookMockup: React.FC<BookMockupProps> = ({
  imageSrc,
  title = 'BOOK',
  subtitle = 'PSD MOCKUP',
  footerText = 'EASY TO USE\nFULL CHANGEABLE PSD',
  backgroundColor = 'bg-blue-400',
}) => {
  return (
    <div
      className={`flex items-center justify-center min-h-screen ${backgroundColor}`}
    >
      <div className="relative w-64 h-[400px] shadow-2xl rounded-md overflow-hidden bg-white">
        <Image
          src={imageSrc}
          alt="Book Cover"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute top-8 left-0 right-0 text-center text-black px-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <h2 className="text-lg font-semibold tracking-widest">{subtitle}</h2>
        </div>
        <div className="absolute bottom-6 left-0 right-0 text-center text-black text-sm px-4 whitespace-pre-line">
          {footerText}
        </div>
      </div>
    </div>
  );
};

export default BookMockup;
