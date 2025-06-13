'use client';

import React from 'react';
import PopularLists from '@/app/[locale]/home/Popular-lists/page';
import BackgroundWithDynamicImageOrVideo from '@/components/ui/shared/dynamic-image-video-background/background-with-dynamic-image-video';
import image1 from '@/public/images/language-ai1.jpg';
import image2 from '@/public/images/language-ai2.jpg';
import image3 from '@/public/images/language-ai3.jpg';

const LocalePage = () => {
  const images = [image1, image2, image3];
  return (
    <div>
      <main className="">
        <div className="">
          <BackgroundWithDynamicImageOrVideo
            backgroundUrls={images}
            slideInterval={7000}
          >
            <p className="text-base md:text-xl ml-8 text-gray-400">
              Willkommen zur
            </p>
            <h1 className="text-2xl font-bold md:text-4xl lg:text-6xl text-teal-600">
              App für Sprachlernende.
            </h1>
            <p className="text-.g md:text-xl lg:text-2xl text-gray-400">
              Millionen von{' '}
              <strong className="text-teal-600 underline">
                Wörtern und Ausdrücken
              </strong>{' '}
              in ihrem jeweiligen Kontext
            </p>
          </BackgroundWithDynamicImageOrVideo>
        </div>
        <div className="wrapper mt-20">
          <PopularLists />
        </div>
      </main>
    </div>
  );
};

export default LocalePage;
