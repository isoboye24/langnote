import { Metadata } from 'next';
import React from 'react';
import WordGroupForm from '@/app/[locale]/user/create-word-group-form';
import { requireUserAndAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'Create Group',
};

const CreateWordGroup = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await requireUserAndAdmin();
  const awaitedParams = await params;
  const bookId = awaitedParams.id;

  return (
    <div className="">
      <h2 className="h2-bold text-center">Create Word Group</h2>
      <div className="my-8 justify-items-center">
        <div className="w-full lg:w-[50vw]">
          <WordGroupForm type="Create" bookId={bookId} />
        </div>
      </div>
    </div>
  );
};

export default CreateWordGroup;
