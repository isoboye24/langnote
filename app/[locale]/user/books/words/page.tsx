import React from 'react';
import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth.guard';
import UserWordsContent from './user-words-content';

export const metadata: Metadata = {
  title: 'List of User Words',
};

const PopularWords = async () => {
  await requireAdmin();
  return (
    <>
      <UserWordsContent />
    </>
  );
};

export default PopularWords;
