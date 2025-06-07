'use client';

import PopularLists from '@/components/ui/popular-lists';

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
