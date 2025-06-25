import React from 'react';
import { Metadata } from 'next';
import PartsOfSpeechPageContent from './parts-of-speech-page-content';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'List of Languages',
};

const partsOfSpeechList = async () => {
  await requireAdmin();
  return (
    <>
      <PartsOfSpeechPageContent />
    </>
  );
};

export default partsOfSpeechList;
