import { Metadata } from 'next';
import React from 'react';
import PopularWordForm from '../../popular-words-form';

export const metadata: Metadata = {
  title: 'Create Popular Words',
};

const CreatePopularCategory = () => {
  return (
    <div className="">
      <h2 className="h2-bold text-center">Create Popular Word</h2>
      <div className="my-8 justify-items-center">
        <div className="w-full lg:w-[50vw]">
          <PopularWordForm type="Create" />
        </div>
      </div>
    </div>
  );
};

export default CreatePopularCategory;
