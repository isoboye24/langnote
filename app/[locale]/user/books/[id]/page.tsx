import React from 'react';
import { Metadata } from 'next';
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
      <div className="">
        <GroupContent bookId={id} />
      </div>
    </>
  );
};

export default GroupList;
