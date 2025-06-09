import { Metadata } from 'next';
import React from 'react';
import WordCaseForm from '../../word-case-form';

export const metadata: Metadata = {
  title: 'Create Word Case',
};

const CreateWordCase = () => {
  return (
    <div className="">
      <h2 className="h2-bold text-center">Create Word Case</h2>
      <div className="my-8 justify-items-center">
        <div className="w-full lg:w-[50vw]">
          <WordCaseForm type="Create" />
        </div>
      </div>
    </div>
  );
};

export default CreateWordCase;
