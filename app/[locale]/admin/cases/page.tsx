import React from 'react';
import { Metadata } from 'next';
import WordCasePageContent from './page-content';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'List of Word Cases',
};

const WordCaseList = async () => {
  await requireAdmin();
  return (
    <>
      <WordCasePageContent />
    </>
  );
};

export default WordCaseList;
