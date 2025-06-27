import UserWordForm from '@/app/[locale]/user/create-user-word-form';
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

  return (
    <div>
      <h1 className="h2-bold mb-10 text-center">Update: {word.data?.word}</h1>
      <UserWordForm
        type="Update"
        currentGroupId={groupId}
        id={word.data?.id}
        currentBookId={id}
        userWord={word.data}
      />
    </div>
  );
};

export default UpdateUserWord;
