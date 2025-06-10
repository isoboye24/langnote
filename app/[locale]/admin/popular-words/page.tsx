import React from 'react';
import { Metadata } from 'next';
import PopularListWordPageContent from './popular-lists-words-page-content';

export const metadata: Metadata = {
  title: 'List of Popular Words',
};

const PopularWords = async () => {
  return (
    <>
      <PopularListWordPageContent />
    </>
  );
};

export default PopularWords;
