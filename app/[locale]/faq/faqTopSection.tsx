import React from 'react';
import Picture from '@/public/images/faq.jpg';
import Image from 'next/image';

const FAQTopSection = () => {
  const faqTitle = 'FAQ';
  const faqText = `Have questions? Here you'll find the answers most valued by
              our partners, along with access to step-by-step instructions and
              support.`;
  return (
    <>
      <div className="wrapper hidden md:block">
        <div className="md:grid flex flex-col-reverse md:grid-cols-2 gap-0 md:gap-5 pb-10 pt-5 md:pt-10">
          <div className="py-10 lg:py-15 px-5 ">
            <h1 className="font-bold text-2xl md:text-4xl text-center md:text-left">
              {faqTitle}
            </h1>
            <p className="text-justify text-sm md:text-base text-gray-800 dark:text-gray-100">
              {faqText}
            </p>
          </div>
          <div className="">
            <Image className="rounded-md" src={Picture} alt="faq image" />
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <div className="md:grid flex flex-col-reverse md:grid-cols-2 gap-0 md:gap-5 pb-10 pt-5 md:pt-10">
          <div className="py-10 lg:py-15 px-5 ">
            <h1 className="font-bold text-2xl md:text-4xl text-center md:text-left">
              {faqTitle}
            </h1>
            <p className="text-justify wrapper text-sm md:text-base">
              {faqText}
            </p>
          </div>
          <div className="">
            <Image src={Picture} alt="faq image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQTopSection;
