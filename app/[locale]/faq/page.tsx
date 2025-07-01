import React from 'react';
import Picture from '@/public/images/faq.jpg';
import Image from 'next/image';

const FAQ = () => {
  return (
    <div className="">
      {/* wrapper feel not for mobile */}
      <div className="w-full px-0 md:max-w-2xl lg:max-w-6xl md:mx-auto md:px-6">
        <div className="md:grid flex flex-col-reverse md:grid-cols-2 gap-0 md:gap-5 pb-10 pt-5 md:pt-10">
          <div className="py-10 lg:py-15 px-5 ">
            <h1 className="font-bold text-2xl md:text-4xl text-center md:text-left">
              FAQ
            </h1>
            <p className="text-justify">
              Have questions? Here you&apos;ll find the answers most valued by
              our partners, along with access to step-by-step instructions and
              support.
            </p>
          </div>
          <div className="">
            <Image src={Picture} alt="faq image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
