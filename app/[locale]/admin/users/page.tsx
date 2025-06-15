import React from 'react';
import { Metadata } from 'next';
import UserPageContent from './user-page-content';

export const metadata: Metadata = {
  title: 'List of Users',
};

const PopularWords = async () => {
  return (
    <>
      <UserPageContent />
    </>
  );
};

export default PopularWords;
