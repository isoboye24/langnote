import { requireUserAndAdmin } from '@/lib/auth.guard';
import React from 'react';
import ViewCurrentWord from './view-word';
import { getUserWordById } from '@/lib/actions/user/word.actions';
import { getWordGroupById } from '@/lib/actions/user/word-group.actions';

const ViewWord = async (props: {
  params: Promise<{
    groupId: string;
    wordId: string;
  }>;
}) => {
  await requireUserAndAdmin();

  const { groupId, wordId } = await props.params;
  const word = await getUserWordById(wordId);
  const group = await getWordGroupById(groupId);

  return (
    <div>
      <ViewCurrentWord word={word.data} group={group.data?.groupName} />
    </div>
  );
};

export default ViewWord;
