import React from 'react';
import { Metadata } from 'next';
import PopularListCategoryPageContent from './popular-lists-category-page-content';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'List of Popular Category Lists',
};

const PopularListCategory = async () => {
  await requireAdmin();
  return (
    <>
      <PopularListCategoryPageContent />
    </>
  );
};

export default PopularListCategory;
