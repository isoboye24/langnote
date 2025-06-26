import { Metadata } from 'next';
import React from 'react';
import BookForm from '../../create-book-form';
import { requireUserAndAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'Create Book',
};

const CreateBook = async () => {
  await requireUserAndAdmin();
  return (
    <div className="">
      <h2 className="h2-bold text-center">Create Book</h2>
      <div className="my-8 justify-items-center">
        <div className="w-full lg:w-[50vw]">
          <BookForm type="Create" />
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
