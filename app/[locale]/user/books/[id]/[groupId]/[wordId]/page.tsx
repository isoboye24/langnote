import UserWordForm from '@/app/[locale]/user/create-user-word-form';
import { getBookById } from '@/lib/actions/user/book.actions';
import { getUserWordById } from '@/lib/actions/user/word.actions';
import { requireUserAndAdmin } from '@/lib/auth.guard';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Update Word',
};

const UpdateUserWord = async (props: {
  params: Promise<{
    id: string;
    groupId: string;
    wordId: string;
  }>;
}) => {
  await requireUserAndAdmin();
  const { id, groupId, wordId } = await props.params;
  const word = await getUserWordById(wordId);
  const getBook = await getBookById(id);

  return (
    <div>
      <h1 className="font-bold text-lg md:text-2xl mb-10 text-center">
        Update: {word.data?.word}
      </h1>
      <UserWordForm
        type="Update"
        currentGroupId={groupId}
        id={word.data?.id}
        currentBookId={id}
        userWord={word.data}
        currentBook={getBook.data}
      />
    </div>
  );
};

export default UpdateUserWord;
