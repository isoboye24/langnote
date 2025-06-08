import { Metadata } from 'next';
import React from 'react';
import LanguageForm from '../../language-form';

export const metadata: Metadata = {
  title: 'Create Language',
};

const CreateLanguage = () => {
  return (
    <div className="">
      <h2 className="h2-bold">Create Language</h2>
      <div className="my-8 justify-items-center">
        <div className="w-full lg:w-[50vw]">
          <LanguageForm type="Create" />
        </div>
      </div>
    </div>
  );
};

export default CreateLanguage;
