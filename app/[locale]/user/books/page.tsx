import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import BookList from '@/components/ui/shared/book-lists.tsx/page';

const Group = () => {
  return (
    <div className="">
      <div className="flex-between mb-10">
        <div className="">Search book...</div>
        <Button className="">
          <Link href={`/user/books/create`}>Create Book</Link>
        </Button>
      </div>
      <div className="">
        <BookList />
      </div>
    </div>
  );
};

export default Group;
