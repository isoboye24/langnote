import React from 'react';
import { Metadata } from 'next';
import WordCasePageContent from './page-content';

export const metadata: Metadata = {
  title: 'List of Word Cases',
};

const WordCaseList = () => {
  return (
    <>
      <WordCasePageContent />
    </>
  );
};

export default WordCaseList;
