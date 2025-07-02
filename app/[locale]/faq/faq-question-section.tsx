import React from 'react';
import FAQQuestion from './faq-question';

const FAQQuestionsSection = () => {
  const items = [
    {
      id: 'item-1',
      title: 'What is LN?',
      content:
        'LangNote is a platform for increasing your vocabulary learning at anywhere and anytime on different device platform by serving you with the opportunity to create your language books, groups and save your words or sentences.',
    },
    {
      id: 'item-2',
      title: 'How can I get started?',
      content: 'You just have to simply open your account and start using it.',
    },
    {
      id: 'item-3',
      title: 'How much per month?',
      content: 'It is totally free for users.',
    },
  ];
  return (
    <div className="bg-orange-50 dark:bg-slate-800 py-20 lg:py-40">
      <div className="wrapper grid grid-cols-1 md:grid-cols-2  rounded-sm shadow-2xl">
        <div className="">
          <div className="flex  md:flex-col py-0 md:py-10 gap-2 md:gap-5 text-sm md:text-base">
            <div className="">About LN</div>
            <div className="">Account</div>
            <div className="">Books</div>
            <div className="">Payment</div>
            <div className="">Contact</div>
          </div>
        </div>
        <div className="py-15 md:py-10">
          <FAQQuestion items={items} />
        </div>
      </div>
    </div>
  );
};

export default FAQQuestionsSection;
