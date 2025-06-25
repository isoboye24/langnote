import React from 'react';
import { Metadata } from 'next';
import GenderPageContent from './gender-list-page-content';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'List of Genders',
};

const GenderList = async () => {
  await requireAdmin();
  return (
    <>
      <GenderPageContent />
    </>
  );
};

export default GenderList;
