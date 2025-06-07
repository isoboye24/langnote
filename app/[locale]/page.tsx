'use client';

import PopularLists from '@/components/ui/popular-lists';
import Footer from '@/components/ui/shared/footer';
import Header from '@/components/ui/shared/header';
import React from 'react';

const LocalePage = () => {
  return (
    <div>
      <div className="">
        <Header />
      </div>

      <div className="my-10">Home page</div>
      <PopularLists />

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default LocalePage;
