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
        color1="#00c6ff"
        color2="#0072ff"
      />
      <Book title="Russian" language="Russian" topics={10} />
      <Book title="English" language="German" topics={5} />
    </div>
  );
};

export default BookList;
