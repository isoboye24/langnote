import React from 'react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GroupContent from './word-group-list';
import { requireUserAndAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'Word Groups',
};

const GroupList = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  await requireUserAndAdmin();
  const { id } = await props.params;
  return (
    <>
      <div className="flex mb-10 justify-end">
        {/* <div className="">Search for group...</div> */}
        <Button className="">
          <Link href={`/user/books/${id}/create-group`}>Create Word Group</Link>
        </Button>
      </div>
      <div className="">
        <GroupContent bookId={id} />
      </div>
    </>
  );
};

export default GroupList;
