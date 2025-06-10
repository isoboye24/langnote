import React from 'react';
import { Metadata } from 'next';
import PopularListCategoryPageContent from './popular-lists-category-page-content';

export const metadata: Metadata = {
  title: 'List of Popular Category Lists',
};

const PopularListCategory = async () => {
  return (
    <>
      <PopularListCategoryPageContent />
    </>
  );
};

export default PopularListCategory;
