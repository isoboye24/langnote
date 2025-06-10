import React from 'react';
import { Metadata } from 'next';
import LanguagePageContent from './language-page-content';

export const metadata: Metadata = {
  title: 'List of Languages',
};

const Languages = async () => {
  return (
    <>
      <LanguagePageContent />
    </>
  );
};

export default Languages;
