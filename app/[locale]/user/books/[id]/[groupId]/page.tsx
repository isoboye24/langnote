import React from 'react';
import { Metadata } from 'next';
import UserWordsContent from '@/components/ui/shared/user-words-content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
      <div className="flex mb-10 justify-end">
        {/* <div className="">Search for word...</div> */}
        <Button className="">
          <Link href={`/user/books/${id}/${groupId}/create-word`}>
            Create Word
          </Link>
        </Button>
      </div>
      <UserWordsContent bookId={id} groupId={groupId} />
    </>
  );
};

export default UserWords;
