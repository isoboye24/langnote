import Book from '@/components/ui/shared/book';
import React from 'react';

const BookList = () => {
  return (
    <div className="flex gap-4 flex-wrap ">
      <Book title="Russian" language="Russian" topics={10} />
      <Book
        title="German"
        language="German"
        topics={5}
        color="from-blue-500 to-teal-600"
      />
      <Book title="Russian" language="Russian" topics={10} />
      <Book
        title="English"
        language="German"
        topics={5}
        color="from-red-500 to-pink-300"
      />
    </div>
  );
};

export default BookList;
