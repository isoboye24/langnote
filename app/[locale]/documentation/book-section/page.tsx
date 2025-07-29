'use client';

import Image from 'next/image';

const BookDoc = () => {
  const bookBtn =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4ZNvaKuI5KqXVQ3p4nfExsi8W5lTct0YvyzRrB';

  const createBookBtn =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4ZVkOzJA9ePCRdy98li1LaqSNHBMmFQETWOrb5';

  const createBookFormPage =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4Z6WXCWuOroROt8KFX4vPfupCeV50gETd2qcQh';

  return (
    <div className="wrapper">
      <section id="how_to_create_book" className="mb-20">
        <h1 className="text-2xl font-bold text-center mb-10">
          How to create Book
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-justify my-10">
          To create a book click on the book button (as shown in the image
          below) on the sidebar of you account dashboard page.
          <span className="flex justify-center items-center">
            <Image
              src={bookBtn}
              alt="book btn"
              width={150}
              height={100}
              unoptimized
              className="my-3 rounded-md"
            />
          </span>
          A book list page will be opened. If you have not created any book,
          this page will be empty and the total number of books below will be
          zero.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-10">
          <span className="flex justify-center items-center">
            <Image
              src={createBookBtn}
              alt="book btn"
              width={400}
              height={200}
              unoptimized
              className="mb-3 rounded-md"
            />
          </span>
          Then click on the create book button at the to right corner of the
          page (as shown in the image above). This will open a create book form.
          <span className="flex justify-center items-center">
            <Image
              src={createBookFormPage}
              alt="book btn"
              width={400}
              height={200}
              unoptimized
              className="my-5 rounded-md"
            />
          </span>
          Fill out the form by choosing the language, giving title to the book
          and also choose the colors for the book. This colors will design the
          book cover.
        </p>
      </section>

      <section id="how_to_update_book">
        <h1 className="text-2xl font-bold text-center">How to update Book</h1>
        <p className="text-gray-700 dark:text-gray-300 text-justify"></p>
      </section>
    </div>
  );
};

export default BookDoc;
