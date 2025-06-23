import React from 'react';
import { Metadata } from 'next';
import BookList from './book-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Books',
};

const ListOfBooks = () => {
  return (
    <>
      <div className="flex-between mb-10">
        <div className="">Search book...</div>
        <Button className="">
          <Link href={`/user/books/create`}>Create Book</Link>
        </Button>
      </div>
      <div className="">
        <BookList />
      </div>
    </>
  );
};

export default ListOfBooks;
