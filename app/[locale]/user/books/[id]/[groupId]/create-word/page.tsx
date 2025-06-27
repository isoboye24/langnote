import { Metadata } from 'next';
import React from 'react';
import { requireUserAndAdmin } from '@/lib/auth.guard';
import UserWordForm from '@/app/[locale]/user/create-user-word-form';

export const metadata: Metadata = {
  title: 'Create Words',
};

const CreateWord = async () => {
  await requireUserAndAdmin();
  return (
    <div className="">
      <h2 className="h2-bold text-center">Create Word</h2>
      <div className="my-8 justify-items-center">
        <div className="w-full lg:w-[50vw]">
          <UserWordForm type="Create" />
        </div>
      </div>
    </div>
  );
};

export default CreateWord;
