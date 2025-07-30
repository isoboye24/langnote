import Image from 'next/image';
import React from 'react';

const GroupDoc = () => {
  const groupBtn =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4ZMCgxhMtKUYnrGcTv5dMsmQxLp0aNtPO1yboj';

  const createGroupForm =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4ZdcrN936sDaqPrJwBIc5XFd1oZC8V37OiRtjf';

  const groupListPage =
    'https://jr6g4vgkv4.ufs.sh/f/jVfJldLHdC4Zx6kNHhPVwj63MKbkPWBhE4CpS7Ji9N0UvRZn';

  return (
    <div className="wrapper">
      <section id="how_to_create_group" className="mb-20">
        <h1 className="text-2xl font-bold text-center mb-5">
          How to create group
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          To create a group click on the created book (note: click neither the
          pencil nor the delete buttons). A group list page will be opened. If
          you have not created any group, this page will be empty and the total
          number of groups below will be zero.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          <span className="flex justify-center items-center">
            <Image
              src={groupBtn}
              alt="book btn"
              width={150}
              height={100}
              unoptimized
              className="mt-3 rounded-md"
            />
          </span>
          <div className="mb-5 md:mb-8 font-bold text-sm italic mt-1 text-center">
            Figure 2.1
          </div>
          Then click on the create group button at the top right corner of the
          page (as shown in the image above). This will open a create group form
          as shown on the image below. The Book ID is the unique ID of the
          created book.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          <span className="flex justify-center items-center">
            <Image
              src={createGroupForm}
              alt="book btn"
              width={400}
              height={200}
              unoptimized
              className="my-t rounded-md"
            />
          </span>
          <div className="mb-5 md:mb-8 font-bold text-sm italic mt-1 text-center">
            Figure 2.2
          </div>
          Fill out the form giving it a group name, choose the color for the
          group and click the Create Group button.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-5">
          <span className="flex justify-center items-center">
            <Image
              src={groupListPage}
              alt="book btn"
              width={400}
              height={200}
              unoptimized
              className="mt-3 rounded-md"
            />
          </span>
          <div className="mb-5 md:mb-8 font-bold text-sm italic mt-1 text-center">
            Figure 2.3
          </div>
          On the group you will have the number of words and sentences, update
          and delete buttons as shown on the image above. When you have no words
          and sentences created, naturally the number will be zero. Having
          created more than one groups, the group will be sorted by number of
          words in each group descendingly. When more than ten groups are
          created then a search group button will surface.
        </p>
      </section>
      <section id="how_to_update_group" className="mb-20">
        <h1 className="text-2xl font-bold text-center mb-5">
          How to update & delete group
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-justify">
          As usual, you can click on the pen to update the group and also the
          trash button to delete the group. <strong>Note:</strong> when you
          delete a group, all the words and sentences in that group will also be
          deleted.
        </p>
      </section>
    </div>
  );
};

export default GroupDoc;
