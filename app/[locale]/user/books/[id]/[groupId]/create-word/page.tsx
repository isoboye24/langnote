import { Metadata } from 'next';
import React from 'react';
import { requireUserAndAdmin } from '@/lib/auth.guard';
import UserWordForm from '@/app/[locale]/user/create-user-word-form';
import { getBookById } from '@/lib/actions/user/book.actions';

export const metadata: Metadata = {
  title: 'Create Words',
};

const CreateWord = async (props: {
  params: Promise<{
    id: string;
    groupId: string;
  }>;
}) => {
  await requireUserAndAdmin();

  const { id, groupId } = await props.params;
  const getBook = await getBookById(id);
  return (
    <div className="">
      <h2 className="h2-bold text-center">Create Word</h2>
      <div className="my-8 justify-items-center">
        <div className="w-full lg:w-[50vw]">
          <UserWordForm
            type="Create"
            currentBookId={id}
            currentGroupId={groupId}
            currentBook={getBook.data}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateWord;
