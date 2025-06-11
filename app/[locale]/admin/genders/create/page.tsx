import { Metadata } from 'next';
import React from 'react';
import GenderForm from '../../gender-form';

export const metadata: Metadata = {
  title: 'Create Gender',
};

const CreateGender = () => {
  return (
    <div className="">
      <h2 className="h2-bold text-center">Create Gender</h2>
      <div className="my-8 justify-items-center">
        <div className="w-full lg:w-[50vw]">
          <GenderForm type="Create" />
        </div>
      </div>
    </div>
  );
};

export default CreateGender;
