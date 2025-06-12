import { Metadata } from 'next';
import React from 'react';

import ListOfWords from './list-of-words';

export const metadata: Metadata = {
  title: 'View Lists of Words',
};

const WordLists = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;
  return (
    <div className="mb-50">
      <ListOfWords id={id} />
    </div>
  );
};

export default WordLists;
