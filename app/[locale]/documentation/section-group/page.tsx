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
        <h1 className="text-2xl font-bold text-center mb-10">
          How to create group
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-justify my-10">
          To create a group click on the created book (note: click neither the
          pencil nor the delete buttons). A group list page will be opened. If
          you have not created any group, this page will be empty and the total
          number of groups below will be zero.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-10">
          <span className="flex justify-center items-center">
            <Image
              src={groupBtn}
              alt="book btn"
              width={150}
              height={100}
              unoptimized
              className="my-3 rounded-md"
            />
          </span>
          Then click on the create group button at the top right corner of the
          page (as shown in the image above). This will open a create group form
          as shown on the image below.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-10">
          <span className="flex justify-center items-center">
            <Image
              src={createGroupForm}
              alt="book btn"
              width={400}
              height={200}
              unoptimized
              className="my-3 rounded-md"
            />
          </span>
          Fill out the form giving it a group name and also choose the color for
          the group then create.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify my-10">
          <span className="flex justify-center items-center">
            <Image
              src={groupListPage}
              alt="book btn"
              width={400}
              height={200}
              unoptimized
              className="my-3 rounded-md"
            />
          </span>
          On the group list you will have the number of words, update and delete
          buttons as shown on the image above.
        </p>
      </section>
    </div>
  );
};

export default GroupDoc;
