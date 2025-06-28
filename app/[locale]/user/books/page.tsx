import React from 'react';
import { Metadata } from 'next';
import BookList from './book-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { requireUserAndAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'Books',
};

const ListOfBooks = async () => {
  await requireUserAndAdmin();
  return (
    <div className="wrapper">
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

export default ListOfBooks;
