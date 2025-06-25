import React from 'react';
import { Metadata } from 'next';
import UserPageContent from './user-page-content';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'List of Users',
};

const PopularWords = async () => {
  await requireAdmin();
  return (
    <>
      <UserPageContent />
    </>
  );
};

export default PopularWords;
