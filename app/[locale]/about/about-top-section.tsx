import Image from 'next/image';
import React from 'react';
import Picture from '@/public/images/about_us.jpg';

const AboutTopSection = () => {
  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-2">
      <div className="wrapper flex flex-col justify-center items-center lg:justify-start mt-0 lg:mt-10">
        <h1 className="text-black dark:text-gray-100 dark:md:text-gray-100 md:text-gray-100 text-center mt-5 md:mt-8 mb-2 md:mb-5 text-2xl lg:text-4xl font-bold">
          About <strong className="text-green-500">LangNote</strong>
        </h1>
        <p className="dark:text-gray-300 text-gray-700 md:text-gray-300 text-center text-base lg:text-lg px-0 lg:px-20 xl:px-30">
          LangNote is a vocabulary learning platform for language learners.
        </p>
      </div>
      <div className="bg-blue-950 md:bg-transparent">
        <Image
          src={Picture}
          alt="Contact image"
          className="w-full h-60 md:h-70 lg:h-100 xl:h-120 object-cover rounded-bl-full"
          width={500}
          height={200}
        />
      </div>
    </div>
  );
};

export default AboutTopSection;
