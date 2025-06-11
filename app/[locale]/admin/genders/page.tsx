import React from 'react';
import { Metadata } from 'next';
import GenderPageContent from './gender-list-page-content';

export const metadata: Metadata = {
  title: 'List of Genders',
};

const GenderList = () => {
  return (
    <>
      <GenderPageContent />
    </>
  );
};

export default GenderList;
