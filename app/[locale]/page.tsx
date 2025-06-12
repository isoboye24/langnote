'use client';

import PopularLists from '@/app/[locale]/home/Popular-lists/page';
import React from 'react';

const LocalePage = () => {
  return (
    <div>
      <main className="wrapper">
        <div className="my-10">Home page</div>
        <PopularLists />
      </main>
    </div>
  );
};

export default LocalePage;
