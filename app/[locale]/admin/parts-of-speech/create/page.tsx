import { Metadata } from 'next';
import React from 'react';
import PartsOfSpeechForm from '../../parts-of-speech-form';

export const metadata: Metadata = {
  title: 'Create Parts of Speech',
};

const CreatePartsOfSpeech = () => {
  return (
    <div className="">
      <h2 className="h2-bold text-center">Create Parts of Speech</h2>
      <div className="my-8 justify-items-center">
        <div className="w-full lg:w-[50vw]">
          <PartsOfSpeechForm type="Create" />
        </div>
      </div>
    </div>
  );
};

export default CreatePartsOfSpeech;
