import React from 'react';
import { Metadata } from 'next';
import LanguagePageContent from './language-page-content';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'List of Languages',
};

const Languages = async () => {
  await requireAdmin();
  return (
    <>
      <LanguagePageContent />
    </>
  );
};

export default Languages;
