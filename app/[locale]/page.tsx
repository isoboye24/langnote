'use client';

import React from 'react';
import PopularLists from '@/app/[locale]/home/Popular-lists/page';
import HomeWelcomeSection from '@/components/ui/shared/home-welcome-section';

const LocalePage = () => {
  return (
    <div>
      <main className="">
        <div className="">
          <HomeWelcomeSection />
        </div>
        <div className="wrapper mt-20">
          <PopularLists />
        </div>
      </main>
    </div>
  );
};

export default LocalePage;
