import React from 'react';
import { Metadata } from 'next';
import PartsOfSpeechPageContent from './parts-of-speech-page-content';

export const metadata: Metadata = {
  title: 'List of Languages',
};

const partsOfSpeechList = async () => {
  return (
    <>
      <PartsOfSpeechPageContent />
    </>
  );
};

export default partsOfSpeechList;
