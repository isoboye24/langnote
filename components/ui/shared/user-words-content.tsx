'use client';

import React from 'react';
import {} from '@/lib/actions/user/book.actions';

const UserWordsContent = ({
  bookId,
  groupId,
}: {
  bookId: string;
  groupId: string;
}) => {
  return (
    <div className="">
      Creating word for Book: {bookId} <br />
      <br /> Group: {groupId}
    </div>
  );
};

export default UserWordsContent;
