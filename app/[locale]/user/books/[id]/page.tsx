import React from 'react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GroupContent from './word-groups/page';

export const metadata: Metadata = {
  title: 'Word Groups',
};

const GroupList = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;
  return (
    <>
      <div className="flex-between mb-10">
        <div className="">Search for group...</div>
        <Button className="">
          <Link href={`/user/books/${id}/word-groups/create`}>
            Create Word Group
          </Link>
        </Button>
      </div>
      <div className="">
        <GroupContent bookId={id} />
      </div>
    </>
  );
};

export default GroupList;
