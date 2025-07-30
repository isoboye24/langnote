import Image from 'next/image';
import React from 'react';

const WordDoc = () => {
  const wordListPage =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4ZLC8hL1vgeIipBrPt1A8czuKkdMj4svVOUTQy';

  const wordForm =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4ZJmQ7uPx8DBHO0znVufEI5vSm2deNqZA7kcyX';

  return (
    <div className="wrapper">
      <section id="how_to_create_word" className="mb-20">
        <h1 className="text-2xl font-bold text-center mb-5">
          How to create word
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          To create a word click on the created group (<strong>note:</strong>{' '}
          click neither the pencil nor the delete buttons). A list page as shown
          below will be opened. If you have not created any word, this page will
          be empty and the total number of words below will be zero.
          <span className="hidden md:flex md:justify-center md:items-center">
            <Image
              src={wordListPage}
              alt="book btn"
              width={800}
              height={400}
              unoptimized
              className="mt-8 rounded-md"
            />
          </span>
          <span className="md:hidden flex justify-center items-center">
            <Image
              src={wordListPage}
              alt="book btn"
              width={400}
              height={200}
              unoptimized
              className="mt-5 rounded-md"
            />
          </span>
          <div className="mb-5 md:mb-8 font-bold text-sm italic mt-1">
            Figure 3.1
          </div>
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          On the list of words you will see back and create word buttons, name
          of the group at their center, the filter buttons dropdowns below them
          and also the list card. When you have created at list a word or
          sentence, they will appear as a list on this page in such a way that
          clicking on the word displays the meaning that you have given to it.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          Click on the create word button at the top right corner of the page to
          create your word or sentence. A form will appear as shown on the image
          below.
          <span className="hidden md:flex md:justify-center md:items-center">
            <Image
              src={wordForm}
              alt="book btn"
              width={800}
              height={400}
              unoptimized
              className="mt-8 rounded-md"
            />
          </span>
          <span className="md:hidden flex justify-center items-center">
            <Image
              src={wordForm}
              alt="book btn"
              width={400}
              height={200}
              unoptimized
              className="mt-5 rounded-md"
            />
          </span>
          <div className="mb-5 md:mb-8 font-bold text-sm italic mt-1">
            Figure 3.2
          </div>
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          On this form page you will see the title of the page, a red key button
          and the form. Ofcourse, it wastes time to keep on filling up the form
          just to store a word or sentence that&apos;s why the key button is
          provided at the top right corner. This button is provided to retain
          the previously choses options of the required fields, work known
          checkbox and also the Favorite states.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          Click on the key button to turn green and then fill your form and then
          click on save. The meaning, synonyms, antonyms, work known checkbox
          and Favorite are optional. So, you can save a word even without
          meaning and other optional values.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          When the page is reloaded or re-opened, the state of the key button
          will change to red and you will have to once again turn it green to
          preserve your required form state.
        </p>
      </section>
      <section id="how_to_search_word" className="mb-20">
        <h1 className="text-2xl font-bold text-center mb-5">
          How to filter & search word
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          When the total number of words + sentence is more than ten, the search
          input field will show up on the list page (see figure 3.1) to search
          for words or sentences that you have saved. You also have the filter
          buttons to filter known and favorite words respectively. The month and
          year dropdowns are used to search for the words or sentences you have
          saved in your chosen month and year.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          Furthermore, you can also filter by parts of speech. If you saved a
          word or sentence without chosen part of speech for it, then you can
          see it by this filter.
        </p>
      </section>
      <section id="how_to_update_word" className="mb-20">
        <h1 className="text-2xl font-bold text-center mb-5">
          How to update & delete word
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-justify mt-5">
          On the left side of each word in the list (see Figure 3.1), there are
          favorite, view, update and delete buttons. On mobile these buttons
          will be shown when clicked on a word. On clicking the star, you add
          that word to your favorite list. Click on the view button (i.e. the
          eye icon) to view the word and also click on the update button to
          update the word. Finally, you can delete the word by clicking on the
          trash icon.
        </p>
      </section>
    </div>
  );
};

export default WordDoc;
