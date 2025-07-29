'use client';
import { User } from '@prisma/client';
import React from 'react';
// import docData from '@/app/[locale]/documentation/doc.json';

type Props = {
  user?: User;
};

const GetStarted: React.FC<Props> = ({ user }) => {
  return (
    <div className="wrapper">
      <h1 className="mb-10">
        Hi <strong>{user?.userName}</strong>, welcome to{' '}
        <strong className="text-green-500">LangNote</strong> documentation.
      </h1>
      {/* {docData.getStarted.map((p) => (
        <div key={p.id}> */}
      <div className="text-gray-700 dark:text-gray-300 text-justify">
        <p className="my-5 ">
          <strong className="text-green-500">LangNote</strong> is the easiest
          way for language learner to store new words or sentences which can be
          accessed by you alone. Your words can be seen by you alone unless you
          share your account with someone else. Many services have built online
          dictionary, but in our opinion, none found the right compromise of
          ownership, flexibility and safety.
        </p>
        <p className="my-5">
          Imagine that you traveled to another country or right in your country
          you opt to learn a new language. Having sacrificed your time learning
          for 6 months, 1 year, 2 years or more, with some textbooks and
          notebooks and you search for words or phrases or sentences in any of
          the notebooks that you wrote down with your personal explanations.
          Searching for such will consume your time most especially when you
          can&apos;t remember the exact page or your notebook is not by your
          side.
        </p>
        <p className="my-5">
          This is why <strong className="text-green-500">LangNote</strong> is
          indispensable. This App will not only speed up your personal words
          search and having your books always in your device, but also give you
          the opportunity to sort your words according their parts of speech and
          months.
        </p>
        <p className="my-5">
          It is our joy that you found this amazing app to boost your language
          learning speed. So let&apos;s get started.
        </p>
      </div>
      {/* </div>
      ))} */}
    </div>
  );
};

export default GetStarted;
