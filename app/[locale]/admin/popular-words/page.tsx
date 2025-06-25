import React from 'react';
import { Metadata } from 'next';
import PopularListWordPageContent from './popular-lists-words-page-content';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'List of Popular Words',
};

const PopularWords = async () => {
  await requireAdmin();
  return (
    <>
      <PopularListWordPageContent />
    </>
  );
};

export default PopularWords;
