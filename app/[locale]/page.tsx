'use client';

import React from 'react';
import PopularLists from '@/app/[locale]/home/Popular-lists/page';
import HomeWelcomeSection2 from '@/components/ui/shared/home-welcome-section2';
import BookComputerSection from '@/components/ui/shared/book-computer-section';

const LocalePage = () => {
  return (
    <div>
      <main className="">
        <div className="bg-blue-950">
          <HomeWelcomeSection2 />
        </div>
        <div className="wrapper">
          <PopularLists />
        </div>
        <div className="bg-orange-200">
          <BookComputerSection />
        </div>
      </main>
    </div>
  );
};

export default LocalePage;
