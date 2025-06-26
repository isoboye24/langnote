import WordGroupForm from '@/app/[locale]/user/create-word-group-form';
import { getWordGroupById } from '@/lib/actions/user/word-group.actions';
import { requireUserAndAdmin } from '@/lib/auth.guard';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Update Word Group',
};

const UpdateGroup = async (props: {
  params: Promise<{
    id: string;
    groupId: string;
  }>;
}) => {
  await requireUserAndAdmin();
  const { id, groupId } = await props.params;
  const group = await getWordGroupById(groupId);

  return (
    <div>
      <h1 className="h2-bold mb-10 text-center">
        Update: {group.data?.groupName}
      </h1>
      <WordGroupForm
        type="Update"
        group={group.data}
        id={group.data?.id}
        bookId={id}
      />
    </div>
  );
};

export default UpdateGroup;
