'use client';

import Image from 'next/image';

const BookDoc = () => {
  const bookBtn =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4ZNvaKuI5KqXVQ3p4nfExsi8W5lTct0YvyzRrB';

  const createBookBtn =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4ZVkOzJA9ePCRdy98li1LaqSNHBMmFQETWOrb5';

  const createBookFormPage =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4Z6WXCWuOroROt8KFX4vPfupCeV50gETd2qcQh';

  const BookCover =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4ZK7zrcBIxyaF60cSmfwIbNpPLsd4EzQ1q5kCM';

  return (
    <div className="wrapper">
      <section id="how_to_create_book" className="mb-20">
        <h1 className="text-2xl font-bold text-center mb-5">
          How to create Book
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          To create a book click on the book button (as shown in the image
          below) on the sidebar of you account dashboard page.
          <span className="flex justify-center items-center">
            <Image
              src={bookBtn}
              alt="book btn"
              width={150}
              height={100}
              unoptimized
              className="mt-3 rounded-md"
            />
          </span>
          <div className="mb-5 md:mb-8 font-bold text-sm italic mt-1 text-center">
            Figure 1.1
          </div>
          A book list page will be opened. If you have not created any book,
          this page will be empty and the total number of books below will be
          zero.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          <span className="flex justify-center items-center">
            <Image
              src={createBookBtn}
              alt="book btn"
              width={400}
              height={200}
              unoptimized
              className="mb-0 rounded-md"
            />
          </span>
          <div className="mb-5 md:mb-8 font-bold text-sm italic mt-1 text-center">
            Figure 1.2
          </div>
          Then click on the create book button at the top right corner of the
          page (as shown in the image above). This will open a create book form.
          <span className="flex justify-center items-center">
            <Image
              src={createBookFormPage}
              alt="book btn"
              width={400}
              height={200}
              unoptimized
              className="mt-5 rounded-md"
            />
          </span>
          <div className="mb-5 md:mb-8 font-bold text-sm italic mt-1 text-center">
            Figure 1.3
          </div>
          Fill out the form by choosing the language, giving title to the book
          and also choose the colors for the book then create. These colors will
          design the book cover.
        </p>
      </section>

      <section id="how_to_update_book">
        <h1 className="text-2xl font-bold text-center mb-5">
          How to update Book
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-justify">
          <span className="flex justify-center items-center">
            <Image
              src={BookCover}
              alt="book btn"
              width={200}
              height={100}
              unoptimized
              className="mt-5 rounded-md"
            />
          </span>
          <div className="mb-5 md:mb-8 font-bold text-sm italic mt-1 text-center">
            Figure 1.4
          </div>
          In order to update the book click on the pencil button on the book and
          refill the book form page and click update.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          The delete button is also on the book cover. Click the red trash icon
          on the book to delete the book.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          When you have no group created in the book, your total group at the
          middle of the book cover will be zero.
        </p>
      </section>
    </div>
  );
};

export default BookDoc;
