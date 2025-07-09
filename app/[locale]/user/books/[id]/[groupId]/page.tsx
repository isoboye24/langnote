import React from 'react';
import { Metadata } from 'next';
import UserWordsContent from '@/components/ui/shared/user-words-content';
import { requireUserAndAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'List of User Words',
};

const UserWords = async (props: {
  params: Promise<{
    id: string;
    groupId: string;
  }>;
}) => {
  await requireUserAndAdmin();
  const { id, groupId } = await props.params;
  return (
    <>
      <UserWordsContent bookId={id} groupId={groupId} />
    </>
  );
};

export default UserWords;
