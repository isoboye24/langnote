import React from 'react';
import { Metadata } from 'next';
import BookList from './book-list';
import { requireUserAndAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'Books',
};

const ListOfBooks = async () => {
  await requireUserAndAdmin();
  return (
    <div className="">
      <BookList />
    </div>
  );
};

export default ListOfBooks;
